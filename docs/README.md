# [PH] Getting started

## Initialising the development environment

Before starting, please make sure you have [python](https://www.python.org/downloads/), and [node](https://nodejs.org/en/download) installed.

To initialise the development environment, provided you're using a unix-like system, simply run `./scripts/init.sh`

If you're on a system that doesn't support `bash`:

1. Move to `./server`
1. Run: 
  ```bat
  python -m venv .venv
  .venv\Scripts\activate.bat
  python -m pip install -r requirements.txt
  ```
1. Move to `../client`
1. Run: `npm i -D`
1. Move to `../`
1. Run: `npm i docsify-cli -g`

## Starting the dev environment

We'd suggest running two terminals: one for the frontend, and one for the backend dev server.

You can run the frontend server using `./client/scripts/dev.sh` or by navigating to `./client`, and running `npm run dev`.

As for the backend server, either run `./server/scripts/dev.sh` or navigate to `./server`, and run:

```bat
.venv\Scripts\activate.bat
python manage.py runserver 0.0.0.0:8000
```