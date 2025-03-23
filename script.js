// Initialize an empty cart
let cart = [];

// Function to add product to cart
function addToCart(productId, productName, productPrice) {
    // Create a product object
    const product = {
        id: productId,
        name: productName,
        price: productPrice,
        quantity: 1
    };

    // Check if the product is already in the cart
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        // If product already exists, increase the quantity
        existingProduct.quantity += 1;
    } else {
        // Otherwise, add the new product to the cart
        cart.push(product);
    }

    // Update the cart UI
    updateCartUI();
}

// Function to update the cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');

    // Update cart count
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Clear the cart list
    cartList.innerHTML = '';

    // Update cart list
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - Rs ${item.price} x ${item.quantity}`;
        cartList.appendChild(listItem);
    });

    // Calculate and display the total price
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    cartTotal.textContent = `Total: Rs ${totalPrice}`;
}

// Function to handle the cart toggle (open and close the cart)
function toggleCart() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.classList.toggle('active');
}

// Add event listeners to add to cart buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const productId = button.getAttribute('data-id');
        const productName = button.getAttribute('data-name');
        const productPrice = parseInt(button.getAttribute('data-price'), 10);
        
        // Call the function to add the product to the cart
        addToCart(productId, productName, productPrice);
    });
});

// Handle the cart toggle button
const cartToggleButton = document.getElementById('cart-toggle');
cartToggleButton.addEventListener('click', toggleCart);

// Initial update of the cart UI
updateCartUI();
