#!/usr/bin/env bash
git submodule init
git submodule update
rm -rf node_modules
npm install --save-dev @angular/cli@latest
npm install
