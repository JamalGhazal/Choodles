const order = JSON.parse(localStorage.getItem("lastOrder"));

if (!order) {
  window.location.href = "index.html";
}

document.getElementById("user-name").innerText = order.user.name;
document.getElementById("user-flat").innerText = order.user.flat;

const summaryDiv = document.getElementById("order-summary");

order.items.forEach(item => {
  const div = document.createElement("div");
  div.className = "menu-item";

  div.innerHTML = `
    <h4>${item.name}</h4>
    <p>Quantity: ${item.quantity}</p>
    <ul>
      ${item.toppings.map(t => `<li>${t.name}</li>`).join("")}
    </ul>
    <strong>£${item.total.toFixed(2)}</strong>
  `;

  summaryDiv.appendChild(div);
});
