import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const category = getParam("category");
const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");

// Safely update category title if element exists
const titleElement = document.querySelector("#category-title") || document.querySelector(".title");
if (titleElement && category) {
  // Capitalize category name for display (e.g. "tents" -> "Tents")
  titleElement.textContent = category.charAt(0).toUpperCase() + category.slice(1);
}

const list = new ProductList(category, dataSource, listElement);
list.init();