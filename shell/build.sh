#!/bin/bash

##
# Colors:
# DEFAULT, BLACK, DARK_GRAY, RED, LIGHT_RED, GREEN, LIGHT_GREEN, BROWN, YELLOW,
# BLUE, LIGHT_BLUE, PURPLE, LIGHT_PURPLE, CYAN, LIGHT_CYAN, LIGHT_GRAY, WHITE.
##
source shell/colors.sh

# builds all dists
build () {
  printf "\n ${LIGHT_BLUE}<< BUILDING ALL APPLICATIONS DEFINED IN angular.json >>${DEFAULT}\n\n"
  npx npm-run-all -s build-app-prod build-passport-prod build-balance-prod build-catalogue-prod build-orders-prod build-dependencies-graph
}

# builds all dists for firebase setup
buildFirebase () {
  printf "\n ${LIGHT_BLUE}<< BUILDING ALL APPLICATIONS DEFINED IN angular.json FOR FIREBASE SETUP >>${DEFAULT}\n\n"
  npx npm-run-all -s build-app-prod-firebase build-passport-prod build-balance-prod build-catalogue-prod build-orders-prod build-dependencies-graph
}

# builds dependency injection graphs
buildDependencyInjectionGraphs () {
  npx npm-run-all build-dependencies-graph-app build-dependencies-graph-app-routing build-dependencies-graph-balance build-dependencies-graph-catalogue build-dependencies-graph-orders build-dependencies-graph-passport generate-ngd-index
}

##
# Builds applications defined in angular.json using Angular CLI.
##

if [ $# -ne 1 ]; then
	build
elif [ $1 = 'firebase' ]; then
  buildFirebase
elif [ $1 = 'ngd' ]; then
  buildDependencyInjectionGraphs
else
  # do the same as if number of arguments does not equal 1
  build
fi
