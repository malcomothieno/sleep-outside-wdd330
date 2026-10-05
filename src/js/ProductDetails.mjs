import { getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs";

function productDetailsTemplate(product) {
  return `<section class="product-detail"> 
    <h3>${product.Brand?.Name || ""}</h3>
    <h2 class="divider">${product.NameWithoutBrand || product.Name}</h2>
    <img
      class="divider"
      src="${product.Image}"
      alt="${product.NameWithoutBrand || product.Name}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors?.[0]?.ColorName || ""}</p>
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
    // Fetch product details using data source
    this.product = await this.dataSource.findProductById(this.productId);

    if (this.product) {
      // Render the HTML
      this.renderProductDetails("main");

      // Add listener to Add to Cart button
      document
        .getElementById("addToCart")
        .addEventListener("click", this.addToCart.bind(this));
    } else {
      alertMessage("Product not found.");
    }
  }

  addToCart() {
    const currentCart = getLocalStorage("so-cart") || [];
    const cartArray = Array.isArray(currentCart) ? currentCart : [currentCart];
    
    // Check if item already exists in cart to increment quantity
    const existingIndex = cartArray.findIndex(
      (item) => item.Id === this.product.Id
    );

    if (existingIndex > -1) {
      cartArray[existingIndex].Quantity =
        (cartArray[existingIndex].Quantity || 1) + 1;
    } else {
      this.product.Quantity = 1;
      cartArray.push(this.product);
    }

    setLocalStorage("so-cart", cartArray);
    alertMessage(`${this.product.NameWithoutBrand || this.product.Name} added to cart!`, false);
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    if (element) {
      element.insertAdjacentHTML(
        "afterbegin",
        productDetailsTemplate(this.product)
      );
    }
  }
}