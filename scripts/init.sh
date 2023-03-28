#!/usr/bin/env bash

# move to the script directory
cd "$(dirname "$0")" || exit 1
source ./helpers.sh || exit 1

print_info 'Initialising server...'
if ../server/scripts/init.sh; then 
  print_ok 'Successfully initialised server.'
else
  print_error 'Failed to initialise server.' 
  exit 1
fi

print_info 'Initialising client...'
if ../client/scripts/init.sh; then 
  print_ok 'Successfully initialised client.'
else
  print_error 'Failed to initialise client.' 
  exit 1
fi

# print_info 'Installing global npm packages...'
# if npm i docsify-cli -g; then
#  print_ok 'Successfully installed global npm packages.'
# else
#  print_error 'Failed to install global npm packages.'
#  exit 1
# fi
