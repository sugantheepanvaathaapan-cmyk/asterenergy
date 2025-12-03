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
    // Get the redirect URL from the form
    const nextInput = orderForm.querySelector('input[name="_next"]');
    const redirectUrl = nextInput ? nextInput.value : 'tack.html';
    
    // Submit form via fetch to avoid page navigation
    e.preventDefault();
    
    const formData = new FormData(orderForm);
    
    try {
      const response = await fetch(orderForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        // Success - redirect to thank you page
        window.location.href = redirectUrl;
      } else {
        // Error - still redirect but show error message
        alert('Något gick fel. Du kommer att omdirigeras...');
        window.location.href = redirectUrl;
      }
    } catch (error) {
      // Network error - redirect anyway
      window.location.href = redirectUrl;
    }
  });
}

// Handle feedback form submission
const feedbackForm = document.querySelector("#feedback-form");
if (feedbackForm) {
  feedbackForm.addEventListener("submit", async (e) => {
    const nextInput = feedbackForm.querySelector('input[name="_next"]');
    const redirectUrl = nextInput ? nextInput.value : 'feedback-tack.html';
    
    // Submit form via fetch to avoid page navigation
    e.preventDefault();
    
    const formData = new FormData(feedbackForm);
    
    try {
      const response = await fetch(feedbackForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        // Success - redirect to thank you page
        window.location.href = redirectUrl;
      } else {
        // Error - still redirect but show error message
        alert('Något gick fel. Du kommer att omdirigeras...');
        window.location.href = redirectUrl;
      }
    } catch (error) {
      // Network error - redirect anyway
      window.location.href = redirectUrl;
    }
  });
}

