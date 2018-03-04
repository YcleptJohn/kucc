#!/usr/bin/env bash
set -e

cd ~/node
curl --silent --location https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash -
. ~/.bashrc
nvm install
npm install

echo "export NODE_ENV=production"

# add node to startup
hasRc=`grep "su -l $USER" /etc/rc.d/rc.local | cat`
if [ -z "$hasRc" ]; then
    sudo sh -c "echo 'su -l $USER -c \"cd ~/node;sh ./run.sh\"' >> /etc/rc.d/rc.local"
fi