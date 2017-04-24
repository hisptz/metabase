#!/usr/bin/env bash
ng build --prod
mv dist/assets/manifest.webapp dist/
cp -r dist/* /opt/dhis/config/apps/metabase2/
