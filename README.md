#nadmozg [![Build Status](https://travis-ci.org/zefirka/nadmozg.svg?branch=master)](https://travis-ci.org/zefirka/nadmozg) [![Coverage Status](https://coveralls.io/repos/zefirka/nadmozg/badge.svg?branch=coveralls&service=github)](https://coveralls.io/github/zefirka/nadmozg?branch=coveralls)	

## Make targets
  - `start` - runs a server (if you have supervisor then it runs with node-supervisor)
  - `build` - builds package for first time
  - `static` - builds static files (js/css)
  - `docs` - build documentation
  - `test` - runs auto-testing server

## Frontend packages 
To use browser package we don't use bower anymore. Just write dependencie in NPM package.json and add name of dependency to `frontend/dependencies` array in file. It will be installed to the `public/static/lib`. 