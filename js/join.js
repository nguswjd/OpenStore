import { API } from "./api.js";

// DOM
import {
  buyerBtn,
  sellerBtn,
  joinForm,
  userId,
  idCheckBtn,
  userPw,
  pwCheck,
  userName,
  userNumContainer,
  phoneFirst,
  phoneMid,
  phoneEnd,
  businessNum,
  verifybusinessNum,
  businessInput,
  storeName,
  userIdInput,
} from "./DOM.js";

// 전역변수
let selectedUserType = "BUYER";

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
storeName
];

// 공통 msg
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

//  메시지 제거
function removeMsg(parentElement) {
  const oldMsg = parentElement.querySelector("p");

  if (oldMsg) {
    oldMsg.remove();
  }
}

// 판매 회원 / 구매회원 버튼 클릭
function clickbuyBtn() {
  for(let i = 0; i < buyerInfo.length; i++) {
    removeMsg(buyerInfo[i].parentNode);
  }
  removeMsg(userNumContainer.parentNode);
  
  selectedUserType = "BUYER";

  buyerBtn.classList.remove("not-focusBtn");
  buyerBtn.classList.add("focusBtn");

  sellerBtn.classList.remove("focusBtn");
  sellerBtn.classList.add("not-focusBtn");

  businessNum.parentNode.classList.add("hidden");
  storeName.parentNode.classList.add("hidden");

  joinForm.style.borderRadius = "0 10px 10px 10px";
}

function clicksellernBtn() {
  for(let i = 0; i < buyerInfo.length; i++) {
    removeMsg(buyerInfo[i].parentNode);
  }
  removeMsg(userNumContainer.parentNode);

  selectedUserType = "SELLER";

  sellerBtn.classList.remove("not-focusBtn");
  sellerBtn.classList.add("focusBtn");

  buyerBtn.classList.remove("focusBtn");
  buyerBtn.classList.add("not-focusBtn");

  businessNum.parentNode.classList.remove("hidden");
  storeName.parentNode.classList.remove("hidden");

  joinForm.style.borderRadius = "10px 0 10px 10px";
}

// 중복 확인
function clickIdVerify () {
  if (userName.value === "") {
    removeMsg(idCheckBtn.parentNode);
    showMsg(idCheckBtn.parentNode, "필수 정보입니다.");
  }
}

function clickBusinessVerify () {
  if (businessNum.value === "") {
    removeMsg(businessNum.parentNode);
    showMsg(businessNum.parentNode, "필수 정보입니다.");
  }
}

function joinSubmit(e) {
  e.preventDefault();

  // 유효성
  let isValid = true;

  if (selectedUserType === "BUYER") {
    if (phoneMid.value === "" || phoneEnd.value === "") {
      showMsg(userNumContainer.parentNode, "필수 정보입니다.");
      isValid = false;
    } else {
      removeMsg(userNumContainer.parentNode);
    }

    // 휴대폰 번호 제외
    for (let i = 0; i < buyerInfo.length; i++) {
      if (buyerInfo[i] === phoneMid || buyerInfo[i] === phoneEnd) continue;

      if (!buyerInfo[i].value) {
        showMsg(buyerInfo[i].parentNode, "필수 정보입니다.");
        isValid = false;
      } else {
        removeMsg(buyerInfo[i].parentNode);
      }
    }
  } else if (selectedUserType === "SELLER") {
    if (phoneMid.value === "" || phoneEnd.value === "") {
      showMsg(userNumContainer.parentNode, "필수 정보입니다.");
      isValid = false;
    } else {
      removeMsg(userNumContainer.parentNode);
    }

    // 휴대폰 번호 제외
    for (let i = 0; i < sellerInfo.length; i++) {
      if (sellerInfo[i] === phoneMid || sellerInfo[i] === phoneEnd) continue;

      if (!sellerInfo[i].value) {
        showMsg(sellerInfo[i].parentNode, "필수 정보입니다.");
        isValid = false;
      } else {
        removeMsg(sellerInfo[i].parentNode);
      }
    }
  }

  if (!isValid) return;

  console.log("모든값 입력");
}


buyerBtn.addEventListener("click", clickbuyBtn);
sellerBtn.addEventListener("click", clicksellernBtn);
idCheckBtn.addEventListener("click", clickIdVerify);
verifybusinessNum.addEventListener("click", clickBusinessVerify);
joinForm.addEventListener("submit", joinSubmit);
