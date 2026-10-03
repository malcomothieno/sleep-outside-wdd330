import { setLocalStorage, getLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {
  return `<section class="product-detail"> 
    <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Image}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description__html">${product.DescriptionHtmlSimple}</p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>
  </section>`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // fetch product details using data source
    this.product = await this.dataSource.findProductById(this.productId);
    // render the HTML
    this.renderProductDetails("main");
    // add listener to Add to Cart button
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  addToCart() {
    let cart = getLocalStorage("so-cart");
    
    // Ensure cart is an array structure
    if (!Array.isArray(cart)) {
      cart = [];
    }

    // Locate matching item in current cart
    const existingIndex = cart.findIndex((item) => item.Id === this.product.Id);

    if (existingIndex > -1) {
      // Increment quantity if item already exists
      cart[existingIndex].Quantity = (cart[existingIndex].Quantity || 1) + 1;
    } else {
      // Set initial quantity and insert new item
      this.product.Quantity = 1;
      cart.push(this.product);
    }

    setLocalStorage("so-cart", cart);
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterbegin",
      productDetailsTemplate(this.product)
    );
  }
}