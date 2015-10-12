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

COVERAGE_REPORT = ./coverage/lcov.info
COVERALLS = ./node_modules/coveralls/bin/coveralls.js

coveralls:
	cat $(COVERAGE_REPORT) | $(COVERALLS)

html-cov-report: 
	istanbul report html

test:
	npm test

release:
	npm install
	gulp build
	npm test

build:
	npm install
	gulp build

static:
	gulp build:static


run:
	$(NODE) node/index.js

debug:
	$(NODE) --debug node/index.js

docs:
	gulp docs