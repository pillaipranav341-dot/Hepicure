// ============================================================
// HOME.JS
// ============================================================

let state = {
  search: '',
  veg: 'all',       // all | veg | nonveg
  category: 'all',  // all | breakfast | lunch | dinner | snacks | beverages
};

hepicureRequireAuth((user) => {
  document.getElementById('greeting').textContent = `Hungry, ${user.displayName ? user.displayName.split(' ')[0] : 'there'}?`;
  document.getElementById('user-name').textContent = user.displayName || user.email;
  document.getElementById('user-photo').src = user.photoURL || 'https://api.dicebear.com/7.x/initials/svg?seed=' + encodeURIComponent(user.email || 'U');
});

/* ---------- build category tabs ---------- */
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
      <div class="top-row">
        <div class="food-swatch bg${item.swatch}" style="width:100%;height:100px;">${item.emoji}</div>
      </div>
      <div class="top-row">${markHtml(item.type)}<span class="name" style="flex:1;">${item.name}</span></div>
      <div class="desc">${item.desc}</div>
      <div class="bottom-row">
        <span class="price">₹${item.price}</span>
        <button class="add-btn" onclick="this.classList.add('added'); this.textContent='Added';">Add</button>
      </div>
    </div>`;
}

/* ---------- render best sellers (fixed, not affected by tabs) ---------- */
function renderBestSellers() {
  const row = document.getElementById('bestseller-row');
  const items = HEPICURE_MENU.filter(i => i.bestSeller);
  row.innerHTML = items.map(bestSellerCard).join('');
}

/* ---------- render main menu grid based on state ---------- */
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
        <span class="mark lg"></span>
        <div>Nothing matches that search yet — try another dish or clear the filter.</div>
      </div>`;
    return;
  }

  grid.innerHTML = items.map(menuCard).join('');
}

renderBestSellers();
renderMenu();
