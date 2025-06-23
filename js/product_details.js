import { API } from "./api.js";

// DOM
import { 
  storeName, productName, price,
  productImage,
  minusBtn, plusBtn, quantityInput,
  totalPrice, totalQuantity, tabButtons,
  plusIcon, minusIcon,
  buyProduct, basket,
  modal
} from "./DOM.js";

// localStorage
const product = JSON.parse(localStorage.getItem("clickProduct"));
const userInfo = JSON.parse(localStorage.getItem("userInfo"));

// 전역변수
let productPrice = product.price;
let productStock = product.stock;

console.log(product);

// 영수증
function receipt() {
  const quantity = parseInt(quantityInput.value, 10);
  const total = productPrice * quantity;

  totalPrice.textContent = total.toLocaleString();
  totalQuantity.textContent = quantity;
}

// 상품 호출
productImage.src = product.image;
productImage.alt = product.name;
storeName.textContent = product.seller.store_name;
productName.textContent = product.name;
price.innerHTML = product.price.toLocaleString() + "<span>원</span>";

// 수량선택 버튼 비활성화
function updateButtonState() {
  const quantity = parseInt(quantityInput.value, 10);

  if (quantity >= productStock) {
    plusBtn.style.backgroundColor = "#E0E0E0";
    plusIcon.style.filter = "brightness(0) invert(1)";
  } else {
    plusBtn.style.backgroundColor = "";
    plusIcon.style.filter = "";
  }

  if (quantity === 1) {
    minusBtn.style.background= "#E0E0E0";
    minusIcon.style.filter = "brightness(0) invert(1)";
  } else {
    minusBtn.style.background= "";
    minusIcon.style.filter = "";
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

// 모달
if (!userInfo || !userInfo.user_type) {
  function openModal () {
    const modalDelete = document.getElementById("delete");
    const modalNo = document.getElementById("go-back-btn");

    modal.classList.remove("hidden");

    function backPage() {
      modal.classList.add("hidden");
    }

    function escHandler(e) {
      if (e.key === "Escape") {
        backPage();
      }
    }

    modalNo.addEventListener("click", backPage);
    modalDelete.addEventListener("click", backPage);
    document.addEventListener("keydown", escHandler);
  }

  buyProduct.addEventListener("click", openModal);
  basket.addEventListener("click", openModal);
}

// 리뷰어 탭 이벤트
function tabClick(e) {
  for (let j = 0; j < tabButtons.length; j++) {
    tabButtons[j].classList.remove("active");
  }
  e.currentTarget.classList.add("active");
}

// 이벤트 리스너
minusBtn.addEventListener("click", decreaseBtn);
plusBtn.addEventListener("click", increaseBtn);

for (let i = 0; i < tabButtons.length; i++) {
  tabButtons[i].addEventListener("click", tabClick);
}

receipt();
updateButtonState();

