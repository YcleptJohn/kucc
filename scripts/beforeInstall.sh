#!/usr/bin/env bash
set -e

# update instance
yum -y update

curl --silent --location https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash -

. ~/.bashrc
nvm install 8.3.0

npm i -g gulp-cli gulp