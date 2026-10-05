import CheckoutProcess from "./CheckoutProcess.mjs";

const checkout = new CheckoutProcess("so-cart", "#order-summary");
checkout.init();

document.querySelector("#zip").addEventListener("blur", () => {
  checkout.calculateOrderTotals();
});

document.querySelector("#checkout-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const status = form.checkValidity();
  form.reportValidity();
  if (status) {
    checkout.checkout(form);
  }
});