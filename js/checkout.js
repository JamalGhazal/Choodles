// ================= CONFIG =================
const MAX_ITEMS_PER_FLAT = 2;

// ================= LOAD CART =================
const cartDiv = document.getElementById("cart-items");
const totalDiv = document.getElementById("cart-total");
const placeOrderBtn = document.getElementById("place-order");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ================= RENDER CART =================
if (cart.length === 0) {
  cartDiv.innerHTML = "<p>Your cart is empty.</p>";
  totalDiv.innerText = "";
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
        ${item.toppings.map(t => `<li>${t.name}</li>`).join("")}
      </ul>
      <strong>Item total: £${item.total.toFixed(2)}</strong>
      <br><br>
      <button onclick="removeItem(${index})">Remove</button>
    `;

    cartDiv.appendChild(div);
  });

  totalDiv.innerText = `Total: £${grandTotal.toFixed(2)}`;
}

// ================= REMOVE ITEM =================
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

// ================= PLACE ORDER =================
if (placeOrderBtn) {
  placeOrderBtn.addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const user = JSON.parse(localStorage.getItem("user"));

    // ---- LOGIN CHECK ----
    if (!user) {
      alert("Please sign in before placing an order.");
      window.location.href = "login.html";
      return;
    }

    // ---- EMPTY CART CHECK ----
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    // ---- FLAT LIMIT LOGIC ----
    const flatOrders =
      JSON.parse(localStorage.getItem("flatOrders")) || {};

    const flat = user.flat;

    const itemsInOrder = cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    const alreadyOrdered = flatOrders[flat] || 0;

    if (alreadyOrdered + itemsInOrder > MAX_ITEMS_PER_FLAT) {
      alert(
        `Launch Day limit reached.\n\nEach flat can order up to ${MAX_ITEMS_PER_FLAT} items today.`
      );
      return;
    }

    // ---- CREATE ORDER ----
    const order = {
      user,
      items: cart,
      total: cart.reduce((sum, i) => sum + i.total, 0),
      date: new Date().toISOString(),
      paid: false
    };

    // ---- SAVE LAST ORDER (CONFIRM PAGE) ----
    localStorage.setItem("lastOrder", JSON.stringify(order));

    // ---- SAVE FOR ADMIN ----
    const adminOrders =
      JSON.parse(localStorage.getItem("adminOrders")) || [];

    adminOrders.push(order);
    localStorage.setItem("adminOrders", JSON.stringify(adminOrders));

    // ---- UPDATE FLAT USAGE ----
    flatOrders[flat] = alreadyOrdered + itemsInOrder;
    localStorage.setItem("flatOrders", JSON.stringify(flatOrders));

    // ---- CLEAR CART & REDIRECT ----
    localStorage.removeItem("cart");
    window.location.href = "confirm.html";
  });
}
