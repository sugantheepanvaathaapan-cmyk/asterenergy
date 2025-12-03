const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const buttons = document.querySelectorAll(".btn");

navToggle?.addEventListener("click", () => {
  navLinks?.classList.toggle("active");
  navToggle.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks?.classList.remove("active");
    navToggle.classList.remove("open");
  });
});

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

