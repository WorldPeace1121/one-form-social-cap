# ONE FORM SOCIAL CAP

## Overview

This is a DC automatic allocation project built with Quasar Framework. The project provides a modern, responsive interface for DC automatic allocation, with particular focus on social KYC authentication functionality.

## Requirements

- Node.js (v14.0.0 or higher)
- Yarn package manager (recommended) or npm
- Basic understanding of blockchain concepts

## Installation

1. Install Quasar CLI globally:

```bash
yarn global add @quasar/cli
# or
npm install -g @quasar/cli
```

2. Clone the repository:

```bash
git clone [repository-url]
cd ui
```

3. Install dependencies:

```bash
yarn
# or
npm install
```

## Development

### Start Development Server

```bash
quasar dev
```

This will start a development server with hot reload functionality, accessible at `http://localhost:9001`

### Code Quality Tools

#### Code Linting

```bash
yarn lint
# or
npm run lint
```

The project uses ESLint for code linting, configured and optimized for Vue.js and Quasar Framework.

#### Code Formatting

```bash
yarn format
# or
npm run format
```

The project is configured with Prettier to ensure consistent code formatting.

## Production

### Build Production Version

```bash
quasar build
```

This command will:

- Compile and minify code
- Generate production assets
- Create build output in the `dist` directory

## Configuration

### Quasar Framework Configuration

The project uses Quasar Framework v2. For detailed configuration options:

- View the [Quasar Configuration Guide](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js)
- Modify `quasar.config.js` to customize build settings
- Configure environment variables in `.env` file
