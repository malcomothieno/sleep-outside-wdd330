import{a as e,n as t,r as n,t as r}from"./utils-D0iIjoCx.js";import{t as i}from"./ProductData-DrXMH46o.js";function a(e){return`<section class="product-detail"> 
    <h3>${e.Brand.Name}</h3>
    <h2 class="divider">${e.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${e.Image}"
      alt="${e.NameWithoutBrand}"
    />
    <p class="product-card__price">$${e.FinalPrice}</p>
    <p class="product__color">${e.Colors[0].ColorName}</p>
    <p class="product__description__html">${e.DescriptionHtmlSimple}</p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${e.Id}">Add to Cart</button>
    </div>
  </section>`}var o=class{constructor(e,t){this.productId=e,this.product={},this.dataSource=t}async init(){this.product=await this.dataSource.findProductById(this.productId),this.renderProductDetails(`main`),document.getElementById(`addToCart`).addEventListener(`click`,this.addToCart.bind(this))}addToCart(){let t=r(`so-cart`);Array.isArray(t)||(t=[]);let n=t.findIndex(e=>e.Id===this.product.Id);n>-1?t[n].Quantity=(t[n].Quantity||1)+1:(this.product.Quantity=1,t.push(this.product)),e(`so-cart`,t)}renderProductDetails(e){document.querySelector(e).insertAdjacentHTML(`afterbegin`,a(this.product))}};n(),new o(t(`product`),new i(`tents`)).init();