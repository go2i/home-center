#!/usr/bin/env bash
real_path=$(cd $(dirname $0) && pwd)
cd ${real_path}

cd ../playground
npm run build
cd -

rm -rf web/*
cp -r ../playground/index.html web/
cp -r ../playground/dist web/

node index.js