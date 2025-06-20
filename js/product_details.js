import { API } from "./api.js";

// DOM
const shippingMethod = document.getElementById("shipping-method");
const storeName = document.getElementById("store-name");
const productName = document.getElementById("product_name");
const price = document.getElementById("price");
const productImage = document.getElementById("product-image");
const minusBtn = document.getElementById("minus-btn");
const plusBtn = document.getElementById("plus-btn");
const quantityInput = document.getElementById("quantity");
const totalPrice = document.getElementById("total-price");
const totalQuantity = document.getElementById("total-quantity");

// 전역변수
let productPrice = 0;

// 총 가격 업데이트 함수
function receipt() {
  const quantity = parseInt(quantityInput.value, 10);
  const total = productPrice * quantity;
  totalPrice.textContent = total.toLocaleString();
  totalQuantity.textContent = quantity;
}

// 상품 호출
const id = parseInt(window.location.search.match(/\d+/)[0], 10);
// console.log(id);

fetch(API.PRODUCTS)
  .then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  })
  .then((data) => {
    const product = data.results.find((item) => item.id === id);
    if (!product) {
      console.log("상품을 찾을 수 없습니다.");
      return;
    }
    productPrice = product.price;
    let shippingType = "PARCEL";
    if (product.shipping_method === "PARCEL") {
      shippingType = "무료배송";
    } else if (product.shipping_method === "DELIVERY") {
      shippingType = "택배배송";
    }
    shippingMethod.textContent = shippingType;
    productImage.src = product.image;
    productImage.alt = product.name;
    storeName.textContent = product.seller.store_name;
    productName.textContent = product.name;
    price.innerHTML = product.price.toLocaleString() + "<span>원</span>";
    receipt();
  })
  .catch((error) => {
    console.log("error:", error);
  });

function decreaseBtn() {
  const quantity = parseInt(quantityInput.value, 10);
  if (quantity > 1) {
    quantityInput.value = quantity - 1;
    receipt();
  }
}

function increaseBtn() {
  const quantity = parseInt(quantityInput.value, 10);
  if (quantity < 99) {
    quantityInput.value = quantity + 1;
    receipt();
  }
}

minusBtn.addEventListener("click", decreaseBtn);
plusBtn.addEventListener("click", increaseBtn);
