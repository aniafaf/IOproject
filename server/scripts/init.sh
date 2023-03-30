#!/usr/bin/env bash

cd "$(dirname "$0")" || exit 1
source ../../scripts/helpers.sh || exit 1
source ./consts.sh || exit 1

# scirpt
print_info "Creating python venv..."
if python -m venv "$VENV_PATH"; then
  print_ok "Created python venv."
else
  print_error "Failed to create python venv. See the messages above for further details."
  exit 1
fi

source ./venv.sh || exit $!

print_info "Installing packages..."
if python -m pip install -r ../requirements.txt; then
  print_ok "Packages installed succesfully."
else
  print_error "Package installation failed. See the messages above for more details."
  exit 1
fi

print_info "Applying migrations..."
if python ../manage.py migrate; then
  print_ok "Migrations applied successfully."
else
  print_error "Failed to apply migrations. See the messages above for more details."
  exit 1
fi
