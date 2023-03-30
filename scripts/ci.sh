#!/usr/bin/env bash

cd "$(dirname "$0")" || exit 1
source ./helpers.sh || exit 1

print_info "Running client CI..."
cd ../client || exit 1
if npm run ci-script; then 
  print_ok "Successfully ran client CI."
else
  print_error "Failed to run client CI."
  exit $!
fi

cd .. || exit 1 # return to the root folder

print_info "Running server CI..."
if ./server/scripts/ci.sh; then 
  print_ok "Successfully ran server CI."
else
  print_error "Failed to run server CI."
  exit $!
fi

print_info "Committing above changes."
git config --global user.name "your username"
git config --global user.email "your email"

git add -A
git commit -m "CI [$(date -u +"%Y.%m.%d %T")]"
git push
