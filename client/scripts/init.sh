#!/usr/bin/env bash

cd "$(dirname "$0")" || exit 1
source ../../scripts/helpers.sh || exit 1

op 'Installing npm packages...' \
   'npm i -D' \
   'Successfully installed npm packages.\nTo run the dev server use: npm start' \
   'Failed to install npm packages'

