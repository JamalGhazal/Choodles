const logoutBtn = document.getElementById("logout-btn");
const user = JSON.parse(localStorage.getItem("user"));

if (user && logoutBtn) {
  logoutBtn.style.display = "inline-block";
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("user");
    alert("Signed out");
    window.location.href = "index.html";
  });
}
