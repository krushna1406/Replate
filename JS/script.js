// --- Demo data & mini state ---
const DATA = [
    { id: 1, title: "SpiceHub Restaurant", tag: ["restaurant", "veg"], qty: 60, window: "Pickup by 8:30 PM", area: "Kothrud", notes: "Veg thalis, rice, dal" },
    { id: 2, title: "OceanView Banquets (Wedding)", tag: ["events", "nonveg"], qty: 180, window: "Pickup by 11:00 PM", area: "Viman Nagar", notes: "Biryani (non‑veg), salad" },
    { id: 3, title: "GreenLeaf Caterers", tag: ["caterer", "veg"], qty: 120, window: "Pickup by 9:45 PM", area: "Hadapsar", notes: "Pulao, paneer, poori" },
    { id: 4, title: "Midnight Café", tag: ["restaurant", "nonveg"], qty: 25, window: "Pickup by 1:00 AM", area: "FC Road", notes: "Burgers, fries" },
    { id: 5, title: "Conference Lunch (Tech Park)", tag: ["events", "veg"], qty: 70, window: "Pickup by 7:30 PM", area: "Hinjawadi", notes: "North Indian buffet" }
];

const state = { search: "", filterTag: "" };

const $ = sel => document.querySelector(sel);
const listEl = $('#list');

function renderList() {
    const q = state.search.trim().toLowerCase();
    const tg = state.filterTag;
    const items = DATA.filter(x => {
        const matchesQ = !q || `${x.title} ${x.area} ${x.notes}`.toLowerCase().includes(q);
        const matchesT = !tg || x.tag.includes(tg);
        return matchesQ && matchesT;
    });

    listEl.innerHTML = items.map(x => `
        <article class="listing" role="article" aria-label="surplus-listing">
          <div style="display:flex; align-items:center; justify-content:space-between; gap:8px">
            <h3 style="margin:4px 0">${x.title}</h3>
            <span class="badge ${x.qty > 100 ? 'good' : 'warn'}">${x.qty} servings</span>
          </div>
          <p class="muted" style="margin:6px 0 10px">${x.notes}</p>
          <div class="meta">
            <span>📍 ${x.area}</span>
            <span>⏰ ${x.window}</span>
            <span>🏷️ ${x.tag.map(t => `#${t}`).join(' ')}</span>
          </div>
          <div style="display:flex; gap:8px; margin-top:12px">
            <button class="btn btn-primary" onclick="claim(${x.id})">Claim</button>
            <button class="btn btn-ghost" onclick="view(${x.id})">Details</button>
          </div>
        </article>
      `).join('');
}

function claim(id) {
    alert('For demo: NGO claim for listing #' + id + ' confirmed. Pickup slot reserved.');
}
function view(id) {
    const item = DATA.find(d => d.id === id);
    alert(`${item.title}\n${item.notes}\nLocation: ${item.area}\nWindow: ${item.window}`);
}

renderList();

// Toolbar hooks
$('#search').addEventListener('input', e => { state.search = e.target.value; renderList(); });
$('#filterTag').addEventListener('change', e => { state.filterTag = e.target.value; renderList(); });
$('#reset').addEventListener('click', () => { state.search = ''; state.filterTag = ''; $('#search').value = ''; $('#filterTag').value = ''; renderList(); });

// Modal logic
const modal = $('#modal');
const openers = ['#open-donate', '#open-donate-2', '#open-donate-3', '#open-login'];
openers.forEach(id => { const el = document.querySelector(id); if (el) el.addEventListener('click', () => modal.classList.add('show')); });
$('#close').addEventListener('click', () => modal.classList.remove('show'));
$('#cancel').addEventListener('click', () => modal.classList.remove('show'));

// Form submission (demo only)
const form = $('#form');
const formMsg = $('#formMsg');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());

    // tiny validations
    if ((payload.phone || '').replace(/\D/g, '').length < 10) {
        formMsg.innerHTML = '<span class="danger">Enter a valid contact number.</span>';
        return;
    }
    formMsg.textContent = 'Publishing...';
    setTimeout(() => {
        formMsg.innerHTML = '✅ Listed! NGOs nearby have been notified. Check your dashboard for claims.';
        form.reset();
    }, 600);
});

// Accessibility: close on backdrop click or Escape
modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('show') });
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') modal.classList.remove('show') });