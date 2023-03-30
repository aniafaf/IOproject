#!/usr/bin/env bash

cd "$(dirname "$0")" || exit 1
source ./helpers.sh || exit 1

print_info "Initialising client CI env..."
if ./init.sh; then
  print_ok "Succesfully initialised CI env."
else
  print_error "Failed to initialise CI env."
  exit 1
fi

print_info "Running client CI..."
cd ../client || exit 1
if npm run ci-script; then 
  print_ok "Successfully ran client CI."
else
  print_error "Failed to run client CI."
  exit 1
fi

cd .. || exit 1 # return to the root folder

print_info "Running server CI..."
if ./server/scripts/ci.sh; then 
  print_ok "Successfully ran server CI."
else
  print_error "Failed to run server CI."
  exit 1
fi

if [[ -z "$DEBUG" ]]; then
  exit $!
fi

print_info "Committing above changes."
git config --global user.name "ci"
git config --global user.email "ts438730@students.mimuw.edu.pl"

git add -A
git commit -m "CI [$(date -u +"%Y.%m.%d %T")]"
git push
