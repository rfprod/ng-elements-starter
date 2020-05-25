#!/bin/bash

##
# Usage:
# > bash src/build.sh - build all apps for arbitrary nodejs + express production
# > bash src/build.sh firebase - build all apps for firebase production
##

##
# Colors.
##
source shell/colors.sh ''

##
# Exits with error.
##
exitWithError() {
  exit 1
}

##
# Reports usage error and exits.
##
reportUsage() {
  local TITLE="<< USAGE >>"
  printf "
    ${LIGHT_BLUE}%s\n
    ${DEFAULT} - ${YELLOW} bash shell/build.sh ?${DEFAULT} (print install.sh usage)
    ${DEFAULT} - ${YELLOW} bash shell/build.sh express${DEFAULT} (build all apps for arbitrary nodejs + express production)
    ${DEFAULT} - ${YELLOW} bash shell/build.sh firebase${DEFAULT} (build all apps for firebase production)
    ${DEFAULT}\n\n" "$TITLE"
}

##
# Generates client documentation with compodoc.
##
generateClientDocumentation() {
  npm run compodoc:generate:report-to-dist
}

##
# Generates widget usage examples.
##
generateWidgetUsageExamplesFirebase() {
  npm run generate:widget-example:all
}

##
# Generates widget usage examples.
##
generateWidgetUsageExamplesLocal() {
  npm run generate:widget-example:all:local
}

##
# Builds all dists.
##
build() {
  local TITLE="<< BUILDING ALL APPLICATIONS DEFINED IN angular.json [EXPRESS SETUP] >>"
  printf "
    ${LIGHT_BLUE}%s
    ${DEFAULT}\n\n" "$TITLE"
  npx npm-run-all -s build:app:prod build:passport:prod build:balance:prod build:catalog:prod build:orders:prod

  generateWidgetUsageExamplesLocal

  generateClientDocumentation
}

##
# Builds all dists for firebase setup.
##
buildFirebase() {
  local TITLE="<< BUILDING ALL APPLICATIONS DEFINED IN angular.json [FIREBASE SETUP] >>"
  printf "
    ${LIGHT_BLUE}%s
    ${DEFAULT}\n\n" "$TITLE"
  npx npm-run-all -s build:app:prod:firebase build:passport:prod build:balance:prod build:catalog:prod build:orders:prod

  generateWidgetUsageExamplesFirebase

  generateClientDocumentation
}

##
# Builds applications defined in angular.json using Angular CLI.
##

if [ $# -ne 1 ] || [ "$1" = "?" ]; then
  reportUsage
elif [ "$1" = "express" ]; then
  build
elif [ "$1" = "firebase" ]; then
  buildFirebase
else
  TITLE="<< ERROR >>"
  printf "
    ${RED}%s
    ${LIGHT_RED}- wrong argument: ${1}
    ${DEFAULT}\n\n" "$TITLE"
  reportUsage
  exitWithError
fi
