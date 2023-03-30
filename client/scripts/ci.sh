#!/usr/bin/env bash

cd "$(dirname "$0")" || exit 1
source ../../scripts/helpers.sh || exit 1
cd .. || exit 1

print_info "Formatting client files..."
if prettier --write .; then
  print_ok "Successfully formatted all the files."
else
  print_error "Failed to format all the files."
  exit 1
fi
