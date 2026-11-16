# Sweet and Tart

Photo portfolio for **Sweet and Tart**, our team’s custom pastry business. It is a static site: HTML, CSS, and a small vanilla script. There is no build step, so the repository root is the site.

The email (`hello@example.com`) and phone (`(555) 010-0100`) on the site are placeholders until the owner is ready to publish real contact details.

## Preview locally

From this folder:

```bash
python3 -m http.server 8080
```

Open [http://localhost:8080](http://localhost:8080). Use a phone-width window as well as a desktop one — most visitors will be on a phone.

## Pages

- `index.html` — home, with a short about, signature items, a few photos, and a link to order
- `gallery.html` — all 10 photos in one masonry grid, with a lightbox
- `order.html` — how custom orders work, and buttons for email, phone, and text
- `404.html` — missing-page fallback for Cloudflare Pages and GitHub Pages

The header, navigation, and footer are copied into each HTML file. If you change one, update the others (search for `Shared header` and `Shared footer`).

## File structure

```
index.html
gallery.html
order.html
404.html
css/styles.css
js/site.js
images/          responsive WebP and JPEG (480 / 960 / 1600 where the source allows)
favicon.svg
favicon-32.png
apple-touch-icon.png
robots.txt
_headers         Cloudflare Pages cache and security headers
```

Phone originals are not in the repo. Web images were exported with EXIF orientation applied, so they display upright. Each photo uses `<picture>` with WebP and a JPEG fallback, `srcset` widths, width/height attributes, and lazy loading below the fold.

## Copy

Customer-facing text is **draft**. It lives in the HTML (not a CMS or a JavaScript string). Search for `DRAFT COPY` to find every block. Keep statements factual: professional kitchen, online orders, delivery across Austin and the Greater Austin area. Do not add a street address, reviews, years in business, awards, prices, or extra contact links.

Colors are CSS variables at the top of `css/styles.css`. The page background is a flat blush (`#fbe4ea`).

## Deploy on Cloudflare Pages

1. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages → Connect to Git** and choose this repository.
2. Production branch: `main` (after this work is merged).
3. Framework preset: **None**.
4. Build command: leave empty.
5. Build output directory: `/` (the repository root).
6. Save and deploy.

Pull requests get their own preview URL. A custom domain is a later step: **Pages project → Custom domains**. When that domain is live, set `og:url` and `og:image` in each page `<head>` to absolute `https://` URLs (they are root-relative today).

GitHub Pages also works with no build, serving the repository root. `.nojekyll` is included so Jekyll does not drop `_headers`.

## Later

- FAQ, lead time, and allergy info
- Testimonials
- Copy edits
- Custom domain via Cloudflare
- Logo (the site uses a text wordmark until one exists)
