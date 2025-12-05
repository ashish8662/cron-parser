const assert = require("assert");
const { execSync } = require("child_process");

function run(cmd) {
  return execSync(cmd).toString().trim();
}

function test(description, cmd, expectedContains) {
  const out = run(cmd);
  expectedContains.forEach((str) => {
    assert(out.includes(str), `${description} FAILED: missing "${str}"`);
  });
  console.log(`✓ ${description}`);
}

test(
  "Example cron expression",
  `node cron-parser.js "*/15 0 1,15 * 1-5 /usr/bin/find"`,
  ["minute        0 15 30 45", "hour          0", "day of month  1 15"]
);

test(
  "Wildcard expansion",
  `node cron-parser.js "* * * * * echo hi"`,
  ["minute        0 1 2 3", "command       echo hi"]
);

console.log("All tests passed!");
