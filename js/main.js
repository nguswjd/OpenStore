import { API } from './api.js';

// DOM
const productContainer = document.querySelector(".product-list ul");

// 헤더 변경
function buyerHeader() {
    const loginChange = document.getElementById("mypage-seller");

    if (loginChange) {
      // 링크 이동 수정필요
        loginChange.innerHTML = `
            <li id="mypage-seller">
                <a href="#">
                    <img src="assets/icons/icon-user.svg" alt="마이페이지">
                    마이페이지
                </a>
            </li>
        `;
    }
}

function sellerHeader() {
    const loginChange = document.getElementById("mypage-seller");
    const shoppingBagChange = document.getElementById("shopping-mypage");
    
    if (shoppingBagChange) {
        shoppingBagChange.innerHTML = `
            <li id="mypage-seller">
                <a href="login.html">
                    <img src="assets/icons/icon-user.svg" alt="마이페이지">
                    마이페이지
                </a>
            </li>
        `;
    }
    
    if (loginChange) {
        loginChange.innerHTML = `
            <a href="#" id="shopingBag">
                <img src="assets/icons/icon-shopping-bag.svg" alt="">
                판매자 센터
            </a>
        `;
    }
}

// 페이지별 헤더 처리
if (location.href.includes("buyer.html")) {
    buyerHeader();
} else if (location.href.includes("seller.html")) {
    sellerHeader();
} else if (location.href.includes("product_details.html")) {
    if (document.referrer.includes("buyer.html")) {
        buyerHeader();
    } else if (document.referrer.includes("seller.html")){
        sellerHeader();
    }
}

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