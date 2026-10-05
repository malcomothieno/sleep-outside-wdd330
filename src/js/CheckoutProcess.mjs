import { getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: item.Quantity || 1,
  }));
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSummary();
  }

  calculateItemSummary() {
    const summaryElement = document.querySelector(
      `${this.outputSelector} #cartTotal`
    );
    const itemNumElement = document.querySelector(
      `${this.outputSelector} #num-items`
    );

    if (itemNumElement) {
      itemNumElement.innerText = this.list.reduce(
        (sum, item) => sum + (item.Quantity || 1),
        0
      );
    }

    this.itemTotal = this.list.reduce(
      (sum, item) => sum + item.FinalPrice * (item.Quantity || 1),
      0
    );

    if (summaryElement) {
      summaryElement.innerText = `$${this.itemTotal.toFixed(2)}`;
    }
  }

  calculateOrderTotals() {
    const count = this.list.reduce(
      (sum, item) => sum + (item.Quantity || 1),
      0
    );

    if (count > 0) {
      this.shipping = 10 + (count - 1) * 2;
      this.tax = this.itemTotal * 0.06;
      this.orderTotal = this.itemTotal + this.shipping + this.tax;
    } else {
      this.shipping = 0;
      this.tax = 0;
      this.orderTotal = 0;
    }

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const shipping = document.querySelector(`${this.outputSelector} #shipping`);
    const tax = document.querySelector(`${this.outputSelector} #tax`);
    const orderTotal = document.querySelector(`${this.outputSelector} #orderTotal`);

    if (shipping) shipping.innerText = `$${this.shipping.toFixed(2)}`;
    if (tax) tax.innerText = `$${this.tax.toFixed(2)}`;
    if (orderTotal) orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
  }

  async checkout(form) {
    const jsonPayload = formDataToJSON(form);
    jsonPayload.orderDate = new Date().toISOString();
    jsonPayload.orderTotal = this.orderTotal.toFixed(2);
    jsonPayload.tax = this.tax.toFixed(2);
    jsonPayload.shipping = this.shipping.toFixed(2);
    jsonPayload.items = packageItems(this.list);

    const services = new ExternalServices();

    try {
      const res = await services.checkout(jsonPayload);
      setLocalStorage(this.key, []); // Clear cart on success
      location.assign("/checkout/success.html");
    } catch (err) {
      if (err.message) {
        for (const message in err.message) {
          alertMessage(err.message[message]);
        }
      } else {
        alertMessage("Checkout failed. Please check your information.");
      }
    }
  }
}