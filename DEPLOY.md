# KwikMusic - Netlify Deployment Guide

## 🚀 Deploy to Netlify

### Method 1: Deploy via Netlify CLI (Recommended)

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize Netlify in your project**
   ```bash
   cd /path/to/your/project
   netlify init
   ```

4. **Set Environment Variables**
   ```bash
   netlify env:set GEMINI_API_KEY "your_gemini_api_key"
   netlify env:set YOUTUBE_API_KEY_1 "your_first_youtube_key"
   netlify env:set YOUTUBE_API_KEY_2 "your_second_youtube_key"
   ```

5. **Deploy**
   ```bash
   netlify deploy --prod
   ```

---

### Method 2: Deploy via Netlify Web UI

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Go to [Netlify](https://app.netlify.com/)**
   - Click "Add new site" → "Import an existing project"
   - Connect your Git provider
   - Select your repository

3. **Configure Build Settings**
   - Build command: `node inject-env.js`
   - Publish directory: `.` (root)
   - Leave these as default (they're in netlify.toml)

4. **Add Environment Variables**
   - Go to Site settings → Environment variables
   - Add the following variables:
     ```
     GEMINI_API_KEY = your_gemini_api_key_here
     YOUTUBE_API_KEY_1 = your_first_youtube_api_key_here
     YOUTUBE_API_KEY_2 = your_second_youtube_api_key_here
     ```

5. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically run the build and deploy

---

## 🔑 Getting API Keys

### Google Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API key"
3. Copy your API key

### YouTube Data API v3 Keys
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "YouTube Data API v3"
4. Go to Credentials → Create credentials → API key
5. Repeat for second API key (for fallback)

---

## 📝 Environment Variables Explained

- `GEMINI_API_KEY`: Used for AI playlist generation
- `YOUTUBE_API_KEY_1`: Primary YouTube API key for searching videos
- `YOUTUBE_API_KEY_2`: Backup YouTube API key (automatic fallback when quota exceeded)

---

## 🔒 Security Notes

- **Never commit `.env` file** (already in .gitignore)
- API keys are injected at build time, not exposed in repository
- Keys are visible in client-side code after build (this is normal for client-only apps)
- Consider using Netlify Functions for enhanced security if needed

---

## 🐛 Troubleshooting

### Build fails with "node: command not found"
- Make sure Node.js 18 is specified in netlify.toml (already configured)

### API keys not working
- Check that environment variables are set correctly in Netlify dashboard
- Ensure no extra spaces or quotes in the values
- Redeploy after changing environment variables

### Site works locally but not on Netlify
- Make sure `netlify.toml` is in the root directory
- Verify `inject-env.js` is in the root directory
- Check Netlify build logs for errors

---

## 📦 Files Added for Deployment

- `netlify.toml` - Netlify configuration
- `inject-env.js` - Build script to inject environment variables
- `.env.example` - Template for environment variables
- `DEPLOY.md` - This deployment guide

---

## ✅ Verification

After deployment, test these features:
1. Search for music (uses YouTube API)
2. Generate AI playlist (uses Gemini API)
3. Check that API key fallback works when quota is exceeded

---

## 📞 Support

If you encounter issues:
1. Check Netlify build logs
2. Verify all environment variables are set
3. Ensure API keys are valid and have proper permissions
