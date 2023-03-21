#!/usr/bin/env bash

cd "$(dirname "$0")" || exit 1
source ../../scripts/helpers.sh || exit 1

print_info 'Installing npm packages...'
if npm i -D; then
  print_info 'Succesfully installed npm packages.\nTo run the dev server use: npm start'
else
  print_error 'Failed to install npm packages'
  exit 1
fi
