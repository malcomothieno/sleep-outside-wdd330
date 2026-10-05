async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse };
  }
}

export default class ExternalServices {
  constructor(category = "tents") {
    this.category = category;
  }

  async getData(category = this.category) {
    const response = await fetch(`/json/${category}.json`);
    return await convertToJson(response);
  }

  async findProductById(id) {
    const categories = ["tents", "backpacks", "sleeping-bags", "hammocks"];
    for (const category of categories) {
      try {
        const products = await this.getData(category);
        const productArray = Array.isArray(products)
          ? products
          : products.Result || [];
        const found = productArray.find((item) => item.Id === id);
        if (found) return found;
      } catch (err) {
        continue;
      }
    }
    return null;
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    const response = await fetch(
      "https://wdd330-backend-osp8.onrender.com/checkout",
      options
    );
    return await convertToJson(response);
  }
}