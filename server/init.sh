#!/usr/bin/env bash

# functions

function print {
  echo -e "[$1] \e[1m$2\e[0m"
}

function print_info {
  print "\e[1;96mINFO\e[0m" "$1"
}

function print_ok {
  print "\e[1;92mOK\e[0m" "$1"
}

function print_error {
  print "\e[1;91mERROR\e[0m" "$1"
}

# scirpt

print_info "Creating python venv..."
if python -m venv ./; then
  print_ok "Created python venv"
else
  print_error "Failed to create python venv. See the messages above for further details."
  exit 1
fi

print_info "Installing packages..."
if python -m pip install -r requirements.txt; then
  print_ok "Packages installed succesfully."
else
  print_error "Package installation failed. See the messages above for more details."
fi
