import { NextResponse } from 'next/server'

// Cache the image URL for 1 hour to avoid too many requests
let cachedImageUrl: string | null = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds

export async function GET() {
  try {
    // Check for manual override via environment variable (RECOMMENDED METHOD)
    const manualImageUrl = process.env.LINKEDIN_PROFILE_IMAGE_URL
    if (manualImageUrl) {
      return NextResponse.json({ imageUrl: manualImageUrl, cached: false, source: 'manual' })
    }

    // Note: LinkedIn blocks automated scraping, so manual URL is recommended
    // See PROFILE_PICTURE_SETUP.md for instructions

    // Return cached image if still valid
    const now = Date.now()
    if (cachedImageUrl && (now - cacheTimestamp) < CACHE_DURATION) {
      return NextResponse.json({ imageUrl: cachedImageUrl, cached: true })
    }

    // Fetch LinkedIn profile page with proper headers
    const linkedinUrl = 'https://www.linkedin.com/in/adarshmisra/'
    const response = await fetch(linkedinUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      // Add a timeout
      signal: AbortSignal.timeout(10000), // 10 second timeout
    })

    if (!response.ok) {
      // If fetch fails, try alternative method using LinkedIn's public API pattern
      // LinkedIn profile pictures can sometimes be accessed via a different pattern
      throw new Error('Failed to fetch LinkedIn profile')
    }

    const html = await response.text()

    // Method 1: Try to extract profile picture from Open Graph meta tag
    const ogImageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i)
    if (ogImageMatch && ogImageMatch[1]) {
      const imageUrl = ogImageMatch[1].replace(/&amp;/g, '&')
      cachedImageUrl = imageUrl
      cacheTimestamp = now
      return NextResponse.json({ imageUrl: cachedImageUrl, cached: false })
    }

    // Method 2: Try LinkedIn CDN image URL pattern (media.licdn.com)
    const imageUrlMatch = html.match(/https?:\/\/media\.licdn\.com\/dms\/image\/[^"'\s<>]+/i)
    if (imageUrlMatch && imageUrlMatch[0]) {
      cachedImageUrl = imageUrlMatch[0]
      cacheTimestamp = now
      return NextResponse.json({ imageUrl: cachedImageUrl, cached: false })
    }

    // Method 3: Try to find image in JSON-LD structured data
    const jsonLdMatch = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i)
    if (jsonLdMatch) {
      try {
        const jsonLd = JSON.parse(jsonLdMatch[1])
        if (jsonLd.image) {
          cachedImageUrl = jsonLd.image
          cacheTimestamp = now
          return NextResponse.json({ imageUrl: cachedImageUrl, cached: false })
        }
      } catch (e) {
        // JSON parse failed, continue
      }
    }

    // If no image found, return null
    return NextResponse.json({ imageUrl: null, error: 'Profile image not found' })
  } catch (error: any) {
    console.error('Error fetching LinkedIn image:', error.message)
    
    // Return cached image if available, even if expired
    if (cachedImageUrl) {
      return NextResponse.json({ 
        imageUrl: cachedImageUrl, 
        cached: true,
        warning: 'Using cached image due to fetch error' 
      })
    }
    
    // Return null if no cached image available
    return NextResponse.json(
      { imageUrl: null, error: 'Failed to fetch profile image' },
      { status: 500 }
    )
  }
}
