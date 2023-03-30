#!/usr/bin/env bash

cd "$(dirname "$0")" || exit 1
source ../../scripts/helpers.sh || exit 1
source ./venv.sh || exit 1

print_info "Formatting files..."
if black ..**/*.py; then
  print_ok "Succesfully formatted files."
else
  print_error "Failed to format files."
  exit 1
fi 

