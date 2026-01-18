const form = document.getElementById("login-form");

form.addEventListener("submit", e => {
  e.preventDefault();

  const user = {
    name: document.getElementById("name").value,
    flat: document.getElementById("flat").value
  };

  localStorage.setItem("user", JSON.stringify(user));
  alert("Details saved!");
  window.location.href = "checkout.html";
});
