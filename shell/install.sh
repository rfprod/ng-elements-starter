#!/bin/bash

##
# Colors definitions.
##
source shell/colors.sh

##
# Installs dependencies in project root folder as well as in /functions if no arguments are provided.
# Installs global dependencies with sudo if first argument equals 'global'.
##

if [ $# -ne 1 ]; then
  TITLE="<< INSTALLING FIREBASE FUNCTIONS DEPENDENCIES >>"
  printf "
    ${LIGHT_BLUE}%s
    ${DEFAULT}\n\n" "$TITLE"
  cd ./functions || exit
  npm install

  TITLE="<< INSTALLING PROJECT DEPENDENCIES >>"
  printf "
    ${LIGHT_BLUE}%s
    ${DEFAULT}\n\n" "$TITLE"
  cd ..
  yarn install
elif [ $1 = 'global' ]; then
  TITLE="<< INSTALLING GLOBAL DEPENDENCIES >>"
  printf "
    ${LIGHT_BLUE}%s
    ${DEFAULT}\n\n" "$TITLE"
  sudo npm install -g @angular/cli@latest typescript@latest firebase-tools@latest @compodoc/compodoc@latest @ngxs/cli@latest commitizen@latest cz-conventional-changelog@latest yarn
else
  TITLE="<< ERROR >>"
  printf "
    ${RED}%s
    ${LIGHT_RED}- wrong argument: ${1}
    ${DEFAULT}\n\n" "$TITLE"
fi
