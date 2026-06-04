/* =========================================================
   main.js — fetches JSON and renders the site.
   No build step. Works on GitHub Pages.
   ========================================================= */

const DATA = "data/";

/* ---- tiny helpers ---- */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const el = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstChild; };

async function getJSON(file) {
  const res = await fetch(DATA + file, { cache: "no-store" });
  if (!res.ok) throw new Error(`Could not load ${file} (${res.status})`);
  return res.json();
}

/* Bold the site owner's name in an author list. */
function formatAuthors(authors, me = "Angela Yuson Lee") {
  return authors
    .map((a) => (a === me ? `<span class="me">${a}</span>` : a))
    .join(", ");
}

/* ---- inline SVG icons ---- */
const ICON = {
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  scholar: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 1 8l11 6 9-4.9V17h2V8L12 2z"/><path d="M6 12.4V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-3.6l-6 3.3-6-3.3z"/></svg>',
  twitter: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.59l-5.16-6.74L5.3 22H2.04l8.02-9.17L1.5 2h6.75l4.66 6.16L18.244 2zm-1.16 18h1.83L7.01 3.9H5.05L17.084 20z"/></svg>',
  github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5A11.5 11.5 0 0 0 .5 12 11.5 11.5 0 0 0 8.5 23c.6.1.8-.26.8-.57v-2c-3.2.7-3.88-1.4-3.88-1.4-.53-1.35-1.3-1.7-1.3-1.7-1.06-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.76.4-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.3 1.18-3.1-.12-.3-.5-1.48.1-3.08 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.5 3.17-1.18 3.17-1.18.62 1.6.23 2.78.12 3.08.74.8 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.28 5.7.42.36.78 1.05.78 2.12v3.14c0 .31.2.68.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>',
  orcid: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zM7.37 18.16H5.54V7.98h1.83v10.18zM6.45 6.74a1.07 1.07 0 1 1 0-2.13 1.07 1.07 0 0 1 0 2.13zm12.1 11.42h-1.82v-4.96c0-1.18-.02-2.7-1.65-2.7s-1.9 1.28-1.9 2.61v5.05h-1.82V7.98h1.75v1.39h.02c.24-.46.84-1.5 2.46-1.5 2.63 0 3.12 1.73 3.12 3.99v6.3z"/></svg>',
  pdf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>',
};

const SOCIAL_ORDER = [
  ["google_scholar", "scholar", "Google Scholar"],
  ["twitter", "twitter", "Twitter / X"],
  ["github", "github", "GitHub"],
  ["linkedin", "linkedin", "LinkedIn"],
  ["orcid", "orcid", "ORCID"],
];

/* ---------- NAV ---------- */
function initNav() {
  const toggle = $(".nav__toggle");
  const links = $(".nav__links");
  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("open"));
    $$(".nav__links a").forEach((a) =>
      a.addEventListener("click", () => links.classList.remove("open"))
    );
  }
  // highlight active link
  const page = document.body.dataset.page;
  $$(".nav__links a").forEach((a) => {
    if (a.dataset.nav === page) a.classList.add("is-active");
  });
}

/* ---------- HOME / HERO ---------- */
async function renderProfile() {
  const mount = $("#profile");
  if (!mount) return;
  try {
    const p = await getJSON("profile.json");

    document.title = `${p.name}`;
    $$("[data-brand]").forEach((b) => (b.textContent = p.name));

    const socials = SOCIAL_ORDER.filter(([k]) => p.links && p.links[k])
      .map(([k, icon, label]) =>
        `<a href="${p.links[k]}" target="_blank" rel="noopener" title="${label}" aria-label="${label}">${ICON[icon]}</a>`
      ).join("");

    const affil = (p.affiliation || []).map((l) => `<div>${l}</div>`).join("");
    const bio = (p.bio || []).map((para) => `<p>${para}</p>`).join("");
    const interests = (p.research_interests || [])
      .map((i) => `<li>${i}</li>`).join("");

    mount.innerHTML = `
      <div class="hero__grid">
        <aside class="hero__aside">
          <img class="hero__photo" src="${p.photo}" alt="${p.name}"
               onerror="this.style.display='none'">
          <ul class="contact-list">
            <li><span class="ic">${ICON.mail}</span><a href="mailto:${p.email}">${p.email}</a></li>
            ${p.location ? `<li><span class="ic">📍</span>${p.location}</li>` : ""}
          </ul>
          <div class="social">${socials}</div>
          ${p.cv ? `<a class="btn" href="${p.cv}" target="_blank" rel="noopener">${ICON.pdf} Curriculum Vitae</a>` : ""}
        </aside>

        <div>
          <h1 class="hero__name">${p.name}</h1>
          <p class="hero__tagline">${p.tagline || ""}</p>
          <div class="hero__affil">${affil}</div>
          <div class="hero__bio">${bio}</div>
          ${interests ? `<ul class="interests">${interests}</ul>` : ""}
        </div>
      </div>`;
  } catch (e) {
    mount.innerHTML = `<p class="empty">${e.message}</p>`;
  }
}

/* ---------- PUBLICATIONS ---------- */
function pubLinks(pub) {
  const L = pub.links || {};
  const items = [];
  if (L.pdf)   items.push(`<a href="${L.pdf}" target="_blank" rel="noopener">PDF</a>`);
  if (L.doi)   items.push(`<a href="${L.doi}" target="_blank" rel="noopener">DOI</a>`);
  if (L.code)  items.push(`<a href="${L.code}" target="_blank" rel="noopener">Code</a>`);
  if (L.slides)items.push(`<a href="${L.slides}" target="_blank" rel="noopener">Slides</a>`);
  if (L.abstract && pub.abstract)
    items.push(`<button type="button" data-abstract>Abstract</button>`);
  return items.length ? `<div class="pub__links">${items.join("")}</div>` : "";
}

function pubCard(pub) {
  const award = pub.award
    ? `<div class="pub__award">★ ${pub.award}</div>` : "";
  const venue = pub.venue_detail || pub.venue || "";
  const venueHtml = venue
    ? `<p class="pub__venue"><span class="venue-name">${pub.venue || ""}</span>${
        pub.venue_detail ? " · " + pub.venue_detail.replace(pub.venue + ", ", "") : ""
      }</p>` : "";
  const note = pub.note ? `<p class="pub__note">${pub.note}</p>` : "";
  const abstract = pub.abstract
    ? `<div class="pub__abstract"><strong>Abstract.</strong> ${pub.abstract}</div>` : "";

  const card = el(`
    <article class="pub">
      <div class="pub__year">${pub.year || ""}</div>
      <div class="pub__body">
        <h3 class="pub__title">${pub.title}</h3>
        <p class="pub__authors">${formatAuthors(pub.authors || [])}</p>
        ${venueHtml}
        ${award}
        ${note}
        ${pubLinks(pub)}
        ${abstract}
      </div>
    </article>`);

  const btn = $("[data-abstract]", card);
  if (btn) btn.addEventListener("click", () => $(".pub__abstract", card).classList.toggle("open"));
  return card;
}

function pubGroup(title, subtitle, list) {
  const wrap = el(`
    <section class="pub-group">
      <h3 class="pub-group__title">${title} <span class="count">${list.length}</span></h3>
      ${subtitle ? `<p class="pub-group__sub">${subtitle}</p>` : ""}
      <div class="pub-group__list"></div>
    </section>`);
  const listEl = $(".pub-group__list", wrap);
  if (!list.length) {
    listEl.innerHTML = `<p class="empty">Nothing here yet.</p>`;
  } else {
    list.forEach((p) => listEl.appendChild(pubCard(p)));
  }
  return wrap;
}

async function renderPublications() {
  const mount = $("#publications");
  if (!mount) return;
  try {
    const data = await getJSON("publications.json");
    const pubs = data.publications || [];
    const byYear = (a, b) => (b.year || 0) - (a.year || 0);

    const working   = pubs.filter((p) => p.status === "working").sort(byYear);
    const published = pubs.filter((p) => p.status === "published").sort(byYear);

    mount.innerHTML = "";
    const limit = mount.dataset.limit ? parseInt(mount.dataset.limit, 10) : Infinity;

    if (mount.dataset.only === "working") {
      mount.appendChild(pubGroup("Working Papers", "Manuscripts under review or in preparation.", working));
    } else if (mount.dataset.only === "published") {
      mount.appendChild(pubGroup("Published Papers", "Peer-reviewed journal articles and conference proceedings.", published));
    } else {
      mount.appendChild(pubGroup("Working Papers", "Manuscripts under review or in preparation.", working.slice(0, limit)));
      mount.appendChild(pubGroup("Published Papers", "Peer-reviewed journal articles and conference proceedings.", published.slice(0, limit)));
    }
  } catch (e) {
    mount.innerHTML = `<p class="empty">${e.message}</p>`;
  }
}

/* ---------- NEWS ---------- */
async function renderNews() {
  const mount = $("#news");
  if (!mount) return;
  try {
    const data = await getJSON("news.json");
    let items = data.news || [];
    const limit = mount.dataset.limit ? parseInt(mount.dataset.limit, 10) : Infinity;
    items = items.slice(0, limit);
    mount.innerHTML = items.length
      ? `<ul class="news-list">${items
          .map((n) => `<li><span class="news__date">${n.date}</span><span class="news__body">${n.content}</span></li>`)
          .join("")}</ul>`
      : `<p class="empty">No news yet.</p>`;
  } catch (e) {
    mount.innerHTML = `<p class="empty">${e.message}</p>`;
  }
}

/* ---------- PARTNERS ---------- */
async function renderPartners() {
  const mount = $("#partners");
  if (!mount) return;
  try {
    const data = await getJSON("partners.json");
    const list = data.partners || [];
    mount.innerHTML = list.length
      ? `<div class="partner-grid">${list
          .map((p) => {
            const head = p.url
              ? `<a href="${p.url}" target="_blank" rel="noopener">${p.name}</a>`
              : p.name;
            return `<article class="partner-card">
              ${p.role ? `<span class="partner-card__role">${p.role}</span>` : ""}
              <h3 class="partner-card__name">${head}</h3>
              <p class="partner-card__desc">${p.description || ""}</p>
            </article>`;
          })
          .join("")}</div>`
      : `<p class="empty">No partners listed yet.</p>`;
  } catch (e) {
    mount.innerHTML = `<p class="empty">${e.message}</p>`;
  }
}

/* ---------- boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initNav();
  renderProfile();
  renderPublications();
  renderNews();
  renderPartners();
  const yr = $("#year");
  if (yr) yr.textContent = new Date().getFullYear();
});
