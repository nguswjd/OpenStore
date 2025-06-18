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

// 전역변수
let isIdChecked = false;

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
    msg.style.margin = "10px 0";
    userId.parentNode.appendChild(msg);
    isIdChecked = false;
    return;
  } else if (username.length > 20 || !/^[a-zA-Z0-9]+$/.test(username)) {
    msg.textContent = "20자 이내의 영문 소문자, 대문자, 숫자만 사용 가능합니다.";
    msg.style.color = "#EB5757";
    msg.style.margin = "10px 0";
    userId.parentNode.appendChild(msg);
    isIdChecked = false;
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
        msg.textContent = "멋진 아이디네요 :)";
        msg.style.color = "#21bf48";
        msg.style.margin = "10px 0";
        isIdChecked = true;
      } else if (data.error) {
        msg.textContent = data.error;
        msg.style.color = "#EB5757";
        msg.style.margin = "10px 0";
      }
      idCheckBtn.parentNode.appendChild(msg);
    })
    .catch(error => {
      msg.textContent = "오류가 발생했습니다. 다시 시도해주세요.";
      msg.style.color = "#EB5757";
      idCheckBtn.parentNode.appendChild(msg);
      console.error("Fetch Error:", error);
    });
}

// 비밀번호 입력시 확인
function inputPw() {
  const password = userPw.value;

  const existing = userPw.parentNode.querySelector("p");
  if (existing) existing.remove();


  if (idCheckBtn.parentNode.querySelector("p")) {
    idCheckBtn.parentNode.querySelector("p").remove();
  }

  const msg = document.createElement("p");
  msg.style.marginTop = "8px";


  if (userId.value === '') {
    msg.textContent = "필수 정보입니다.";
    msg.style.color = "#EB5757";
    msg.style.margin = "10px 0";
    idCheckBtn.parentNode.appendChild(msg);
    return;
  } else if (!/[a-z]/.test(password) || !/\d/.test(password) || password.length < 8) {
      msg.textContent = "8자 이상, 영문 대 소문자, 숫자, 특수문자를 사용하세요.";
      userPw.parentNode.appendChild(msg);
      msg.style.color = "#EB5757";
      return;
  } else {
    userPw.style.backgroundImage = "url('../assets/icons/icon-check-on.svg')";
  }
}

// 비밀번호 일치 확인
function clickPw() {
  // 기존 메시지 제거
  if (pwCheck.parentNode.querySelector("p")) {
    pwCheck.parentNode.querySelector("p").remove();
  }

  if (idCheckBtn.parentNode.querySelector("p")) {
    idCheckBtn.parentNode.querySelector("p").remove();
  }

  if (userPw.parentNode.querySelector("p")) {
    userPw.parentNode.querySelector("p").remove();
  }

  const msg = document.createElement("p");
  msg.style.marginTop = "8px";

  if (userId.value === '') {
    msg.textContent = "필수 정보입니다.";
    msg.style.color = "#EB5757";
    msg.style.margin = "10px 0";
    userId.parentNode.appendChild(msg);
    return;
  } else if (userPw.value === '') {
      msg.textContent = "필수 정보입니다.";
      msg.style.color = "#EB5757";
      msg.style.margin = "10px 0";
      userPw.parentNode.appendChild(msg);
  }

  if (userPw.value === '' || pwCheck.value === '') {
    pwCheck.style.border = '';
    return false;
  }

  if (userPw.value === pwCheck.value) {
    pwCheck.style.backgroundImage = "url('../assets/icons/icon-check-on.svg')";
    pwCheck.style.border = '';
  } else {
    msg.textContent = "비밀번호가 일치하지 않습니다.";
    msg.style.color = "#EB5757";
    msg.style.margin = "10px 0";
    pwCheck.style.border = '1px solid #eb5757';
    pwCheck.style.backgroundImage = "url('../assets/icons/icon-check-off.svg')";
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
    msg.textContent = "팔수 정보입니다.";
    msg.style.color = "#eb5757";
    msg.style.margin = "10px 0";
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
  
  if (!isIdChecked) {
    const msg = document.createElement("p");
  msg.textContent = "아이디 중복 확인을 해주세요.";
    msg.style.color = "#EB5757";
    msg.style.margin = "10px 0";
    idCheckBtn.parentNode.appendChild(msg);
    return;
  }

  joinForm.submit();
}


idCheckBtn.addEventListener("click", checkDupid);
userPw.addEventListener("input", inputPw);
pwCheck.addEventListener("input", clickPw);
joinForm.addEventListener("submit", chlickInput);

