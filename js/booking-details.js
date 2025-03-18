// Load booking details from localStorage
const bookingDetails = JSON.parse(localStorage.getItem("bookingDetails"));

if (bookingDetails) {
    document.getElementById("guest-name").textContent = bookingDetails.guestName;
    document.getElementById("guest-email").textContent = bookingDetails.guestEmail;
    document.getElementById("guest-phone").textContent = bookingDetails.guestPhone;
    document.getElementById("checkin-date").textContent = bookingDetails.checkinDate;
    document.getElementById("checkout-date").textContent = bookingDetails.checkoutDate;
    document.getElementById("guests").textContent = bookingDetails.guests;
    document.getElementById("room-type").textContent = bookingDetails.roomType;
    document.getElementById("extras").textContent = 
        (bookingDetails.extras.campfire ? "Campfire, " : "") +
        (bookingDetails.extras.breakfast ? "Breakfast" : "");
    document.getElementById("total-price").textContent = bookingDetails.totalPrice;
}

function payNow() {
    const totalPrice = bookingDetails.totalPrice;

    const options = {
        "key": "rzp_live_olZWPNDyOHUUTe", 
        "amount": totalPrice * 100, 
        "currency": "INR",
        "name": "Paradise White Villa",
        "description": "Villa Booking Payment",
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
