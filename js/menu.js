const menu = [
  {
    id: 1,
    name: "Chicken Choodles",
    price: 7.99,
    toppings: [
      { name: "Extra Chicken", price: 1.5 },
      { name: "Chilli Oil", price: 0.5 },
      { name: "Cheese", price: 1.0 }
    ]
  }
];

const menuDiv = document.getElementById("menu-items");

menu.forEach(item => {
  const div = document.createElement("div");
  div.className = "menu-item";

  div.innerHTML = `
    <h3>${item.name} — £${item.price.toFixed(2)}</h3>

    <div id="toppings-${item.id}">
      ${item.toppings.map((t, i) => `
        <label>
          <input type="checkbox" 
                 data-name="${t.name}" 
                 data-price="${t.price}">
          ${t.name} (+£${t.price})
        </label><br>
      `).join("")}
    </div>

    <label>
      Quantity:
      <input type="number" id="qty-${item.id}" value="1" min="1">
    </label>
    <br><br>

    <button onclick="addToCart(${item.id})">Add to cart</button>
  `;

  menuDiv.appendChild(div);
});
