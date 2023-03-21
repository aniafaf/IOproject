#!/usr/bin/env bash

cd "$(dirname "$0")" || exit 1
source ../../scripts/helpers.sh || exit 1

print_info 'Starting client...'
if cd .. && npm run dev; then
  print_error 'Failed to start client.'
  exit 1
fi
