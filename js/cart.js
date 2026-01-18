let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(id) {
  cart.push({ id });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}
