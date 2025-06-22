import { API } from "./api.js";

// DOM
import {
  buyerBtn, sellerBtn,
  joinForm,
  userId,
  userPw, pwCheck, idCheckBtn,
  userName,
  phoneNumberContainer, phoneFirst, phoneMid, phoneEnd,
  businessNum, verifybusinessNum, businessInput,
  inputStore
} from "./DOM.js";

// 전역변수
let selectedUserType = "BUYER";
let isIdChecked = false;
let isBusinessNumChecked = false;

const buyerInfo = [
userId,
userPw,
userName,
phoneMid, phoneEnd
];

const sellerInfo = [
userId,
userPw,
userName,
phoneMid, phoneEnd,
businessNum,
inputStore
];

// 공통 msg
function showMsg(parentElement, text = "필수 정보입니다.", color = "#EB5757") {
  removeMsg(parentElement);

  const msg = document.createElement("p");
  msg.textContent = text;
  msg.style.color = color;
  msg.style.margin = "10px 0";
  msg.style.marginTop = "8px";
  parentElement.appendChild(msg);
}

//  메시지 제거
function removeMsg(parentElement) {
  const oldMsg = parentElement.querySelector("p");

  if (oldMsg) {
    oldMsg.remove();
  }
}

// 판매 회원 / 구매회원 버튼 클릭
function clickbuyerBtn() {
  for(let i = 0; i < buyerInfo.length; i++) {
    removeMsg(buyerInfo[i].parentNode);
    buyerInfo[i].value = "";
  }
  removeMsg(pwCheck.parentNode);
  removeMsg(phoneNumberContainer.parentNode);
  
  selectedUserType = "BUYER";

  buyerBtn.classList.remove("not-focusBtn");
  buyerBtn.classList.add("focusBtn");

  sellerBtn.classList.remove("focusBtn");
  sellerBtn.classList.add("not-focusBtn");

  businessNum.parentNode.classList.add("hidden");
  inputStore.parentNode.classList.add("hidden");

  joinForm.style.borderRadius = "0 10px 10px 10px";
}

function clicksellernBtn() {
  for(let i = 0; i < sellerInfo.length; i++) {
    removeMsg(sellerInfo[i].parentNode);
    sellerInfo[i].value = "";
  }
  removeMsg(pwCheck.parentNode);

  selectedUserType = "SELLER";

  sellerBtn.classList.remove("not-focusBtn");
  sellerBtn.classList.add("focusBtn");

  buyerBtn.classList.remove("focusBtn");
  buyerBtn.classList.add("not-focusBtn");

  businessNum.parentNode.classList.remove("hidden");
  inputStore.parentNode.classList.remove("hidden");

  joinForm.style.borderRadius = "10px 0 10px 10px";
}

// 중복확인 상태 초기화
function resetIdCheck() {
  isIdChecked = false;
  removeMsg(userId.parentNode);
}

function resetBusinessCheck() {
  isBusinessNumChecked = false;
  removeMsg(businessNum.parentNode);

  if (userId.value === "") {
    showMsg(userId.parentNode);
  }
  
  if (userPw.value === "") {
    showMsg(userPw.parentNode);
  }

  if (pwCheck.value === "") {
    showMsg(pwCheck.parentNode);
  }

  if (userName.value === "") {
    showMsg(userName.parentNode);
  }

  if (phoneMid.value === "" || phoneEnd.value === "") {
    showMsg(phoneNumberContainer.parentNode);
  }

}

// 중복 확인
function clickIdVerify() {
  removeMsg(userId.parentNode);

  if (userId.value === "") {
    showMsg(userId.parentNode);
    isIdChecked = false;
    return;
  } else if (userId.value.length > 20 || !/^[a-zA-Z0-9]+$/.test(userId.value)) {
    showMsg(
      userId.parentNode,
      "20자 이내의 영문 소문자, 대문자, 숫자만 사용 가능합니다."
    );
    isIdChecked = false;
    return;
  }

  fetch(API.VALIDATE_USERID, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: userId.value }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message || data.success === true || data.available === true) {
        showMsg(userId.parentNode, "멋진 아이디네요 :)", "#21bf48");
        isIdChecked = true;
      } else {
        showMsg(userId.parentNode, "이미 사용 중인 아이디입니다.");
        isIdChecked = false;
      }
    })
    .catch((error) => {
      console.error("Fetch Error:", error);
      showMsg(userId.parentNode, "서버 연결에 문제가 있습니다. 다시 시도해주세요.");
      isIdChecked = false;
    });
}

function clickBusinessVerify() {
  if (businessNum.value === "") {
    showMsg(businessNum.parentNode);
    isBusinessNumChecked = false;
    return;
  } 

  fetch(API.VALIDATE_COMANY_NUMBER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ company_registration_number: businessNum.value }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        showMsg(businessNum.parentNode, "멋진 사업자네요 :)", "#21bf48");
        isBusinessNumChecked = true;
      } else if (data.error) {
        showMsg(businessNum.parentNode, data.error);
        isBusinessNumChecked = false;
      }
    })
    .catch((error) => {
      showMsg(businessNum.parentNode, "오류가 발생했습니다. 다시 시도해주세요.");
      console.error("Fetch Error:", error);
    });
}

// input
function inputPw() {
  removeMsg(userPw.parentNode);

  const password = userPw.value;

  if (userId.value === "") {
    showMsg(idCheckBtn.parentNode);
  }

  if (!/[a-z]/.test(password) || !/\d/.test(password) || password.length < 8) {
    showMsg(userPw.parentNode, "8자 이상, 영문 대 소문자, 숫자, 특수문자를 사용하세요.");
    userPw.style.backgroundImage = "url('../assets/icons/icon-check-off.svg')";
  } else {
    removeMsg(userPw.parentNode);
    userPw.style.backgroundImage = "url('../assets/icons/icon-check-on.svg')";
  }

  if (pwCheck.value !== "") {
    pwChecking();
  }
}

function inputUserName() {
  removeMsg(userName.parentNode);

  if (userId.value === "") {
    showMsg(userId.parentNode);
  }
  
  if (userPw.value === "") {
    showMsg(userPw.parentNode);
  }

  if (pwCheck.value === "") {
    showMsg(pwCheck.parentNode);
  }
}

function inputPhone() {
  removeMsg(phoneNumberContainer.parentNode);

  if (userId.value === "") {
    showMsg(userId.parentNode);
  }
  
  if (userPw.value === "") {
    showMsg(userPw.parentNode);
  }

  if (pwCheck.value === "") {
    showMsg(pwCheck.parentNode);
  }

  if (userName.value === "") {
    showMsg(userName.parentNode);
  }
}

function inputStoreName() {
  removeMsg(inputStore.parentNode);

  if (userId.value === "") {
    showMsg(userId.parentNode);
  }
  
  if (userPw.value === "") {
    showMsg(userPw.parentNode);
  }

  if (pwCheck.value === "") {
    showMsg(pwCheck.parentNode);
  }

  if (userName.value === "") {
    showMsg(userName.parentNode);
  }

  if (phoneMid.value === "" || phoneEnd.value === "") {
    showMsg(phoneNumberContainer.parentNode);
  }

  if (businessInput.value === "") {
    showMsg(businessInput.parentNode);
  }
}

// 비밀번호 재확인
function pwChecking() {
  removeMsg(pwCheck.parentNode); 

  if (userId.value === "") {
    showMsg(userId.parentNode);
  }
  
  if (userPw.value === "") {
    showMsg(userPw.parentNode);
  }

  if (pwCheck.value === "") {
    pwCheck.style.backgroundImage = "";
    return;
  }
  
  if (userPw.value !== pwCheck.value) {
    showMsg(pwCheck.parentNode, "비밀번호가 일치하지 않습니다.");
    pwCheck.style.backgroundImage = "url('../assets/icons/icon-check-off.svg')";
  } else {
    pwCheck.style.backgroundImage = "url('../assets/icons/icon-check-on.svg')";
  }
}

function joinSubmit(e) {
  e.preventDefault();
  removeMsg(phoneNumberContainer);

  const phoneNumber = phoneFirst.value + phoneMid.value + phoneEnd.value;

  let isValid = true;

  if (userId.value === "") {
    showMsg(userId.parentNode);
    isValid = false;
  } else if (!isIdChecked) {
    showMsg(idCheckBtn.parentNode, "아이디 중복확인을 해주세요.");
    isValid = false;
  }

  if (pwCheck.value === "") {
    showMsg(pwCheck.parentNode);
    isValid = false;
  } else if (userPw.value !== pwCheck.value) {
    showMsg(pwCheck.parentNode, "비밀번호가 일치하지 않습니다.");
    isValid = false;
  }

  if (userPw.value === "") {
    showMsg(userPw.parentNode);
    isValid = false;
  } else if (!/[a-z]/.test(userPw.value) || !/\d/.test(userPw.value) || userPw.value.length < 8) {
    showMsg(userPw.parentNode, "8자 이상, 영문 대 소문자, 숫자, 특수문자를 사용하세요.");
    isValid = false;
  }

  if (userName.value === "") {
    showMsg(userName.parentNode);
    isValid = false;
  }

  if (phoneMid.value === "" || phoneEnd.value === "") {
    showMsg(phoneNumberContainer.parentNode);
    isValid = false;
  } else if (!/^\d+$/.test(phoneMid.value) || !/^\d+$/.test(phoneEnd.value)) {
    showMsg(phoneNumberContainer.parentNode, "휴대폰 번호는 숫자만 입력해주세요.");
    isValid = false;
  } else if (phoneNumber.length < 10 || phoneNumber.length > 11) {
    showMsg(phoneNumberContainer.parentNode, "휴대폰 번호는 숫자 10~11자리 입니다.");
    isValid = false;
  }

  if (selectedUserType === "SELLER") {
    if (businessNum.value === "") {
      showMsg(businessNum.parentNode);
      isValid = false;
    } else if (!isBusinessNumChecked) {
      showMsg(businessNum.parentNode, "사업자번호 중복확인을 해주세요.");
      isValid = false;
    }

    if (inputStore.value === "") {
      showMsg(inputStore.parentNode);
      isValid = false;
    }
  }

  if (!isValid) return;

  if (selectedUserType === "BUYER") {
    fetch(API.BUYER_SIGNUP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        username: userId.value, 
        password: userPw.value,
        name: userName.value, 
        phone_number: phoneNumber,
        user_type: "BUYER"
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.username && data.name) {
          window.location.href = "login.html";
          // console.log(data);
        } else {
          if (data.phone_number) {
            showMsg(
              phoneNumberContainer.parentNode,
              "해당 전화번호는 이미 사용 중입니다."
            );
          } else {
            console.error("회원가입 실패:", data);
          }
        }
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
      });
      
  } else if (selectedUserType === "SELLER") {
    fetch(API.SELLER_SIGNUP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        username: userId.value,
        password: userPw.value,
        name: userName.value,
        phone_number: phoneNumber,
        company_registration_number: businessNum.value,
        store_name: inputStore.value
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.username && data.name) {
          window.location.href = "login.html";
          // console.log(data);
        } else {
          if (data.phone_number) {
            showMsg(
              phoneNumberContainer.parentNode,
              "해당 전화번호는 이미 사용 중입니다."
            );
          } else {
            console.error("판매자 회원가입 실패:", data);
          }
        }
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
      });
  }
}

// 이벤트 리스너
buyerBtn.addEventListener("click", clickbuyerBtn);
sellerBtn.addEventListener("click", clicksellernBtn);

userId.addEventListener("input", resetIdCheck);
idCheckBtn.addEventListener("click", clickIdVerify);

userPw.addEventListener("input", inputPw);
pwCheck.addEventListener("input", pwChecking);

userName.addEventListener("input", inputUserName);

phoneMid.addEventListener("input", inputPhone);
phoneEnd.addEventListener("input", inputPhone);

businessNum.addEventListener("input", resetBusinessCheck);
verifybusinessNum.addEventListener("click", clickBusinessVerify);

inputStore.addEventListener("input", inputStoreName);

joinForm.addEventListener("submit", joinSubmit);