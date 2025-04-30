const cars = [
    {
        name: "Tesla Model S",
        description: "An electric car with outstanding performance and futuristic design.",
        type: "Sedan",
        image: "./Images/Cars/Tesla model s.png"
    },
    {
        name: "BMW i8",
        description: "A plug-in hybrid sports car with stunning design and efficiency.",
        type: "Sports Car",
        image: "./Images/cars/BMW I8.png"
    },
    {
        name: "Audi R8",
        description: "A luxury sports car with a powerful V10 engine and amazing speed.",
        type: "Supercar",
        image: "./Images/Cars/audi r8.png"
    },
    {
        name: "FERRARI 296 GTB",
        description: "The Ferrari 296 GTB is a mid-engine sports car that combines a V6 engine with an electric motor for a total output of 818 horsepower.",
        type: "Supercar",
        image: "./Images/Cars/Ferarri 296 gtb.png"
    },
    {
        name: "MercedesBenz G63",
        description: "The Mercedes-Benz G63 is a powerful luxury SUV with a bold, iconic design. Featuring a 4.0L V8 engine, it combines performance, off-road capability, and modern tech for an unforgettable driving experience.",
        type: "SUV",
        image: "./Images/Cars/mercedez g63.png"
    },
    {
        name: "Bentley GT",
        description: "Bentley Continental GT 2025 4.0T V8 is priced at 10,190,000 EGP inclusive of VAT. - Automatic steering wheel sound control and dimming mirror. This British Coupe comes with a 6.0-liter Petrol 8 engine, generating 542 horsepower and 770 Nm of torque.",
        type: "Petrol",
        image: "./Images/Cars/Bently GT.png"
    },
    {
        name: "Cadillac ESCALADElQ",
        description: "A luxury sports car with a powerful V10 engine and amazing speed.",
        type: "Supercar",
        image: "./Images/Cars/Cadillac ESCALADElQ.png"
    },
    {
        name: "GMC Sierra",
        description: "A luxury sports car with a powerful V10 engine and amazing speed.",
        type: "Supercar",
        image:  "./Images/Cars/GMC Sierra.png"
    },
];

let currentIndex = 0;

function updateCar() {
    const car = cars[currentIndex];

    document.getElementById('car-name').textContent = car.name;
    document.getElementById('car-description').textContent = car.description;
    document.getElementById('car-image').src = car.image;
    document.getElementById('car-features').innerHTML = `
        <li>Type: ${car.type}</li>
        `;
}

function startAutoChange() {
    setInterval(() => {
        currentIndex = (currentIndex + 1) % cars.length;
        updateCar();
    }, 3000); // change every 5 seconds
}

// Form handling
document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('customer-name').value;
    const phone = document.getElementById('customer-phone').value;
    const selectedCar = document.getElementById('selected-car').value;

    document.getElementById('form-result').textContent = `Thank you, ${name}! We will contact you soon about your ${selectedCar}. 📞`;
    
    // Clear the form
    this.reset();
});

// Start carousel
startAutoChange();
