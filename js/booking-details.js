
// Function to format date as "Sat, Feb 8, 2025"
function formatDate(dateString) {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Load booking details from localStorage
const bookingDetails = JSON.parse(localStorage.getItem("bookingDetails"));

// Load closed dates from localStorage (Managed in admin.js)
const closedDates = JSON.parse(localStorage.getItem("closedDates")) || [];

// Function to check if booking is in closed dates
function isBookingClosed(checkin, checkout) {
    const checkinDate = new Date(checkin).toISOString().split('T')[0];
    const checkoutDate = new Date(checkout).toISOString().split('T')[0];

    return closedDates.includes(checkinDate) || closedDates.includes(checkoutDate);
}

// Check if selected dates fall under closed dates
if (bookingDetails && isBookingClosed(bookingDetails.checkinDate, bookingDetails.checkoutDate)) {
    alert("Sorry, bookings are closed for the selected dates.");
    window.location.href = "index.html"; // Redirect to homepage
} else if (bookingDetails) {
    document.getElementById("guest-name").textContent = bookingDetails.guestName;
    document.getElementById("guest-email").textContent = bookingDetails.guestEmail;
    document.getElementById("guest-phone").textContent = bookingDetails.guestPhone;
    document.getElementById("checkin-date").textContent = formatDate(bookingDetails.checkinDate);
    document.getElementById("checkout-date").textContent = formatDate(bookingDetails.checkoutDate);
    document.getElementById("guests").textContent = bookingDetails.guests;
    document.getElementById("room-type").textContent = bookingDetails.roomType;

    // Handle Extras Formatting
    const extrasArray = [];
    if (bookingDetails.extras.campfire) extrasArray.push("Campfire");
    if (bookingDetails.extras.breakfast) extrasArray.push("Breakfast");
    document.getElementById("extras").textContent = extrasArray.join(", ") || "None";

    // Calculate Advance Payment (20% of Total Price)
    const totalPrice = Number(bookingDetails.totalPrice.replace(/,/g, ""));
    const advancePayment = (totalPrice * 0.2).toFixed(2);
    const remainingPayment = (totalPrice - advancePayment).toFixed(2);

    // Display Prices
    document.getElementById("total-price").textContent = `${totalPrice}`;
    document.getElementById("advance-payment").textContent = `${advancePayment}`;
    document.getElementById("remaining-payment").textContent = `${remainingPayment} (Pay @ Hotel)`;
}

// Payment Function
function payNow() {
    if (!bookingDetails) {
        alert("Booking details not found!");
        return;
    }

    const totalPrice = Number(bookingDetails.totalPrice.replace(/,/g, ""));
    const advancePayment = (totalPrice * 0.2).toFixed(2);

    const options = {
        "key": "rzp_live_olZWPNDyOHUUTe",
        "amount": advancePayment * 100, // Charge only 20% advance
        "currency": "INR",
        "name": "Paradise White Villa",
        "description": "Villa Booking Advance Payment",
        "image": "images/logo.png",
        "handler": function (response) {
            alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
            window.location.href = "payment-success.html"; // Redirect to success page
        },
        "prefill": {
            "name": bookingDetails.guestName,
            "email": bookingDetails.guestEmail,
            "contact": bookingDetails.guestPhone
        },
        "theme": {
            "color": "#00796b"
        }
    };

    const rzp = new Razorpay(options);
    rzp.open();
}


