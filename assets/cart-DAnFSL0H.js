import{r as e,t}from"./utils-D0iIjoCx.js";e();function n(){let e=(t(`so-cart`)||[]).map(e=>r(e));document.querySelector(`.product-list`).innerHTML=e.join(``)}function r(e){return`<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${e.Image}"
      alt="${e.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${e.Name}</h2>
  </a>
  <p class="cart-card__quantity">qty: ${e.Quantity||1}</p>
  <p class="cart-card__color">${e.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${e.FinalPrice}</p>
</li>`}n();