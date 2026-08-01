#!/usr/bin/env node
/**
 * Project-local stdio proxy for the Cloudways streamable HTTP MCP server.
 *
 * Codex supports literal custom `http_headers` for remote MCP servers, but this
 * repo's `.codex/config.toml` is tracked. Keep the Cloudways token in the
 * ignored `.codex/cloudways.env` file or `CLOUDWAYS_MCP_ACCESS_TOKEN`.
 */

import { createInterface } from "node:readline";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const CLOUDWAYS_MCP_URL = "https://mcp.cloudways.com/mcp/";
const scriptDir = dirname(fileURLToPath(import.meta.url));
const envFile = join(scriptDir, "cloudways.env");

let sessionId = null;

function readEnvToken() {
	if (process.env.CLOUDWAYS_MCP_ACCESS_TOKEN) {
		return process.env.CLOUDWAYS_MCP_ACCESS_TOKEN;
	}

	if (!existsSync(envFile)) return null;

	const raw = readFileSync(envFile, "utf8");
	for (const line of raw.split(/\r?\n/)) {
		const match = line.match(/^\s*CLOUDWAYS_MCP_ACCESS_TOKEN\s*=\s*(.+?)\s*$/);
		if (!match) continue;
		return match[1].replace(/^["']|["']$/g, "");
	}

	return null;
}

function writeJson(message) {
	process.stdout.write(`${JSON.stringify(message)}\n`);
}

function jsonRpcError(id, code, message) {
	if (id === undefined) return;
	writeJson({
		jsonrpc: "2.0",
		id,
		error: { code, message },
	});
}

function parseSse(text) {
	const messages = [];
	for (const event of text.split(/\r?\n\r?\n/)) {
		const data = event
			.split(/\r?\n/)
			.filter((line) => line.startsWith("data:"))
			.map((line) => line.slice(5).trimStart())
			.join("\n");
		if (!data || data === "[DONE]") continue;
		try {
			messages.push(JSON.parse(data));
		} catch {
			/* Ignore non-JSON keepalive data. */
		}
	}
	return messages;
}

async function forward(message) {
	const token = readEnvToken();
	if (!token) {
		jsonRpcError(
			message.id,
			-32000,
			"Missing CLOUDWAYS_MCP_ACCESS_TOKEN in environment or .codex/cloudways.env",
		);
		return;
	}

	const headers = {
		"Content-Type": "application/json",
		Accept: "application/json, text/event-stream",
		"MCP-Protocol-Version":
			message.params?.protocolVersion ?? "2024-11-05",
		"X-Access-Token": token,
		"X-Mcp-Host": "codex",
	};

	if (sessionId) headers["Mcp-Session-Id"] = sessionId;

	let response;
	try {
		response = await fetch(CLOUDWAYS_MCP_URL, {
			method: "POST",
			headers,
			body: JSON.stringify(message),
		});
	} catch (error) {
		jsonRpcError(message.id, -32001, `Cloudways MCP request failed: ${error.message}`);
		return;
	}

	const nextSessionId = response.headers.get("mcp-session-id");
	if (nextSessionId) sessionId = nextSessionId;

	if (response.status === 202 || response.status === 204) return;

	const text = await response.text();
	if (!response.ok) {
		jsonRpcError(
			message.id,
			-32002,
			`Cloudways MCP returned HTTP ${response.status}`,
		);
		return;
	}

	const contentType = response.headers.get("content-type") ?? "";
	const replies = contentType.includes("text/event-stream")
		? parseSse(text)
		: [JSON.parse(text)];

	for (const reply of replies.flat()) {
		writeJson(reply);
	}
}

const rl = createInterface({
	input: process.stdin,
	crlfDelay: Infinity,
});

rl.on("line", (line) => {
	const trimmed = line.trim();
	if (!trimmed) return;
	let message;
	try {
		message = JSON.parse(trimmed);
	} catch {
		return;
	}
	void forward(message);
});
