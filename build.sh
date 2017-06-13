#!/usr/bin/env bash
ng build --prod --aot
mv dist/assets/manifest.webapp dist/
