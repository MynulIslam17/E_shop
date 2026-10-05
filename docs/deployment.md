# Deployment Guide

## Production Readiness Checklist

1. **Environment Variables:**
   Ensure the following environment variables are configured in production:
   - `NEXT_PUBLIC_SITE_URL`: Fully qualified production URL (e.g., `https://your-domain.com`)
   - `NEXT_PUBLIC_API_URL`: Absolute or relative path to the API (e.g., `https://your-domain.com/api`)
   - `NEXT_PUBLIC_BKASH_NUMBER`: Verified merchant bKash number
   - `NEXT_PUBLIC_NAGAD_NUMBER`: Verified merchant Nagad number
   - `NEXT_PUBLIC_GA_ID`: Google Analytics tracking ID (Optional)

2. **Docker Containerization:**
   Build the lightweight, production-grade Docker image using multi-stage builds:
   ```bash
   docker build -t e-commerce-web:latest .
   docker run -p 3000:3000 -e NODE_ENV=production e-commerce-web:latest
   ```

3. **Vercel / Cloudflare Pages / AWS ECS:**
   - Framework preset: **Next.js**
   - Build command: `npm run build`
   - Output directory: `.next`
   - Node version: `20.x` or `22.x`

4. **Security & Header Headers:**
   Next.js handles standard CSP and asset cache headers. SSL termination should be configured at the reverse proxy (Cloudflare, Nginx, or AWS CloudFront).
