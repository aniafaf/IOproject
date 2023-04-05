#!/usr/bin/env bash

cd "$(dirname "$0")" || exit 1
source ./helpers.sh || exit 1

op "Initialising CI env..." \
  "./init.sh" \
  "Succesfully initialised CI env." \
  "Failed to initialise CI env."

print_info "Running client coverage..."
cd ../client || exit 1
if ./scripts/coverage.sh; then
  print_ok "Successfully ran client CI."
else
  print_error "Failed to run client CI."
  exit 1
fi

cd .. || exit 1 # return to the root folder

# TODO: add server coverage
# op "Running server CI..." \
#     "./server/scripts/coverage.sh" \
#     "Successfully ran server CI." \
#     "Failed to run server CI."

if [[ -n "$DEBUG" ]]; then
  exit $!
fi

# Exit early if the head is detached
if is_detached; then
  print_info "Exiting without committing because in detached head"
  exit $!
fi

current_branch=$(branch_name)
if [ "$current_branch" != "main" ]; then
  print_info "Exiting without committing to branch '$current_branch'"
  exit 0
fi

print_info "Committing above changes."
git config --global user.name "ci"
git config --global user.email "ts438730@students.mimuw.edu.pl"
git config pull.rebase false
git checkout -B gh-pages
git branch --set-upstream-to=origin gh-pages

git add -A
git add -f ./client/coverage/*
git pull origin/gh-pages
git commit -m "Coverage [$(date -u +"%Y.%m.%d %T")]"
git push -f -u origin gh-pages
