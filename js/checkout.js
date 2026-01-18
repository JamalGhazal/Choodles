const cartDiv = document.getElementById("cart-items");
const totalDiv = document.getElementById("cart-total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

if (cart.length === 0) {
  cartDiv.innerHTML = "<p>Your cart is empty.</p>";
} else {
  let grandTotal = 0;

  cart.forEach((item, index) => {
    grandTotal += item.total;

    const div = document.createElement("div");
    div.className = "menu-item";

    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>Quantity: ${item.quantity}</p>
      <ul>
        ${item.toppings.map(t => `<li>${t.name} (+£${t.price})</li>`).join("")}
      </ul>
      <strong>Item total: £${item.total.toFixed(2)}</strong>
      <br><br>
      <button onclick="removeItem(${index})">Remove</button>
    `;

    cartDiv.appendChild(div);
  });

  totalDiv.innerText = `Total: £${grandTotal.toFixed(2)}`;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}
