# GitHub Pages Deployment Guide

This guide explains how to deploy your CryptoGuessr app to GitHub Pages using GitHub Actions.

## Prerequisites

1. Your code is pushed to a GitHub repository
2. You have admin access to the repository

## Setup Steps

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. This will allow the workflow to deploy automatically

### 2. Repository Settings

Make sure your repository has the following settings:

- **Settings** → **Actions** → **General** → **Actions permissions**: Select "Allow all actions and reusable workflows"
- **Settings** → **Pages** → **Build and deployment**: Source should be "GitHub Actions"

### 3. Branch Configuration

The workflow is configured to deploy from the `main` or `master` branch. Make sure your main branch is named correctly.

## How It Works

### Workflow Triggers

The deployment workflow (`/.github/workflows/deploy.yml`) runs on:

- **Push** to `main` or `master` branch
- **Pull Request** to `main` or `master` branch (builds but doesn't deploy)

### Build Process

1. **Checkout**: Clones your repository
2. **Setup Node.js**: Installs Node.js 18 with npm caching
3. **Install Dependencies**: Runs `npm ci` in the `front-end` directory
4. **Run Tests**: Executes `npm run test` to ensure code quality
5. **Build**: Runs `npm run build` to create production build
6. **Upload**: Uploads the `dist` folder as a Pages artifact

### Deployment

- Only pushes to `main` or `master` trigger actual deployment
- Pull requests only build and test, but don't deploy
- Uses GitHub's new Pages deployment system

## Accessing Your App

Once deployed, your app will be available at:

```
https://[your-username].github.io/cryptoguessr/
```

## Troubleshooting

### Common Issues

1. **Build Fails**: Check the Actions tab for error logs
2. **404 Errors**: Ensure the base path in `vite.config.ts` matches your repository name
3. **Permission Errors**: Verify GitHub Pages and Actions permissions are enabled

### Manual Deployment

If you need to trigger a manual deployment:

1. Go to **Actions** tab in your repository
2. Select the "Deploy to GitHub Pages" workflow
3. Click **Run workflow**
4. Select your branch and click **Run workflow**

## Environment Variables

The workflow uses these environment variables:

- `NODE_ENV`: Set to 'production' during build
- Repository name: Used for the base path configuration

## Security

The workflow uses:

- `contents: read` - Read repository contents
- `pages: write` - Deploy to GitHub Pages
- `id-token: write` - GitHub token for authentication

## Monitoring

- Check the **Actions** tab to monitor build and deployment status
- View deployment logs for debugging
- Monitor GitHub Pages settings for any configuration issues
