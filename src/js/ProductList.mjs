import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const imageSrc =
    (product.Images && product.Images.PrimaryLarge) ||
    (product.Images && product.Images.PrimaryMedium) ||
    (product.Images && product.Images.PrimarySmall) ||
    product.Image ||
    "";

  return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
      <img
        src="${imageSrc}"
        alt="Image of ${product.Name}"
      />
      <h3 class="card__brand">${product.Brand ? product.Brand.Name : ""}</h3>
      <h2 class="card__name">${product.NameWithoutBrand || product.Name}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    let list = await this.dataSource.getData(this.category);
    
    // If the API wrapped the array in an object (e.g. { Result: [...] })
    if (list && list.Result && Array.isArray(list.Result)) {
      list = list.Result;
    }

    this.renderList(list);
  }

  renderList(list) {
    if (!Array.isArray(list) || list.length === 0) {
      this.listElement.innerHTML = "<p>No products found in this category.</p>";
      return;
    }
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}