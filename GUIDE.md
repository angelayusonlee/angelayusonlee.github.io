# Site Guide — How to Use Your Website

This is the in-depth manual for running and maintaining your site. It assumes no
coding background. You will only ever edit three small text files in the `data/`
folder; everything else renders itself. If you just want the quick version, the
short `README.md` covers the essentials — this document explains the *why* behind
each step and every field you can use.

---

## 1. The big idea

Your site separates **content** (what it says) from **presentation** (how it
looks). The content lives in three JSON files inside `data/`:

| File | Controls |
|------|----------|
| `data/profile.json` | Your name, tagline, photo, bio, email, CV link, social links, research-interest tags |
| `data/publications.json` | Every paper — both working papers and published papers |
| `data/news.json` | Your news / updates feed |

When someone opens the site, a small script (`js/main.js`) reads those files and
builds the pages on the fly. **You never touch the HTML, CSS, or JavaScript** to
change content. You edit a JSON file, save, and the site updates.

JSON is just structured text. Three rules keep it happy:

1. Text values go in `"double quotes"`.
2. Items in a list are separated by commas — but the **last** item has *no*
   trailing comma.
3. Every `{` and `[` must have a matching `}` and `]`.

If a change ever breaks the page, paste the whole file into
<https://jsonlint.com>. It highlights the exact line of the mistake (almost
always a missing comma or quote).

---

## 2. Running the site on your computer

Because the pages load their content with a browser feature called `fetch()`,
you can't just double-click `index.html` — browsers block `fetch` from raw files
for security. You need a tiny local web server. You already did this:

```bash
cd /Users/angelalee374/Documents/angelayusonlee.github.io
python3 -m http.server 8000
```

Then open **http://localhost:8000** in your browser. Leave that terminal window
running while you work; every time you save a JSON file, just refresh the browser
to see the change. Press `Ctrl + C` in the terminal to stop the server when
you're done.

> If port 8000 is ever "address already in use," pick another number, e.g.
> `python3 -m http.server 8123`, and open `http://localhost:8123`.

---

## 3. Editing your profile — `data/profile.json`

This file fills the home-page hero (photo, name, bio) and the sidebar.

```json
{
  "name": "Angela Yuson Lee",
  "tagline": "Ph.D. Candidate · Computational Social Science",
  "photo": "assets/images/profile.jpg",
  "cv": "assets/Angela_Lee_CV.pdf",
  "affiliation": [
    "Ph.D. Candidate, Department of Communication",
    "Stanford University"
  ],
  "email": "angela8@stanford.edu",
  "location": "Stanford, CA",
  "bio": [
    "First paragraph of your bio …",
    "Second paragraph …"
  ],
  "research_interests": [
    "Computational social science",
    "AI, trust, and human values"
  ],
  "links": {
    "google_scholar": "https://scholar.google.com/citations?user=YOUR_ID",
    "twitter": "https://twitter.com/yourhandle",
    "github": "https://github.com/angelayusonlee",
    "linkedin": "https://www.linkedin.com/in/yourname",
    "orcid": "https://orcid.org/0000-0000-0000-0000"
  }
}
```

Field-by-field:

- **name** — appears as the big heading and in the top-left nav brand.
- **tagline** — the short maroon line under your name.
- **photo** — path to your headshot. To swap it, drop a new image into
  `assets/images/` and update this path (keep images roughly square; ~600×600 px
  is plenty).
- **cv** — path to your CV PDF. Replace the file in `assets/` and point here.
- **affiliation** — a list of lines shown stacked under your name. Add or remove
  lines freely.
- **email** — becomes a clickable "mailto" link.
- **location** — optional; delete the line to hide it.
- **bio** — a list of paragraphs. Each list item is one paragraph. You may put
  **HTML links** inside a paragraph, like
  `"… the <a href=\"https://comm.stanford.edu\">Department of Communication</a> …"`.
  Note the `\"` — inside JSON, quotes within a string must be escaped with a
  backslash.
- **research_interests** — the little rounded pill tags. Add/remove freely.
- **links** — your social profiles. **To hide an icon, delete that whole line**
  (or set it to `""`). Supported keys: `google_scholar`, `twitter`, `github`,
  `linkedin`, `orcid`.

---

## 4. Managing publications — `data/publications.json`

This is the file you'll touch most. Everything is one list called
`publications`. Each paper is one `{ … }` block. The single most important field
is **`status`**, which decides which section the paper appears in:

- `"status": "working"` → renders under **Working Papers**
- `"status": "published"` → renders under **Published Papers**

Within each section, papers sort themselves **newest first** by their `year`.

### Every field you can use

```json
{
  "id": "lee2026trust",
  "status": "working",
  "title": "Designing for Calibrated Trust …",
  "authors": ["Angela Yuson Lee", "Coauthor A. Name"],
  "year": 2026,
  "venue": "Under review",
  "venue_detail": "Journal of Communication, 76(3), 401-428",
  "note": "Revise & resubmit, Journal of Communication",
  "award": "Top Paper Award, ICA",
  "abstract": "The full abstract text shown when expanded …",
  "links": {
    "pdf": "assets/papers/lee2026trust.pdf",
    "doi": "https://doi.org/10.1177/xxxxx",
    "code": "https://github.com/you/repo",
    "slides": "assets/slides/lee2026.pdf",
    "abstract": true
  }
}
```

| Field | Required? | What it does |
|-------|-----------|--------------|
| `id` | recommended | A unique nickname (no spaces). Handy for finding the entry later; not shown to readers. |
| `status` | **yes** | `"working"` or `"published"` — picks the section. |
| `title` | **yes** | The paper title. |
| `authors` | **yes** | A list of author names. **Your own name is bolded automatically** when it exactly matches the `name` in your profile, so type it identically. |
| `year` | **yes** | Used for sorting and shown to the left of the entry. |
| `venue` | yes | Short venue name shown in bold (e.g. `"CSCW"`, `"New Media & Society"`, or `"Under review"`). |
| `venue_detail` | optional | Fuller citation (volume, pages). Shown after the venue name. |
| `note` | optional | A small grey line, e.g. `"Revise & resubmit"`. |
| `award` | optional | Shows a maroon ★ badge, e.g. `"Best Paper Award"`. |
| `abstract` | optional | The abstract text. |
| `links.pdf` | optional | Link to the PDF (local file or URL). |
| `links.doi` | optional | DOI / publisher link. |
| `links.code` | optional | Code repository link. |
| `links.slides` | optional | Slides link. |
| `links.abstract` | optional | Set to `true` to show an **Abstract** button that expands the `abstract` text. Omit it (or leave out `abstract`) and no button appears. |

Any optional field you don't need — just leave the whole line out. The layout
adapts.

### Adding a paper PDF

Drop the PDF into the `assets/papers/` folder, then set
`"pdf": "assets/papers/your-file.pdf"`. (If you'd rather link to an external host
like arXiv or a journal, just put that full URL there instead.)

---

## 5. ⭐ Moving a paper from Working → Published

This is the most common update, and it's deliberately easy. When a working paper
gets accepted:

1. Open `data/publications.json` and find that paper's block (search for a word
   from its title, or its `id`).

2. Change **one word** — its status:
   ```json
   "status": "working"     →     "status": "published"
   ```

3. Fill in where it landed (and double-check the year):
   ```json
   "year": 2026,
   "venue": "Journal of Communication",
   "venue_detail": "Journal of Communication, 76(3), 401-428"
   ```
   You can also delete the now-irrelevant `"note": "Under review …"` line and add
   a `doi` link.

Save the file and refresh the browser. The paper instantly disappears from
**Working Papers** and reappears, correctly sorted, under **Published Papers** —
no HTML editing. (Nice touch: add a one-line entry to `data/news.json` to
announce it.)

---

## 6. Posting news — `data/news.json`

Newest items go at the **top** of the list. Each entry has a `date` (free text —
write it however you like) and `content` (which accepts inline HTML links and
emphasis).

```json
{
  "news": [
    { "date": "Jun 2026", "content": "New paper accepted at <em>CHI 2027</em>." },
    { "date": "May 2026", "content": "Presented at <a href=\"https://www.icahdq.org\">ICA</a>." }
  ]
}
```

The home page shows the 3 most recent items (set by `data-limit="3"` on the home
page's News block); the dedicated **News** page shows them all.

---

## 7. Where things live (file map)

```
angelayusonlee.github.io/
├── index.html          Home page
├── research.html       Research overview (the prose here is edited directly in the file)
├── publications.html   Full publications list
├── news.html           Full news feed
├── css/style.css       All styling
├── js/main.js          The rendering script (no need to edit)
├── data/               ← you edit these three files
│   ├── profile.json
│   ├── publications.json
│   └── news.json
├── assets/
│   ├── images/profile.jpg
│   ├── papers/         put paper PDFs here
│   └── Angela_Lee_CV.pdf
├── .nojekyll           tells GitHub Pages to serve files as-is
├── README.md           quick reference
└── GUIDE.md            this document
```

One exception to the "only edit JSON" rule: the **Research page** (`research.html`)
contains a few paragraphs of narrative prose about your research areas. That's
intentionally written straight into the HTML so you can phrase it freely. Look
for the clearly-marked `<!-- NOTE: edit the text below -->` comment and change the
sentences between the tags. Don't touch the `<section>`/`<div>` tags around them.

---

## 8. Publishing to the web (GitHub Pages)

Your folder is a Git repository named `angelayusonlee.github.io`, which GitHub
Pages serves at **https://angelayusonlee.github.io**. The publish loop is:

```bash
cd /Users/angelalee374/Documents/angelayusonlee.github.io
git add .
git commit -m "Update publications"
git push
```

Within about a minute, GitHub rebuilds and your live site reflects the change.
(First-time setup only: on GitHub, go to **Settings → Pages** and set the source
to the `main` branch, root folder.)

Unlike on your computer, the live GitHub site does **not** need the
`python3 -m http.server` step — GitHub serves the files for you.

---

## 9. Changing the look

Open `css/style.css`. At the very top is a `:root` block of "variables" — change
these and the whole site updates consistently:

- `--accent` — the highlight color (currently a muted maroon). Try `#1f4e7a` for
  navy, `#1f5e44` for forest green, etc.
- `--maxw` — maximum content width (e.g. `1080px`).
- `--serif` / `--sans` — the heading and body fonts.

You don't need to hunt through the rest of the file; the variables drive
everything.

---

## 10. Troubleshooting

| Symptom | Likely cause & fix |
|---------|--------------------|
| A section shows "Loading…" forever, or "Could not load …" | You opened the file directly instead of through the local server. Run `python3 -m http.server 8000` and use `http://localhost:8000`. |
| A whole section is blank after an edit | A JSON typo (usually a missing comma or an extra trailing comma). Paste the file into <https://jsonlint.com> to find the line. |
| Your photo doesn't appear | The `photo` path in `profile.json` doesn't match the actual filename in `assets/images/`. Filenames are case-sensitive. |
| A PDF link 404s | The PDF isn't in `assets/papers/` yet, or the filename in `links.pdf` doesn't match exactly. |
| Your name isn't bolded in an author list | The name in `authors` must match the `name` in `profile.json` character-for-character. |
| Changes don't show on the live site | Make sure you ran `git add`, `git commit`, and `git push`, then wait ~1 minute. |

---

### Quick recap

Edit JSON in `data/` → save → refresh `localhost:8000` to preview → `git add / commit / push` to publish. That's the whole workflow.
