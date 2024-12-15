#!/bin/bash
npx ng build --deploy-url static/ --configuration staging
mv dist/ng-blog/browser/static/* dist/ng-blog/browser/
rm -r dist/ng-blog/browser/static/

if [ -z "$API_PROJECT_ROOT" ]; then
  API_PROJECT_ROOT='../blog-api/mysite'
fi

rm -r "$API_PROJECT_ROOT/public/static/dist/"
cp -r dist/ "$API_PROJECT_ROOT/public/static/"
