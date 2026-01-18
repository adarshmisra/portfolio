#!/bin/bash

# Setup GitHub repository for portfolio
REPO_NAME="portfolio"
GITHUB_USERNAME=""

echo "🚀 Setting up GitHub repository..."

# Try to get GitHub username from git config or prompt
GITHUB_USERNAME=$(git config --global github.user 2>/dev/null)

if [ -z "$GITHUB_USERNAME" ]; then
    read -p "Enter your GitHub username: " GITHUB_USERNAME
fi

# Check if remote already exists
if git remote get-url origin &>/dev/null; then
    echo "⚠️  Remote 'origin' already exists. Removing it..."
    git remote remove origin
fi

# Add remote
echo "📡 Adding remote repository..."
git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git

# Set branch to main
git branch -M main

echo ""
echo "✅ Git remote configured!"
echo ""
echo "📝 Next steps:"
echo "1. Create a private repository on GitHub:"
echo "   https://github.com/new"
echo ""
echo "   Repository name: $REPO_NAME"
echo "   Visibility: Private"
echo "   DO NOT initialize with README, .gitignore, or license"
echo ""
echo "2. After creating the repository, run:"
echo "   git push -u origin main"
echo ""
echo "Or if you have GitHub CLI (gh) installed and authenticated:"
echo "   gh repo create $REPO_NAME --private --source=. --remote=origin --push"
