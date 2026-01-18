# Adarsh Misra - Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern and clean UI design
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Fast and optimized with Next.js
- ♿ Accessible design
- 🚀 Ready for free deployment on Vercel
- 📸 Auto-updating LinkedIn profile picture

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: React Icons

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Deployment

### Deploy to Vercel (Recommended - Free)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Sign in with your GitHub account
4. Click "New Project"
5. Import your repository
6. Vercel will automatically detect Next.js and configure everything
7. Click "Deploy"
8. Your site will be live in minutes!

### Deploy to Netlify (Alternative - Free)

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Sign in with your GitHub account
4. Click "New site from Git"
5. Select your repository
6. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
7. Click "Deploy site"

### Other Deployment Options

- **GitHub Pages**: Requires static export (add `output: 'export'` to next.config.js)
- **Cloudflare Pages**: Similar to Netlify
- **AWS Amplify**: For AWS ecosystem integration

## Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx      # Root layout with metadata
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/
│   ├── Navbar.tsx      # Navigation bar
│   ├── Hero.tsx        # Hero section
│   ├── About.tsx       # About/Summary section
│   ├── Experience.tsx  # Work experience
│   ├── Education.tsx   # Education history
│   ├── Skills.tsx      # Technical skills
│   ├── Contact.tsx     # Contact information
│   └── Footer.tsx      # Footer
├── public/             # Static assets
└── package.json        # Dependencies
```

## Customization

To customize the portfolio:

1. **Update Content**: Edit the component files in `components/` directory
2. **Change Colors**: Modify `tailwind.config.ts` to update the color scheme
3. **Add Sections**: Create new components and add them to `app/page.tsx`
4. **Update Metadata**: Edit `app/layout.tsx` for SEO and social sharing

### LinkedIn Profile Picture

**Setup Required:** LinkedIn blocks automated scraping, so you need to manually add your profile picture URL.

**Quick Setup:**
1. Go to your LinkedIn profile and right-click your profile picture
2. Select "Copy image address" to get the image URL
3. Create a `.env.local` file in the root directory
4. Add: `LINKEDIN_PROFILE_IMAGE_URL=https://your-copied-image-url-here`
5. Restart the development server

For detailed instructions, see `PROFILE_PICTURE_SETUP.md`.

**Note:** When you update your LinkedIn profile picture, you'll need to update the URL in `.env.local` to see the new picture on your portfolio.

## License

This project is open source and available under the MIT License.

## Contact

- **Email**: adarshmisraa@gmail.com
- **LinkedIn**: [linkedin.com/in/adarshmisra](https://www.linkedin.com/in/adarshmisra)
- **Phone**: +91 7990371312
