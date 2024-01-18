document.addEventListener("DOMContentLoaded", function () {
    const products = [
        { id: 1, name: "Princess Lip Tint", brand: "Beauty World", price: 19.99, image: "prod/product1.jpg" },
        { id: 2, name: "Healthy Lettuce", brand: "Ripe and Ready", price: 7.99, image: "prod/product2.png" },
        { id: 3, name: "Smart Watch", brand: "Infinity Tech", price: 59.50, image: "prod/product3.png" },
        { id: 4, name: "Black Bodycon and Gather Dress", brand: "Cassia's Clothing Store", price: 35.00, image: "prod/product4.png" },
        // Add more products as needed
    ];

    const sliderContainer = document.getElementById("product-slider");

    products.forEach(product => {
        const productItem = document.createElement("div");
        productItem.classList.add("slider-item");
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.brand}</p>
                <p>$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
            </div>
        `;
        sliderContainer.appendChild(productItem);
    });

    // Add event listener for the "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", addToCart);
    });

    function addToCart(event) {
        const productId = event.target.getAttribute("data-product-id");
        // Add your logic to add the product to the cart
        console.log(`Product added to cart - ID: ${productId}`);
    }
});
