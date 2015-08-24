NPM_REPO=https://registry.npmjs.org
NPM_PACKAGE=package.json
NPM_FLAGS=dev

ifeq ($(ENV),prod)
  NPM_FLAGS=--production
endif

ifeq ($(ENV),dev)
  NPM_FLAGS=--dev
endif

SUPERVISOR=$(shell supervisor 2>/dev/null)

ifdef SystemRoot
   NODE = "C:\Program Files\nodejs\node.exe"
else
   NODE = node
endif

ifdef SUPERVISOR
  NODE = supervisor
endif

release:
  npm install
<<<<<<< HEAD
  bower install
  gulp build
  npm test | ./tasks/release-js


build:
  npm install
  gulp build
  
static:
  gulp build:static

test:
  npm test

run:
  $(NODE) node/index.js
