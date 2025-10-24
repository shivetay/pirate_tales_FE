# Biome GitHub Check Setup Guide

## Overview

This guide will walk you through setting up a Biome GitHub check to automatically lint and format your code on every pull request and push to your repository.

## Prerequisites

- A GitHub repository
- GitHub Actions enabled for your repository
- Basic understanding of GitHub Actions workflows

## Step 1: Create the GitHub Actions Workflow File

1. Navigate to your repository on GitHub
2. Go to the `.github/workflows/` directory in your repository
3. If the `.github/workflows/` directory doesn't exist, create it
4. Create a new file named `biome-check.yml` (or any name ending in `.yml`)

## Step 2: Configure the Workflow

The workflow file should contain the following structure:

### Basic Workflow Configuration

```yaml
name: Biome Check

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

permissions:
  contents: read
  pull-requests: write

jobs:
  biome-check:
    name: Biome Check
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run Biome check
        run: npx @biomejs/biome check

      - name: Run Biome format check
        run: npx @biomejs/biome format --check
```

### Job Configuration

- **Job Name**: Create a job with a clear name like "Biome Check"
- **Runner**: Use `ubuntu-latest` for the GitHub-hosted runner
- **Steps**: Define the steps to run Biome

## Step 3: Workflow Steps Breakdown

### Step 1: Checkout Code

```yaml
- name: Checkout code
  uses: actions/checkout@v4
  with:
    fetch-depth: 0 # Fetch all history for better analysis
```

- Use the `actions/checkout@v4` action to checkout your repository code
- This step is required to access your source code

### Step 2: Setup Node.js

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: "20"
    cache: "npm"
    cache-dependency-path: "package-lock.json"
```

- Use `actions/setup-node@v4` action
- Specify the Node.js version (recommend using the latest LTS version)
- Configure npm cache for faster installs

### Step 3: Install Dependencies

```yaml
- name: Install dependencies
  run: npm ci
```

```yaml
# Alternative for pnpm
- name: Install dependencies
  run: pnpm install --frozen-lockfile
```

- Run `npm ci` or `pnpm install` to install project dependencies
- This ensures Biome is available in the project

### Step 4: Run Biome Check

```yaml
- name: Run Biome check
  run: npx @biomejs/biome check .
```

```yaml
# Alternative with specific files
- name: Run Biome check
  run: npx @biomejs/biome check src/
```

- Execute `npx @biomejs/biome check` to run linting and formatting checks
- This will check your code against Biome's rules
- The check will fail if any issues are found

### Step 5: Run Biome Format Check (Optional)

```yaml
- name: Run Biome format check
  run: npx @biomejs/biome format --check .
```

- Execute `npx @biomejs/biome format --check` to verify code formatting
- This ensures code is properly formatted according to Biome's rules

## Step 4: Advanced Configuration Options

### Custom Biome Configuration

```json
{
  "$schema": "https://biomejs.dev/schemas/1.4.1/schema.json",
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "files": {
    "ignoreUnknown": false,
    "ignore": ["node_modules/**", "dist/**", "build/**"]
  },
  "formatter": {
    "enabled": true,
    "formatWithErrors": false,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "correctness": {
        "noUnusedVariables": "error"
      },
      "style": {
        "noNonNullAssertion": "warn"
      }
    }
  },
  "organizeImports": {
    "enabled": true
  }
}
```

- If you have a custom `biome.json` configuration file, it will be automatically used
- You can specify custom rules, ignore patterns, and other settings in this file

### File Filtering

```yaml
on:
  push:
    branches: [main]
    paths:
      - "src/**"
      - "*.ts"
      - "*.tsx"
      - "*.js"
      - "*.jsx"
    paths-ignore:
      - "docs/**"
      - "*.md"
  pull_request:
    branches: [main]
    paths:
      - "src/**"
      - "*.ts"
      - "*.tsx"
      - "*.js"
      - "*.jsx"
```

- Use `paths` and `paths-ignore` to control which files are checked
- This can improve performance by only checking relevant files

### Caching

```yaml
- name: Cache node modules
  uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-

- name: Cache Biome
  uses: actions/cache@v3
  with:
    path: ~/.cache/biome
    key: ${{ runner.os }}-biome-${{ hashFiles('**/biome.json') }}
    restore-keys: |
      ${{ runner.os }}-biome-
```

- Add caching for node_modules to speed up subsequent runs
- Use `actions/cache@v3` to cache dependencies

### Multiple Jobs

```yaml
jobs:
  lint:
    name: Lint Check
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - name: Install dependencies
        run: npm ci
      - name: Run Biome lint
        run: npx @biomejs/biome lint .

  format:
    name: Format Check
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - name: Install dependencies
        run: npm ci
      - name: Run Biome format check
        run: npx @biomejs/biome format --check .
```

- Create separate jobs for different checks (linting, formatting, type checking)
- This provides more granular feedback

## Step 5: Workflow Triggers

### Recommended Triggers

- **Push to main branch**: Run on every push to the main branch
- **Pull requests**: Run on every pull request
- **Pull request comments**: Run when specific comments are added

### Advanced Triggers

```yaml
# Schedule trigger
on:
  schedule:
    - cron: '0 2 * * *'  # Run daily at 2 AM UTC

# Manual trigger
on:
  workflow_dispatch:
    inputs:
      check_all_files:
        description: 'Check all files (not just changed ones)'
        required: false
        default: 'false'
        type: boolean

# Specific branches
on:
  push:
    branches:
      - main
      - develop
      - 'feature/*'
  pull_request:
    branches:
      - main
      - develop
```

- **Schedule**: Run on a schedule (e.g., daily)
- **Workflow dispatch**: Allow manual triggering
- **Specific branches**: Only run on certain branches

## Step 6: Status Checks and Branch Protection

### Setting Up Status Checks

1. Go to your repository settings
2. Navigate to "Branches" section
3. Add a branch protection rule for your main branch
4. Require status checks to pass before merging
5. Select your Biome workflow as a required check

### Benefits of Status Checks

- Prevents merging code with linting/formatting issues
- Ensures code quality standards are maintained
- Provides immediate feedback to developers

## Step 7: Customizing the Workflow

### Adding More Checks

```yaml
# TypeScript type checking
- name: TypeScript check
  run: npx tsc --noEmit

# Security vulnerability scanning
- name: Security audit
  run: npm audit --audit-level=moderate

# Test running
- name: Run tests
  run: npm test

# Build verification
- name: Build project
  run: npm run build

# ESLint (if using alongside Biome)
- name: ESLint check
  run: npx eslint src/ --ext .ts,.tsx
```

- Include TypeScript type checking
- Add security vulnerability scanning
- Include test running
- Add build verification

### Performance Optimization

```yaml
# Matrix build for multiple Node.js versions
strategy:
  matrix:
    node-version: [18, 20, 21]

# Check only changed files
- name: Get changed files
  id: changed-files
  uses: tj-actions/changed-files@v40
  with:
    files: |
      src/**
      *.ts
      *.tsx
      *.js
      *.jsx

- name: Run Biome on changed files
  if: steps.changed-files.outputs.any_changed == 'true'
  run: npx @biomejs/biome check ${{ steps.changed-files.outputs.all_changed_files }}
```

- Use `paths` to only check changed files
- Implement caching strategies
- Use matrix builds for multiple Node.js versions

### Notifications

```yaml
# Slack notification on failure
- name: Notify Slack on failure
  if: failure()
  uses: 8398a7/action-slack@v3
  with:
    status: failure
    text: 'Biome check failed in ${{ github.repository }}'
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}

# Status badge for README
![Biome Check](https://github.com/username/repository/workflows/Biome%20Check/badge.svg)
```

- Configure Slack notifications for failures
- Set up email notifications
- Add status badges to your README

## Step 8: Troubleshooting Common Issues

### Common Problems

- **Permission errors**: Ensure the workflow has necessary permissions
- **Node version issues**: Use a specific Node.js version
- **Cache issues**: Clear caches if builds are inconsistent
- **Path issues**: Verify file paths in your workflow

### Debugging Tips

```yaml
# Debug step
- name: Debug information
  run: |
    echo "Node version: $(node --version)"
    echo "NPM version: $(npm --version)"
    echo "Biome version: $(npx @biomejs/biome --version)"
    echo "Current directory: $(pwd)"
    echo "Files in directory: $(ls -la)"

# Verbose Biome output
- name: Run Biome with verbose output
  run: npx @biomejs/biome check . --verbose
```

- Check the Actions tab in your repository for detailed logs
- Use `act` tool to test workflows locally
- Add debug steps to your workflow for troubleshooting

## Step 9: Best Practices

### Workflow Organization

- Keep workflows focused and single-purpose
- Use descriptive names and comments
- Follow consistent naming conventions

### Security Considerations

- Use specific action versions (avoid `@latest`)
- Minimize permissions to only what's needed
- Avoid hardcoding secrets in workflows

### Performance

- Use appropriate runners for your needs
- Implement proper caching strategies
- Consider parallel job execution

## Step 10: Monitoring and Maintenance

### Monitoring Workflow Health

- Regularly check workflow run status
- Monitor execution times and costs
- Review and update action versions

### Maintenance Tasks

- Update action versions regularly
- Review and update Node.js versions
- Clean up old workflow runs
- Update Biome configuration as needed

## Additional Resources

### Documentation Links

- GitHub Actions documentation
- Biome official documentation
- Node.js setup action documentation

### Community Resources

- GitHub Actions marketplace
- Biome community discussions
- Best practices from other projects

## Conclusion

Setting up a Biome GitHub check will help maintain code quality and consistency across your project. The automated checks will catch issues early and provide immediate feedback to developers, leading to better code quality and reduced review time.

Remember to:

- Test your workflow thoroughly
- Monitor its performance
- Keep it updated with the latest versions
- Customize it according to your project's needs
