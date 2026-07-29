#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const registryPath = path.join(root, '.agents/tools/seo/tool-registry.json');
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const tools = new Map(registry.tools.map((tool) => [tool.id, tool]));

function usage() {
  console.log(`Usage: node .agents/tools/seo/run-tool.mjs --tool <id> --target <url-or-path> [options]

Options:
  --tool <id>          Registry tool id.
  --target <value>     URL, local file, or local directory accepted by the tool.
  --output-dir <path>  Evidence root (default: reviews/evidence/seo/<date>-cli-run).
  --mode <mode>        SEO mode (default: technical-audit).
  --client <name>      Client or project label for the evidence packet.
  --max-pages <n>      Maximum visited pages for crawlers that support a cap.
  --max-depth <n>      Maximum crawl depth for crawlers that support a cap.
  --timeout-ms <n>     Process timeout (default: 300000).
  --dry-run            Write the planned command without executing it.
  --help               Show this help.

The wrapper never enables uploads, credentials, mutations, or production writes.`);
}

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--help') args.help = true;
    else if (arg === '--dry-run') args.dryRun = true;
    else if (arg.startsWith('--') && argv[i + 1] && !argv[i + 1].startsWith('--')) {
      args[arg.slice(2)] = argv[++i];
    } else {
      throw new Error(`Unknown or incomplete argument: ${arg}`);
    }
  }
  return args;
}

function requireValue(args, key) {
  if (!args[key]) throw new Error(`Missing --${key}`);
  return args[key];
}

function isUrl(value) {
  try {
    const parsed = new URL(value);
    return ['http:', 'https:'].includes(parsed.protocol) && Boolean(parsed.hostname);
  } catch {
    return false;
  }
}

function commandFor(toolId, target, rawDir, args) {
  const output = path.join(rawDir, 'tool-output');
  const html = path.join(rawDir, 'report.html');
  const json = path.join(rawDir, 'report.json');
  const commands = {
    'siteone-crawler': ['siteone-crawler', `--url=${target}`, '--output=json', `--output-json-file=${json}`, `--output-html-report=${html}`, '--hide-progress-bar', '--no-color'],
    unlighthouse: ['unlighthouse', '--site', target, '--output-path', rawDir, '--no-cache'],
    lighthouse: ['lighthouse', target, '--output=json', '--output=html', `--output-path=${path.join(rawDir, 'lighthouse')}`, '--quiet'],
    linkinator: ['linkinator', target, '--recurse', '--format', 'JSON'],
    lychee: ['lychee', '--format', 'json', target],
    'html-validate': ['html-validate', '--formatter', 'json', target],
    vnu: ['vnu', '--format', 'json', target],
    pa11y: ['pa11y', target, '--reporter', 'json']
  };
  if (toolId === 'siteone-crawler') {
    if (args['max-pages']) commands[toolId].push(`--max-visited-urls=${args['max-pages']}`);
    if (args['max-depth']) commands[toolId].push(`--max-depth=${args['max-depth']}`);
  }
  if (toolId === 'unlighthouse' && args.samples) commands[toolId].push('--samples', args.samples);
  return commands[toolId];
}

function writeJson(file, value) {
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    usage();
    return 0;
  }

  const toolId = requireValue(args, 'tool');
  const target = requireValue(args, 'target');
  const tool = tools.get(toolId);
  if (!tool) throw new Error(`Unknown SEO tool: ${toolId}`);
  if (!isUrl(target) && !fs.existsSync(path.resolve(root, target))) {
    throw new Error(`Target must be an http(s) URL or an existing local path: ${target}`);
  }

  const date = new Date().toISOString().slice(0, 10);
  const evidenceRoot = path.resolve(args['output-dir'] || `reviews/evidence/seo/${date}-cli-run`);
  const rawDir = path.join(evidenceRoot, 'raw', toolId);
  const normalizedDir = path.join(evidenceRoot, 'normalized');
  fs.mkdirSync(rawDir, { recursive: true });
  fs.mkdirSync(normalizedDir, { recursive: true });

  const command = commandFor(toolId, target, rawDir, args);
  const startedAt = new Date().toISOString();
  const commandText = command.map((part) => JSON.stringify(part)).join(' ');
  const metadata = {
    tool: toolId,
    command: commandText,
    target,
    mode: args.mode || 'technical-audit',
    approval_class: tool.approval_class,
    limits: {
      max_pages: args['max-pages'] || null,
      max_depth: args['max-depth'] || null,
      timeout_ms: Number(args['timeout-ms'] || 300000)
    },
    started_at: startedAt,
    dry_run: Boolean(args.dryRun)
  };

  if (args.dryRun) {
    writeJson(path.join(rawDir, 'run-metadata.json'), metadata);
    console.log(commandText);
    return 0;
  }

  const result = spawnSync(command[0], command.slice(1), {
    cwd: root,
    encoding: 'utf8',
    timeout: Number(args['timeout-ms'] || 300000),
    maxBuffer: 50 * 1024 * 1024
  });
  const completedAt = new Date().toISOString();
  const stdoutPath = path.join(rawDir, 'stdout.txt');
  const stderrPath = path.join(rawDir, 'stderr.txt');
  fs.writeFileSync(stdoutPath, result.stdout || '', 'utf8');
  fs.writeFileSync(stderrPath, result.stderr || '', 'utf8');
  writeJson(path.join(rawDir, 'run-metadata.json'), {
    ...metadata,
    completed_at: completedAt,
    exit_code: result.status,
    signal: result.signal || null,
    timed_out: result.error?.code === 'ETIMEDOUT'
  });

  const dataStatus = result.error?.code === 'ETIMEDOUT' ? 'blocked' : result.status === 0 ? 'complete' : 'partial';
  const limits = [
    'This wrapper does not interpret tool-specific findings; inspect raw artifacts before reporting.',
    'The result covers only the supplied target and the tool configuration recorded in run-metadata.json.',
    `Process timeout: ${Number(args['timeout-ms'] || 300000)} ms.`
  ];
  if (args['max-pages']) limits.push(`Maximum pages requested: ${args['max-pages']}.`);
  if (args['max-depth']) limits.push(`Maximum crawl depth requested: ${args['max-depth']}.`);
  limits.push('A nonzero exit is preserved as partial evidence rather than treated as an all-clear.');
  const packet = {
    version: 1,
    tool: { id: tool.id, version: null, official_sources: tool.official_sources },
    run: {
      approval_class: tool.approval_class,
      command_intent: `Run ${tool.id} for ${args.mode || 'technical-audit'} evidence collection.`,
      command_redacted: commandText,
      started_at: startedAt,
      completed_at: completedAt
    },
    scope: { mode: args.mode || 'technical-audit', client_or_project: args.client || null, targets: [target], market: null, date_range: null },
    data_status: dataStatus,
    artifacts: [
      { path: path.relative(root, stdoutPath), kind: 'raw-stdout', description: 'Captured tool stdout.' },
      { path: path.relative(root, stderrPath), kind: 'raw-stderr', description: 'Captured tool stderr and warnings.' },
      { path: path.relative(root, path.join(rawDir, 'run-metadata.json')), kind: 'run-metadata', description: 'Command, timing, exit status, and scope.' }
    ],
    limits,
    findings: [],
    verification: [
      `Process exit status: ${result.status ?? 'unknown'}.`,
      'Raw stdout and stderr were captured.',
      'Run seo-quality-gate after tool-specific findings are interpreted.'
    ]
  };
  const packetPath = path.join(normalizedDir, `${toolId}.json`);
  writeJson(packetPath, packet);
  console.log(JSON.stringify({ data_status: dataStatus, output: path.relative(root, packetPath), exit_code: result.status }, null, 2));
  return result.status ?? 1;
}

try {
  process.exitCode = main();
} catch (error) {
  console.error(`SEO tool runner error: ${error.message}`);
  process.exitCode = 2;
}
