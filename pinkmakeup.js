/* ---------- Data: 30 produtos gerados ---------- */
const placeholderSVG = encodeURIComponent(`
  <svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'>
    <rect width='100%' height='100%' fill='#ffd1e8'/>
    <g font-family='sans-serif' font-size='32' fill='#9b0f52' text-anchor='middle'>
      <text x='50%' y='45%'>Pink</text>
      <text x='50%' y='63%' font-size='20'>makeup</text>
    </g>
  </svg>`);
function imgData(){ return 'data:image/svg+xml;utf8,'+placeholderSVG; }

const products = Array.from({length:30}).map((_,i)=>({
  id: 'p'+(i+1),
  name: ['Paleta','Batom líquido','Lápis','Lenço umedecido','Sombra','Blush','Delineador','Pó compacto','Corretivo','Máscara de cílios'][i%10] + ' ' + (i+1),
  desc: 'Produto de qualidade. Embalagem compacta. Cor variada.',
  price: 10.00,
  image: imgData()
}));

/* ---------- App state ---------- */
const cartKey = 'pink_cart_v1';
let cart = JSON.parse(localStorage.getItem(cartKey) || '{}'); // {productId: qty}

/* ---------- Helpers ---------- */
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
  if(count>0){ badge.style.display='block'; badge.textContent = count; } else badge.style.display='none';
}

/* ---------- Render products ---------- */
function renderProducts(filter=''){
  const container = document.getElementById('products');
  container.innerHTML = '';
  const q = filter.trim().toLowerCase();
  const list = products.filter(p => !q || (p.name+p.desc).toLowerCase().includes(q));
  for(const p of list){
    const el = document.createElement('article');
    el.className='card';
    el.innerHTML = `
      <div class="img"><img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;border-radius:8px;object-fit:cover" /></div>
      <div class="product-name">${p.name}</div>
      <div class="product-desc">${p.desc}</div>
      <div class="controls">
        <button class="btn btn-add" data-add="${p.id}">Adicionar</button>
        <button class="btn btn-view" data-view="${p.id}">Ver</button>
      </div>
      <div class="price">${formatBRL(p.price)}</div>
    `;
    container.appendChild(el);
  }
}

/* ---------- Add to cart ---------- */
function addToCart(pid, qty=1){
  cart[pid] = (cart[pid]||0) + qty;
  saveCart();
  flashAdd();
}
function flashAdd(){
  const badge = document.getElementById('cart-badge');
  badge.style.display='block';
  badge.animate([{transform:'scale(1.4)'},{transform:'scale(1)'}],{duration:300});
}

/* ---------- Cart page render ---------- */
function showCartPage(){
  hideAllPages();
  document.getElementById('cart-page').classList.add('active');
  const listEl = document.getElementById('cart-list');
  const emptyEl = document.getElementById('cart-empty');
  const summary = document.getElementById('cart-summary');
  listEl.innerHTML='';
  const items = Object.keys(cart);
  if(items.length===0){
    emptyEl.style.display='block';
    summary.style.display='none';
    document.getElementById('cart-badge').style.display='none';
  } else {
    emptyEl.style.display='none';
    summary.style.display='block';
    for(const pid of items){
      const prod = products.find(p=>p.id===pid);
      const qty = cart[pid];
      const item = document.createElement('div');
      item.className='cart-item';
      item.innerHTML = `
        <img src="${prod.image}" alt="${prod.name}" />
        <div style="flex:1">
          <div style="font-weight:700">${prod.name}</div>
          <div style="color:#666;font-size:14px">${prod.desc}</div>
        </div>
        <div style="text-align:right">
          <div style="font-weight:800">${formatBRL(prod.price)}</div>
          <div class="qty" data-id="${pid}">
            <button data-dec="${pid}">-</button>
            <div style="padding:6px 10px;border-radius:8px;border:1px solid #eee">${qty}</div>
            <button data-inc="${pid}">+</button>
          </div>
          <div><button data-rm="${pid}" style="margin-top:6px;border:0;background:transparent;color:#c00;cursor:pointer">Remover</button></div>
        </div>
      `;
      listEl.appendChild(item);
    }
    // attach events
    listEl.querySelectorAll('[data-inc]').forEach(b=>b.addEventListener('click', e=>{
      const pid = e.currentTarget.getAttribute('data-inc'); cart[pid] = (cart[pid]||0)+1; saveCart(); showCartPage();
    }));
    listEl.querySelectorAll('[data-dec]').forEach(b=>b.addEventListener('click', e=>{
      const pid = e.currentTarget.getAttribute('data-dec');
      cart[pid] = (cart[pid]||0)-1;
      if(cart[pid]<=0) delete cart[pid];
      saveCart(); showCartPage();
    }));
    listEl.querySelectorAll('[data-rm]').forEach(b=>b.addEventListener('click', e=>{
      const pid = e.currentTarget.getAttribute('data-rm');
      delete cart[pid]; saveCart(); showCartPage();
    }));
    // totals
    const subtotal = totalCart();
    const shipping = subtotal > 0 ? 15.00 : 0.00; // exemplo fixo
    const total = subtotal + shipping;
    document.getElementById('sub-val').textContent = formatBRL(subtotal);
    document.getElementById('ship-val').textContent = formatBRL(shipping);
    document.getElementById('total-val').textContent = formatBRL(total);
  }
}

/* ---------- Checkout ---------- */
function showCheckout(){
  hideAllPages();
  document.getElementById('checkout-page').classList.add('active');
  const total = totalCart() + (totalCart()>0?15:0);
  document.getElementById('checkout-total').textContent = formatBRL(total);
}

/* ---------- Utilities: hide pages ---------- */
function hideAllPages(){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('main-view').style.display = 'none';
}
function showMain(){
  document.getElementById('main-view').style.display = 'block';
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
}

/* ---------- CPF validation (algoritmo padrão) ---------- */
function cleanCPF(cpf){ return (cpf||'').toString().replace(/[^\d]/g,''); }
function validateCPF(cpf){
  cpf = cleanCPF(cpf);
  if(!cpf || cpf.length !== 11) return false;
  if(/^(\d)\1+$/.test(cpf)) return false;
  let sum=0;
  for(let i=0;i<9;i++) sum += Number(cpf.charAt(i)) * (10 - i);
  let rev = 11 - (sum % 11);
  if(rev===10 || rev===11) rev = 0;
  if(rev !== Number(cpf.charAt(9))) return false;
  sum=0;
  for(let i=0;i<10;i++) sum += Number(cpf.charAt(i)) * (11 - i);
  rev = 11 - (sum % 11);
  if(rev===10 || rev===11) rev = 0;
  if(rev !== Number(cpf.charAt(10))) return false;
  return true;
}

/* ---------- Events ---------- */
document.addEventListener('DOMContentLoaded',()=>{
  renderProducts();
  updateCartBadge();

  // product add/view
  document.getElementById('products').addEventListener('click', e=>{
    const a = e.target.closest('[data-add]');
    if(a){ addToCart(a.getAttribute('data-add')); return; }
    const v = e.target.closest('[data-view]');
    if(v){ alert('Visualizar: ' + v.getAttribute('data-view')); }
  });

  // search
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  searchBtn.addEventListener('click', ()=> renderProducts(searchInput.value));
  searchInput.addEventListener('keydown', e=>{ if(e.key==='Enter') renderProducts(searchInput.value); });

  // open cart
  document.getElementById('open-cart').addEventListener('click', ()=>{
    if(Object.keys(cart).length===0){
      showMain(); window.scrollTo({top:0,behavior:'smooth'});
    } else showCartPage();
  });

  // back to shop
  document.getElementById('continue-shopping').addEventListener('click', ()=>{
    showMain();
  });
  document.getElementById('back-to-shop').addEventListener('click', ()=>{ showMain(); });
  document.getElementById('back-to-cart').addEventListener('click', ()=>{ showCartPage(); });

  // proceed to checkout
  document.getElementById('proceed-checkout').addEventListener('click', ()=>{ showCheckout(); });

  // pay method boxes
  document.querySelectorAll('.paybox').forEach(el=>{
    el.addEventListener('click', ()=>{
      document.querySelectorAll('.paybox').forEach(x=>x.classList.remove('active'));
      el.classList.add('active');
      const method = el.getAttribute('data-pay');
      document.getElementById('pix-box').style.display = method==='pix' ? 'block' : 'none';
      document.getElementById('card-box').style.display = method==='card' ? 'block' : 'none';
    });
  });

  // simulated payments
  document.getElementById('btn-pay-pix').addEventListener('click', ()=>{
    if(totalCart()<=0){ alert('Carrinho vazio'); return; }
    alert('Pagamento via PIX simulado realizado. Obrigada!');
    cart = {}; saveCart(); showMain(); renderProducts(); updateCartBadge();
  });

  document.getElementById('btn-pay-card').addEventListener('click', ()=>{
    const nome = document.getElementById('card-name').value.trim();
    const number = document.getElementById('card-number').value.replace(/\s+/g,'');
    const exp = document.getElementById('exp').value.trim();
    const cvv = document.getElementById('cvv').value.trim();
    if(!nome || number.length<13 || exp.length<4 || cvv.length<3){ alert('Preencha os dados do cartão corretamente.'); return; }
    alert('Pagamento com cartão simulado realizado. Obrigada!');
    cart = {}; saveCart(); showMain(); renderProducts(); updateCartBadge();
  });

  // Checkout form basic validation on submit attempt
  document.getElementById('checkout-form').addEventListener('submit', e=>{ e.preventDefault(); });

  // CPF validation on blur
  document.getElementById('cpf').addEventListener('blur', (ev)=>{
    const v = ev.target.value;
    if(v && !validateCPF(v)){
      alert('CPF inválido. Verifique e tente novamente.');
      ev.target.focus();
    }
  });

  // dynamic formatting for card input (space every 4 digits)
  const cardNumber = document.getElementById('card-number');
  cardNumber && cardNumber.addEventListener('input', (e)=>{
    let v = e.target.value.replace(/\D/g,'').slice(0,19);
    v = v.replace(/(\d{4})(?=\d)/g,'$1 ');
    e.target.value = v;
  });

  // clear search -> re-render
  document.getElementById('search-input').addEventListener('input', (e)=>{ if(!e.target.value) renderProducts(); });

});