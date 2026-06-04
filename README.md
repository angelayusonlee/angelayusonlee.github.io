# Angela Yuson Lee — Academic Website

A fast, dependency-free personal site. **All content lives in JSON files** inside the
`data/` folder, so you can update your site without touching any HTML, CSS, or
JavaScript. Edit a JSON file, save, commit, and GitHub Pages redeploys automatically.

---

## Project structure

```
angelayusonlee.github.io/
├── index.html              # Home (bio, recent news, selected work)
├── research.html           # Research overview (narrative prose + selected papers)
├── publications.html       # Full publication list (working + published)
├── news.html               # Full news feed
│
├── css/
│   └── style.css           # All styling (design system + responsive rules)
├── js/
│   └── main.js             # Fetches the JSON and renders every page
│
├── data/                   # ← YOU EDIT THESE
│   ├── profile.json        # Name, bio, photo, email, CV, social links, interests
│   ├── publications.json   # Working papers + published papers (one list)
│   └── news.json           # News / updates feed
│
├── assets/
│   ├── images/profile.jpg  # Your headshot
│   ├── papers/             # Put paper PDFs here (e.g. lee2026trust.pdf)
│   └── Angela_Lee_CV.pdf   # Your CV
│
└── .nojekyll               # Tells GitHub Pages to serve the files as-is
```

---

## How to update content

You only ever edit files in `data/`. Each is plain JSON — keep the quotes, commas,
and brackets intact. (Tip: paste your file into <https://jsonlint.com> if a change
breaks the page; it will point to the typo.)

### `profile.json` — your bio block
Update your name, tagline, affiliation lines, bio paragraphs, email, and the
`links` object (Google Scholar, Twitter, GitHub, LinkedIn, ORCID). Leave a link
out or set it to `""` to hide that icon. Bio paragraphs accept inline HTML links.

### `news.json` — newest first
Add a new entry at the **top** of the `news` list:

```json
{ "date": "Jun 2026", "content": "New paper accepted at <em>CHI 2027</em>." }
```

### `publications.json` — the important one
Every paper is one entry in a single `publications` list. The only field that
decides where it appears is **`status`**:

- `"status": "working"`   → shows under **Working Papers**
- `"status": "published"` → shows under **Published Papers**

Papers are sorted automatically by `year` (newest first). Put your PDF in
`assets/papers/` and point `links.pdf` at it. Available link types:
`pdf`, `doi`, `code`, `slides`, and `abstract` (set `"abstract": true` to show
the expandable Abstract button — the text comes from the `abstract` field).

---

## ⭐ 3-Step Guide: Move a paper from "Working Paper" to "Published"

When a working paper gets accepted, open **`data/publications.json`**, find that
paper's entry, and:

1. **Change the status.** Edit `"status": "working"` to `"status": "published"`.

2. **Add the venue and year.** Fill in where it was published, e.g.
   ```json
   "year": 2026,
   "venue": "Journal of Communication",
   "venue_detail": "Journal of Communication, 76(3), 401-428"
   ```

3. **Save and commit.** Save the file, then run:
   ```bash
   git add data/publications.json
   git commit -m "Move trust paper to published"
   git push
   ```
   GitHub Pages redeploys in ~1 minute and the paper now appears under
   **Published Papers** instead of Working Papers. (Optional: add a matching
   line to `news.json` to announce it.)

That's it — no HTML editing required.

---

## Run it locally

JSON is loaded with `fetch()`, which browsers block from `file://`. Start a tiny
local server from the project folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy

This repo is named `angelayusonlee.github.io`, so GitHub Pages serves it at
`https://angelayusonlee.github.io`. In **Settings → Pages**, set the source to
the `main` branch (root). Pushing to `main` redeploys automatically.

---

## Customizing the look

Open `css/style.css` and edit the variables at the top (`:root`): `--accent`
changes the highlight color, `--serif` / `--sans` change the fonts, `--maxw`
changes the content width.
