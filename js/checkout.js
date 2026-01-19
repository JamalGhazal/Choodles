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
const placeOrderBtn = document.getElementById("place-order");

if (placeOrderBtn) {
  placeOrderBtn.addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const user = JSON.parse(localStorage.getItem("user"));

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const order = {
      user,
      items: cart,
      total: cart.reduce((sum, i) => sum + i.total, 0),
      date: new Date().toISOString()
    };

    // Save last order
    localStorage.setItem("lastOrder", JSON.stringify(order));

    // Save to ADMIN orders list
    const adminOrders =
      JSON.parse(localStorage.getItem("adminOrders")) || [];

    adminOrders.push(order);
    localStorage.setItem("adminOrders", JSON.stringify(adminOrders));

    localStorage.removeItem("cart");
    window.location.href = "confirm.html";
  });
}
