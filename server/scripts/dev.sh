#!/usr/bin/env bash

cd "$(dirname "$0")" || exit 1
source ../../scripts/helpers.sh || exit 1
source ./consts.sh || exit 1
source ./venv.sh || exit 1

export TEST=1
op 'Preparing database' \
   './db.sh' \
   'Successfully prepared database' \
   'Failed to prepare database'

op 'Starting server...' \
   "python ../manage.py runserver 0.0.0.0:8000" \
   "Server succesfully started" \
   "Failed to start server."
