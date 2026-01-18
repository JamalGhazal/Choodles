let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(itemId) {
  const item = menu.find(m => m.id === itemId);
  const toppingsDiv = document.getElementById(`toppings-${itemId}`);
  const qty = parseInt(document.getElementById(`qty-${itemId}`).value);

  let selectedToppings = [];
  let toppingsTotal = 0;

  toppingsDiv.querySelectorAll("input:checked").forEach(t => {
    selectedToppings.push({
      name: t.dataset.name,
      price: parseFloat(t.dataset.price)
    });
    toppingsTotal += parseFloat(t.dataset.price);
  });

  const totalPrice = (item.price + toppingsTotal) * qty;

  cart.push({
    name: item.name,
    basePrice: item.price,
    toppings: selectedToppings,
    quantity: qty,
    total: totalPrice
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
}
