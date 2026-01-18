const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  alert("Please sign in before checking out.");
  window.location.href = "login.html";
}
const deliveryDiv = document.getElementById("delivery-info");

deliveryDiv.innerHTML = `
  <p><strong>Name:</strong> ${user.name}</p>
  <p><strong>Deliver to:</strong> Flat ${user.flat}</p>
`;
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

const placeOrderBtn = document.getElementById("place-order");

if (placeOrderBtn) {
  placeOrderBtn.addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const user = JSON.parse(localStorage.getItem("user"));

    const order = {
      user,
      items: cart,
      date: new Date().toISOString()
    };

    localStorage.setItem("lastOrder", JSON.stringify(order));
    localStorage.removeItem("cart");

    window.location.href = "confirm.html";
  });
}
const payBtn = document.getElementById("pay-now");

if (payBtn) {
  payBtn.addEventListener("click", () => {
    window.location.href = "https://buy.stripe.com/cNi9AVbkxd1Bdrc9p21RC00";
  });
}
const payNowBtn = document.getElementById("pay-now");

if (payNowBtn) {
  payNowBtn.addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const user = JSON.parse(localStorage.getItem("user"));

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (!user) {
      alert("Please sign in first.");
      window.location.href = "login.html";
      return;
    }

    // OPTIONAL: save order before payment
    const order = {
      user,
      items: cart,
      total: cart.reduce((sum, i) => sum + i.total, 0),
      date: new Date().toISOString()
    };

    localStorage.setItem("lastOrder", JSON.stringify(order));

    // Redirect to Stripe
    window.location.href = "https://buy.stripe.com/cNi9AVbkxd1Bdrc9p21RC00";
  });
}

