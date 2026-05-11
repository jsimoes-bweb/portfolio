const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const filterButtons = document.querySelectorAll(".filter-button");
const products = document.querySelectorAll(".product-card");
const cartItems = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");
const addButtons = document.querySelectorAll("[data-name][data-price]");
const contactForm = document.querySelector(".contact-form");
const cart = [];

const currency = new Intl.NumberFormat("pt-PT", {
  style: "currency",
  currency: "EUR",
});

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    products.forEach((product) => {
      product.classList.toggle(
        "hidden",
        filter !== "todos" && product.dataset.category !== filter,
      );
    });
  });
});

function renderCart() {
  cartItems.innerHTML = "";

  if (!cart.length) {
    cartItems.innerHTML = '<p class="empty-cart">Ainda sem produtos.</p>';
    cartTotal.textContent = currency.format(0);
    return;
  }

  cart.forEach((item) => {
    const row = document.createElement("div");
    row.className = "cart-row";
    row.innerHTML = `<span>${item.name}</span><strong>${currency.format(item.price)}</strong>`;
    cartItems.appendChild(row);
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = currency.format(total);
}

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    cart.push({
      name: button.dataset.name,
      price: Number(button.dataset.price),
    });
    renderCart();
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = contactForm.querySelector("button");
  button.textContent = "Pedido registado";
  setTimeout(() => {
    button.textContent = "Enviar pedido";
  }, 2200);
});
