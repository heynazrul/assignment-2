
# Assignment 2

## Introduction
This document provides detailed instructions for setting up and running assignment-2 locally. This is a Node.js application written in TypeScript.

## Prerequisites
Before you begin, ensure you have installed:
- Node.js (version 14 or later)
- npm (typically comes with Node.js)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/heynazrul/assignment-2.git
   cd assignment-2


2. **Install dependencies:**
   ```bash
   npm install
   ```

## Running the Application

### For Development

- To start the application in development mode (with auto-reload on file changes), run:
  ```bash
  npm run start:dev
  ```

### For Production

- Build the TypeScript files into JavaScript:
  ```bash
  npm run build
  ```

- Start the production server:
  ```bash
  npm run start:prod
  ```

## Other Commands

- **Linting**: To check for linting errors in the TypeScript files, run:
  ```bash
  npm run lint
  ```

- **Auto-fix Linting Errors**: To automatically fix linting errors, run:
  ```bash
  npm run lint:fix
  ```

- **Formatting**: To format your code using Prettier, run:
  ```bash
  npm run prettier
  ```

- **Auto-fix Formatting**: To automatically fix formatting issues, run:
  ```bash
  npm run prettier:fix
  ```

