# Architecture

apify-manager is designed following SOLID principles and Clean Architecture patterns to keep your scraping codebase maintainable.

## System Diagram

[ Client Application ]
         |
         v
[ ApifyManager Facade ]
         |
         +-----------------------+
         |                       |
         v                       v
[ ApifyClient SDK ]     [ Custom Errors ]

## Key Principles

1. Single Responsibility Principle (SRP)
Each module handles a distinct concern: configuration validation, run management, or dataset retrieval.

2. Facade Pattern
Hides SDK complexity (polling status, extracting dataset IDs, paginating results) behind a unified, high-level API.

3. Fail-Fast Validation
Validates input arguments synchronously before initiating network requests to avoid wasted API consumption.