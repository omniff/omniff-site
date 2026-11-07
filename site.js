// Animated sample search + reveal-on-scroll. No tracking or analytics.
const DEMO = [
  { q: "contract termination", tab: "All", rows: [["Service-agreement-2026.docx", "Documents\\Contracts", "Content"], ["Supplier-protocol.pdf", "Documents\\Contracts", "Content"], ["termination-notice-draft.txt", "Desktop", "Content"]] },
  { q: "invoice 12345", tab: "PDF", rows: [["2026-03-invoice.pdf", "Documents\\Invoices", "Content"], ["Invoice_12345_scan.pdf", "Downloads", "Content"]] },
  { q: "sea", tab: "Images", rows: [["IMG_4821.jpg", "Pictures\\Summer", "Tag", "sea · sky", 200], ["IMG_4833.jpg", "Pictures\\Summer", "Tag", "sea · sunset", 20], ["IMG_5012.jpg", "Pictures\\Holiday", "Tag", "beach · sea", 160]] },
];
const TABS = ["All", "PDF", "Word", "Excel", "Images", "Code"];
let timer = null;
const sleep = (ms) => new Promise((r) => (timer = setTimeout(r, ms)));
async function runDemo() {
  const qEl = document.getElementById("demo-q"), resEl = document.getElementById("demo-res"), tabsEl = document.getElementById("demo-tabs");
  if (!qEl) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  for (let i = 0; ; i = (i + 1) % DEMO.length) {
    const d = DEMO[i];
    tabsEl.innerHTML = TABS.map((t) => `<span class="${t === d.tab ? "on" : ""}">${t}</span>`).join("");
    resEl.innerHTML = "";
    qEl.textContent = "";
    for (const ch of d.q) { qEl.textContent += ch; if (!reduce) await sleep(70); }
    await sleep(reduce ? 0 : 250);
    for (const r of d.rows) {
      const li = document.createElement("li");
      const th = r[4] != null ? `<span class="th" style="background:linear-gradient(${r[4]}deg,#5b7be0,#e0a96b 60%,#3d8a5a)"></span>` : "";
      li.innerHTML = `${th}<div><div class="nm">${r[0]}</div><div class="pt">${r[1]}${r[3] ? ` · <span class="tg">${r[3]}</span>` : ""}</div></div><span class="badge">${r[2]}</span>`;
      resEl.appendChild(li);
      if (!reduce) await sleep(280);
    }
    await sleep(reduce ? 4000 : 2800);
  }
}
void runDemo();

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))), { threshold: 0.1 });
  document.querySelectorAll("section:not(.hero)").forEach((s) => { s.classList.add("reveal"); io.observe(s); });
}
