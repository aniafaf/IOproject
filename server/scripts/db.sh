#!/usr/bin/env bash

cd "$(dirname "$0")" || exit 1
source ../../scripts/helpers.sh || exit 1
source ./venv.sh || exit 1

op 'Preparing migrations...' \
  'python ../manage.py makemigrations' \
  'Succesfully prepared migrations' \
  'Failed to prepare migrations'

op 'Running migrations' \
  'python ../manage.py migrate' \
  'Successfully ran migrations' \
  'Failed to run migrations'
