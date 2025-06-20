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
const tabButtons = document.querySelectorAll('.tab');

// 전역변수
let productPrice = 0;
let productStock = 0;

// 영수증
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
        productStock = product.stock;
        updateButtonState();

        console.log(productStock);

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

// 수량선택 버튼 비활성화
function updateButtonState() {
    const quantity = parseInt(quantityInput.value, 10);
    const minus = document.getElementById("plus-line");

    if (quantity >= productStock){
        plusBtn.style.backgroundColor = "#E0E0E0";
        minus.style.filter = "brightness(0) invert(1)";
    } else {
        plusBtn.style.backgroundColor = "";
        minus.style.filter = "";
    }
}

// 수량 감소
function decreaseBtn() {
    let quantity = parseInt(quantityInput.value, 10);

    if (quantity > 1) {
        quantity--;
        quantityInput.value = quantity;
        receipt();
        updateButtonState();
    }
}

// 수량 증가
function increaseBtn() {
    let quantity = parseInt(quantityInput.value, 10);

    if (quantity < productStock) {
        quantity++;
        quantityInput.value = quantity;
        receipt();
        updateButtonState();
    }
}

// 리뷰어 
for (let i = 0; i < tabButtons.length; i++) {
    function clickBtn() {
        for (let j = 0; j < tabButtons.length; j++) {
            tabButtons[j].classList.remove('active');
        }

        this.classList.add('active');
    };

    tabButtons[i].addEventListener('click', clickBtn)
}

// 이벤트 리스너
minusBtn.addEventListener("click", decreaseBtn);
plusBtn.addEventListener("click", increaseBtn);