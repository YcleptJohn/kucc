#!/usr/bin/env bash
export NODE_ENV="production"

cd ~/node
curl --silent --location https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash -
. ~/.bashrc
nvm install
npm start