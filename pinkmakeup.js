// ===============================
// SITE MAKE ROSA — INTERAÇÕES JS
// ===============================

// Função para criar notificações fofas
function showToast(message, color = '#ff5a8a') {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.position = 'fixed';
  toast.style.bottom = '30px';
  toast.style.right = '30px';
  toast.style.background = color;
  toast.style.color = 'white';
  toast.style.padding = '14px 20px';
  toast.style.borderRadius = '12px';
  toast.style.boxShadow = '0 6px 20px rgba(255,90,138,0.3)';
  toast.style.fontWeight = '600';
  toast.style.fontFamily = 'Inter, sans-serif';
  toast.style.zIndex = '9999';
  toast.style.transition = 'opacity 0.4s ease';
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 2000);
}

// Clique no botão “Comprar Agora”
const buyBtn = document.querySelector('.btn-primary');
if (buyBtn) {
  buyBtn.addEventListener('click', () => {
    showToast('💄 Produto adicionado ao carrinho!');
    buyBtn.style.transform = 'scale(0.95)';
    setTimeout(() => (buyBtn.style.transform = 'scale(1)'), 150);
  });
}

// Clique no botão “Adicionar ao Carrinho”
const cartBtn = document.querySelector('.btn-ghost');
if (cartBtn) {
  cartBtn.addEventListener('click', () => {
    showToast('🛍️ Adicionado ao carrinho com sucesso!');
  });
}

// Efeito pulsante no botão “Comprar Agora” depois de 3 segundos
setTimeout(() => {
  if (buyBtn) {
    buyBtn.classList.add('pulse');
  }
}, 3000);

// Adiciona animação CSS por JS
const style = document.createElement('style');
style.textContent = `
@keyframes pulse {
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 90, 138, 0.4); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(255, 90, 138, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 90, 138, 0); }
}
.pulse {
  animation: pulse 1.8s infinite;
}
`;
document.head.appendChild(style);

// Simula envio do e-mail
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('📧 Obrigada! Te avisaremos das novidades 💕');
    form.reset();
  });
}

