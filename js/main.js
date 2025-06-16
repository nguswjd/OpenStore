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



