.PHONY: help dev build preview clean reset info test lint typecheck

help: ## Show available commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

dev: ## Start development server
	bun run dev

dev:server: ## Start server only
	bun run dev:server

dev:db: ## Start with database studio
	bun run dev:db

dev:clean: ## Clean and start development
	bun run dev:clean

build: ## Build for production
	bun run build

build:static: ## Build for static hosting
	bun run build:static

preview: ## Preview production build
	bun run preview

preview:static: ## Preview static build
	bun run preview:static

clean: ## Clean everything
	bun run clean

clean:cache: ## Clean cache only
	bun run clean:cache

reset: ## Reset and reinstall
	bun run reset

info: ## Show system info
	bun run info

typecheck: ## Check TypeScript types
	bun run typecheck

lint: ## Lint code
	bun run lint

test: ## Run tests
	bun run test

db:push: ## Push database schema
	bun run db:push

db:studio: ## Open database studio
	bun run db:studio

deploy:vercel: ## Deploy to Vercel
	bun run deploy:vercel

deploy:gh-pages: ## Deploy to GitHub Pages
	bun run deploy:gh-pages

install: ## Install dependencies
	bun install

reinstall: ## Reinstall dependencies
	bun install --force

update: ## Update dependencies
	bun update
