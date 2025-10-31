let cart = [];

function addToCart(productName) {
    cart.push(productName);
    alert(`${productName} foi adicionado ao seu carrinho!`);
    console.log('Carrinho:', cart);
}


