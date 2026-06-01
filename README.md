# Memories by Milind — Premium Photography Portfolio

Domain: `memoriesbym.com`

This is a premium React + Vite photography portfolio built for a luxury black/gold brand style.

## What this includes

- Premium animated hero
- Luxury black/gold branding
- Dynamic gallery filters
- Modal/lightbox image viewer
- Services/pricing section
- Client-experience flow
- Booking CTA
- SEO tags
- GitHub Pages custom domain file: `public/CNAME`
- Mobile responsive layout

## Local setup

```bash
npm install
npm run dev
```

Open the local URL Vite gives you.

## Build

```bash
npm run build
```

## Image replacement instructions

Replace the placeholder SVGs inside:

```txt
src/assets/placeholders/
```

Use your real edited images with these exact names, or update `src/data/portfolio.js`.

Recommended final image names:

```txt
portrait-shreeya-golden-hour-01.jpg
portrait-shreeya-golden-hour-02.jpg
portrait-saketh-urban-01.jpg
portrait-saketh-urban-02.jpg
pet-clover-closeup-01.jpg
pet-clover-playing-01.jpg
sunset-mountain-silhouette-01.jpg
sunset-lake-orange-sky-01.jpg
mountain-view-blue-hour-01.jpg
friends-candid-outdoor-01.jpg
event-intimate-celebration-01.jpg
bts-sony-a6400-01.jpg
```

Best export settings:

```txt
Format: WebP or JPG
Long edge: 1800–2400px
Quality: 75–85
Color: sRGB
File size target: under 500 KB per image
```

## How to deploy to GitHub Pages

1. Create a new GitHub repo named:

```txt
memories-by-milind
```

2. Upload all files from this folder.

3. Install GitHub Pages deploy dependency:

```bash
npm install gh-pages --save-dev
```

4. Edit `package.json` and add:

```json
"homepage": "https://memoriesbym.com",
"scripts": {
  "dev": "vite --host 0.0.0.0",
  "build": "vite build",
  "preview": "vite preview",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

5. Deploy:

```bash
npm run deploy
```

6. In GitHub:
Settings → Pages → Source → `gh-pages` branch.

7. In GitHub Pages custom domain, enter:

```txt
memoriesbym.com
```

The included `public/CNAME` already contains:

```txt
memoriesbym.com
```

## Domain DNS setup

Wherever you buy `memoriesbym.com`, add these DNS records.

For apex domain:

```txt
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
```

For www:

```txt
CNAME www   your-github-username.github.io
```

After GitHub verifies the domain, enable:

```txt
Enforce HTTPS
```

## What to customize first

1. Replace placeholder images.
2. Update Instagram link in `src/main.jsx`.
3. Update email if needed:
   `hello@memoriesbym.com`
4. Update locations:
   Seattle, Bellevue, Redmond, Kirkland.
5. Add real reviews once you shoot friends/family.
6. Update pricing after first 5–10 shoots.

## Recommended launch flow

- Launch website first with 8–12 strong images.
- Create Instagram: `@memoriesbymilind`
- Add website link to Instagram bio.
- Post 9 launch posts.
- Add Google Business Profile after domain is live.
