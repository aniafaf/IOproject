#!/usr/bin/env bash

cd "$(dirname "$0")" || exit 1
source ../../scripts/helpers.sh || exit 1
cd .. || exit 1

op "Generating client coverage..." \
  "npm run coverage" \
  "Succesfully ran client coverage." \
  "Failed to run client coverage."
