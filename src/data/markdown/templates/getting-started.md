# Installation Guide

Follow these steps to set up ModernWiki on your system.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## Installation Methods

### Method 1: Clone from GitHub

```bash
# Clone the repository
git clone https://github.com/modernwiki/modernwiki.git

# Navigate to the project directory
cd modernwiki

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Method 2: Use the Template

1. Click **"Use this template"** on GitHub
2. Create your new repository
3. Clone your new repository
4. Follow the steps above

## Configuration

After installation, you can customize your wiki by editing the `config.json` file:

```json
{
  "site": {
    "name": "Your Wiki Name",
    "description": "Your wiki description"
  }
}
```

## Deployment

ModernWiki can be deployed to any static hosting provider:

### Vercel
```bash
npm run build
vercel --prod
```

### GitHub Pages
```bash
npm run build
# Push the dist folder to your gh-pages branch
```