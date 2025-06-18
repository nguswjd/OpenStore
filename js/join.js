// DOM
const buyerBtn = document.getElementById("buyer-btn");
const sellererBtn = document.getElementById("seller-btn");

const joinForm = document.getElementById("joinForm");

const userId = document.getElementById("join-id");
const idCheckBtn = document.getElementById("id-checkBtn");
const idCheckResult = document.getElementById("check-id-result");

const userPw = document.getElementById("join-pw");
const pwCheck = document.getElementById("pw-check");

const userName = document.getElementById("join-name");
const userNumContainer = document.getElementById("user-number");
const phoneFirst = document.getElementById("join-number");
const phoneMid = document.getElementById("user-number-mid");
const phoneEnd = document.getElementById("user-number-end");

const businessNUm = document.getElementById("join-businessNum");
const verifybusinessNUm = document.getElementById("verify-business");

const storeName = document.getElementById("join-storeName");

// 기본 url
const baseUrl = 'https://api.wenivops.co.kr/services/open-market/';

// 요소 추가
const errormsg = document.createElement("p");

// 아이디 중복확인
// function checkDupid() {
//   const userId = usernameInput.value;
// }

// 비밀번호 일치 확인
function clickPw() {
  // 기존 메시지 제거
  if (pwCheck.parentNode.querySelector("p")) {
    pwCheck.parentNode.querySelector("p").remove();
  }

  const msg = document.createElement("p");
  msg.style.marginTop = "8px";

  if (userPw.value === '' || pwCheck.value === '') {
    pwCheck.style.border = '';
    return false;
  }

  if (userPw.value === pwCheck.value) {
    msg.textContent = "비밀번호가 일치합니다.";
    msg.style.color = "#21bf48";
    pwCheck.style.border = '';
  } else {
    msg.textContent = "비밀번호가 일치하지 않습니다.";
    msg.style.color = "#EB5757";
    pwCheck.style.border = '1px solid #eb5757';
  }

  pwCheck.parentNode.appendChild(msg);

  return userPw.value === pwCheck.value && userPw.value !== '';
}

// 제출 전 폼 확인
function chlickInput(e) {
  e.preventDefault();

  // 모든 기존 에러 메시지 제거
  const errorMessages = joinForm.querySelectorAll("p");
  errorMessages.forEach(msg => msg.remove());

  function showError(input) {
    const msg = document.createElement("p");
    msg.textContent = "이 필드는 필수 항목입니다.";
    msg.style.color = "#eb5757";
    msg.style.margin = "5px";
    input.parentNode.appendChild(msg);
  }

  if (userId.value === '') {
    showError(userId);
  }

  if (userPw.value === '') {
    showError(userPw);
  }

  if (userName.value === '') {
    showError(userName);
  }

  if (phoneMid.value === '' || phoneEnd.value === '') {
    showError(userNumContainer);
  }

  if (!clickPw()) {
    return;
  }
  
  joinForm.submit();
}

pwCheck.addEventListener("input", clickPw);
joinForm.addEventListener("submit", chlickInput);

