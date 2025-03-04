// Price rates
const weekdayRate = 18000; // Monday to Thursday
const weekendRate = 23000; // Friday to Sunday

// Function to calculate the price
function calculatePrice() {
    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;
    const guests = parseInt(document.getElementById("guests").value);
    const campfire = document.getElementById("campfire").checked;
    const breakfast = document.getElementById("breakfast").checked;
    
    if (!checkin || !checkout || guests <= 0) {
        alert("Please select check-in, check-out dates, and guests.");
        return;
    }

    // Convert dates to objects
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    const oneDay = 24 * 60 * 60 * 1000;
    
    // Calculate number of nights
    const nights = Math.round((checkoutDate - checkinDate) / oneDay);
    
    if (nights < 1) {
        alert("Check-out date must be after check-in date.");
        return;
    }

    let totalPrice = 0;

    // Loop through each night to apply weekday/weekend pricing
    for (let i = 0; i < nights; i++) {
        const currentDate = new Date(checkinDate);
        currentDate.setDate(checkinDate.getDate() + i);

        const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 6 = Saturday
        
        if (dayOfWeek >= 1 && dayOfWeek <= 4) {
            totalPrice += weekdayRate;
        } else {
            totalPrice += weekendRate;
        }
    }

    // Additional charges
    if (campfire) {
        totalPrice += 1000;
    }

    if (breakfast) {
        totalPrice += guests * 100 * nights;
    }

    // Display total price
    document.getElementById("total-price").innerText = totalPrice.toLocaleString();
}

// Function to initiate Razorpay payment
function initiatePayment() {
    const totalPrice = document.getElementById("total-price").innerText;
    
    if (totalPrice === "0") {
        alert("Please calculate the price before proceeding to payment.");
        return;
    }

    const options = {
        "key": "YOUR_RAZORPAY_KEY", // Replace with your Razorpay Key
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

