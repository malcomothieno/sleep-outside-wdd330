import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const itemsArray = Array.isArray(cartItems) ? cartItems : [cartItems];
  
  if (itemsArray.length > 0 && itemsArray[0] !== null) {
    const htmlItems = itemsArray.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    
    // Calculate total and display checkout footer
    calculateCartTotal(itemsArray);
  } else {
    document.querySelector(".product-list").innerHTML = "<p>Your cart is empty.</p>";
    document.querySelector(".cart-footer").classList.add("hide");
  }
}

function calculateCartTotal(items) {
  const total = items.reduce((sum, item) => sum + item.FinalPrice * (item.Quantity || 1), 0);
  document.querySelector(".list-total").innerText = `$${total.toFixed(2)}`;
  document.querySelector(".cart-footer").classList.remove("hide");
}

function cartItemTemplate(item) {
  const imagePath = item.Image?.startsWith("../") ? item.Image.replace("../", "/") : item.Image;
  return `<li class="cart-card divider">
    <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__image">
      <img src="${imagePath}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors?.[0]?.ColorName || ""}</p>
    <p class="cart-card__quantity">qty: ${item.Quantity || 1}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

renderCartContents();