document.addEventListener('DOMContentLoaded', () => {
    // 1. Variável para armazenar o estado do Carrinho
    // Usaremos localStorage para manter os itens mesmo após o usuário fechar a página.
    let cart = JSON.parse(localStorage.getItem('makeupCart')) || [];
    const cartCountElement = document.getElementById('cart-count');
    const productsSection = document.getElementById('products');
    const toastElement = document.getElementById('toast');

    // 2. Funções de Utilidade

    /**
     * Atualiza o contador de itens no ícone do carrinho.
     */
    const updateCartCount = () => {
        const count = cart.length;
        if (cartCountElement) {
            cartCountElement.textContent = count;
        }
    };

    /**
     * Exibe uma notificação pop-up simples.
     * @param {string} message - A mensagem a ser exibida.
     */
    const showToast = (message) => {
        if (toastElement) {
            toastElement.textContent = message;
            toastElement.classList.add('show');
            
            // Remove a notificação após 3 segundos
            setTimeout(() => {
                toastElement.classList.remove('show');
            }, 3000);
        }
    };

    /**
     * Adiciona um produto ao carrinho.
     * @param {string} name - Nome do produto.
     * @param {number} price - Preço do produto.
     */
    const addToCart = (name, price) => {
        const item = {
            name: name,
            price: price,
            quantity: 1 // Simplificado para 1 por item, pois todos custam R$10
        };

        // Adiciona o item (você pode modificar isso para aumentar a quantidade se o item já existir)
        cart.push(item);
        
        // Salva o carrinho no armazenamento local do navegador
        localStorage.setItem('makeupCart', JSON.stringify(cart));
        
        // Atualiza a interface
        updateCartCount();
        showToast(`"${name}" adicionado ao carrinho!`);
    };

    // 3. Event Listeners (Ouvintes de Eventos)

    // Adiciona o ouvinte para todos os botões 'Comprar'
    if (productsSection) {
        productsSection.addEventListener('click', (event) => {
            const button = event.target.closest('.buy');
            
            if (button) {
                // Previne o comportamento padrão do botão, se houver
                event.preventDefault();
                
                // Pega os dados do produto através dos atributos 'data-' no botão
                const productName = button.getAttribute('data-name');
                const productPrice = parseFloat(button.getAttribute('data-price'));
                
                if (productName && !isNaN(productPrice)) {
                    addToCart(productName, productPrice);
                } else {
                    console.error("Dados do produto ausentes ou inválidos.");
                }
            }
        });
    }

    // Opcional: Adicionar funcionalidade ao botão "Carrinho" (apenas exibe o total)
    const cartButton = document.getElementById('cart-btn');
    if (cartButton) {
        cartButton.addEventListener('click', () => {
            if (cart.length === 0) {
                showToast("Seu carrinho está vazio!");
                return;
            }
            
            // Calcula o valor total
            const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
            
            // Exibe uma mensagem com o total
            showToast(`Total do Carrinho: R$ ${total.toFixed(2)} (${cart.length} itens)`);
        });
    }

    // 4. Inicialização
    // Garante que o contador esteja correto quando a página carregar
    updateCartCount();
});
