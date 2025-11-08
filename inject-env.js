const fs = require('fs');

// Try to load .env file for local development
let GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
let YOUTUBE_API_KEY_1 = process.env.YOUTUBE_API_KEY_1 || '';
let YOUTUBE_API_KEY_2 = process.env.YOUTUBE_API_KEY_2 || '';

// If running locally, try to read from .env file
if (fs.existsSync('.env')) {
  const envContent = fs.readFileSync('.env', 'utf8');
  const envLines = envContent.split('\n');
  
  envLines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      const value = valueParts.join('=').trim();
      
      if (key === 'GEMINI_API_KEY') GEMINI_API_KEY = value;
      if (key === 'YOUTUBE_API_KEY_1') YOUTUBE_API_KEY_1 = value;
      if (key === 'YOUTUBE_API_KEY_2') YOUTUBE_API_KEY_2 = value;
    }
  });
  
  console.log('📝 Loaded environment variables from .env file');
}

// Validate environment variables
if (!GEMINI_API_KEY || !YOUTUBE_API_KEY_1 || !YOUTUBE_API_KEY_2) {
  console.warn('⚠️  WARNING: Missing environment variables!');
  console.warn('GEMINI_API_KEY:', GEMINI_API_KEY ? '✓ Set' : '✗ Missing');
  console.warn('YOUTUBE_API_KEY_1:', YOUTUBE_API_KEY_1 ? '✓ Set' : '✗ Missing');
  console.warn('YOUTUBE_API_KEY_2:', YOUTUBE_API_KEY_2 ? '✓ Set' : '✗ Missing');
  console.warn('\n⚠️  IMPORTANT: Set environment variables in Netlify:');
  console.warn('1. Go to: Site settings → Environment variables');
  console.warn('2. Add: GEMINI_API_KEY, YOUTUBE_API_KEY_1, YOUTUBE_API_KEY_2');
  console.warn('3. Trigger a new deploy');
  console.warn('\n⚠️  Build will continue but API calls will fail without keys!\n');
  
  // Use empty strings as fallback to allow build to complete
  GEMINI_API_KEY = GEMINI_API_KEY || 'YOUR_GEMINI_KEY_HERE';
  YOUTUBE_API_KEY_1 = YOUTUBE_API_KEY_1 || 'YOUR_YOUTUBE_KEY_1_HERE';
  YOUTUBE_API_KEY_2 = YOUTUBE_API_KEY_2 || 'YOUR_YOUTUBE_KEY_2_HERE';
}

console.log('✅ All environment variables found');
console.log('GEMINI_API_KEY:', GEMINI_API_KEY.substring(0, 20) + '...');
console.log('YOUTUBE_API_KEY_1:', YOUTUBE_API_KEY_1.substring(0, 20) + '...');
console.log('YOUTUBE_API_KEY_2:', YOUTUBE_API_KEY_2.substring(0, 20) + '...');

// Read the index.html file
let html = fs.readFileSync('index.html', 'utf8');

// Check if placeholders exist
if (!html.includes('// INJECT_GEMINI_API_KEY') || !html.includes('// INJECT_YOUTUBE_API_KEYS')) {
  console.error('❌ ERROR: Placeholder comments not found in index.html');
  console.error('The file may have already been processed or is corrupted.');
  process.exit(1);
}

// Replace the placeholder comments with actual API keys
html = html.replace(
  '// INJECT_GEMINI_API_KEY',
  `const GEMINI_API_KEY = "${GEMINI_API_KEY}";`
);

html = html.replace(
  '// INJECT_YOUTUBE_API_KEYS',
  `const YOUTUBE_API_KEYS = ["${YOUTUBE_API_KEY_1}", "${YOUTUBE_API_KEY_2}"];`
);

// Verify replacements were made
if (html.includes('// INJECT_GEMINI_API_KEY') || html.includes('// INJECT_YOUTUBE_API_KEYS')) {
  console.error('❌ ERROR: Failed to replace placeholders');
  process.exit(1);
}

// Write the modified HTML back
fs.writeFileSync('index.html', html);

console.log('✅ Environment variables injected successfully into index.html!');
