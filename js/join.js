// DOM
const buyerBtn = document.getElementById("buyer-btn");
const sellerBtn = document.getElementById("seller-btn");
const userStore = document.getElementById("userstore");

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

const businessNum = document.getElementById("join-businessNum");
const businessContainer = document.getElementById("businessNumContainer");
const verifybusinessNum = document.getElementById("verify-business");
const businessInput = document.getElementById("join-businessNum");

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
        isIdChecked = false;
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

  // 상위 필수 입력란 체크
  if (userId.value === '') {
    const idMsg = document.createElement("p");
    idMsg.textContent = "필수 정보입니다.";
    idMsg.style.color = "#EB5757";
    idMsg.style.margin = "10px 0";
    idCheckBtn.parentNode.appendChild(idMsg);
  }

  const msg = document.createElement("p");
  msg.style.marginTop = "8px";

  if (!/[a-z]/.test(password) || !/\d/.test(password) || password.length < 8) {
      msg.textContent = "8자 이상, 영문 대 소문자, 숫자, 특수문자를 사용하세요.";
      userPw.parentNode.appendChild(msg);
      msg.style.color = "#EB5757";
      return;
  } else {
    userPw.style.backgroundImage = "url('../assets/icons/icon-check-on.svg')";
  }
}

// 비밀번호 일치 확인
function checkPw() {
  // 기존 메시지 제거
  const existingMsg = pwCheck.parentNode.querySelector("p");
  if (existingMsg) existingMsg.remove();

  const msg = document.createElement("p");
  msg.style.marginTop = "8px";

  if (idCheckBtn.parentNode.querySelector("p")) {
    idCheckBtn.parentNode.querySelector("p").remove();
  }

  // 상위 필수 입력란들 체크
  if (userId.value === '') {
    const idMsg = document.createElement("p");
    idMsg.textContent = "필수 정보입니다.";
    idMsg.style.color = "#EB5757";
    idMsg.style.margin = "10px 0";
    idCheckBtn.parentNode.appendChild(idMsg);
  }

  if (userPw.value === '') {
    const pwMsg = document.createElement("p");
    pwMsg.textContent = "비밀번호가 일치하지 않습니다.";
    pwMsg.style.color = "#EB5757";
    pwMsg.style.margin = "10px 0";
    pwCheck.style.border = '1px solid #eb5757';
    pwCheck.parentNode.appendChild(pwMsg);
  }
  
  if (userPw.value === '') {
    if (userPw.parentNode.querySelector("p")) {
      userPw.parentNode.querySelector("p").remove();
    }
    
    const pwMsg = document.createElement("p");
    pwMsg.textContent = "필수 정보입니다.";
    pwMsg.style.color = "#EB5757";
    pwMsg.style.margin = "10px 0";
    userPw.parentNode.appendChild(pwMsg);
  }

  // 비밀번호 일치 확인
  if (userPw.value !== '' && userPw.value === pwCheck.value) {
    pwCheck.style.backgroundImage = "url('../assets/icons/icon-check-on.svg')";
    pwCheck.style.border = '';
    return true;
  } else if (userPw.value !== '' && pwCheck.value !== '') {
    msg.textContent = "비밀번호가 일치하지 않습니다.";
    msg.style.color = "#EB5757";
    msg.style.margin = "10px 0";
    pwCheck.style.border = '1px solid #eb5757';
    pwCheck.style.backgroundImage = "url('../assets/icons/icon-check-off.svg')";
    pwCheck.parentNode.appendChild(msg);
    return false;
  }
  
  return false;
}

// 이름 입력시 상위 필수 입력란 확인
function inputName() {
  // 기존 메시지 제거
  const existing = userName.parentNode.querySelector("p");
  if (existing) existing.remove();

  if (idCheckBtn.parentNode.querySelector("p")) {
    idCheckBtn.parentNode.querySelector("p").remove();
  }

  if (userPw.parentNode.querySelector("p")) {
    userPw.parentNode.querySelector("p").remove();
  }

  if (pwCheck.parentNode.querySelector("p")) {
    pwCheck.parentNode.querySelector("p").remove();
  }

  // 상위 필수 입력란들 체크
  if (userId.value === '') {
    const idMsg = document.createElement("p");
    idMsg.textContent = "필수 정보입니다.";
    idMsg.style.color = "#EB5757";
    idMsg.style.margin = "10px 0";
    idCheckBtn.parentNode.appendChild(idMsg);
  }

  if (userPw.value === '') {
    const pwMsg = document.createElement("p");
    pwMsg.textContent = "필수 정보입니다.";
    pwMsg.style.color = "#EB5757";
    pwMsg.style.margin = "10px 0";
    userPw.parentNode.appendChild(pwMsg);
  }

  if (pwCheck.value === '') {
    const pwCheckMsg = document.createElement("p");
    pwCheckMsg.textContent = "필수 정보입니다.";
    pwCheckMsg.style.color = "#EB5757";
    pwCheckMsg.style.margin = "10px 0";
    pwCheck.parentNode.appendChild(pwCheckMsg);
  }
}

// 휴대폰 번호 필수 입력란 확인
function inputPhone() {
  // 기존 메시지 제거
  const existing = userNumContainer.parentNode.querySelector("p");
  if (existing) existing.remove();

  if (idCheckBtn.parentNode.querySelector("p")) {
    idCheckBtn.parentNode.querySelector("p").remove();
  }

  if (userPw.parentNode.querySelector("p")) {
    userPw.parentNode.querySelector("p").remove();
  }

  if (pwCheck.parentNode.querySelector("p")) {
    pwCheck.parentNode.querySelector("p").remove();
  }

  if (userName.parentNode.querySelector("p")) {
    userName.parentNode.querySelector("p").remove();
  }

  // 상위 필수 입력란들 체크
  if (userId.value === '') {
    const Msg = document.createElement("p");
    Msg.textContent = "필수 정보입니다.";
    Msg.style.color = "#EB5757";
    Msg.style.margin = "10px 0";
    idCheckBtn.parentNode.appendChild(Msg);
  }

  if (userPw.value === '') {
    const Msg = document.createElement("p");
    Msg.textContent = "필수 정보입니다.";
    Msg.style.color = "#EB5757";
    Msg.style.margin = "10px 0";
    userPw.parentNode.appendChild(Msg);
  }

  if (pwCheck.value === '') {
    const Msg = document.createElement("p");
    Msg.textContent = "필수 정보입니다.";
    Msg.style.color = "#EB5757";
    Msg.style.margin = "10px 0";
    pwCheck.parentNode.appendChild(Msg);
  }

  if (userName.value === '') {
    const Msg = document.createElement("p");
    Msg.textContent = "필수 정보입니다.";
    Msg.style.color = "#EB5757";
    Msg.style.margin = "10px 0";
    userName.parentNode.appendChild(Msg);
  }
}

// 제출 폼 확인
function chlickInput(e) {
  e.preventDefault();

  // 모든 기존 에러 메시지 제거
  const errorMessages = joinForm.querySelectorAll("p");

  errorMessages.forEach(msg => msg.remove());

  function showError(input) {
    const msg = document.createElement("p");
    msg.textContent = "필수 정보입니다.";
    msg.style.color = "#eb5757";
    msg.style.margin = "10px 0";
    input.parentNode.appendChild(msg);
  }

  let hasError = false;

  if (userId.value === '') {
    showError(userId);
    hasError = true;
  }

  if (userPw.value === '') {
    showError(userPw);
    hasError = true;
  }

  if (userName.value === '') {
    showError(userName);
    hasError = true;
  }

  if (phoneMid.value === '' || phoneEnd.value === '') {
    showError(userNumContainer);
    hasError = true;
  } 

  if (!checkPw()) {
    hasError = true;
  }
  
  if (userId.value !== '' && !isIdChecked) {
    const msg = document.createElement("p");
    msg.textContent = "아이디 중복 확인을 해주세요.";
    msg.style.color = "#EB5757";
    msg.style.margin = "10px 0";
    idCheckBtn.parentNode.appendChild(msg);
    hasError = true;
  }

  if (businessNum.value === '') {
    const msg = document.createElement("p");
    msg.textContent = "필수 정보입니다.";
    msg.style.color = "#EB5757";
    msg.style.margin = "10px 0";
    businessContainer.appendChild(msg);
    hasError = true;
  }

  if (storeName.value === '') {
    const msg = document.createElement("p");
    msg.textContent = "필수 정보입니다.";
    msg.style.color = "#EB5757";
    msg.style.margin = "10px 0";
    storeName.parentNode.appendChild(msg);
    hasError = true;
  }

  if (hasError) {
    return;
  }
    
  // 실제 회원가입 API 호출
  const phoneNumber = phoneFirst.value + phoneMid.value + phoneEnd.value;

  if (phoneNumber.length >= 10 && phoneNumber.length <= 11) {

  const loginInfo = {
    username: userId.value,
    password: userPw.value,
    name: userName.value,
    phone_number: phoneNumber
  };
  // console.log(loginInfo);

  fetch(`${baseUrl}accounts/buyer/signup/`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(loginInfo),
  })
    .then(res => {
      if (!res.ok) {
        return res.json().then(errData => {
          // 오류를 throw해서 .catch로 
          throw errData;
        });
      }
      return res.json();
    })
    .then(() => {
      window.location.href = "/login.html";
    })
    .catch(err => {
      if (err.phone_number) {
        const msg = document.createElement("p");
        msg.textContent = "해당 전화번호는 이미 사용 중입니다.";
        msg.style.color = "#EB5757";
        msg.style.margin = "10px 0";
        userNumContainer.parentNode.appendChild(msg);
      } 
    });
  } else {
    const msg = document.createElement("p");
    msg.textContent = "핸드폰 번호는 10~11자리 숫자여야 합니다.";
    msg.style.color = "#EB5757";
    msg.style.margin = "10px 0";
    userNumContainer.parentNode.appendChild(msg);
  }
  
}

idCheckBtn.addEventListener("click", checkDupid);
userPw.addEventListener("input", inputPw);
pwCheck.addEventListener("input", checkPw);
userName.addEventListener("input", inputName);
phoneMid.addEventListener("input", inputPhone);
phoneEnd.addEventListener("input", inputPhone);
joinForm.addEventListener("submit", chlickInput);



// 판매회원가입 
// 판매 회원 / 구매회원 버튼 클릭
function clickbuyBtn() {
  buyerBtn.classList.remove("not-focusBtn");
  buyerBtn.classList.add("focusBtn");

  sellerBtn.classList.remove("focusBtn");
  sellerBtn.classList.add("not-focusBtn");

  businessContainer.classList.add("hidden");
  userStore.classList.add("hidden");

  loginForm.style.borderRadius = '0 10px 10px 10px';
}

function clicksellernBtn() {
  sellerBtn.classList.remove("not-focusBtn");
  sellerBtn.classList.add("focusBtn");
  
  buyerBtn.classList.remove("focusBtn");
  buyerBtn.classList.add("not-focusBtn");

  businessContainer.classList.remove("hidden");
  userStore.classList.remove("hidden");

  loginForm.style.borderRadius = '10px 0 10px 10px';
}

function businessCheck() {
  // 기존 메시지 제거
  const existing = businessNum.parentNode.querySelector("p");
  if (existing) existing.remove();

  // 상위 필수 항목 누락 메시지 제거
  const idMsg = idCheckBtn.parentNode.querySelector("p");
  if (idMsg) idMsg.remove();

  const pwMsg = userPw.parentNode.querySelector("p");
  if (pwMsg) pwMsg.remove();

  const pwCheckMsg = pwCheck.parentNode.querySelector("p");
  if (pwCheckMsg) pwCheckMsg.remove();

  const nameMsg = userName.parentNode.querySelector("p");
  if (nameMsg) nameMsg.remove();

  const phoneMsg = userNumContainer.parentNode.querySelector("p");
  if (phoneMsg) phoneMsg.remove();

  // 필수 항목 검사
  if (userId.value === '') {
    const msg = document.createElement("p");
    msg.textContent = "필수 정보입니다.";
    msg.style.color = "#EB5757";
    msg.style.margin = "10px 0";
    idCheckBtn.parentNode.appendChild(msg);
  }

  if (userPw.value === '') {
    const msg = document.createElement("p");
    msg.textContent = "필수 정보입니다.";
    msg.style.color = "#EB5757";
    msg.style.margin = "10px 0";
    userPw.parentNode.appendChild(msg);
  }

  if (pwCheck.value === '') {
    const msg = document.createElement("p");
    msg.textContent = "필수 정보입니다.";
    msg.style.color = "#EB5757";
    msg.style.margin = "10px 0";
    pwCheck.parentNode.appendChild(msg);
  }

  if (userName.value === '') {
    const msg = document.createElement("p");
    msg.textContent = "필수 정보입니다.";
    msg.style.color = "#EB5757";
    msg.style.margin = "10px 0";
    userName.parentNode.appendChild(msg);
  }

  if (phoneMid.value === '' || phoneEnd.value === '') {
    const msg = document.createElement("p");
    msg.textContent = "필수 정보입니다.";
    msg.style.color = "#EB5757";
    msg.style.margin = "10px 0";
    userNumContainer.parentNode.appendChild(msg);
  }
}

function storeInput() {
  // 기존 메시지 제거
  const existing = businessNum.parentNode.querySelector("p");
  if (existing) existing.remove();

  // 상위 필수 항목 누락 메시지 제거
  const idMsg = idCheckBtn.parentNode.querySelector("p");
  if (idMsg) idMsg.remove();

  const pwMsg = userPw.parentNode.querySelector("p");
  if (pwMsg) pwMsg.remove();

  const pwCheckMsg = pwCheck.parentNode.querySelector("p");
  if (pwCheckMsg) pwCheckMsg.remove();

  const nameMsg = userName.parentNode.querySelector("p");
  if (nameMsg) nameMsg.remove();

  const phoneMsg = userNumContainer.parentNode.querySelector("p");
  if (phoneMsg) phoneMsg.remove();

  const businessMsg = businessContainer.parentNode.querySelector("p");
  if (businessMsg) businessMsg.remove();

  // 필수 항목 검사
  if (userId.value === '') {
    const msg = document.createElement("p");
    msg.textContent = "필수 정보입니다.";
    msg.style.color = "#EB5757";
    msg.style.margin = "10px 0";
    idCheckBtn.parentNode.appendChild(msg);
  }

  if (userPw.value === '') {
    const msg = document.createElement("p");
    msg.textContent = "필수 정보입니다.";
    msg.style.color = "#EB5757";
    msg.style.margin = "10px 0";
    userPw.parentNode.appendChild(msg);
  }

  if (pwCheck.value === '') {
    const msg = document.createElement("p");
    msg.textContent = "필수 정보입니다.";
    msg.style.color = "#EB5757";
    msg.style.margin = "10px 0";
    pwCheck.parentNode.appendChild(msg);
  }

  if (userName.value === '') {
    const msg = document.createElement("p");
    msg.textContent = "필수 정보입니다.";
    msg.style.color = "#EB5757";
    msg.style.margin = "10px 0";
    userName.parentNode.appendChild(msg);
  }

  if (phoneMid.value === '' || phoneEnd.value === '') {
    const msg = document.createElement("p");
    msg.textContent = "필수 정보입니다.";
    msg.style.color = "#EB5757";
    msg.style.margin = "10px 0";
    userNumContainer.parentNode.appendChild(msg);
  }

  if (businessNum.value === '') {
    const msg = document.createElement("p");
    msg.textContent = "필수 정보입니다.";
    msg.style.color = "#EB5757";
    msg.style.margin = "10px 0";
    businessContainer.appendChild(msg);
  }
}

buyerBtn.addEventListener("click", clickbuyBtn);
sellerBtn.addEventListener("click", clicksellernBtn);
businessInput.addEventListener("input", businessCheck);
storeName.addEventListener("input", storeInput);
