# Cron Expression Parser

Simple Node.js cron parser — no external cron libraries.

## Usage

```
node cron-parser.js "*/15 0 1,15 * 1-5 /usr/bin/find"
```

## Output Example

```
minute        0 15 30 45
hour          0
day of month  1 15
month         1 2 3 4 5 6 7 8 9 10 11 12
day of week   1 2 3 4 5
command       /usr/bin/find
```

## Tests

```
node tests.js
```
