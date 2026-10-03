import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");

// Capitalize category name for display
if (category) {
  const titleElement = document.querySelector("#category-title");
  titleElement.textContent = category.charAt(0).toUpperCase() + category.slice(1);
}

const productList = new ProductList(category, dataSource, listElement);
productList.init();