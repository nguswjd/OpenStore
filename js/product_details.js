import { API } from './api.js';

// DOM
const storeName = document.getElementById("store-name");
const productName = document.getElementById("product_name");
const price = document.getElementById("price");
const productImage = document.getElementById("product-image");

// 상품 호출
const id = parseInt(window.location.search.match(/\d+/)[0], 10);
console.log(id);

fetch(API.PRODUCTS)
  .then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  })
  .then((data) => {
    const product = data.results.find(item => item.id === id);

    if (!product) {
      console.log("상품을 찾을 수 없습니다.");
      return;
    }

    productImage.src = product.image;
    productImage.alt = product.name;
    storeName.textContent = product.seller.store_name;
    productName.textContent = product.name;
    price.innerHTML = product.price.toLocaleString() + '<span>원</span>';
  })
  .catch((error) => {
    console.log("error:", error);
  });
