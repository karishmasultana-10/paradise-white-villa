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

// Function to handle guest details validation
function validateGuestDetails() {
    let guestName = document.getElementById("guest-name").value.trim();
    let guestEmail = document.getElementById("guest-email").value.trim();
    let guestPhone = document.getElementById("guest-phone").value.trim();
    
    // Validate Name
    if (guestName === "") {
        alert("Please enter your name.");
        return false;
    }

    // Validate Email
    if (!/\S+@\S+\.\S+/.test(guestEmail)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // Validate Phone Number (Assuming Indian number format)
    if (!/^\d{10}$/.test(guestPhone)) {
        alert("Please enter a valid 10-digit phone number.");
        return false;
    }

    return true;
}


// Function to initiate Razorpay payment
function initiatePayment() {

    if (!validateGuestDetails()) {
        return; // Stop payment if guest details are invalid
    }


    const totalPrice = document.getElementById("total-price").innerText;
    
    if (totalPrice === "0") {
        alert("Please calculate the price before proceeding to payment.");
        return;
    }

        // Get form values
    const bookingDetails = {
        guestName: document.getElementById("guest-name").value.trim(),
        guestEmail: document.getElementById("guest-email").value.trim(),
        guestPhone: document.getElementById("guest-phone").value.trim(),
        checkinDate: document.getElementById("checkin").value,
        checkoutDate: document.getElementById("checkout").value,
        guests: document.getElementById("guests").value,
        roomType: document.getElementById("room-type").value,
        extras: {
            campfire: document.getElementById("campfire").checked,
            breakfast: document.getElementById("breakfast").checked
        },
        totalPrice: totalPrice
    };
    
        // Save booking details to localStorage
    localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));
    // Redirect to booking details page after successful payment
            window.location.href = "booking-details.html";

    
}

