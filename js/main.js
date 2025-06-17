// click -> login
const loginBtn = document.getElementById("login-btn");
const headerPage = document.getElementById("header-page");
const mainPage = document.querySelector(".mainPage");
const loginPage = document.querySelector(".loginPage");

function clickLogin() {
  headerPage.classList.add("a11y-hidden");
  mainPage.classList.add("a11y-hidden");
  loginPage.classList.remove("a11y-hidden");
}

loginBtn.addEventListener("click", clickLogin);

// login error
const loginForm = document.getElementById("loginForm");
const userIdInput = document.getElementById("user-id");
const userPwInput = document.getElementById("user-pw");
const loginError = document.getElementById("login-error");

function Errormsg(e) {
  loginError.textContent = "";

  if(userIdInput.value === '' && userPwInput.value === '' || userIdInput.value === '') {
    e.preventDefault();
    loginError.textContent = "아이디를 입력해 주세요.";
    userIdInput.focus();
  } else if (userPwInput.value === '') {
    e.preventDefault();
    loginError.textContent = "비밀번호를 입력해 주세요.";
    userPwInput.focus();
  }
}

loginForm.addEventListener("submit", Errormsg);

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

