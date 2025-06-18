// DOM
const buyerBtn = document.getElementById("buyer-btn");
const sellererBtn = document.getElementById("seller-btn");

const joinForm = document.getElementById("joinForm");

const userId = document.getElementById("join-id");
const idCheckBtn = document.getElementById("id-checkBtn");

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

// 아이디 중복확인
function checkDupid() {
  if (idCheckBtn.parentNode.querySelector("p")) {
    idCheckBtn.parentNode.querySelector("p").remove();
  }
  
  const username = userId.value;

  const msg = document.createElement("p");
  msg.style.marginTop = "8px";

  if (username === '') {
    msg.textContent = "아이디를 입력해주세요.";
    msg.style.color = "#EB5757";
    idCheckBtn.parentNode.insertBefore(msg, idCheckBtn.nextSibling);
    return;
  }

  fetch(`${baseUrl}accounts/validate-username/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.message) {
        msg.textContent = data.message;
        msg.style.color = "#21bf48";
      } else if (data.error) {
        msg.textContent = data.error;
        msg.style.color = "#EB5757";
      }
      idCheckBtn.parentNode.insertBefore(msg, idCheckBtn.nextSibling);
    })
    .catch(error => {
      msg.textContent = "오류가 발생했습니다. 다시 시도해주세요.";
      msg.style.color = "#EB5757";
      idCheckBtn.parentNode.insertBefore(msg, idCheckBtn.nextSibling);
      console.error("Fetch Error:", error);
    });
}

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
    pwCheck.style.backgroundImage = "url('../assets/icons/icon-check-on.svg')";
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

// 비밀번호 입력시 확인
function inputPw() {
  userPw.style.backgroundImage = "url('../assets/icons/icon-check-on.svg')";
}

idCheckBtn.addEventListener("click", checkDupid);
userPw.addEventListener("input", inputPw);
pwCheck.addEventListener("input", clickPw);
joinForm.addEventListener("submit", chlickInput);
