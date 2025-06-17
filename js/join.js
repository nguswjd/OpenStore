// 판매 회원 / 구매회원 버튼 클릭
const buyerBtn = document.getElementById("buyer-btn");
const sellerBtn = document.getElementById("seller-btn");

function clickbuyBtn() {
  buyerBtn.classList.remove("not-focusBtn");
  buyerBtn.classList.add("focusBtn");

  sellerBtn.classList.remove("focusBtn");
  sellerBtn.classList.add("not-focusBtn");
  
  // js로 css 수정 괜찮나 ?
  loginForm.style.borderRadius = '0 10px 10px 10px';
}

function clicksellernBtn() {
  sellerBtn.classList.remove("not-focusBtn");
  sellerBtn.classList.add("focusBtn");
  
  buyerBtn.classList.remove("focusBtn");
  buyerBtn.classList.add("not-focusBtn");

  loginForm.style.borderRadius = '10px 0 10px 10px';
}

buyerBtn.addEventListener("click", clickbuyBtn);
sellerBtn.addEventListener("click", clicksellernBtn);
