.PHONY: fix check

check:
	npm run typecheck
	npm run lint:check
	npm run format:check

fix:
	npm run lint
	npm run format