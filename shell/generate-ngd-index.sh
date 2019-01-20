#!/bin/bash

##
# Colors:
# DEFAULT, BLACK, DARK_GRAY, RED, LIGHT_RED, GREEN, LIGHT_GREEN, BROWN, YELLOW,
# BLUE, LIGHT_BLUE, PURPLE, LIGHT_PURPLE, CYAN, LIGHT_CYAN, LIGHT_GRAY, WHITE.
##
source shell/colors.sh

# generates dist index

printf "\n ${LIGHT_BLUE}<< GENERATING ANGULAR DEPENDENCIES GRAPH INDEX >>${DEFAULT}\n\n"

echo "<html>
  <head>
    <style>
      a {
        display: inline-block;
        padding: 5px;
        margin: 5px;
        height: auto!important;
        width: auto!important;
        border: 1px dotted #000000;
      }
      img {
        height: 150px;
        width: 150px;
      }
    </style>
  </head>
  <body>
    <h1>Angular Modules' Dependencies Graphs</h1>
    <a href='/ngd/app/dependencies.html' title='App module' target=_blank>
      <img src='/ngd/app/dependencies.svg' />
    </a>
    <a href='/ngd/app-routing/dependencies.html' title='App Routing' target=_blank>
      <img src='/ngd/app-routing/dependencies.svg' />
    </a>
    <a href='/ngd/balance/dependencies.html' title='Balance' target=_blank>
      <img src='/ngd/balance/dependencies.svg' />
    </a>
    <a href='/ngd/catalogue/dependencies.html' title='Catalogue' target=_blank>
      <img src='/ngd/catalogue/dependencies.svg' />
    </a>
    <a href='/ngd/orders/dependencies.html' title='Orders Table' target=_blank>
      <img src='/ngd/orders/dependencies.svg' />
    </a>
    <a href='/ngd/passport/dependencies.html' title='Passport' target=_blank>
      <img src='/ngd/passport/dependencies.svg' />
    </a>
  </body>
</html>" > dist/ngd/index.html
