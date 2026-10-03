function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }
async getData(category) {
  const response = await fetch(`/json/${category}.json`);
  if (!response.ok) {
    throw new Error("Bad Response");
  }
  const data = await response.json();
  return data;
}
  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}
