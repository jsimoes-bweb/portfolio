const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const filters = document.querySelectorAll("[data-filter]");
const workCards = document.querySelectorAll("[data-category]");
const quoteForm = document.querySelector(".quote-form");

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 16);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;

    filters.forEach((item) => item.classList.toggle("is-active", item === button));
    workCards.forEach((card) => {
      card.classList.toggle("is-hidden", selected !== "all" && card.dataset.category !== selected);
    });
  });
});

quoteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = quoteForm.querySelector("button");
  const originalText = button.textContent;

  button.textContent = "Pedido registado";
  button.disabled = true;

  setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;
    quoteForm.reset();
  }, 1800);
});
