function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category = "tents") {
    this.category = category;
  }

  async getData(category = this.category) {
    const response = await fetch(`/json/${category}.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch /json/${category}.json`);
    }
    const data = await convertToJson(response);
    return data;
  }

  async findProductById(id) {
    // Search across all primary categories to locate the product
    const categories = ["tents", "backpacks", "sleeping-bags", "hammocks"];

    for (const category of categories) {
      try {
        const products = await this.getData(category);
        const productArray = Array.isArray(products)
          ? products
          : products.Result || [];

        const found = productArray.find((item) => item.Id === id);
        if (found) {
          return found;
        }
      } catch (err) {
        // Skip categories that fail to load
        continue;
      }
    }

    return null;
  }
}