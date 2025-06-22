import { API } from "./api.js";

// DOM
import { 
  productContainer, 
  modal, 
  userMenu, 
  shoppingBag
} from "./DOM.js";

// localStorage
const userInfoString = localStorage.getItem("userInfo");
const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

// console.log(localStorage);

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
                <a href="#" class="mypage-trigger">
                    <img src="assets/icons/icon-user.svg" alt="마이페이지">
                    마이페이지
                </a>

                <ul class="dropdown-menu hidden" id="mypage-menu">
                    <li><a href="#">마이페이지</a></li>
                    <li><button id="logoutBtn">로그아웃</button></li>
                </ul>
            </li>
        </ul>
    `;

  // DOM
  const myPage = document.getElementById("mypage-seller");
  const dropDown = document.querySelector(".dropdown-menu");
  const mypageTrigger = document.querySelector(".mypage-trigger");

  const iconShoppingCart = document.querySelector("#shopping-mypage img");
  const iconUser = document.querySelector("#mypage-seller img");

  const shoppingLink = document.querySelector("#shopping-mypage span");
  const mypageLink = document.querySelector("#mypage-seller a");

  function clickMypage(e) {
    e.preventDefault();

    if (dropDown.classList.contains("hidden")) {
      dropDown.classList.remove("hidden");

      iconShoppingCart.src = "assets/icons/icon-shopping-cart-2.svg";
      iconUser.src = "assets/icons/icon-user-2.svg";

      shoppingLink.style.color = "#21BF48";
      mypageLink.style.color = "#21BF48";
    } else {
      dropDown.classList.add("hidden");

      iconShoppingCart.src = "assets/icons/icon-shopping-cart.svg";
      iconUser.src = "assets/icons/icon-user.svg";

      shoppingLink.style.color = "";
      mypageLink.style.color = "";
    }
  }

  // 드롭다운 외부 클릭시 닫기
  function closeDropdown(e) {
    if (!myPage.contains(e.target)) {
      dropDown.classList.add("hidden");
      iconShoppingCart.src = "assets/icons/icon-shopping-cart.svg";
      iconUser.src = "assets/icons/icon-user.svg";
      
      shoppingLink.style.color = "";
      mypageLink.style.color = "";
    }
  }

  mypageTrigger.addEventListener("click", clickMypage);
  document.addEventListener("click", closeDropdown);

  // 로그아웃 버튼 이벤트 리스너 추가
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }
} else if (userInfo && userInfo.user_type === "SELLER") {
  userMenu.innerHTML = `
        <h2 class="sr-only">장바구니 및 로그인</h2>
        <ul>
            <li id="mypage-seller" class="user-menu-item">
                <a href="#" class="mypage-trigger">
                    <img src="assets/icons/icon-user.svg" alt="마이페이지">
                    마이페이지
                </a>
                <ul class="dropdown-menu hidden" id="mypage-menu">
                    <li><a href="#">마이페이지</a></li>
                    <li><button id="logoutBtn">로그아웃</button></li>
                </ul>
            </li>
            <li id="seller-center">
                <a href="#" id="shopingBag">
                    <img src="assets/icons/icon-shopping-bag.svg" alt="">
                    판매자 센터
                </a>
            </li>
        </ul>
    `;

  const myPage = document.getElementById("mypage-seller");
  const dropDown = document.querySelector(".dropdown-menu");
  const mypageTrigger = document.querySelector(".mypage-trigger");

  function clickMypage(e) {
    e.preventDefault();

    if (dropDown.classList.contains("hidden")) {
      dropDown.classList.remove("hidden");
    } else {
      dropDown.classList.add("hidden");
    }
  }

  function closeDropdown(e) {
    if (!myPage.contains(e.target)) {
      dropDown.classList.add("hidden");
    }
  }

  mypageTrigger.addEventListener("click", clickMypage);
  document.addEventListener("click", closeDropdown);

  // 로그아웃 버튼 이벤트 리스너 추가
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }

} else {
  // 모달
  function openModal() {
    const modalDelete = document.getElementById("delete");
    const modalNo = document.getElementById("go-back-btn");
    modal.classList.remove("hidden");

    function backPage() {
      modal.classList.add("hidden");
    }

    modalNo.addEventListener("click", backPage);
    modalDelete.addEventListener("click", backPage);
  }

  if (shoppingBag) {
    shoppingBag.addEventListener("click", openModal);
  }
}

// console.log(userInfo);

// 로그아웃
function logout() {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("clickProduct");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  window.location.href = "index.html";
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
