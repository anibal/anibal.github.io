#!/usr/bin/env bash
# Publish an ad-hoc page under /artifacts/<slug>/ (reserved, unlinked, noindex — see brain).
# Usage: scripts/sync-artifact.sh <slug> <source-site-dir> <r2-public-base>
# HTML goes into public/artifacts/<slug>/ with data/ rewritten to the R2 bucket; the
# data/ files go to R2 (usedtocode-artifacts) so the repo stays free of binaries.
set -euo pipefail
slug=$1 src=$2 base=${3%/}
dest="$(dirname "$0")/../public/artifacts/$slug"
mkdir -p "$dest"
for f in "$src"/*.html; do
  sed -e "s#\"data/#\"$base/$slug/data/#g" \
      -e 's#<meta charset="utf-8">#<meta charset="utf-8"><meta name="robots" content="noindex,nofollow">#' \
      "$f" > "$dest/$(basename "$f")"
done
for f in "$src"/data/*; do
  case $f in *.json) ct=application/json;; *.webp) ct=image/webp;; *) ct=application/octet-stream;; esac
  npx --yes wrangler@latest r2 object put "usedtocode-artifacts/$slug/data/$(basename "$f")" \
    --file "$f" --content-type "$ct" --cache-control "public, max-age=3600" --remote >/dev/null
done
