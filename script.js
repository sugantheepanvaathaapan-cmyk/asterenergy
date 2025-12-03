const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const buttons = document.querySelectorAll(".btn");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    navLinks.classList.toggle("active");
    navToggle.classList.toggle("open");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", (e) => {
      navLinks.classList.remove("active");
      navToggle.classList.remove("open");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
      navLinks.classList.remove("active");
      navToggle.classList.remove("open");
    }
  });
}

buttons.forEach((btn) => {
  btn.addEventListener("mousemove", (event) => {
    const rect = btn.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    btn.style.setProperty("--hover-x", `${x}px`);
    btn.style.setProperty("--hover-y", `${y}px`);
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll("section, .contact-card").forEach((block) => {
  block.classList.add("reveal");
  observer.observe(block);
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetID = anchor.getAttribute("href");
    const target = document.querySelector(targetID);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Handle form submission with redirect to confirmation page
const orderForm = document.querySelector("#order-form");
if (orderForm) {
  orderForm.addEventListener("submit", async (e) => {
    // If Formspree ID is still placeholder, just redirect to confirmation
    const formAction = orderForm.getAttribute("action");
    if (formAction && formAction.includes("YOUR_FORM_ID")) {
      e.preventDefault();
      // Still submit the form data but redirect immediately
      window.location.href = "tack.html";
      return;
    }
    // If Formspree is configured, let it handle normally
    // Formspree will redirect to tack.html automatically via _next parameter
  });
}

