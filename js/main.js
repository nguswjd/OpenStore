import { API } from "./api.js";

// DOM
const productContainer = document.querySelector(".product-list ul");
const modal = document.getElementById("modal");

const shoppingBag = document.getElementById("shopping-mypage");
const buyProduct = document.getElementById("buy");
const basket = document.getElementById("basket");

const user = JSON.parse(localStorage.getItem("user"));

console.log(user);



// 상품추가
function addProduct(product) {
  if (!productContainer) return;
  const li = document.createElement("li");
  li.innerHTML = `
      <a href="product_details.html?id=${product.id}">
          <img src="${product.image}" alt="${product.name}">
          <p class="store-name">${product.seller.store_name}</p>
          <p class="product-name">${product.name}</p>
          <p class="price">${product.price.toLocaleString()}<span>원</span></p>
      </a>
    `;
  productContainer.append(li);
}

// 상품 API 호출
if (productContainer) {
  fetch(API.PRODUCTS)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      if (data.results && Array.isArray(data.results)) {
        for (let i = 0; i < data.results.length; i++) {
          const product = data.results[i];
          addProduct(product);
        }
      }
    })
    .catch((error) => {
      console.log("error:", error);
    });
}
