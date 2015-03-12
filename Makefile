BIN = ./node_modules/.bin

.PHONY: bootstrap start test;

SRC = $(shell find ./lib ./index.js ./test -type f -name '*.js')

test: lint
	@$(BIN)/karma start --single-run

test-watch: lint
	@$(BIN)/karma start

lint: bootstrap
	@$(BIN)/jscs --esprima=esprima-fb $(SRC);
	@$(BIN)/jsxhint $(SRC);

build: lint
	@mkdir -p dist
	@$(BIN)/browserify --require ./index.js --standalone ReactPageObject > dist/react-page-object.js
	@cat dist/react-page-object.js | $(BIN)/uglifyjs > dist/react-page-object.min.js

release: test
	@inc=$(inc) sh build/release.sh

bootstrap: package.json
	@npm install;