# 🚀 Quick Start Guide

## For Netlify Deployment (Production)

See detailed instructions in **[DEPLOY.md](./DEPLOY.md)**

**Quick steps:**
1. Push code to GitHub
2. Import to Netlify
3. Add environment variables in Netlify dashboard
4. Deploy!

---

## For Local Development

### Option 1: Automatic Setup (Recommended)

**On Mac/Linux:**
```bash
./setup-local.sh
```

**On Windows:**
```
setup-local.bat
```

### Option 2: Manual Setup

1. **Copy environment template**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` file with your API keys**
   ```
   GEMINI_API_KEY=your_actual_gemini_key
   YOUTUBE_API_KEY_1=your_first_youtube_key
   YOUTUBE_API_KEY_2=your_second_youtube_key
   ```

3. **Inject keys into HTML**
   ```bash
   node inject-env.js
   ```

4. **Open in browser**
   - Simply open `index.html` in your browser
   - Or use Live Server in VS Code

---

## 🔑 Where to Get API Keys

### Gemini API Key
- Visit: https://makersuite.google.com/app/apikey
- Click "Create API key"
- Free tier available

### YouTube Data API Keys
- Visit: https://console.cloud.google.com/
- Create project → Enable "YouTube Data API v3"
- Create credentials → API key
- Create 2 keys for automatic fallback

---

## ⚠️ Important Notes

- **Never commit `.env` file** - it's already in .gitignore
- For Netlify, set environment variables in dashboard, not in code
- The `inject-env.js` script runs automatically on Netlify
- For local development, run inject script after changing `.env`

---

## 📁 Project Structure

```
├── index.html              # Main app file (with placeholders)
├── netlify.toml           # Netlify configuration
├── inject-env.js          # Build script to inject API keys
├── .env.example           # Environment variables template
├── .env                   # Your actual keys (DO NOT COMMIT)
├── .gitignore            # Prevents committing sensitive files
├── DEPLOY.md             # Detailed deployment guide
└── README.md             # This file
```

---

## 🛠️ Development Workflow

1. **First time setup:**
   - Run `./setup-local.sh` (or `.bat` on Windows)
   - Edit `.env` with your keys
   - Run `node inject-env.js`

2. **Daily development:**
   - Just open `index.html` in browser
   - Make changes to the code
   - No need to re-run inject script unless keys change

3. **Deploying to Netlify:**
   - Push changes to Git
   - Netlify automatically runs build and injects keys
   - Or use `netlify deploy --prod`

---

## ✅ Verification Checklist

- [ ] `.env` file created with actual API keys
- [ ] `inject-env.js` has been run
- [ ] `index.html` contains actual keys (not placeholder comments)
- [ ] App works locally when opened in browser
- [ ] Keys are set in Netlify environment variables (for deployment)
- [ ] `.env` is in `.gitignore` (don't commit secrets!)

---

## 🆘 Troubleshooting

**Issue:** "node: command not found"
- Install Node.js from https://nodejs.org/

**Issue:** API keys not working
- Check `.env` file has correct format (no extra quotes)
- Re-run `node inject-env.js`
- Clear browser cache

**Issue:** Netlify build fails
- Verify environment variables are set in Netlify dashboard
- Check build logs for errors
- Ensure `netlify.toml` is in root directory

---

## 📞 Need Help?

Check these files:
- `DEPLOY.md` - Detailed deployment instructions
- `.env.example` - Correct format for environment variables
- Netlify build logs - For deployment issues
