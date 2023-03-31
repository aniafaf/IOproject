#!/usr/bin/env bash

cd "$(dirname "$0")" || exit 1
source ../../scripts/helpers.sh || exit 1
cd .. || exit 1

../server/scripts/dev.sh &

export OP_FINAL="lsof -i :8000 | awk 'NR>1{print \$2}' | xargs kill"
eval "$OP_FINAL"

op "Generating client coverage..." \
  "npm run coverage" \
  "Successfully ran client coverage." \
  "Failed to run client coverage." \
  || exit 1
