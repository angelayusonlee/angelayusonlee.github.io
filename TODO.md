# TODO — Things to Update or Fix

Your real content is in the site. What remains is mostly links I couldn't
determine and a few things to confirm. Ordered by priority.

---

## ✅ Done
- [x] Real **publications** imported from Scholar (26 published + 3 working papers).
- [x] **DOIs** added and verified via Crossref for 15 papers (PNAS Nexus, JCMC, JMIR, Social Media + Society, CHB/CHBR, Computers & Education Open, Frontiers, CSCW/ACM, Cogent).
- [x] **Bio** rewritten in the **first person**, media-psychology focus, with Stanford Social Media Lab / Hancock and incoming UW–Madison.
- [x] **News** populated with your full list (talks, press, awards, acceptances) — most recent first.
- [x] **Partners** page added (Stanford Social Media Lab, BetterUp, Digital Wellness Institute) with a nav link on every page.
- [x] **Google Scholar** link set to your real profile.
- [x] Research page + meta descriptions updated to your actual areas.

---

## 🟠 Social links (`data/profile.json` → `links`)
Still placeholders — fix or delete each (deleting a line hides that icon):
- [ ] **Twitter/X** — `https://twitter.com/PLACEHOLDER`.
- [ ] **GitHub** — I guessed `https://github.com/angelayusonlee`; verify or delete.
- [ ] **LinkedIn** — `https://www.linkedin.com/in/PLACEHOLDER`.
- [ ] **ORCID** — your real ORCID is `0000-0002-9527-5730` (found via Crossref). Update the link to `https://orcid.org/0000-0002-9527-5730`. *(I left the placeholder in so you can confirm before it goes live.)*

---

## 🟡 Publications — remaining links (`data/publications.json`)
These 11 papers have no DOI yet because their identifiers aren't derivable; add `"doi"` (or `"pdf"`) under each `links`:
- [ ] *Going Light* (CHI 2026) — add the ACM DOI once available.
- [ ] *Metaphors of AI…* (Communications Psychology / Nature) — add DOI.
- [ ] *Not Just 'For You'* (CSCW 2025) and *Envisioning New Futures…* (CSCW Companion 2024) — add ACM DOIs.
- [ ] *Building Resilience to Misinformation…* (New Media & Society) and *When Adolescents' Self-Worth…* (Communication Research) — add SAGE DOIs.
- [ ] *Designing Misinformation Interventions for All* (HKS Misinformation Review) — add DOI.
- [ ] *Age-Related Differences…* (JMIR Human Factors) — add DOI.
- [ ] *"Bringing You into the Zoom"* (Journal of Children and Media) — add DOI.
- [ ] *Learning Online, Offline…* (Education and Information Technologies) — add DOI.
- [ ] Optional: add **abstracts** (set `"abstract": "…"` plus `"abstract": true` in `links`) — Crossref has them for several papers.
- [ ] Confirm the 3 **working papers**' status; move any now-published to `"status": "published"`.

---

## 🟡 Confirm
- [ ] **Partners page** — I seeded it with three real collaborators. Add community/research partners or remove any you'd prefer not to list.
- [ ] **Email / location** — `angela8@stanford.edu`, "Stanford, CA" (update when you move to Madison).
- [ ] **CV** (`assets/Angela_Lee_CV.pdf`) — currently your 2024 file; replace with a current version.
- [ ] **Headshot** (`assets/images/profile.jpg`) — keep or replace.

---

## ⚪ Before publishing
- [ ] **Preview** — `python3 -m http.server 8000` → `http://localhost:8000`; click every page incl. Partners.
- [ ] **Publish** — `git add . && git commit -m "Real content" && git push`.

See `GUIDE.md` for how to edit each field.
