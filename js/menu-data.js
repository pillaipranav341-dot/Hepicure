// ============================================================
// MENU-DATA.JS
// Sample menu. Edit freely, or later swap this for a Firestore
// collection called "menu" with the same fields.
// swatch: 1 | 2 | 3 just picks a background tint for the card.
// ============================================================

const HEPICURE_MENU = [
  // ---------- breakfast ----------
  { id:'b1', name:'Millet Idli, Sambar & Chutney', category:'breakfast', type:'veg', price:99, emoji:'🍚', swatch:1, desc:'Steamed millet idlis with drumstick sambar.', bestSeller:true },
  { id:'b2', name:'Egg Bhurji & Multigrain Toast', category:'breakfast', type:'nonveg', price:129, emoji:'🍳', swatch:2, desc:'Spiced scrambled eggs, whole-grain toast.' },
  { id:'b3', name:'Moong Dal Chilla', category:'breakfast', type:'veg', price:89, emoji:'🥞', swatch:1, desc:'Protein-rich lentil pancakes, mint chutney.' },
  { id:'b4', name:'Overnight Oats & Berries', category:'breakfast', type:'veg', price:109, emoji:'🥣', swatch:3, desc:'Rolled oats, chia, seasonal berries.', bestSeller:true },
  { id:'b5', name:'Chicken Sausage & Egg Wrap', category:'breakfast', type:'nonveg', price:139, emoji:'🌯', swatch:2, desc:'Whole-wheat wrap, lean chicken sausage.' },

  // ---------- lunch ----------
  { id:'l1', name:'Dal Tadka, Rice & Roti Thali', category:'lunch', type:'veg', price:169, emoji:'🍛', swatch:1, desc:'Yellow dal, steamed rice, jeera roti, salad.', bestSeller:true },
  { id:'l2', name:'Grilled Chicken Power Bowl', category:'lunch', type:'nonveg', price:219, emoji:'🥗', swatch:2, desc:'Grilled chicken, quinoa, roasted veg.', bestSeller:true },
  { id:'l3', name:'Paneer Tikka Masala & Rice', category:'lunch', type:'veg', price:189, emoji:'🍲', swatch:1, desc:'Cottage cheese in tomato-onion gravy.' },
  { id:'l4', name:'Fish Curry & Red Rice', category:'lunch', type:'nonveg', price:229, emoji:'🐟', swatch:3, desc:'Coastal-style fish curry, red rice.' },
  { id:'l5', name:'Rajma Chawal Bowl', category:'lunch', type:'veg', price:149, emoji:'🍚', swatch:1, desc:'Slow-cooked kidney beans, steamed rice.' },

  // ---------- dinner ----------
  { id:'d1', name:'Vegetable Khichdi & Kadhi', category:'dinner', type:'veg', price:139, emoji:'🍲', swatch:1, desc:'Light, easy-to-digest evening comfort bowl.' },
  { id:'d2', name:'Butter Chicken (Lite) & Roti', category:'dinner', type:'nonveg', price:219, emoji:'🍗', swatch:2, desc:'Low-cream version of the classic, 2 rotis.', bestSeller:true },
  { id:'d3', name:'Palak Paneer & Jeera Rice', category:'dinner', type:'veg', price:179, emoji:'🥘', swatch:1, desc:'Spinach gravy, cottage cheese, cumin rice.' },
  { id:'d4', name:'Mutton Curry & Millet Roti', category:'dinner', type:'nonveg', price:259, emoji:'🍖', swatch:3, desc:'Slow-braised mutton, finger-millet roti.' },

  // ---------- snacks ----------
  { id:'s1', name:'Roasted Makhana Chaat', category:'snacks', type:'veg', price:79, emoji:'🥜', swatch:1, desc:'Roasted fox nuts tossed in tangy spice.', bestSeller:true },
  { id:'s2', name:'Chicken Seekh Skewers', category:'snacks', type:'nonveg', price:159, emoji:'🍢', swatch:2, desc:'Minced chicken skewers, mint yoghurt.' },
  { id:'s3', name:'Sprouts & Peanut Bhel', category:'snacks', type:'veg', price:69, emoji:'🥗', swatch:1, desc:'Sprouted moong, peanuts, tangy tamarind.' },
  { id:'s4', name:'Baked Samosa (Whole Wheat)', category:'snacks', type:'veg', price:59, emoji:'🥟', swatch:3, desc:'Air-fried, whole-wheat pastry, potato filling.' },

  // ---------- beverages ----------
  { id:'v1', name:'Turmeric Ginger Shot', category:'beverages', type:'veg', price:49, emoji:'🥤', swatch:2, desc:'Cold-pressed turmeric, ginger, lemon.', bestSeller:true },
  { id:'v2', name:'Buttermilk (Spiced)', category:'beverages', type:'veg', price:39, emoji:'🥛', swatch:1, desc:'Curd-based cooler, curry leaf tempering.' },
  { id:'v3', name:'Cold Coffee (No Sugar Added)', category:'beverages', type:'veg', price:79, emoji:'☕', swatch:3, desc:'Brewed cold, house almond milk.' },
  { id:'v4', name:'Beetroot & Carrot Juice', category:'beverages', type:'veg', price:69, emoji:'🧃', swatch:2, desc:'Cold-pressed, no added sugar.' },
];

const HEPICURE_CATEGORIES = [
  { id:'all', label:'All' },
  { id:'breakfast', label:'Breakfast' },
  { id:'lunch', label:'Lunch' },
  { id:'dinner', label:'Dinner' },
  { id:'snacks', label:'Snacks' },
  { id:'beverages', label:'Beverages' },
];
