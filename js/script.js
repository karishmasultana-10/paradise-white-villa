// Price rates
const weekdayRate = 18000; // Monday to Thursday
const weekendRate = 23000; // Friday to Sunday

// Function to calculate the price
function calculatePrice() {
    let basePrice = 18000; // Default price for weekdays
    let totalGuests = parseInt(document.getElementById("guests").value) || 0;
    let roomType = document.getElementById("room-type").value;
    let checkinDate = new Date(document.getElementById("checkin").value);
    let checkoutDate = new Date(document.getElementById("checkout").value);
    
    // Calculate number of nights
    let nights = Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
    if (nights <= 0) {
        alert("Please select valid check-in and check-out dates.");
        return;
    }

    // Adjust price for weekends
    let dayOfWeek = checkinDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    if (dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0) { // Friday to Sunday
        basePrice = 23000;
    }

    // Additional charges
    let extraCampfire = document.getElementById("campfire").checked ? 1000 : 0;
    let extraBreakfast = document.getElementById("breakfast").checked ? totalGuests * 100 : 0;

    // Calculate total price
    let totalPrice = (basePrice * nights) + extraCampfire + extraBreakfast;
    
    // Display total price
    document.getElementById("total-price").textContent = totalPrice;
}

// Function to initiate Razorpay payment
function initiatePayment() {
    const totalPrice = document.getElementById("total-price").innerText;
    
    if (totalPrice === "0") {
        alert("Please calculate the price before proceeding to payment.");
        return;
    }

    const options = {
        "key": "rzp_live_cdyu5RtyKsMS6u", // Replace with your Razorpay Key
        "amount": totalPrice * 100, // Convert to paise
        "currency": "INR",
        "name": "Paradise White Villa",
        "description": "Villa Booking Payment",
        "image": "images/logo.png", // Replace with your logo image
        "handler": function (response) {
            alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
        },
        "prefill": {
            "name": "Guest",
            "email": "guest@example.com",
            "contact": "9999999999"
        },
        "theme": {
            "color": "#00796b"
        }
    };

    const rzp = new Razorpay(options);
    rzp.open();
}

