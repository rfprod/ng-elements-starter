#!/bin/bash

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
reportUsageErrorAndExit() {
  local TITLE="<< USAGE >>"
  printf "
    ${RED}%s\n
    ${DEFAULT} - ${YELLOW} bash shell/generate-widget-bootstrap-script.sh WIDGET_DIST_PATH ELEMENT_PROJECT_NAME HTML_ELEMENT ${DEFAULT} - generates widget (custom web element) bootstrap script
    ${DEFAULT} - ${YELLOW} bash shell/generate-widget-bootstrap-script.sh dist/ng-elements-passport ng-elements-passport app-passport-widget ${DEFAULT} - example with actual arguments" "$TITLE"

  printf "\n\n"

  exitWithError
}

##
# Delete generated bootstrap script if it exists.
##
cleanup() {
  local TITLE="<< CLEANING UP: removing generated bootstrap script if it exists >>"
  printf "
    ${LIGHT_BLUE}%s\n
    ${DEFAULT} - bootstrap script file path: ${YELLOW}%s
    ${DEFAULT}\n" "$TITLE" "$1"

  rm -rf "$1"
  sleep 1
}

##
# Generate bootstrap script.
##
generateBootstrapScript() {
  local TITLE="<< GENERATING WIDGET BOOTSTRAP SCRIPT >>"
  printf "
    ${LIGHT_BLUE}%s\n
    ${DEFAULT} - dist path: ${YELLOW}%s
    ${DEFAULT} - element project name: ${YELLOW}%s
    ${DEFAULT} - html element: ${YELLOW}%s" "$TITLE" "$1" "$2" "$3"

  local BOOTSTRAP_SCRIPT_DIST_PATH="$1"
  local ELEMENT_PROJECT_NAME="$2"
  local HTML_ELEMENT="$3"
  local DIST_INDEX_HTML_PATH="$BOOTSTRAP_SCRIPT_DIST_PATH/index.html"
  local BOOTSTRAP_SCRIPT_FILE_PATH="$BOOTSTRAP_SCRIPT_DIST_PATH/bootstrap.js"

  printf "
    ${DEFAULT} - boostrap script file path: ${YELLOW}%s
    ${DEFAULT}\n" "$BOOTSTRAP_SCRIPT_FILE_PATH"

  # remove generated boostrap script file if it exists
  cleanup "$BOOTSTRAP_SCRIPT_FILE_PATH"

  local TITLE="<< FILES FROM LATEST DIST >>"
  printf "
    ${LIGHT_BLUE}%s\n
    ${DEFAULT}\n" "$TITLE"

  # styles bundle
  local STYLES_REF
  STYLES_REF=$(find "$DIST_INDEX_HTML_PATH" -print0 | xargs -0 grep '[^"]*styles.[^"]*.css' -o)
  echo "STYLES_REF:" "$STYLES_REF"

  # runtime bundle
  local RUNTIME_REF
  RUNTIME_REF=$(find "$DIST_INDEX_HTML_PATH" -print0 | xargs -0 grep '[^"]*runtime-es2015.[^"]*.js' -o)
  echo "RUNTIME_REF:" "$RUNTIME_REF"

  # polyfills bundle
  local POLYFILLS_REF
  POLYFILLS_REF=$(find "$DIST_INDEX_HTML_PATH" -print0 | xargs -0 grep '[^"]*polyfills-es2015.[^"]*.js' -o)
  echo "POLYFILLS_REF:" "$POLYFILLS_REF"

  # scripts bundle
  local SCRIPTS_REF
  SCRIPTS_REF=$(find "$DIST_INDEX_HTML_PATH" -print0 | xargs -0 grep '[^"]*scripts.[^"]*.js' -o)
  echo "SCRIPTS_REF:" "$SCRIPTS_REF"

  # main bundle
  local MAIN_REF
  MAIN_REF=$(find "$DIST_INDEX_HTML_PATH" -print0 | xargs -0 grep '[^"]*main-es2015.[^"]*.js' -o)
  echo "MAIN_REF:" "$MAIN_REF"

  # vendor bundle
  local VENDOR_REF
  VENDOR_REF=$(find "$DIST_INDEX_HTML_PATH" -print0 | xargs -0 grep '[^"]*vendor-es2015.[^"]*.js' -o)
  echo "VENDOR_REF:" "$VENDOR_REF"

  local BOOSTRAP_SCRIPT=

  ##
  # Don't include scripts if SCRIPTS_REF is empty.
  ##
  if [ -z "$SCRIPTS_REF" ]; then
    BOOSTRAP_SCRIPT="/**
 * Script usage example:
 *
 *  <script type=\"text/javascript\">
 *      function bootstrapElement() {
 *          var body = document.getElementsByTagName(\"body\")[0];
 *          var script = document.createElement(\"script\");
 *          script.type = \"text/javascript\";
 *          script.src = \"https://ng2elements.web.app/${ELEMENT_PROJECT_NAME}/bootstrap.js\";
 *          body.append(script);
 *
 *          var el = document.getElementsByTagName('${HTML_ELEMENT}')[0];
 *          el.inputValue = '5'; // this will set an input value
 *      }
 *      document.addEventListener(\"DOMContentLoaded\", function() {
 *          console.log('document ready');
 *          bootstrapElement();
 *      });
 *  </script>
 *
 * Custom html element tag that should be added to the html document:
 *
 *  <${HTML_ELEMENT}></${HTML_ELEMENT}>
 */
(function() {
    console.warn(\"custom web element bootstrap: ${ELEMENT_PROJECT_NAME}\");

    var head = document.getElementsByTagName(\"head\")[0];
    var body = document.getElementsByTagName(\"body\")[0];

    var stylesheetLink = document.createElement(\"link\");
    stylesheetLink.rel = \"stylesheet\";
    stylesheetLink.type = \"text/css\";
    stylesheetLink.href = \"${STYLES_REF}\";

    head.append(stylesheetLink);

    var vendorScript = document.createElement(\"script\");
    vendorScript.type = \"text/javascript\";
    vendorScript.src = \"${VENDOR_REF}\";

    body.append(vendorScript);

    var runtimeScript = document.createElement(\"script\");
    runtimeScript.type = \"text/javascript\";
    runtimeScript.src = \"${RUNTIME_REF}\";

    body.append(runtimeScript);

    var polyfillsScript = document.createElement(\"script\");
    polyfillsScript.type = \"text/javascript\";
    polyfillsScript.src = \"${POLYFILLS_REF}\";

    body.append(polyfillsScript);

    var mainScript = document.createElement(\"script\");
    mainScript.type = \"text/javascript\";
    mainScript.src = \"${MAIN_REF}\";

    body.append(mainScript);
})();
"
  else
    BOOSTRAP_SCRIPT="/**
 * Script usage example:
 *
 *  <script type=\"text/javascript\">
 *      function bootstrapElement() {
 *          var body = document.getElementsByTagName(\"body\")[0];
 *          var script = document.createElement(\"script\");
 *          script.type = \"text/javascript\";
 *          script.src = \"https://ng2elements.web.app/${ELEMENT_PROJECT_NAME}/bootstrap.js\";
 *          body.append(script);
 *
 *          var el = document.getElementsByTagName('web-signers-grid-container')[0];
 *          el.docId = '5'; // this will set a document id
 *      }
 *      document.addEventListener(\"DOMContentLoaded\", function() {
 *          console.log('document ready');
 *          bootstrapElement();
 *      });
 *  </script>
 *
 * Custom html element tag that should be added to the html document:
 *
 *  <web-signers-grid-container></web-signers-grid-container>
 */
(function() {
    console.warn(\"custom web element bootstrap: ${ELEMENT_PROJECT_NAME}\");

    var head = document.getElementsByTagName(\"head\")[0];
    var body = document.getElementsByTagName(\"body\")[0];

    var stylesheetLink = document.createElement(\"link\");
    stylesheetLink.rel = \"stylesheet\";
    stylesheetLink.type = \"text/css\";
    stylesheetLink.href = \"${STYLES_REF}\";

    head.append(stylesheetLink);

    var vendorScript = document.createElement(\"script\");
    vendorScript.type = \"text/javascript\";
    vendorScript.src = \"${VENDOR_REF}\";

    body.append(vendorScript);

    var runtimeScript = document.createElement(\"script\");
    runtimeScript.type = \"text/javascript\";
    runtimeScript.src = \"${RUNTIME_REF}\";

    body.append(runtimeScript);

    var polyfillsScript = document.createElement(\"script\");
    polyfillsScript.type = \"text/javascript\";
    polyfillsScript.src = \"${POLYFILLS_REF}\";

    body.append(polyfillsScript);

    var scriptsScript = document.createElement(\"script\");
    scriptsScript.type = \"text/javascript\";
    scriptsScript.src = \"${SCRIPTS_REF}\";

    body.append(scriptsScript);

    var mainScript = document.createElement(\"script\");
    mainScript.type = \"text/javascript\";
    mainScript.src = \"${MAIN_REF}\";

    body.append(mainScript);
})();
"
  fi

  # resulting bootstrap script
  echo "$BOOSTRAP_SCRIPT" >"$BOOTSTRAP_SCRIPT_FILE_PATH"

  local TITLE="<< GENERATED BOOTSTRAP SCRIPT >>"
  printf "
    ${GREEN}%s
    ${DEFAULT}\n\n" "$TITLE"

  cat "$BOOTSTRAP_SCRIPT_FILE_PATH"
}

##
# Checks dist existence and proceeds.
##
checkDistExistenceAndProceed() {
  local TITLE="<< CHECKING DIST EXISTENCE >>"
  printf "
    ${LIGHT_BLUE}%s\n
    ${DEFAULT} - dist path: ${YELLOW}%s
    ${DEFAULT} - element project name: ${YELLOW}%s
    ${DEFAULT} - html element: ${YELLOW}%s
    ${DEFAULT}\n" "$TITLE" "$1" "$2" "$3"

  if [ -d "$1" ]; then
    generateBootstrapScript "$1" "$2" "$3"
  else
    local TITLE="<< DIST DOES NOT EXIST >>"
    printf "
        ${RED}%s\n
        ${LIGHT_RED} - dist path: ${YELLOW}%s
        ${DEFAULT}\n" "$TITLE" "$1"
  fi
}

##
# Widget bootstrap script generation control flow.
##
if [ $# -lt 3 ]; then
  reportUsageErrorAndExit
else
  checkDistExistenceAndProceed "$1" "$2" "$3"
fi
