install:
	npm install

publish:
	npm publish --dry-run

link:
	npm link

lint:
	npm run lint

test:
	npm test

.PHONY: install publish lint test link
