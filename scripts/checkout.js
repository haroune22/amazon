import { cart, removeFromCart, updateDeliveryOption } from "../data/cart.js";
import { deliveryOptions, getDeliveryOption } from "../data/deliveryOptions.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
hello();

function renderOrderSummary() {
  let cartSummaryHtml = "";
  // const today = dayjs();
  // const deliveryDate = today.add(7, "days");
  // console.log(deliveryDate.format("dddd, MMMM D"));

  cart.map((cartItem) => {
    let product = products.find((p) => p.id == cartItem.productId);
    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");
    // console.log(product);
    cartSummaryHtml += `
    <div class="cart-item-container
      js-cart-item-container-${product.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${product.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${product.name}
          </div>
          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
              product.id
            }">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHtml(product, cartItem)}
        </div>
      </div>
    </div>
  `;
  });
  document.querySelector(".js-order-summary").innerHTML = cartSummaryHtml;

  function deliveryOptionsHtml(product, cartItem) {
    let html;
    deliveryOptions.forEach((option) => {
      const today = dayjs();
      const deliveryDate = today.add(option.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");
      const isChecked = option.id === cartItem.deliveryOptionId;
      html += `
        <div class="delivery-option js-delivery-option"
        data-product-id="${product.id}"
        data-delivery-option-id="${option.id}">
          <input type="radio" 
            ${isChecked ? "checked" : ""}
            class="delivery-option-input"
            name="delivery-option-${product.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${
                option.priceCents === 0
                  ? "Free"
                  : formatCurrency(option.priceCents)
              }
            </div>
          </div>
        </div>
    `;
    });
    return html;
  }

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      const productId = link.dataset.productId;
      // console.log("Deleting product with ID:", productId);
      removeFromCart(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", (event) => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
    });
  });
}
renderOrderSummary();