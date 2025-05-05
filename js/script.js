
const form = document.getElementById("contato");
const msg = document.getElementById("mensagem");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // Impede o redirecionamento padrão

  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
    headers: { Accept: "application/json" },
  })
    .then((response) => {
      msg.innerHTML = "✅ Mensagem enviada com sucesso!";
      msg.style.color = "green";
      form.reset();
    })
    .catch((error) => {
      msg.innerHTML = "❌ Ocorreu um erro. Tente novamente.";
      msg.style.color = "red";
    });
});
