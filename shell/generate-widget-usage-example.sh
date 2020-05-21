#!/bin/bash

##
# Colors.
##
source shell/colors.sh ''

##
# Project aliases.
##
source shell/module-aliases.sh ''

##
# Exits with error.
##
exitWithError() {
  exit 1
}

##
# Reports usage error and exits.
##
reportUsageErrorAndExit() {
  local TITLE="<< USAGE >>"
  printf "
    ${RED}%s\n
    ${DEFAULT} - ${YELLOW} bash tools/shell/generate-widget-usage-example.sh MODULE_ALIAS" "$TITLE"

  reportSupportedModuleAliasesWidgetApps

  printf "\n\n"

  exitWithError
}

##
# Delete generated directory if it exists.
##
cleanup() {
  local TITLE="<< CLEANING UP: removing generated usage example if it exists >>"
  printf "
    ${LIGHT_BLUE}%s
    ${DEFAULT} - dist path: ${YELLOW}${1}
    ${DEFAULT}\n" "$TITLE"

  rm -rf "$1"/usage-example
  sleep 1
}

##
# Generate usage.
##
generateUsage() {
  local TITLE="<< GENERATING WIDGET USAGE EXAMPLE >>"
  printf "
    ${LIGHT_BLUE}%s
    ${DEFAULT} - module alias: ${YELLOW}${1}" "$TITLE"

  local APP_NAME="ng2elements"

  local MODULE_ALIAS=$1

  local MODULE_NAME
  MODULE_NAME="ng-elements-${MODULE_ALIAS}"

  local MODULE_DIST_PATH
  MODULE_DIST_PATH="dist/${MODULE_NAME}"

  WIDGET_CUSTOM_EL_NAME="app-$MODULE_ALIAS-widget"

  printf "
    ${DEFAULT} - module name: ${YELLOW}%s
    ${DEFAULT} - module dist path: ${YELLOW}%s
    ${DEFAULT} - widget custom element name: ${YELLOW}%s
    ${DEFAULT}\n\n" "$MODULE_NAME" "$MODULE_DIST_PATH" "$WIDGET_CUSTOM_EL_NAME"

  # remove generated usage example if it exists
  cleanup "$MODULE_DIST_PATH"

  local TITLE="<< FILES FROM LATEST DIST >>"
  printf "
  ${LIGHT_BLUE}%s
  ${DEFAULT}\n\n" "$TITLE"

  # styles bundle
  STYLES_REF=$(find "$MODULE_DIST_PATH" -type f -name index.html -print0 | xargs -0 grep 'styles.[^"]*.css' -o)
  echo "STYLES_REF:" "$STYLES_REF"

  # widget input, and event listener
  HOST_SCRIPTS="
    <script>
      function defineVarsAndAddEventListeners() {
        /**
          * Widget element reference.
          */
        const widget = document.getElementsByTagName(\"${WIDGET_CUSTOM_EL_NAME}\")[0];
        /**
          * User token change handler
          */
        function userTokenChangeHandler(event) {
          console.log(\"userTokenChangeHandler, event\", event);
          // TODO: implement this method
        }
        /**
          * Widget user token change event listener
          */
        widget.addEventListener(\"userTokenChange\", userTokenChangeHandler);
      }
      document.addEventListener(\"DOMContentLoaded\", function() {
        console.log('document ready');
        defineVarsAndAddEventListeners();
      });
    </script>
  "

  # widget
  WIDGET="<${WIDGET_CUSTOM_EL_NAME}></${WIDGET_CUSTOM_EL_NAME}>"

  # runtime bundle
  RUNTIME_REF=$(find "$MODULE_DIST_PATH"/index.html -print0 | xargs -0 grep 'runtime-es2015.[^"]*.js' -o)
  echo "RUNTIME_REF:" "$RUNTIME_REF"

  # polyfills bundle
  POLYFILLS_REF=$(find "$MODULE_DIST_PATH"/index.html -print0 | xargs -0 grep 'polyfills-es2015.[^"]*.js' -o)
  echo "POLYFILLS_REF:" "$POLYFILLS_REF"

  # scripts bundle
  SCRIPTS_REF=$(find "$MODULE_DIST_PATH"/index.html -print0 | xargs -0 grep 'scripts.[^"]*.js' -o)
  echo "SCRIPTS_REF:" "$SCRIPTS_REF"

  # main bundle
  MAIN_REF=$(find "$MODULE_DIST_PATH"/index.html -print0 | xargs -0 grep 'main-es2015.[^"]*.js' -o)
  echo "MAIN_REF:" "$MAIN_REF"

  # vendor bundle
  VENDOR_REF=$(find "$MODULE_DIST_PATH"/index.html -print0 | xargs -0 grep 'vendor-es2015.[^"]*.js' -o)
  echo "VENDOR_REF:" "$VENDOR_REF"

  TITLE="<< GENERATING RESULTING EXAMPLE USAGE FILE >>"
  printf "
  ${LIGHT_BLUE} %s ${DEFAULT}\n\n" "$TITLE"

  # create directory
  mkdir "$MODULE_DIST_PATH"/usage-example

  INDEX_HTML=

  ##
  # Don't include scripts if SCRIPTS_REF is empty.
  ##
  if [ -z "$SCRIPTS_REF" ]; then
    INDEX_HTML="<html>
      <body>
        <head>
          <link rel=\"stylesheet\" href=\"https://${APP_NAME}.firebaseapp.com/${MODULE_NAME}/${STYLES_REF}\">
          ${HOST_SCRIPTS}
        </head>
        ${WIDGET}
        <script type=\"text/javascript\" src=\"https://${APP_NAME}.firebaseapp.com/${MODULE_NAME}/${VENDOR_REF}\"></script>
        <script type=\"text/javascript\" src=\"https://${APP_NAME}.firebaseapp.com/${MODULE_NAME}/${RUNTIME_REF}\"></script>
        <script type=\"text/javascript\" src=\"https://${APP_NAME}.firebaseapp.com/${MODULE_NAME}/${POLYFILLS_REF}\"></script>
        <script type=\"text/javascript\" src=\"https://${APP_NAME}.firebaseapp.com/${MODULE_NAME}/${MAIN_REF}\"></script>
      </body>
    </html>"
  else
    INDEX_HTML="<html>
      <body>
        <head>
          <link rel=\"stylesheet\" href=\"https://${APP_NAME}.firebaseapp.com/${MODULE_NAME}/${STYLES_REF}\">
          ${HOST_SCRIPTS}
        </head>
        ${WIDGET}
        <script type=\"text/javascript\" src=\"https://${APP_NAME}.firebaseapp.com/${MODULE_NAME}/${VENDOR_REF}\"></script>
        <script type=\"text/javascript\" src=\"https://${APP_NAME}.firebaseapp.com/${MODULE_NAME}/${RUNTIME_REF}\"></script>
        <script type=\"text/javascript\" src=\"https://${APP_NAME}.firebaseapp.com/${MODULE_NAME}/${POLYFILLS_REF}\"></script>
        <script type=\"text/javascript\" src=\"https://${APP_NAME}.firebaseapp.com/${MODULE_NAME}/${SCRIPTS_REF}\"></script>
        <script type=\"text/javascript\" src=\"https://${APP_NAME}.firebaseapp.com/${MODULE_NAME}/${MAIN_REF}\"></script>
      </body>
    </html>"
  fi

  # resultimg usage example
  echo "$INDEX_HTML" >"$MODULE_DIST_PATH"/usage-example/index.html

  TITLE="<< GENERATED RESULTING EXAMPLE USAGE FILE >>"
  printf "
  ${GREEN} %s ${DEFAULT}\n\n" "$TITLE"

  cat "$MODULE_DIST_PATH"/usage-example/index.html
}

##
# Check module alias and proceed.
##
checkModuleAliasAndProceed() {
  local TITLE="<< CHECKING MODULE ALIAS EXISTENCE >>"
  printf "
    ${LIGHT_BLUE}%s
    ${DEFAULT} - module alias: ${YELLOW}${1}
    ${DEFAULT}\n" "$TITLE"

  local ALIAS_EXISTS=
  moduleAliasExists "$1" && ALIAS_EXISTS=1 || ALIAS_EXISTS=0

  if [ "$ALIAS_EXISTS" = 1 ]; then
    generateUsage "$1"
  else
    local TITLE="<< MODULE ALIAS DOES NOT EXIST >>"
    printf "
    ${RED}%s
    ${LIGHT_RED} - module alias: ${YELLOW}${1}
    ${DEFAULT}\n" "$TITLE"
  fi
}

##
# Widget usage example generation control flow.
##
if [ $# -lt 1 ]; then
  reportUsageErrorAndExit
else
  checkModuleAliasAndProceed "$1"
fi
