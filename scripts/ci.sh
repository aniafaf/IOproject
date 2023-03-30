#!/usr/bin/env bash

cd "$(dirname "$0")" || exit 1
source ./helpers.sh || exit 1

op "Initialising CI env..." \
    "./init.sh" \
    "Successfully initialised CI env." \
    "Failed to initialise CI env." 

print_info "Running client CI..."
cd ../client || exit 1
if npm run ci-script; then 
  print_ok "Successfully ran client CI."
else
  print_error "Failed to run client CI."
  exit 1
fi

cd .. || exit 1 # return to the root folder

op "Running server CI..." \
    "./server/scripts/ci.sh" \
    "Successfully ran server CI." \
    "Failed to run server CI." 

if [[ -n "$DEBUG" ]]; then
  exit $!
fi

# Exit early if the head is detached
if ! git symbolic-ref -q HEAD; then
  exit $!
fi

print_info "Committing above changes."
git config --global user.name "ci"
git config --global user.email "ts438730@students.mimuw.edu.pl"

git add -A
git commit -m "CI [$(date -u +"%Y.%m.%d %T")]"
git checkout tmp
git push

