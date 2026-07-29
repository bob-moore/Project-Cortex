import { spawnSync } from "node:child_process";
import { readFileSync, unlinkSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const TOOL_VERSION = "0.1.0";

function parseArgs(argv) {
  const args = { path: null, url: null, allowRoot: false };
  for (const a of argv) {
    if (a === "--allow-root") args.allowRoot = true;
    if (a.startsWith("--path=")) args.path = a.slice("--path=".length);
    if (a.startsWith("--url=")) args.url = a.slice("--url=".length);
  }
  return args;
}

function runWp(cmdArgs, { pathArg, urlArg, allowRoot }) {
  const args = [];
  if (allowRoot) args.push("--allow-root");
  if (pathArg) args.push(`--path=${pathArg}`);
  if (urlArg) args.push(`--url=${urlArg}`);
  args.push(...cmdArgs);

  const out = spawnSync("wp", args, { encoding: "utf8" });
  return {
    ok: out.status === 0,
    status: out.status,
    error: out.error ? { message: out.error.message, code: out.error.code } : null,
    stdout: (out.stdout || "").trim(),
    stderr: (out.stderr || "").trim(),
    args,
  };
}

function main() {
  const opts = parseArgs(process.argv.slice(2));

  const info = runWp(["--info"], { pathArg: null, urlArg: null, allowRoot: opts.allowRoot });
  const report = {
    tool: { name: "redirection_inspect", version: TOOL_VERSION },
    wpCli: { available: info.ok },
    wordpress: { path: opts.path, url: opts.url, isInstalled: null, siteurl: null },
    redirection: {
      commandAvailable: null,
      exportOk: null,
      redirectCount: null,
      groupCount: null,
    },
    notes: [
      "Redirection's WP-CLI has no list/query subcommand. This inspector counts current " +
        "redirects by exporting to a temp JSON file, the same workaround described in " +
        "references/import-export.md.",
    ],
  };

  if (!info.ok) {
    report.notes.push("WP-CLI not available on PATH. Install WP-CLI or run inside the intended container/environment.");
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    return;
  }

  const isInstalled = runWp(["core", "is-installed"], { pathArg: opts.path, urlArg: opts.url, allowRoot: opts.allowRoot });
  report.wordpress.isInstalled = isInstalled.ok;

  if (!isInstalled.ok) {
    report.notes.push("WordPress not detected at the given path/url. Check --path/--url and that wp-config.php is present.");
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    return;
  }

  const siteurl = runWp(["option", "get", "siteurl"], { pathArg: opts.path, urlArg: opts.url, allowRoot: opts.allowRoot });
  report.wordpress.siteurl = siteurl.ok ? siteurl.stdout : null;

  const help = runWp(["help", "redirection"], { pathArg: opts.path, urlArg: opts.url, allowRoot: opts.allowRoot });
  report.redirection.commandAvailable = help.ok;

  if (!help.ok) {
    report.notes.push("`wp redirection` command not available — plugin may not be installed/active, or WP-CLI integration isn't registered.");
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    return;
  }

  const tmpFile = join(tmpdir(), `redirection-inspect-${Date.now()}.json`);
  const exportResult = runWp(["redirection", "export", "all", tmpFile, "--format=json"], {
    pathArg: opts.path,
    urlArg: opts.url,
    allowRoot: opts.allowRoot,
  });
  report.redirection.exportOk = exportResult.ok;

  if (exportResult.ok && existsSync(tmpFile)) {
    try {
      const data = JSON.parse(readFileSync(tmpFile, "utf8"));
      // Redirection's JSON export shape has historically nested items under a
      // top-level array or {redirect: [...], group: [...]} depending on version —
      // handle both defensively rather than assuming one shape.
      const redirects = Array.isArray(data) ? data : data.redirect || data.redirects || [];
      const groups = Array.isArray(data) ? [] : data.group || data.groups || [];
      report.redirection.redirectCount = Array.isArray(redirects) ? redirects.length : null;
      report.redirection.groupCount = Array.isArray(groups) ? groups.length : null;
      if (report.redirection.redirectCount === null) {
        report.notes.push("Export succeeded but JSON shape wasn't recognized — inspect the export file manually to confirm structure for this plugin version.");
      }
    } catch (e) {
      report.notes.push(`Export file was written but not valid/parseable JSON: ${e.message}`);
    } finally {
      try {
        unlinkSync(tmpFile);
      } catch {
        // best-effort cleanup
      }
    }
  } else {
    report.notes.push("Export command did not succeed — check stderr from a manual `wp redirection export all <file> --format=json` run.");
  }

  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
}

main();
