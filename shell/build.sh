#!/bin/bash

##
# Usage:
# > bash src/build.sh - build all apps for arbitrary nodejs + express production
# > bash src/build.sh firebase - build all apps for firebase production
##

##
# Colors definitions.
##
source shell/colors.sh

##
# Builds all dists.
##
build() {
  printf "\n ${LIGHT_BLUE}<< BUILDING ALL APPLICATIONS DEFINED IN angular.json >>${DEFAULT}\n\n"
  npx npm-run-all -s build-app-prod build-passport-prod build-balance-prod build-catalogue-prod build-orders-prod
}

##
# Builds all dists for firebase setup.
##
buildFirebase() {
  printf "\n ${LIGHT_BLUE}<< BUILDING ALL APPLICATIONS DEFINED IN angular.json FOR FIREBASE SETUP >>${DEFAULT}\n\n"
  npx npm-run-all -s build-app-prod-firebase build-passport-prod build-balance-prod build-catalogue-prod build-orders-prod
}

##
# Generates client documentation with compodoc.
##
generateClientDocumentation() {
  npm run compodoc-generate-and-report-to-dist
}

##
# Builds applications defined in angular.json using Angular CLI.
##

if [ $# -ne 1 ]; then
  build
elif [ $1 = 'firebase' ]; then
  buildFirebase
else
  build
fi

# generate documentation
generateClientDocumentation
