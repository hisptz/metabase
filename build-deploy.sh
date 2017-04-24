sh build.sh
cd dist
zip -r -D metabase2.zip *
curl -X POST -u developer:DEVELOPER2016 -F file=@metabase2.zip http://41.217.202.50:9002/api/apps
