# LinkedIn Profile Picture Setup

LinkedIn blocks automated scraping, so you'll need to manually add your profile picture URL.

## Quick Setup (Recommended)

1. **Get your LinkedIn profile picture URL:**
   - Go to your LinkedIn profile: https://www.linkedin.com/in/adarshmisra/
   - Right-click on your profile picture
   - Select "Copy image address" or "Copy image URL"
   - The URL will look something like: `https://media.licdn.com/dms/image/...`

2. **Add it to your environment:**
   - Create a `.env.local` file in the root directory (if it doesn't exist)
   - Add this line:
     ```
     LINKEDIN_PROFILE_IMAGE_URL=https://your-copied-image-url-here
     ```

3. **Restart your development server:**
   ```bash
   # Stop the server (Ctrl+C) and restart
   npm run dev
   ```

## Alternative: Direct URL Method

If you prefer, you can also directly update the Hero component to use a static URL. However, using the environment variable is recommended as it will still auto-update when you change your LinkedIn picture (you just need to update the URL in `.env.local`).

## For Production (Vercel/Netlify)

When deploying, add the environment variable in your hosting platform:
- **Vercel**: Go to Project Settings → Environment Variables
- **Netlify**: Go to Site Settings → Environment Variables

Add: `LINKEDIN_PROFILE_IMAGE_URL` with your image URL as the value.
