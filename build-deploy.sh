sh build.sh
cd dist
zip -r -D metabasev2.zip .
curl -X POST -u system:System123 -F file=@metabasev2.zip https://play.dhis2.org/demo/api/apps
