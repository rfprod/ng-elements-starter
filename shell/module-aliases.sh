#!/bin/bash

##
# Colors.
##
source shell/colors.sh ''

##
# Module aliases.
# Contains app widget aliases.
##

# Apps (widgets)
MODULE_ALIAS_BALANCE="balance"
MODULE_ALIAS_CATALOG="catalog"
MODULE_ALIAS_ORDERS="orders"
MODULE_ALIAS_PASSPORT="passport"

MODULE_ALIAS_NAMES_WIDGET=(
  MODULE_ALIAS_BALANCE
  MODULE_ALIAS_CATALOG
  MODULE_ALIAS_ORDERS
  MODULE_ALIAS_PASSPORT
)

MODULE_ALIAS_VARS_WIDGET=(
  "$MODULE_ALIAS_BALANCE"
  "$MODULE_ALIAS_CATALOG"
  "$MODULE_ALIAS_ORDERS"
  "$MODULE_ALIAS_PASSPORT"
)

reportSupportedModuleAliasesWidgetApps() {
  local TITLE="<< MODULE ALIASES (widget apps) >>"
  printf "
    ${LIGHT_BLUE}%s ${DEFAULT}\n" "$TITLE"

  local MODULE_ALIAS_NAME
  ##
  # Prints registered module aliases.
  ##
  for MODULE_ALIAS_NAME in "${MODULE_ALIAS_NAMES_WIDGET[@]}"; do printf "
      ${DEFAULT} - ${YELLOW}%s${DEFAULT} = ${LIGHT_GREEN}${!MODULE_ALIAS_NAME}${DEFAULT}" "$MODULE_ALIAS_NAME"; done

  local INFO="Use this aliases in other module related scripts like tools/shell/lint.sh, tools/shell/test.sh etc."
  printf "\n\n${LIGHT_BLUE} %s${DEFAULT}\n\n" "$INFO"
}

##
# Supported module (apps and libs) aliases.
##
if [ "$1" = "?" ]; then
  reportSupportedModuleAliasesWidgetApps
fi

##
# Returns if module alias exists.
#
# examples:
# moduleAliasExists "somealias" && echo yes || echo no               # no
# moduleAliasExists "${MODULE_ALIAS_BALANCE}" && echo yes || echo no # yes
##
moduleAliasExists() {
  local SEARCH_VALUE=$1
  local RESULT=1
  local ALIAS
  for ALIAS in "${MODULE_ALIAS_VARS_WIDGET[@]}"; do
    if [ "$ALIAS" = "$SEARCH_VALUE" ]; then
      RESULT=0
      break
    fi
  done
  return $RESULT
}
