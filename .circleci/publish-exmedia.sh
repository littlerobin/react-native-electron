#!/usr/bin/env bash

export NVM_DIR="$HOME/.nvm"

mv .nvmrc .nvmrc.bak \
    && curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && mv .nvmrc.bak .nvmrc \
    && nvm install \
    && npm install -g npm \
    && node -v \
    && ls -a \
    && yarn \
    && node_modules/lerna/bin/lerna.js bootstrap \
    && node_modules/lerna/bin/lerna.js run build --scope equivalen-redux-persist-electron-storage \
    && node_modules/lerna/bin/lerna.js run build --scope equivalen-simple-radio-button \
    && CI=false node_modules/lerna/bin/lerna.js run build --scope exmedia \
    && node_modules/lerna/bin/lerna.js run test:flow --scope exmedia \
    && node_modules/lerna/bin/lerna.js run publish:linux --scope exmedia
