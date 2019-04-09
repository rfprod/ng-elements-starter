#!/bin/bash

##
# Colors:
# DEFAULT, BLACK, DARK_GRAY, RED, LIGHT_RED, GREEN, LIGHT_GREEN, BROWN, YELLOW,
# BLUE, LIGHT_BLUE, PURPLE, LIGHT_PURPLE, CYAN, LIGHT_CYAN, LIGHT_GRAY, WHITE.
##
source shell/colors.sh

##
# Installs dependencies in project root folder as well as in /functions if no arguments are provided.
# Installs global dependencies with sudo if first argument equals 'global'.
##

if [ $# -ne 1 ]; then
	printf "\n ${LIGHT_BLUE}<< INSTALLING FIREBASE FUNCTIONS DEPENDENCIES >>${DEFAULT}\n\n"
  cd ./functions
  npm install

  printf "\n ${LIGHT_BLUE}<< INSTALLING PROJECT DEPENDENCIES >>${DEFAULT}\n\n"
  cd ..
  npm install
elif [ $1 = 'global' ]; then
  printf "\n ${LIGHT_BLUE}<< INSTALLING GLOBAL DEPENDENCIES >>${DEFAULT}\n\n"
  sudo npm install -g @angular/cli@latest typescript@latest firebase-tools@latest @compodoc/compodoc@latest @datorama/akita
else
  printf "\n ${LIGHT_RED}<< ERROR: wrong argument: ${1} >>${DEFAULT}\n\n"
fi
