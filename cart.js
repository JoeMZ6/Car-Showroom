const availableCars = [
    { id: 1, name: "Brake Pad", price: 2500, image: "Images/AutoParts/prake_pad.jpg" },
    { id: 2, name: "Air Filter", price: 1250, image: "Images/AutoParts/air_filter.jpg" },
    { id: 3, name: "Battery", price: 5000, image: "Images/AutoParts/battery.jpg" },
    { id: 4, name: "Spark Plug", price: 500, image: "Images/AutoParts/spark_plug.jpg" },
    { id: 5, name: "Tire", price: 6000, image: "Images/AutoParts/tire.jpg" },
    { id: 6, name: "Headlight", price: 3500, image: "Images/AutoParts/headlight.jpg" },
    { id: 7, name: "Radiator", price: 12500, image: "Images/AutoParts/radiator.jpg" },
    { id: 8, name: "Clutch Disc", price: 9000, image: "Images/AutoParts/clutch_disc.jpg" },
    { id: 9, name: "Fuel Pump", price: 10000, image: "Images/AutoParts/fuel_pump.jpg" },
    { id: 10, name: "Exhaust System", price: 17500, image: "Images/AutoParts/exhaust_system.jpg" },
    { id: 11, name: "Alternator", price: 11000, image: "Images/AutoParts/alternator.jpg" },
    { id: 12, name: "Windshield Wiper", price: 900, image: "Images/AutoParts/windshield_wiper.jpg" },
    { id: 13, name: "McLaren W1", price: 30000000, image: "/Images/Cars/maclaren.png" },
    { id: 14, name: "Mercedes-Benz B-Class 2022", price: 1500000, image: "/Images/Cars/mercedezBclass.png " },
    { id: 15, name: "Porsche 911", price: 3000000, image: "/Images/Cars/Car_ (4).webp" },
    { id: 17, name: "Lamborghini Centenario", price: 45000000, image: "./Images/Cars/lamborghini.png" },
    { id: 18, name: "Ferarri-296-GTB", price: 6500000, image: "./Images/Cars/Ferarri 296 gtb.png" },
    { id: 19, name: "BMW I8", price: 7000000, image: "./Images/cars/BMW I8.png" },
    { id: 20, name: "AUDI R8", price: 8500000, image:"./Images/Cars/audi r8.png" },
    { id: 21, name: "Bently GT", price: 7500000, image: "./Images/Cars/Bently GT.png" },
    { id: 22, name: "Mercedez Benz G63", price: 13000000, image: "./Images/Cars/mercedez g63.png" },
    { id: 24, name: "GMC Sierra", price: 6000000, image: "./Images/Cars/GMC Sierra.png" },
    { id: 25, name: "Cadillac ESCALADE IQ", price: 6900000, image: "./Images/Cars/Cadillac ESCALADElQ.png"},

];

let shoppingCart = [];

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    renderCart();
});

function loadCart() {
    const savedCart = localStorage.getItem('carShoppingCart');
    if (savedCart) {
        shoppingCart = JSON.parse(savedCart);
    }
}

function saveCart() {
    localStorage.setItem('carShoppingCart', JSON.stringify(shoppingCart));
}

function renderCart() {
    const cartContainer = document.getElementById('cartContainer');

    if (shoppingCart.length === 0) {
        renderEmptyCart();
        return;
    }

    let total = 0;

    let cartHTML = `
        <table class="cart-items">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
    `;

    shoppingCart.forEach(item => {
        const car = availableCars.find(c => c.id === item.id);
        const itemTotal = car.price * item.quantity;
        total += itemTotal;

        cartHTML += `
            <tr>
                <td><img src="${car.image}" width="100" /></td>
                <td>${car.name}</td>
                <td>EGP${car.price}</td>
                <td>
                    <div class="quantity-control">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="text" class="quantity-input" value="${item.quantity}" readonly />
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                </td>
                <td>EGP${itemTotal}</td>
                <td><button class="remove-btn" onclick="removeFromCart(${item.id})">×</button></td>
            </tr>
        `;
    });

    cartHTML += `
            </tbody>
        </table>
        <div class="cart-summary">
            <div class="cart-total">
                <span>TOTAL:</span>
                <span>EGP${total}</span>
            </div>
            <button class="checkout-btn" onclick="proceedToCheckout()">CHECK OUT</button>
        </div>
    `;

    cartContainer.innerHTML = cartHTML;
}

function renderEmptyCart() {
    const cartContainer = document.getElementById('cartContainer');
    cartContainer.innerHTML = `
        <div class="empty-cart">
            <div class="empty-cart-icon">🛒</div>
            <h2>EMPTY CART</h2>
            <p>You Haven't Added Any Product Yet<p>
            <button class="continue-shopping" onclick="window.location.href='AutoParts.html'">Keep Shopping</button>
        </div>
    `;
}

function formatPrice(price) {
    return price.toLocaleString('ar-SA');
}

function addToCart(carId, quantity = 1) {
    const existingItem = shoppingCart.find(item => item.id === carId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        shoppingCart.push({ id: carId, quantity });
    }
    saveCart();
    renderCart();
    showToast();
}

function updateQuantity(carId, qty) {
    if (qty < 1) {
        removeFromCart(carId);
        return;
    }
    const item = shoppingCart.find(item => item.id === carId);
    if (item) {
        item.quantity = qty;
        saveCart();
        renderCart();
    }
}

function removeFromCart(carId) {
    shoppingCart = shoppingCart.filter(item => item.id !== carId);
    saveCart();
    renderCart();
}

function proceedToCheckout() {
    alert("Proceeding to checkout...");
}

function showToast() {
    const toast = document.createElement('div');
    toast.id = 'toast';
    toast.style = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: #2ecc71;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 1000;
        display: none;
        transition: opacity 0.3s;
    `;
    toast.textContent = "Item added to cart!";
    document.body.appendChild(toast);

    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

window.addToCart = addToCart;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.proceedToCheckout = proceedToCheckout;