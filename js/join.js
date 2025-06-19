// 기본 url
const baseUrl = 'https://api.wenivops.co.kr/services/open-market/';

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
const verifybusinessNum = document.querySelector(".verify-business");
const businessInput = document.getElementById("join-businessNum");

const storeName = document.getElementById("join-storeName");

// 전역변수
let isIdChecked = false;
let isBuyer = true;


// 공통 메시지 표시 함수
function showMsg(parentElement, text, color = "#EB5757") {
  // 기존 메시지 제거
  if (parentElement.querySelector("p")) {
    parentElement.querySelector("p").remove();
  }
  
  const msg = document.createElement("p");
  msg.textContent = text;
  msg.style.color = color;
  msg.style.margin = "10px 0";
  msg.style.marginTop = "8px";
  parentElement.appendChild(msg);
}

// 상위 필수 입력란 체크하는 공통 함수 (현재 입력 중인 필드는 제외)
function checkRequiredFields(skipField) {
  // 기존 메시지들 제거
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
  if (userNumContainer.parentNode.querySelector("p")) {
    userNumContainer.parentNode.querySelector("p").remove();
  }

  // 상위 필수 입력란들 체크 (현재 입력 중인 필드는 제외)
  if (skipField !== 'userId' && userId.value === '') {
    showMsg(idCheckBtn.parentNode, "필수 정보입니다.");
  }

  if (skipField !== 'userPw' && userPw.value === '') {
    showMsg(userPw.parentNode, "필수 정보입니다.");
  }

  if (skipField !== 'pwCheck' && pwCheck.value === '') {
    showMsg(pwCheck.parentNode, "필수 정보입니다.");
  }

  if (skipField !== 'userName' && userName.value === '') {
    showMsg(userName.parentNode, "필수 정보입니다.");
  }

  if (skipField !== 'phone' && (phoneMid.value === '' || phoneEnd.value === '')) {
    showMsg(userNumContainer.parentNode, "필수 정보입니다.");
  }
}

// 아이디 중복확인
function checkDupid() {
  if (idCheckBtn.parentNode.querySelector("p")) {
    idCheckBtn.parentNode.querySelector("p").remove();
  }
  
  const username = userId.value;

  if (username === '') {
    showMsg(idCheckBtn.parentNode, "아이디를 입력해주세요.");
    isIdChecked = false;
    return;
  } else if (username.length > 20 || !/^[a-zA-Z0-9]+$/.test(username)) {
    showMsg(idCheckBtn.parentNode, "20자 이내의 영문 소문자, 대문자, 숫자만 사용 가능합니다.");
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
        showMsg(idCheckBtn.parentNode, "멋진 아이디네요 :)", "#21bf48");
        isIdChecked = true;
      } else if (data.error) {
        showMsg(idCheckBtn.parentNode, data.error);
        isIdChecked = false;
      }
    })
    .catch(error => {
      showMsg(idCheckBtn.parentNode, "오류가 발생했습니다. 다시 시도해주세요.");
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
    showMsg(idCheckBtn.parentNode, "필수 정보입니다.");
  }

  if (!/[a-z]/.test(password) || !/\d/.test(password) || password.length < 8) {
      showMsg(userPw.parentNode, "8자 이상, 영문 대 소문자, 숫자, 특수문자를 사용하세요.");
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

  if (idCheckBtn.parentNode.querySelector("p")) {
    idCheckBtn.parentNode.querySelector("p").remove();
  }

  // 상위 필수 입력란들 체크
  if (userId.value === '') {
    showMsg(idCheckBtn.parentNode, "필수 정보입니다.");
  }

  if (userPw.value === '') {
    showMsg(pwCheck.parentNode, "필수 정보입니다.");
    pwCheck.style.border = '1px solid #eb5757';
  }
  
  if (userPw.value === '') {
    if (userPw.parentNode.querySelector("p")) {
      userPw.parentNode.querySelector("p").remove();
    }
    
    showMsg(userPw.parentNode, "필수 정보입니다.");
  }

  // 비밀번호 일치 확인
  if (userPw.value !== '' && userPw.value === pwCheck.value) {
    pwCheck.style.backgroundImage = "url('../assets/icons/icon-check-on.svg')";
    pwCheck.style.border = '';
    return true;
  } else if (userPw.value !== '' && pwCheck.value !== '') {
    showMsg(pwCheck.parentNode, "비밀번호가 일치하지 않습니다.");
    pwCheck.style.border = '1px solid #eb5757';
    pwCheck.style.backgroundImage = "url('../assets/icons/icon-check-off.svg')";
    return false;
  }
  
  return false;
}

// 이름 입력시 상위 필수 입력란 확인
function inputName() {
  // 기존 메시지 제거
  const existing = userName.parentNode.querySelector("p");
  if (existing) existing.remove();

  // 이름 입력시에는 상위 필드들만 체크 (휴대폰 번호 제외)
  if (idCheckBtn.parentNode.querySelector("p")) {
    idCheckBtn.parentNode.querySelector("p").remove();
  }
  if (userPw.parentNode.querySelector("p")) {
    userPw.parentNode.querySelector("p").remove();
  }
  if (pwCheck.parentNode.querySelector("p")) {
    pwCheck.parentNode.querySelector("p").remove();
  }

  // 상위 필수 입력란들만 체크
  if (userId.value === '') {
    showMsg(idCheckBtn.parentNode, "필수 정보입니다.");
  }

  if (userPw.value === '') {
    showMsg(userPw.parentNode, "필수 정보입니다.");
  }

  if (pwCheck.value === '') {
    showMsg(pwCheck.parentNode, "필수 정보입니다.");
  }
}

// 휴대폰 번호 필수 입력란 확인
function inputPhone() {
  // 기존 메시지 제거
  const existing = userNumContainer.parentNode.querySelector("p");
  if (existing) existing.remove();

  checkRequiredFields('phone');
}

// 제출 폼 확인
function chlickInput(e) {
  e.preventDefault();

  // 모든 기존 에러 메시지 제거
  const errorMessages = joinForm.querySelectorAll("p");

  errorMessages.forEach(msg => msg.remove());

  function showError(input) {
    showMsg(input.parentNode, "필수 정보입니다.");
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
    showMsg(idCheckBtn.parentNode, "아이디 중복 확인을 해주세요.");
    hasError = true;
  }

  if (!businessContainer.classList.contains("hidden")) {
    if (businessNum.value === '') {
      showMsg(businessContainer, "필수 정보입니다.");
      hasError = true;
    }

    if (storeName.value === '') {
      showMsg(storeName.parentNode, "필수 정보입니다.");
      hasError = true;
    }
  }

  if (hasError) {
    return;
  }
  
  // 실제 회원가입 API 호출
  if (isBuyer) {
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
          showMsg(userNumContainer.parentNode, "해당 전화번호는 이미 사용 중입니다.");
        } 
      });
    } else {
      showMsg(userNumContainer.parentNode, "핸드폰 번호는 10~11자리 숫자여야 합니다.");
    }
  } else {
    const phoneNumber = phoneFirst.value + phoneMid.value + phoneEnd.value;

    if (phoneNumber.length >= 10 && phoneNumber.length <= 11) {

    const loginInfo = {
      username: userId.value,
      password: userPw.value,
      name: userName.value,
      phone_number: phoneNumber,
      company_registration_number: businessNum.value,
      store_name: storeName.value
    };
    console.log(loginInfo);

    fetch(`${baseUrl}accounts/seller/signup/`, {
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
          showMsg(userNumContainer.parentNode, "해당 전화번호는 이미 사용 중입니다.");
        } 
      });
    } else {
      showMsg(userNumContainer.parentNode, "핸드폰 번호는 10~11자리 숫자여야 합니다.");
    }
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
  isBuyer = true;

  buyerBtn.classList.remove("not-focusBtn");
  buyerBtn.classList.add("focusBtn");

  sellerBtn.classList.remove("focusBtn");
  sellerBtn.classList.add("not-focusBtn");

  businessContainer.classList.add("hidden");
  userStore.classList.add("hidden");

  joinForm.style.borderRadius = '0 10px 10px 10px';
}

function clicksellernBtn() {
  isBuyer = false;

  sellerBtn.classList.remove("not-focusBtn");
  sellerBtn.classList.add("focusBtn");
  
  buyerBtn.classList.remove("focusBtn");
  buyerBtn.classList.add("not-focusBtn");

  businessContainer.classList.remove("hidden");
  userStore.classList.remove("hidden");

  joinForm.style.borderRadius = '10px 0 10px 10px';
}

function businessCheck() {
  // 기존 메시지 제거
  const existing = businessNum.parentNode.querySelector("p");
  if (existing) existing.remove();

  checkRequiredFields('businessNum');
}

function storeInput() {
  // 기존 메시지 제거
  const existing = storeName.parentNode.querySelector("p");
  if (existing) existing.remove();

  checkRequiredFields('storeName');

  // 사업자 번호도 체크
  if (businessNum.value === '') {
    showMsg(businessContainer, "필수 정보입니다.");
  }
}

// 사업자 중복확인
function checkDupbusiness() {
  if (verifybusinessNum.parentNode.querySelector("p")) {
    verifybusinessNum.parentNode.querySelector("p").remove();
  }
  
  const companyNum = businessNum.value;

  if (companyNum === '') {
    showMsg(verifybusinessNum.parentNode, "아이디를 입력해주세요.");
    isIdChecked = false;
    return;
  } else if (companyNum.length > 20 || !/^[a-zA-Z0-9]+$/.test(companyNum)) {
    showMsg(verifybusinessNum.parentNode, "20자 이내의 영문 소문자, 대문자, 숫자만 사용 가능합니다.");
    isIdChecked = false;
    return;
  }

  fetch(`${baseUrl}accounts/seller/validate-registration-number/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ company_registration_number : companyNum}),
  })
    .then(res => res.json())
    .then(data => {
      if (data.message) {
        showMsg(verifybusinessNum.parentNode, "멋진 사업자네요 :)", "#21bf48");
        isIdChecked = true;
      } else if (data.error) {
        showMsg(verifybusinessNum.parentNode, data.error);
        isIdChecked = false;
      }
    })
    .catch(error => {
      showMsg(idCheckBtn.parentNode, "오류가 발생했습니다. 다시 시도해주세요.");
      console.error("Fetch Error:", error);
    });
}

buyerBtn.addEventListener("click", clickbuyBtn);
sellerBtn.addEventListener("click", clicksellernBtn);
verifybusinessNum.addEventListener("click", checkDupbusiness);
businessInput.addEventListener("input", businessCheck);
storeName.addEventListener("input", storeInput);