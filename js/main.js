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
  } else if (userPwInput.value === '') {
    e.preventDefault();
    loginError.textContent = "비밀번호를 입력해 주세요.";
  }
}

loginForm.addEventListener("submit", Errormsg);