// Data for available cars (includes car parts too)
const availableCars = [
    { id: 1, name: "Brake Pad", price: 50, image: "Images/AutoParts/prake_pad.jpg" },
    { id: 2, name: "Air Filter", price: 25, image: "Images/AutoParts/air_filter.jpg" },
    { id: 3, name: "Battery", price: 100, image: "Images/AutoParts/battery.jpg" },
    { id: 4, name: "Spark Plug", price: 10, image: "Images/AutoParts/spark_plug.jpg" },
    { id: 5, name: "Tire", price: 120, image: "Images/AutoParts/tire.jpg" },
    { id: 6, name: "Headlight", price: 70, image: "Images/AutoParts/headlight.jpg" },
    { id: 7, name: "Radiator", price: 250, image: "Images/AutoParts/radiator.jpg" },
    { id: 8, name: "Clutch Disc", price: 180, image: "Images/AutoParts/clutch_disc.jpg" },
    { id: 9, name: "Fuel Pump", price: 200, image: "Images/AutoParts/fuel_pump.jpg" },
    { id: 10, name: "Exhaust System", price: 350, image: "Images/AutoParts/exhaust_system.jpg" },
    { id: 11, name: "Alternator", price: 220, image: "Images/AutoParts/alternator.jpg" },
    { id: 12, name: "Windshield Wiper", price: 18, image: "Images/AutoParts/windshield_wiper.jpg" }
];

// Shopping Cart Array
let shoppingCart = [];

// Load cart on page load
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    renderCart();
});

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('carShoppingCart');
    if (savedCart) {
        shoppingCart = JSON.parse(savedCart);
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('carShoppingCart', JSON.stringify(shoppingCart));
}

// Render cart UI
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
                    <th>الصورة</th>
                    <th>المنتج</th>
                    <th>السعر</th>
                    <th>الكمية</th>
                    <th>المجموع</th>
                    <th>الحذف</th>
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
                <td>$${car.price}</td>
                <td>
                    <div class="quantity-control">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="text" class="quantity-input" value="${item.quantity}" readonly />
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                </td>
                <td>$${itemTotal}</td>
                <td><button class="remove-btn" onclick="removeFromCart(${item.id})">×</button></td>
            </tr>
        `;
    });

    cartHTML += `
            </tbody>
        </table>
        <div class="cart-summary">
            <div class="cart-total">
                <span>المجموع الكلي:</span>
                <span>$${total}</span>
            </div>
            <button class="checkout-btn" onclick="proceedToCheckout()">إتمام الشراء</button>
        </div>
    `;

    cartContainer.innerHTML = cartHTML;
}

// Empty cart UI
function renderEmptyCart() {
    const cartContainer = document.getElementById('cartContainer');
    cartContainer.innerHTML = `
        <div class="empty-cart">
            <div class="empty-cart-icon">🛒</div>
            <h2>عربة التسوق الخاصة بك فارغة</h2>
            <p>لم تقم بإضافة أي منتجات بعد</p>
            <button class="continue-shopping" onclick="window.location.href='AutoParts.html'">مواصلة التسوق</button>
        </div>
    `;
}

// Format price
function formatPrice(price) {
    return price.toLocaleString('ar-SA');
}

// Add to cart
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

// Update quantity
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

// Remove from cart
function removeFromCart(carId) {
    shoppingCart = shoppingCart.filter(item => item.id !== carId);
    saveCart();
    renderCart();
}

// Go to checkout
function proceedToCheckout() {
    alert("سيتم نقلك إلى صفحة الدفع");
}

// Toast Notification
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
    toast.textContent = "تمت الإضافة إلى العربة!";
    document.body.appendChild(toast);

    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// Make functions global
window.addToCart = addToCart;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.proceedToCheckout = proceedToCheckout;