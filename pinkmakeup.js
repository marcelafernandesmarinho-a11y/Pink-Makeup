// Data: 30 produtos
const products = Array.from({length:30}).map((_,i)=>({
  id: 'p'+(i+1),
  name: ['LENSO UMIDECIDO','LAPIS','PALETA DE SOMBRA','BATOM LIQUIDO','BLUSH','DELINEADOR','PO COMPACTO','CORRETIVO','MASCARA','TONICO'][i%10] + ' ' + (i+1),
  desc: 'Produto de qualidade. Embalagem compacta.',
  price: 10.00,
  image: 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='800' height='800'><rect width='100%' height='100%' fill='#fff'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='36' fill='#e64b9a'>Imagem ${i+1}</text></svg>`)
}));

const cartKey = 'pink_cart_v1';
let cart = JSON.parse(localStorage.getItem(cartKey) || '{}');
let couponApplied = 0;

// Helpers
function saveCart(){ localStorage.setItem(cartKey, JSON.stringify(cart)); updateCartBadge(); }
function formatBRL(n){ return 'R$' + n.toFixed(2).replace('.',','); }
function totalCart(){
  let sum=0;
  for(const pid in cart){
    const prod = products.find(p=>p.id===pid);
    if(prod) sum += prod.price * cart[pid];
  }
  return sum;
}
function updateCartBadge(){
  const badge = document.getElementById('cart-badge');
  const count = Object.values(cart).reduce((a,b)=>a+b,0);
  if(count>0){ badge.style.display='inline-block'; badge.textContent = count; }
  else badge.style.display='none';
}

// Render produtos
function renderProducts(filter=''){
  const container = document.getElementById('products');
  container.innerHTML = '';
  const q = filter.trim().toLowerCase();
  const list = products.filter(p=> !q || (p.name + ' ' + p.desc).toLowerCase().includes(q));
  list.forEach(p=>{
    const el = document.createElement('article');
    el.className = 'card';
    el.innerHTML = `
      <div class="img-wrap"><img src="${p.image}" alt="${p.name}"></div>
      <div class="prod-title">${p.name}</div>
      <div class="prod-desc">${p.desc}</div>
      <div class="price-panel">
        <div class="price">${formatBRL(p.price)}</div>
        <div class="add-line">adicionar ao carrinho</div>
      </div>
      <div class="controls">
        <button class="btn btn-primary" data-add="${p.id}">Adicionar</button>
        <button class="btn btn-outline" data-view="${p.id}">Ver</button>
      </div>
    `;
    container.appendChild(el);
  });
}

// Add to cart
function addToCart(pid, qty=1){
  cart[pid] = (cart[pid] || 0) + qty;
  saveCart();
  flashBadge();
}
function flashBadge(){
  const b = document.getElementById('cart-badge');
  b.style.display='inline-block';
  b.animate([{transform:'scale(1.3)'},{transform:'scale(1)'}],{duration:220});
}

// Show cart page
function showCart(){
  hideAllPages();
  document.getElementById('cart-page').classList.add('active');
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('main-view').style.display='none';

  const listEl = document.getElementById('cart-list');
  listEl.innerHTML = '';
  const keys = Object.keys(cart);
  if(keys.length===0){ document.getElementById('cart-empty').style.display='block'; }
  else{
    document.getElementById('cart-empty').style.display='none';
    keys.forEach(pid=>{
      const prod = products.find(p=>p.id===pid);
      const qty = cart[pid];
      const item = document.createElement('div');
      item.className='cart-item';
      item.innerHTML = `
        <img src="${prod.image}" alt="${prod.name}" />
        <div style="flex:1">
          <div style="font-weight:700">${prod.name}</div>
          <div style="color:#666">${prod.desc}</div>
        </div>
        <div style="text-align:right">
          <div style="font-weight:800">${formatBRL(prod.price)}</div>
          <div style="display:flex;gap:6px;align-items:center;justify-content:flex-end;margin-top:8px">
            <button data-dec="${pid}">-</button>
            <div style="padding:6px 10px;border:1px solid #eee;border-radius:6px">${qty}</div>
            <button data-inc="${pid}">+</button>
            <button data-rm="${pid}" style="margin-left:8px;background:transparent;border:0;color:#c00;cursor:pointer">Remover</button>
          </div>
        </div>
      `;
      listEl.appendChild(item);
    });

    // attach cart controls
    listEl.querySelectorAll('[data-inc]').forEach(b=>b.addEventListener('click',e=>{
      const id = e.currentTarget.getAttribute('data-inc');
      cart[id] = (cart[id]||0)+1; saveCart(); showCart();
    }));
    listEl.querySelectorAll('[data-dec]').forEach(b=>b.addEventListener('click',e=>{
      const id = e.currentTarget.getAttribute('data-dec');
      cart[id] = (cart[id]||0)-1; if(cart[id]<=0) delete cart[id];
      saveCart(); showCart();
    }));
    listEl.querySelectorAll('[data-rm]').forEach(b=>b.addEventListener('click',e=>{
      const id = e.currentTarget.getAttribute('data-rm'); delete cart[id]; saveCart(); showCart();
    }));
  }

  // totals
  const subtotal = totalCart();
  const shipping = subtotal > 0 ? 15.00 : 0.00;
  const discount = couponApplied || 0;
  const total = Math.max(0, subtotal - discount + shipping);

  document.getElementById('sub-val').textContent = formatBRL(subtotal);
  document.getElementById('ship-val').textContent = formatBRL(shipping);
  document.getElementById('discount-val').textContent = formatBRL(discount);
  document.getElementById('total-val').textContent = formatBRL(total);
}

// Checkout
function showCheckout(){
  hideAllPages();
  document.getElementById('checkout-page').classList.add('active');
  document.getElementById('main-view').style.display='none';

  const subtotal = totalCart();
  const shipping = subtotal > 0 ? 15.00 : 0.00;
  const discount = couponApplied || 0;
  const total = Math.max(0, subtotal - discount + shipping);
  document.getElementById('checkout-total').textContent = formatBRL(total);
}

// Hide pages and show main
function hideAllPages(){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('main-view').style.display='block';
}

// Basic CPF validation
function cleanCPF(cpf){ return (cpf||'').toString().replace(/[^\d]/g,''); }
function validateCPF(cpf){
  cpf = cleanCPF(cpf);
  if(!cpf || cpf.length !== 11) return false;
  if(/^(\\d)\\1+$/.test(cpf)) return false;
  let sum=0;
  for(let i=0;i<9;i++) sum += Number(cpf.charAt(i)) * (10 - i);
  let rev = 11 - (sum % 11); if(rev===10||rev===11) rev=0;
  if(rev !== Number(cpf.charAt(9))) return false;
  sum=0;
  for(let i=0;i<10;i++) sum += Number(cpf.charAt(i)) * (11 - i);
  rev = 11 - (sum % 11); if(rev===10||rev===11) rev=0;
  if(rev !== Number(cpf.charAt(10))) return false;
  return true;
}

// Events
document.addEventListener('DOMContentLoaded', ()=>{
  renderProducts();
  updateCartBadge();

  // product add / view handlers
  document.getElementById('products').addEventListener('click', e=>{
    const a = e.target.closest('[data-add]');
    if(a){ addToCart(a.getAttribute('data-add')); return; }
    const v = e.target.closest('[data-view]');
    if(v){ alert('Visualizar: ' + v.getAttribute('data-view')); }
  });

  // search
  const searchInput = document.getElementById('search-input');
  document.getElementById('search-btn').addEventListener('click', ()=> renderProducts(searchInput.value));
  searchInput.addEventListener('keydown', e=>{ if(e.key==='Enter') renderProducts(searchInput.value); });

  // open cart
  document.getElementById('open-cart').addEventListener('click', ()=> showCart());

  // cart page buttons
  document.getElementById('continue-shopping').addEventListener('click', ()=>{ hideAllPages(); renderProducts(); });
  document.getElementById('proceed-checkout').addEventListener('click', ()=> showCheckout());
  document.getElementById('back-to-cart').addEventListener('click', ()=> showCart());

  // coupon
  document.getElementById('apply-coupon').addEventListener('click', ()=>{
    const code = document.getElementById('coupon').value.trim().toUpperCase();
    if(code === '