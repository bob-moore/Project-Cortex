import { spawnSync } from "node:child_process";

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
    tool: { name: "migratedb_inspect", version: TOOL_VERSION },
    wpCli: { available: info.ok },
    wordpress: { path: opts.path, url: opts.url, isInstalled: null, siteurl: null, home: null },
    migratedb: {
      commandAvailable: null,
      connectionKeyReadable: null,
      pushEnabled: null,
      pullEnabled: null,
    },
    notes: [
      "This report identifies which environment you're standing in (siteurl/home) so you can " +
        "confirm push vs pull direction before running a migration. It does not perform any " +
        "write operations.",
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

  const home = runWp(["option", "get", "home"], { pathArg: opts.path, urlArg: opts.url, allowRoot: opts.allowRoot });
  report.wordpress.home = home.ok ? home.stdout : null;

  const help = runWp(["help", "migratedb"], { pathArg: opts.path, urlArg: opts.url, allowRoot: opts.allowRoot });
  report.migratedb.commandAvailable = help.ok;

  if (!help.ok) {
    report.notes.push(
      "`wp migratedb` command not available — WP Migrate DB Pro's CLI Addon may not be installed/active on this install."
    );
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    return;
  }

  const connectionKey = runWp(["migratedb", "setting", "get", "connection-key"], {
    pathArg: opts.path,
    urlArg: opts.url,
    allowRoot: opts.allowRoot,
  });
  report.migratedb.connectionKeyReadable = connectionKey.ok;
  if (!connectionKey.ok) {
    report.notes.push(
      "Could not read connection-key via `wp migratedb setting get connection-key` — CLI Addon setup may be incomplete on this install."
    );
  }

  const pushSetting = runWp(["migratedb", "setting", "get", "push"], {
    pathArg: opts.path,
    urlArg: opts.url,
    allowRoot: opts.allowRoot,
  });
  report.migratedb.pushEnabled = pushSetting.ok ? pushSetting.stdout : null;

  const pullSetting = runWp(["migratedb", "setting", "get", "pull"], {
    pathArg: opts.path,
    urlArg: opts.url,
    allowRoot: opts.allowRoot,
  });
  report.migratedb.pullEnabled = pullSetting.ok ? pullSetting.stdout : null;

  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
}

main();
