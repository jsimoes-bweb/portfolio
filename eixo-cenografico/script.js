const filters = document.querySelectorAll(".filter");
const items = document.querySelectorAll(".portfolio-item");

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filters.forEach((current) => current.classList.remove("active"));
    button.classList.add("active");

    items.forEach((item) => {
      const shouldShow = filter === "todos" || item.dataset.category === filter;
      item.hidden = !shouldShow;
    });
  });
});
