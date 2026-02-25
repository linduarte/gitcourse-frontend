document.addEventListener("DOMContentLoaded", () => {
  fetch("/gitcourse-frontend/nav-menu.html")
    .then(response => response.text())
    .then(html => {
      const container = document.getElementById("nav-menu");
      if (container) {
        container.innerHTML = html;
      }
    })
    .catch(err => console.error("Erro ao carregar o menu:", err));
});
