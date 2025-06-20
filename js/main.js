import { API } from "./api.js";

// localStorage - null 체크 추가
const userInfoString = localStorage.getItem("userInfo");
const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

// DOM
const productContainer = document.querySelector(".product-list ul");
const modal = document.getElementById("modal");
const userMenu = document.querySelector(".user-menu");
const shoppingBag = document.getElementById("shopping-mypage");

if (userInfo && userInfo.user_type === "BUYER") {
  userMenu.innerHTML = `
    <h2 class="sr-only">장바구니 및 로그인</h2>
    <ul>
      <li id="shopping-mypage">
        <a href="#">
          <img src="assets/icons/icon-shopping-cart.svg" alt="장바구니">
          <span>장바구니</span>
        </a>
      </li>
      <li id="mypage-seller" class="user-menu-item">
        <a href="#">
          <img src="assets/icons/icon-user.svg" alt="마이페이지">
          마이페이지
        </a>
        <ul class="dropdown-menu" id="mypage-menu">
          <li><a href="#">마이페이지</a></li>
          <li><button id="logoutBtn">로그아웃</button></li>
        </ul>
      </li>
    </ul>
  `;
} else if (userInfo && userInfo.user_type === "SELLER") {
  userMenu.innerHTML = `
    <h2 class="sr-only">장바구니 및 로그인</h2>
    <ul>
      <li id="mypage-seller" class="user-menu-item">
        <a href="#">
          <img src="assets/icons/icon-user.svg" alt="마이페이지">
          마이페이지
        </a>
        <ul class="dropdown-menu" id="mypage-menu">
          <li><a href="#">마이페이지</a></li>
          <li><button id="logoutBtn">로그아웃</button></li>
        </ul>
      </li>
      <li id="mypage-seller">
        <a href="#" id="shopingBag">
          <img src="assets/icons/icon-shopping-bag.svg" alt="">
          판매자 센터
        </a>
      </li>
    </ul>
  `;
} else {
  // 모달
  function openModal () {
    const modalDelete = document.getElementById("delete");
    const modalNo = document.getElementById("go-back-btn");

    modal.classList.remove("hidden");

    function backPage() {
      modal.classList.add("hidden");
    }

    modalNo.addEventListener("click", backPage);
    modalDelete.addEventListener("click", backPage);
  }

  shoppingBag.addEventListener("click", openModal); 
}

// 로그아웃
function logout() {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("clickProduct");
  window.location.href = "index.html";
}

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}

// 상품 추가 함수
function addProduct(product) {
  if (!productContainer) return;
  
  const li = document.createElement("li");
  li.innerHTML = `
    <a href="product_details.html?id=${product.id}" class="product-link">
      <img src="${product.image}" alt="${product.name}">
      <p class="store-name">${product.seller.store_name}</p>
      <p class="product-name">${product.name}</p>
      <p class="price">${product.price.toLocaleString()}<span>원</span></p>
    </a>
  `;
  
  productContainer.appendChild(li);
  
  const link = li.querySelector(".product-link");
  function clickLink() {
    localStorage.setItem("clickProduct", JSON.stringify(product));
  }
  link.addEventListener("click", clickLink);
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
          addProduct(data.results[i]);
        }
      }
    })
    .catch((error) => {
      console.log("error:", error);
    });
}