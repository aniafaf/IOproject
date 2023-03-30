#!/usr/bin/env bash

cd "$(dirname "$0")" || exit 1
source ../../scripts/helpers.sh || exit 1
source ./consts.sh || exit 1

print_info "Activating python venv..."
# shellcheck disable=all
if source ./$VENV_PATH/bin/activate; then
  print_ok "Successfully activated venv."
else
  print_error "Failed to activate python venv. See the messages above for further details."
  exit 1
fi