#!/usr/bin/env bash

source ./consts.sh || exit 1

print_info "Activating python venv..."
# shellcheck disable=all
if source ./$VENV_PATH/bin/activate; then
  print_ok "Successfully activated venv."
else
  print_error "Failed to activate python venv. See the messages above for further details."
  exit 1
fi