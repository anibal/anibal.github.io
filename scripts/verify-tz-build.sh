#!/usr/bin/env bash
# Post URLs are derived from calendar dates: a local-time getter anywhere in
# the path pipeline makes dev (America/Bogota) and CI (UTC) emit different
# URLs. This builds twice and diffs the emitted file tree — any drift fails.
set -euo pipefail
cd "$(dirname "$0")/.."

scratch="$(mktemp -d)"
trap 'rm -rf "$scratch"' EXIT

echo "build 1/2: TZ=America/Bogota"
TZ=America/Bogota npm run -s build >/dev/null
(cd dist && find . -type f | sort) > "$scratch/bogota-files.txt"
[ -f dist/sitemap-0.xml ] && cp dist/sitemap-0.xml "$scratch/bogota-sitemap.xml"

echo "build 2/2: TZ=UTC"
TZ=UTC npm run -s build >/dev/null
(cd dist && find . -type f | sort) > "$scratch/utc-files.txt"

diff "$scratch/bogota-files.txt" "$scratch/utc-files.txt" \
  || { echo "FAIL: dist file tree differs between timezones (local-time date getter somewhere)"; exit 1; }
if [ -f "$scratch/bogota-sitemap.xml" ]; then
  diff "$scratch/bogota-sitemap.xml" dist/sitemap-0.xml \
    || { echo "FAIL: sitemap-0.xml differs between timezones"; exit 1; }
fi
echo "OK: builds are timezone-independent ($(wc -l < "$scratch/utc-files.txt" | tr -d ' ') files)"
