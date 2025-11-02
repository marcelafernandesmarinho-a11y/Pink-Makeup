:root{
  --pink:#ffc7e6;
  --hot:#ff1f86;
  --cream:#fff1d6;
  --text:#111;
  --card-bg:#fff;
  --radius:18px;
  font-family: "Trebuchet MS", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}
*{box-sizing:border-box}
body{margin:0;background:#fff;font-size:16px;color:var(--text);-webkit-font-smoothing:antialiased}

/* header */
.top{
  background:var(--pink);
  padding:22px 18px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
  flex-wrap:wrap;
  position:sticky;
  top:0;
  z-index:40;
  border-bottom:4px solid rgba(0,0,0,.03);
}
.branding{
  display:flex;
  align-items:center;
  gap:18px;
}
.logo{
  font-size:44px;
  font-weight:800;
  letter-spacing:1px;
}
.tagline{
  font-size:16px;
  margin-top:6px;
  color:#222;
  letter-spacing:2px;
}
.search-wrap{
  display:flex;
  align-items:center;
  gap:8px;
  margin-left:auto;
}
.search{
  border-radius:28px;
  border:2px solid rgba(0,0,0,.06);
  padding:8px 12px;
  min-width:200px;
  outline:none;
}
.icon-btn{
  background:var(--cream);
  border-radius:50%;
  width:44px;height:44px;
  display:grid;place-items:center;
  box-shadow:0 2px 6px rgba(0,0,0,.06);
  cursor:pointer;
}
.cart-count{position:relative;display:inline-block}
.cart-count .badge{
  position:absolute;top:-6px;right:-6px;background:var(--hot);color:#fff;font-weight:700;width:20px;height:20px;border-radius:50%;display:grid;place-items:center;font-size:12px;
}

/* products grid */
main{padding:28px;max-width:1200px;margin:0 auto;}
.products{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(190px,1fr));
  gap:22px;
}
.card{
  background:var(--card-bg);
  border-radius:16px;
  padding:12px;
  box-shadow:0 6px 20px rgba(0,0,0,.04);
  display:flex;
  flex-direction:column;
  align-items:stretch;
  min-height:300px;
}
.img{
  background:linear-gradient(135deg,#ffd1e8,#ffe9f8);
  border-radius:12px;
  padding:18px;
  aspect-ratio:1.1/1;
  display:grid;
  place-items:center;
  margin-bottom:12px;
}
.product-name{font-weight:700;text-align:center;margin:6px 0;font-size:18px}
.product-desc{font-size:13px;color:#444;text-align:center;margin-bottom:8px}
.price{background:var(--cream);padding:10px;border-radius:10px;text-align:center;font-weight:800;font-size:18px;margin-top:auto}
.controls{display:flex;gap:8px;align-items:center;justify-content:center;margin-top:8px}
.btn{padding:8px 10px;border-radius:10px;border:0;cursor:pointer;font-weight:700}
.btn-add{background:var(--hot);color:white}
.btn-view{background:transparent;border:2px solid rgba(0,0,0,.06)}

/* footer-ish */
.banner{
  margin:22px 0;
  text-align:center;
  padding:18px;border-radius:12px;background:linear-gradient(90deg, rgba(255,198,226,.2), rgba(255,235,214,.2));
  display:flex;align-items:center;justify-content:space-between;gap:12px;
}
.banner h2{margin:0;font-size:22px}
.banner p{margin:0;color:#333}

/* cart/checkout pages */
.page{display:none;padding:18px;max-width:900px;margin:12px auto;}
.page.active{display:block}
.cart-list{display:flex;flex-direction:column;gap:12px}
.cart-item{display:flex;gap:12px;align-items:center;padding:8px;border-radius:10px;border:1px solid rgba(0,0,0,.03)}
.cart-item img{width:72px;height:72px;border-radius:8px;object-fit:cover}
.qty{display:flex;gap:6px;align-items:center}
.qty button{padding:6px 10px;border-radius:8px;background:#eee;border:0;cursor:pointer}
.summary{margin-top:12px;padding:12px;border-radius:10px;background:var(--cream);font-weight:700}
form .row{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px}
label{font-size:13px}
input,select{padding:10px;border-radius:8px;border:1px solid rgba(0,0,0,.08);min-width:180px;}
.payment-methods{display:flex;gap:8px}
.paybox{padding:10px;border-radius:10px;border:1px solid rgba(0,0,0,.06);cursor:pointer}
.paybox.active{box-shadow:0 6px 20px rgba(0,0,0,.06);border-color:var(--hot)}
.qr-sim{width:200px;height:200px;border-radius:12px;background:linear-gradient(135deg,#ffd1e8,#ffe9f8);display:grid;place-items:center;margin:6px 0}

/* responsive */
@media (max-width:520px){
  .logo{font-size:28px}
  .branding{flex-direction:column;align-items:flex-start}
  .search{min-width:120px}
}