#!/usr/bin/env sh

set -ex

env=$(ls -t /usr/share/nginx/html/assets/env*.js | head -n1)
envsubst < "$env" > ./env_temp
cp ./env_temp "$env"
rm ./env_temp