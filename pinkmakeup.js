// script.js - carrinho simples
document.addEventListener('DOMContentLoaded', () => {
  const addBtns = Array.from(document.querySelectorAll('.add-btn'));
  const cartCountEl = document.getElementById('cartCount');
  const cartBtn = document.getElementById('cartBtn');
  const cartDrawer = document.getElementById('cartDrawer');
  const closeCart = document.getElementById('closeCart');
  const cartItemsEl = document.getElementById('cartItems');
  const cartTotalEl = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');

  // estado do carrinho: { id: {id, title, price, qty} }
  const cart = {};

  function formatMoney(n){
    return 'R$' + Number(n).toFixed(0);
  }

  function updateCartUI(){
    const ids = Object.keys(cart);
    const totalQty = ids.reduce((s,id)=> s + cart[id].qty, 0);
    const totalPrice = ids.reduce((s,id)=> s + cart[id].qty * cart[id].price, 0);

    cartCountEl.textContent = totalQty;
    cartTotalEl.textContent = formatMoney(totalPrice);

    cartItemsEl.innerHTML = '';
    if(ids.length === 0){
      cartItemsEl.innerHTML = '<p class="empty">Seu carrinho está vazio.</p>';
      return;
    }

    ids.forEach(id => {
      const it = cart[id];
      const line = document.createElement('div');
      line.className = 'cart-line';
      line.innerHTML = `
        <div style="flex:1">
          <div style="font-weight:700">${it.title}</div>
          <div style="color:rgba(0,0,0,0.6);font-size:13px">${formatMoney(it.price)} x ${it.qty}</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end">
          <div style="display:flex;gap:6px">
            <button class="qty-btn" data-id="${id}" data-op="minus">-</button>
            <button class="qty-btn" data-id="${id}" data-op="plus">+</button>
          </div>
          <button class="remove-btn" data-id="${id}">Remover</button>
        </div>
      `;
      cartItemsEl.appendChild(line);
    });

    // eventos nos botões (delegação simples)
    Array.from(cartItemsEl.querySelectorAll('.qty-btn')).forEach(b=>{
      b.addEventListener('click', (e)=>{
        const id = b.dataset.id;
        const op = b.dataset.op;
        if(op === 'minus'){ cart[id].qty = Math.max(0, cart[id].qty - 1); if(cart[id].qty === 0) delete cart[id]; }
        else { cart[id].qty = cart[id].qty + 1; }
        updateCartUI();
      });
    });
    Array.from(cartItemsEl.querySelectorAll('.remove-btn')).forEach(b=>{
      b.addEventListener('click', ()=>{
        const id = b.dataset.id;
        delete cart[id];
        updateCartUI();
      });
    });
  }

  // adicionar produto
  addBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productEl = btn.closest('.product');
      const id = productEl.dataset.id;
      const price = Number(productEl.dataset.price);
      const title = productEl.querySelector('h3').textContent.trim();

      if(cart[id]) cart[id].qty += 1;
      else cart[id] = { id, title, price, qty: 1 };

      updateCartUI();
      // abre carrinho ao adicionar
      cartDrawer.classList.add('open');
    });
  });

  cartBtn.addEventListener('click', ()=> cartDrawer.classList.toggle('open'));
  closeCart.addEventListener('click', ()=> cartDrawer.classList.remove('open'));

  checkoutBtn.addEventListener('click', ()=>{
    const ids = Object.keys(cart);
    if(ids.length === 0){ alert('Seu carrinho está vazio.'); return; }
    // ação simples: simular finalização
    const total = ids.reduce((s,id)=> s + cart[id].qty * cart[id].price, 0);
    alert('Obrigado pela compra! Total: ' + formatMoney(total) + '\n(este é um demo — aqui você pode integrar um pagamento real)');
    // limpa carrinho
    Object.keys(cart).forEach(k=>delete cart[k]);
    updateCartUI();
    cartDrawer.classList.remove('open');
  });

  // inicializa
  updateCartUI();
});
document.addEventListener("DOMContentLoaded", () => {

  let cartCount = 0;

  const cartCountEl = document.getElementById("cartCount");
  const addBtns = document.querySelectorAll(".add-btn");

  addBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      cartCount++;
      cartCountEl.textContent = cartCount;
    });
  });

});
