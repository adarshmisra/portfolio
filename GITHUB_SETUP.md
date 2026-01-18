# GitHub Repository Setup Instructions

Your code has been committed locally. Follow these steps to create a private GitHub repository and push your code:

## Step 1: Create the Repository on GitHub

1. Go to https://github.com/new
2. **Repository name**: `portfolio`
3. **Description**: `Personal portfolio website built with Next.js, TypeScript, and Tailwind CSS`
4. **Visibility**: Select **Private** 🔒
5. **Important**: DO NOT check any of these boxes:
   - ❌ Add a README file
   - ❌ Add .gitignore
   - ❌ Choose a license
6. Click **"Create repository"**

## Step 2: Connect and Push Your Code

After creating the repository, GitHub will show you commands. Use these instead (already configured):

```bash
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

## Alternative: Using GitHub CLI (if installed)

If you have GitHub CLI installed and authenticated:

```bash
gh repo create portfolio --private --description "Personal portfolio website built with Next.js, TypeScript, and Tailwind CSS" --source=. --remote=origin --push
```

## Verify

After pushing, visit: `https://github.com/YOUR_USERNAME/portfolio` to see your repository.

---

**Note**: Your `.env.local` file is already in `.gitignore`, so your LinkedIn profile picture URL won't be committed (which is good for security).
