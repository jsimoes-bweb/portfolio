const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const filters = document.querySelectorAll("[data-filter]");
const portfolioItems = document.querySelectorAll("[data-category]");
const bookingForm = document.querySelector(".booking-form");

const updateHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 24);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", () => {
  nav.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
});

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filters.forEach((item) => item.classList.toggle("active", item === button));
    portfolioItems.forEach((item) => {
      item.classList.toggle("hidden", filter !== "all" && item.dataset.category !== filter);
    });
  });
});

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(bookingForm);
  const subject = encodeURIComponent("Pedido de booking via site");
  const body = encodeURIComponent(
    `Nome: ${formData.get("name") || ""}\nEmail: ${formData.get("email") || ""}\nEvento: ${formData.get("event") || ""}\n\n${formData.get("message") || ""}`
  );

  window.location.href = `mailto:tatsh.sa@gmail.com?subject=${subject}&body=${body}`;
});
