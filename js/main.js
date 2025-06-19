// 기본 url
const baseUrl = "https://api.wenivops.co.kr/services/open-market/";

const productContainer = document.querySelector(".product-list ul");

// 상품 API 호출
fetch(`${baseUrl}products/`)
  .then((res) => {
    if (!res.ok) {
      throw new ㅂ(`HTTP error! status: ${res.status}`);
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

// 상품추가
function addProduct(product) {
  const li = document.createElement("li");

  li.innerHTML = `
    <a href="#">
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

// https://shape-coding.tistory.com/entry/JavaScript-자바스크립트로-숫자-3자리천단위-마다-콤마-찍기

// https://csdrive.tistory.com/22