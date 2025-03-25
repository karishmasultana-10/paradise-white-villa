document.addEventListener("DOMContentLoaded", function () {
    showClosedDates();
});

function showClosedDates() {
    const closedDatesList = document.getElementById("homeClosedDates");
    closedDatesList.innerHTML = "";

    // Get closed dates from localStorage
    let closedDates = JSON.parse(localStorage.getItem("closedDates")) || [];

    if (closedDates.length === 0) {
        closedDatesList.innerHTML = "<li>No closed dates at the moment.</li>";
    } else {
        closedDates.forEach((date) => {
            let li = document.createElement("li");
            li.textContent = date;
            closedDatesList.appendChild(li);
        });
    }
}
