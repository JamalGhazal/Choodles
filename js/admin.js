const ordersDiv = document.getElementById("orders");
const orders = JSON.parse(localStorage.getItem("adminOrders")) || [];

if (orders.length === 0) {
  ordersDiv.innerHTML = "<p>No orders yet.</p>";
} else {
  orders.forEach((order, index) => {
    const div = document.createElement("div");
    div.className = "menu-item";

    div.innerHTML = `
      <h3>Order ${index + 1}</h3>
      <p><strong>Name:</strong> ${order.user.name}</p>
      <p><strong>Flat:</strong> ${order.user.flat}</p>
      <p><strong>Time:</strong> ${new Date(order.date).toLocaleString()}</p>
      <ul>
        ${order.items.map(item =>
          `<li>${item.name} × ${item.quantity}</li>`
        ).join("")}
      </ul>
      <strong>Total: £${order.total.toFixed(2)}</strong>
    `;

    ordersDiv.appendChild(div);
  });
}
