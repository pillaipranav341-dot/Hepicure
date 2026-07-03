// ============================================================
// HOME.JS
// ============================================================

const HEPICURE_TIFFIN_SERVICES = [
  { id:'tf-breakfast', name:'Morning Tiffin', desc:'Breakfast, delivered before 8 AM daily.', price:'From ₹89/meal', cat:'breakfast' },
  { id:'tf-lunch', name:'Office Lunch Box', desc:'Full thali, delivered to your desk by 1 PM.', price:'From ₹149/meal', cat:'lunch' },
  { id:'tf-dinner', name:'Evening Dabba', desc:'Light dinner, delivered by 8 PM.', price:'From ₹139/meal', cat:'dinner' },
  { id:'tf-snacks', name:'Snack Box', desc:'Evening bites, delivered with your 4 PM chai.', price:'From ₹59/box', cat:'snacks' },
  { id:'tf-all', name:'All-Day Plan', desc:'Breakfast, lunch & dinner in one subscription.', price:'From ₹349/day', cat:'all' },
];

let state = {
  search: '',
  veg: 'all',
  category: 'all',
};

hepicureRequireAuth((session) => {
  const firstName = session.name ? session.name.split(' ')[0].split('@')[0] : 'there';
  document.getElementById('greeting').textContent = `Hungry, ${firstName}?`;
  document.getElementById('user-name').textContent = session.name || 'Guest';
});

/* ---------- tiffin service catalog ---------- */
function tiffinCard(t) {
  return `
    <div class="tiffin-card">
      <span class="tiffin-mark on-dark sm"></span>
      <div class="t-name">${t.name}</div>
      <div class="t-desc">${t.desc}</div>
      <div class="t-price">${t.price}</div>
      <button class="t-cta" onclick="hepicureJumpToCategory('${t.cat}')">View menu →</button>
    </div>`;
}
document.getElementById('tiffin-row').innerHTML = HEPICURE_TIFFIN_SERVICES.map(tiffinCard).join('');

function hepicureJumpToCategory(cat) {
  state.category = cat;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.cat === cat));
  renderMenu();
  document.getElementById('menu-title').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/* ---------- category tabs ---------- */
const tabsEl = document.getElementById('tabs');
HEPICURE_CATEGORIES.forEach(cat => {
  const btn = document.createElement('button');
  btn.className = 'tab-btn' + (cat.id === 'all' ? ' active' : '');
  btn.textContent = cat.label;
  btn.dataset.cat = cat.id;
  btn.addEventListener('click', () => {
    state.category = cat.id;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMenu();
  });
  tabsEl.appendChild(btn);
});

/* ---------- veg / non-veg toggle ---------- */
document.querySelectorAll('#veg-toggle button').forEach(btn => {
  btn.addEventListener('click', () => {
    state.veg = btn.dataset.veg;
    document.querySelectorAll('#veg-toggle button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMenu();
  });
});

/* ---------- search ---------- */
document.getElementById('search-input').addEventListener('input', (e) => {
  state.search = e.target.value.trim().toLowerCase();
  renderMenu();
});

/* ---------- card builders ---------- */
function markHtml(type) {
  return `<span class="mark ${type === 'nonveg' ? 'nonveg' : ''}"></span>`;
}

function bestSellerCard(item) {
  return `
    <div class="bs-card">
      <span class="stamp">Best seller</span>
      <div class="food-swatch bg${item.swatch}">${item.emoji}</div>
      <div class="bs-body">
        <div class="row1">${markHtml(item.type)}<span class="name">${item.name}</span></div>
        <div class="price">₹${item.price}</div>
      </div>
    </div>`;
}

function menuCard(item) {
  return `
    <div class="menu-card">
      <div class="food-swatch bg${item.swatch}" style="width:100%;height:100px;">${item.emoji}</div>
      <div class="top-row">${markHtml(item.type)}<span class="name" style="flex:1;">${item.name}</span></div>
      <div class="desc">${item.desc}</div>
      <div class="bottom-row">
        <span class="price">₹${item.price}</span>
        <button class="add-btn" onclick="this.classList.add('added'); this.textContent='Added';">Add</button>
      </div>
    </div>`;
}

function renderBestSellers() {
  const row = document.getElementById('bestseller-row');
  const items = HEPICURE_MENU.filter(i => i.bestSeller);
  row.innerHTML = items.map(bestSellerCard).join('');
}

function renderMenu() {
  let items = HEPICURE_MENU.slice();

  if (state.category !== 'all') items = items.filter(i => i.category === state.category);
  if (state.veg !== 'all') items = items.filter(i => i.type === state.veg);
  if (state.search) items = items.filter(i => i.name.toLowerCase().includes(state.search) || i.desc.toLowerCase().includes(state.search));

  const grid = document.getElementById('menu-grid');
  const title = document.getElementById('menu-title');
  const eyebrow = document.getElementById('menu-eyebrow');

  const catLabel = HEPICURE_CATEGORIES.find(c => c.id === state.category)?.label || 'All dishes';
  title.textContent = state.category === 'all' ? 'All dishes' : catLabel;
  eyebrow.textContent = items.length + ' dish' + (items.length === 1 ? '' : 'es');

  if (items.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1;">
        <span class="tiffin-mark"></span>
        <div>Nothing matches that search yet — try another dish or clear the filter.</div>
      </div>`;
    return;
  }

  grid.innerHTML = items.map(menuCard).join('');
}

renderBestSellers();
renderMenu();
