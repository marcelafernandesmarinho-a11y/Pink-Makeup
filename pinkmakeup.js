document.addEventListener('DOMContentLoaded', () => {
    // 1. Definição de Elementos e Variáveis de Estado
    
    // Tenta carregar o carrinho do armazenamento local, se não existir, inicia um array vazio.
    let cart = JSON.parse(localStorage.getItem('makeupCart')) || [];
    const cartCountElement = document.getElementById('cart-count');
    const productsSection = document.getElementById('products');
    const cartButton = document.getElementById('cart-btn');
    const toastElement = document.getElementById('toast');

    // 2. Funções de Utilidade

    /**
     * Atualiza o contador de itens no ícone do carrinho.
     */
    const updateCartCount = () => {
        // Conta a quantidade total de ITENS (e não tipos de produto)
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        
        if (cartCountElement) {
            cartCountElement.textContent = totalItems;
        }
    };

    /**
     * Exibe uma notificação pop-up simples.
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
     * Adiciona ou incrementa a quantidade de um produto no carrinho.
     * @param {string} name - Nome do produto.
     * @param {number} price - Preço do produto.
     */
    const addToCart = (name, price) => {
        let existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            // Se o produto já existe, apenas incrementa a quantidade
            existingItem.quantity += 1;
            showToast(`Mais um(a) ${name} adicionado!`);
        } else {
            // Se for um novo produto, adiciona ao carrinho
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
            showToast(`"${name}" adicionado ao carrinho!`);
        }
        
        // Salva e atualiza a interface
        localStorage.setItem('makeupCart', JSON.stringify(cart));
        updateCartCount();
    };

    /**
     * Calcula o total de todos os itens no carrinho.
     */
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };


    // 3. Event Listeners (Ouvintes de Eventos)

    // A. Adiciona ouvinte para todos os botões 'Comprar'
    if (productsSection) {
        productsSection.addEventListener('click', (event) => {
            const button = event.target.closest('.buy');
            
            if (button) {
                event.preventDefault();
                
                // Pega os dados do produto dos atributos 'data-'
                const productName = button.getAttribute('data-name');
                const productPrice = parseFloat(button.getAttribute('data-price'));
                
                if (productName && !isNaN(productPrice)) {
                    addToCart(productName, productPrice);
                }
            }
        });
    }

    // B. Adiciona funcionalidade ao botão "Carrinho"
    if (cartButton) {
        cartButton.addEventListener('click', () => {
            if (cart.length === 0) {
                showToast("Seu carrinho está vazio!");
                return;
            }
            
            const total = calculateTotal();
            const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

            // Exibe a lista de itens e o total (simplificado para o toast)
            const itemNames = cart.map(item => `${item.name} (${item.quantity})`).join(', ');

            showToast(`Você tem ${itemCount} itens. Total: R$ ${total.toFixed(2)}.`);
            console.log("Itens no Carrinho:", cart);
        });
    }

    // 4. Inicialização
    updateCartCount();
});
