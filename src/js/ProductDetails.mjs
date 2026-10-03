import { setLocalStorage, getLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {
  // Resolve image source safely across different JSON versions
  const imageSrc =
    (product.Images && product.Images.PrimaryLarge) ||
    (product.Images && product.Images.PrimaryMedium) ||
    (product.Images && product.Images.PrimarySmall) ||
    product.Image ||
    "";

  // Safe fallback checks for missing properties
  const brandName = product.Brand ? product.Brand.Name : "";
  const name = product.NameWithoutBrand || product.Name || "";
  const price = product.FinalPrice || product.ListPrice || "0.00";
  const colorName =
    product.Colors && product.Colors[0] ? product.Colors[0].ColorName : "";
  const description = product.DescriptionHtmlSimple || "";

  return `<section class="product-detail"> 
    <h3>${brandName}</h3>
    <h2 class="divider">${name}</h2>
    <img
      class="divider"
      src="${imageSrc}"
      alt="${name}"
    />
    <p class="product-card__price">$${price}</p>
    <p class="product__color">${colorName}</p>
    <p class="product__description__html">${description}</p>
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
    if (!this.productId) {
      this.renderError("No product ID provided in URL.");
      return;
    }

    try {
      // Fetch product details using data source
      this.product = await this.dataSource.findProductById(this.productId);

      if (!this.product) {
        this.renderError("Product not found.");
        return;
      }

      // Render the HTML inside <main>
      this.renderProductDetails("main");

      // Add listener to Add to Cart button
      const addButton = document.getElementById("addToCart");
      if (addButton) {
        addButton.addEventListener("click", this.addToCart.bind(this));
      }
    } catch (error) {
      console.error("Error initializing product details:", error);
      this.renderError("Failed to load product details.");
    }
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

    // Provide visual feedback upon adding item
    this.showCartMessage(`${this.product.NameWithoutBrand || "Item"} added to cart!`);
  }

  showCartMessage(message) {
    const button = document.getElementById("addToCart");
    let feedback = document.querySelector(".cart-feedback");

    if (!feedback) {
      feedback = document.createElement("p");
      feedback.className = "cart-feedback";
      feedback.style.color = "#306B34";
      feedback.style.fontWeight = "bold";
      feedback.style.marginTop = "10px";
      if (button) {
        button.after(feedback);
      }
    }

    feedback.textContent = message;

    // Automatically clear message after 3 seconds
    setTimeout(() => {
      if (feedback) {
        feedback.remove();
      }
    }, 3000);
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

  renderError(message) {
    const mainElement = document.querySelector("main");
    if (mainElement) {
      mainElement.innerHTML = `<p class="error-message">${message}</p>`;
    }
  }
}