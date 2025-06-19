// 기본 url
const baseUrl = "https://api.wenivops.co.kr/services/open-market/";

// DOM
const productContainer = document.querySelector(".product-list ul");

if (location.href.includes("buyer.html")) {
  const changeSeller = document.getElementById("mypage-seller");
  // changeBuyer.innerHTML = "";
  changeSeller.innerHTML = `
    <li id="mypage-seller">
      <a href="login.html">
        <img src="assets/icons/icon-user.svg" alt="로그인">
        마이페이지
      </a>
    </li>
    `;
} else if (location.href.includes("seller.html")) {
  const changeSeller = document.getElementById("mypage-seller");
  const changeBuyer = document.getElementById("shopping-mypage");
  changeBuyer.innerHTML =`
    <li id="mypage-seller">
      <a href="login.html">
        <img src="assets/icons/icon-user.svg" alt="로그인">
        마이페이지
      </a>
    </li>
  `;
  changeSeller.innerHTML = `
    <button>
        <img src="assets/icons/icon-shopping-bag.svg" alt="">
        판매자 센터
    </button>
  `;
}

// 상품추가
function addProduct(product) {
  const li = document.createElement("li");

  li.innerHTML = `
    <a href="product_details.html">
      <img src="${product.image}" alt="${product.name}">
      <p class="store-name">${product.seller.store_name}</p>
      <p class="product-name">${product.name}</p>
      <p class="price">${product.price.toLocaleString()}<span>원</span></p>
    </a>
  `;

  // if (productContainer.children.length >= 6) {
  //   li.style.display = "none";
  // }

  productContainer.append(li);
}

// 상품 API 호출
fetch(`${baseUrl}products/`)
  .then((res) => {
    if (!res.ok) {
      throw new (`HTTP error! status: ${res.status}`);
    }
    return res.json();
  })
  .then((data) => {
    // console.log(data);
    if (data.results && Array.isArray(data.results)) {
        for (let i = 0; i < data.results.length; i++) {
          const product = data.results[i];
          addProduct(product);
        }
      } 
    })
    .catch((error) => {
      console.log("error");
    });

// https://shape-coding.tistory.com/entry/JavaScript-자바스크립트로-숫자-3자리천단위-마다-콤마-찍기

// https://csdrive.tistory.com/22