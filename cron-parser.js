const FIELD_SPECS = {
  minute: { min: 0, max: 59 },
  hour: { min: 0, max: 23 },
  "day of month": { min: 1, max: 31 },
  month: { min: 1, max: 12 },
  "day of week": { min: 0, max: 6 },
};

function expandField(field, { min, max }) {
  if (field === "*") {
    return range(min, max);
  }

  if (field.includes("/")) {
    const [left, stepStr] = field.split("/");
    const step = parseInt(stepStr, 10);

    let baseRange = [];

    if (left === "*") {
      baseRange = range(min, max);
    } else if (left.includes("-")) {
      const [start, end] = left.split("-").map(Number);
      baseRange = range(start, end);
    } else {
      throw new Error(`Invalid step expression: ${field}`);
    }

    return baseRange.filter((v, idx) => idx % step === 0);
  }

  if (field.includes(",")) {
    return field.split(",").map(Number);
  }

  if (field.includes("-")) {
    const [start, end] = field.split("-").map(Number);
    return range(start, end);
  }

  const value = parseInt(field, 10);
  return [value];
}

function range(start, end) {
  const out = [];
  for (let i = start; i <= end; i++) out.push(i);
  return out;
}

function formatLine(name, values) {
  return name.padEnd(14, " ") + values.join(" ");
}

function main() {
  const input = process.argv.slice(2).join(" ").trim();
  if (!input) {
    console.error("Usage: cron-parser \"*/15 0 1,15 * 1-5 /usr/bin/find\"");
    process.exit(1);
  }

  const parts = input.split(/\s+/);

  if (parts.length < 6) {
    console.error("Invalid cron string: expected 6 parts");
    process.exit(1);
  }

  const [minF, hrF, domF, monF, dowF, ...cmd] = parts;

  const result = {
    minute: expandField(minF, FIELD_SPECS.minute),
    hour: expandField(hrF, FIELD_SPECS.hour),
    "day of month": expandField(domF, FIELD_SPECS["day of month"]),
    month: expandField(monF, FIELD_SPECS.month),
    "day of week": expandField(dowF, FIELD_SPECS["day of week"]),
    command: cmd.join(" "),
  };

  for (const key of Object.keys(FIELD_SPECS)) {
    console.log(formatLine(key, result[key]));
  }
  console.log(formatLine("command", [result.command]));
}

main();
