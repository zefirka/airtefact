NPM_REPO=https://registry.npmjs.org
NPM_PACKAGE=package.json
NPM_FLAGS=dev

ifeq ($(ENV),prod)
	NPM_FLAGS=--production
endif

ifeq ($(ENV),dev)
	NPM_FLAGS=--dev
endif

static: 
	gulp build:static

test:
	npm test
