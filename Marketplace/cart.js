// cart.js

// Example cart data structure
let cart = [];

// Function to add a product to the cart
function addToCart(productId) {
    const product = getProductById(productId);

    if (product) {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
        });

        // Update the UI or perform any additional actions (e.g., display a success message)
        console.log(`${product.name} added to cart!`);
    } else {
        console.error(`Product with ID ${productId} not found.`);
    }
}

// Function to get product details by ID
function getProductById(productId) {
    // You may want to replace this with actual product data retrieval logic
    return products.find(product => product.id === productId);
}

// Function to display the cart items in the cart.html page
function displayCart() {
    // You can update this function to display the cart items in your cart.html page
    console.log("Cart items:", cart);
}
