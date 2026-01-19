const MAX_ITEMS_PER_FLAT = 2;

if (placeOrderBtn) {
  placeOrderBtn.addEventListener("click", () => {
    ...
  });
}

const placeOrderBtn = document.getElementById("place-order");

if (placeOrderBtn) {
  placeOrderBtn.addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please sign in first.");
      window.location.href = "login.html";
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    // ---------- FLAT LIMIT LOGIC ----------
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
        `Launch Day limit reached.\n\n` +
        `Each flat can order up to ${MAX_ITEMS_PER_FLAT} items today.`
      );
      return;
    }
    // ---------- END LIMIT LOGIC ----------

    const order = {
      user,
      items: cart,
      total: cart.reduce((sum, i) => sum + i.total, 0),
      date: new Date().toISOString(),
      paid: false
    };

    // Save last order
    localStorage.setItem("lastOrder", JSON.stringify(order));

    // Save to admin order list
    const adminOrders =
      JSON.parse(localStorage.getItem("adminOrders")) || [];

    adminOrders.push(order);
    localStorage.setItem("adminOrders", JSON.stringify(adminOrders));

    // Update flat usage count
    flatOrders[flat] = alreadyOrdered + itemsInOrder;
    localStorage.setItem("flatOrders", JSON.stringify(flatOrders));

    // Clear cart and confirm
    localStorage.removeItem("cart");
    window.location.href = "confirm.html";
  });
}
