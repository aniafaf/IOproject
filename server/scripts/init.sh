#!/usr/bin/env bash

cd "$(dirname "$0")" || exit 1
source ../../scripts/helpers.sh || exit 1
source ./consts.sh || exit 1

# scirpt
op "Creating python venv..." \
    "python -m venv \"$VENV_PATH\"" \
    "Created python venv." \
    "Failed to create python venv. See the messages above for further details." 

source ./venv.sh || exit 1

op "Installing packages..." \
    "python -m pip install -r ../requirements.txt" \
    "Packages installed Successfully." \
    "Package installation failed. See the messages above for more details." 

op "Applying migrations..." \
    "python ../manage.py migrate" \
    "Migrations applied successfully." \
    "Failed to apply migrations. See the messages above for more details." 
