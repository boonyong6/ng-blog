#!/bin/bash
echo '=> Building Angular app...'
npx ng build --deploy-url static/ --configuration staging
echo '=> End build.'
echo

echo '=> Reorganizing static files according to Django format...'
mv ./dist/ng-blog/browser/static/* ./dist/ng-blog/browser/
rm -r ./dist/ng-blog/browser/static/
echo '=> End reorganize.'
echo

if [ -z "$API_PROJECT_ROOT" ]; then
  echo '=> Setting default value for API_PROJECT_ROOT...'
  API_PROJECT_ROOT='../blog-api/mysite'
  echo '=> End set.'
  echo
fi

echo '=> Removing any existing build artifacts...'
rm -r "$API_PROJECT_ROOT/public/static/dist/"
echo '=> End remove.'
echo

echo '=> Creating directories for build artifacts if not exist...'
mkdir -p "$API_PROJECT_ROOT/public/static/"
echo '=> End create.'
echo

echo '=> Copying build artifacts...'
cp -r ./dist "$API_PROJECT_ROOT/public/static/"
echo '=> End copy.'
echo
