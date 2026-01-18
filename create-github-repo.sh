#!/bin/bash

# Script to create a private GitHub repository and push code
# Option 1: If you have GitHub CLI installed and authenticated
# Option 2: Create repo manually on GitHub.com, then run this script

REPO_NAME="portfolio"
REPO_DESCRIPTION="Personal portfolio website built with Next.js, TypeScript, and Tailwind CSS"

echo "Creating GitHub repository..."

# Check if GitHub CLI is available
if command -v gh &> /dev/null; then
    echo "Using GitHub CLI..."
    gh repo create $REPO_NAME --private --description "$REPO_DESCRIPTION" --source=. --remote=origin --push
    echo "✅ Repository created and code pushed!"
else
    echo "GitHub CLI not found. Please create the repository manually:"
    echo ""
    echo "1. Go to https://github.com/new"
    echo "2. Repository name: $REPO_NAME"
    echo "3. Description: $REPO_DESCRIPTION"
    echo "4. Select 'Private'"
    echo "5. DO NOT initialize with README, .gitignore, or license"
    echo "6. Click 'Create repository'"
    echo ""
    read -p "Press Enter after you've created the repository..."
    
    # Get GitHub username
    read -p "Enter your GitHub username: " GITHUB_USERNAME
    
    # Add remote and push
    git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git
    git branch -M main
    git push -u origin main
    
    echo "✅ Code pushed to GitHub!"
fi
