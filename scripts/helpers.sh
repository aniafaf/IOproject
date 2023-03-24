#!/usr/bin/bash

function print {
  echo -e "[$1] \e[1m$2\e[0m"
}

function print_info {
  print "\e[1;96mINFO\e[0m" "$1"
}

function print_ok {
  print "\e[1;92mOK\e[0m" "$1"
}

function print_error {
  print "\e[1;91mERROR\e[0m" "$1"
}
