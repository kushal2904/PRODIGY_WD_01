// Change navbar background color on scroll
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
  } else {
      navbar.classList.remove('scrolled');
  }
});

// Function to sanitize input (Prevents XSS)
function sanitizeInput(input) {
  return input.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();
}

// Prevents SQL Injection by allowing only alphanumeric characters
function validateInput(input) {
  const regex = /^[a-zA-Z0-9@. ]+$/;
  return regex.test(input);
}

// Handle form submission securely
document.getElementById('registration-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default submission

  // Get sanitized form data
  let name = sanitizeInput(document.getElementById('name').value);
  let email = sanitizeInput(document.getElementById('email').value);
  let eventSelected = document.getElementById('event').value;

  // Validate inputs
  if (!validateInput(name) || !validateInput(email)) {
      alert("Invalid characters detected. Please enter valid details.");
      return;
  }

  // Rate limiting (Prevent multiple submissions within 5 seconds)
  if (this.dataset.submitted && (Date.now() - this.dataset.submitted < 5000)) {
      alert("Please wait before submitting again.");
      return;
  }
  this.dataset.submitted = Date.now();

  // Display confirmation message
  alert(`Thank you for registering, ${name}! You have registered for ${eventSelected}. We will contact you at ${email}.`);

  // Reset form securely
  this.reset();
});

// Clickjacking Protection
if (window.top !== window.self) {
  window.top.location = window.self.location;
}

// Set up Content Security Policy (CSP)
const metaCSP = document.createElement('meta');
metaCSP.httpEquiv = "Content-Security-Policy";
metaCSP.content = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';";
document.head.appendChild(metaCSP);

// Secure Local Storage Example (Avoid storing sensitive data)
function storeSecureData(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value)); // Use sessionStorage instead of localStorage
}

function getSecureData(key) {
  return JSON.parse(sessionStorage.getItem(key));
}

document.addEventListener("DOMContentLoaded", function () {
  const eventsData = [
      { id: 1, name: "Rock Music Night", category: "music", region: "New-York", date: "2025-04-15", img: "event1.jpg" },
      { id: 2, name: "Tech Conference", category: "tech", region: "San-Francisco", date: "2025-05-10", img: "event2.jpg" },
      { id: 3, name: "Broadway Drama Show", category: "theatre", region: "Los-Angeles", date: "2025-06-01", img: "event3.jpg" }
  ];

  const eventList = document.getElementById("eventList");
  const filterBtn = document.getElementById("filterBtn");
  const searchBar = document.getElementById("searchBar");

  // Function to render events based on filters
  function renderEvents(filter = {}) {
      eventList.innerHTML = ""; // Clear previous events

      const filteredEvents = eventsData.filter(event => {
          return (
              (filter.category === "all" || event.category === filter.category) &&
              (filter.region === "all" || event.region === filter.region) &&
              (!filter.date || event.date === filter.date) &&
              (filter.search === "" || event.name.toLowerCase().includes(filter.search.toLowerCase()))
          );
      });

      filteredEvents.forEach(event => {
          const eventCard = document.createElement("div");
          eventCard.classList.add("event-card");
          eventCard.innerHTML = `
              <img src="${event.img}" alt="${event.name}">
              <h3>${event.name}</h3>
              <p>Category: ${event.category.toUpperCase()}</p>
              <p>Region: ${event.region.replace("-", " ")}</p>
              <p>Date: ${event.date}</p>
              <button class="book-btn" onclick="bookTicket('${event.name}')">Book Ticket</button>
          `;
          eventList.appendChild(eventCard);
      });
  }

  // Initial render with all events
  renderEvents({ category: "all", region: "all", date: "", search: "" });

  // Apply filters when button is clicked
  filterBtn.addEventListener("click", () => {
      const category = document.getElementById("category").value;
      const region = document.getElementById("region").value;
      const date = document.getElementById("date").value;
      renderEvents({ category, region, date, search: searchBar.value });
  });

  // Search events as user types
  searchBar.addEventListener("input", () => {
      renderEvents({
          category: document.getElementById("category").value,
          region: document.getElementById("region").value,
          date: document.getElementById("date").value,
          search: searchBar.value
      });
  });
});

// Redirect user to register
function bookTicket(eventName) {
  alert(`You are booking a ticket for: ${eventName}`);
  window.location.href = "#register";
}

function sanitizeInput(input) {
  return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

document.querySelector("form").addEventListener("submit", function (e) {
  const userInput = document.querySelector("#user-input").value;
  document.querySelector("#user-input").value = sanitizeInput(userInput);
});


