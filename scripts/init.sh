#!/usr/bin/env bash

# move to the script directory
cd "$(dirname "$0")" || exit 1
source ./helpers.sh || exit 1

op 'Initialising server...' \
    "../server/scripts/init.sh" \
    'Successfully initialised server.' \
    'Failed to initialise server.'  

op 'Initialising client...' \
    "../client/scripts/init.sh" \
    'Successfully initialised client.' \
    'Failed to initialise client.'  

# print_info 'Installing global npm packages...'
# if npm i docsify-cli -g; then
#  print_ok 'Successfully installed global npm packages.'
# else
#  print_error 'Failed to install global npm packages.'
#  exit 1
# fi
