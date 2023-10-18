#!/bin/bash

sudo chown node node_modules dist

yarn install
sudo npm i -g @nestjs/cli