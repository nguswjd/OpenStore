// 기본 url
const baseUrl = "https://api.wenivops.co.kr/services/open-market/";

const loginForm = document.getElementById("loginForm");
const userIdInput = document.getElementById("user-id");
const userPwInput = document.getElementById("user-pw");
const loginContainer = document.querySelector("#loginForm > div");
const buyerBtn = document.getElementById("buyer-btn");
const sellerBtn = document.getElementById("seller-btn");

// 현재 선택된 사용자 타입을 추적하는 변수
let selectedUserType = "BUYER";

function showMsg(parentElement, text, color = "#EB5757") {
  if (parentElement.querySelector("p")) {
    parentElement.querySelector("p").remove();
  }
  const msg = document.createElement("p");
  msg.textContent = text;
  msg.style.color = color;
  msg.style.margin = "8px";
  parentElement.appendChild(msg);
}

// login error Msg
function ErrorMsg(e) {
  e.preventDefault();

  if (userIdInput.value === "") {
    showMsg(loginContainer, "아이디를 입력해 주세요.");
    userIdInput.focus();
  } else if (userPwInput.value === "") {
    showMsg(loginContainer, "비밀번호를 입력해 주세요.");
    userPwInput.focus();
  } else {
    // 로그인 API 호출
    const loginData = {
      username: userIdInput.value,
      password: userPwInput.value,
    };

    fetch(`${baseUrl}accounts/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access && data.refresh && data.user) {
          // "user_type": "BUYER" | "SELLER"
          const serverUserType = data.user.user_type;

          if (serverUserType !== selectedUserType) {
            showMsg(loginContainer, "구매자/판매자 유형을 다시 선택해주세요.");
            return;
          }

          if (serverUserType === "BUYER") {
            window.location.href = "buyer.html";
          } else if (serverUserType === "SELLER") {
            window.location.href = "seller.html";
          }
        } else if (data.error) {
          // 로그인 실패
          showMsg(loginContainer, "아이디 또는 비밀번호가 일치하지 않습니다.");
        } else {
          showMsg(loginContainer, "로그인에 실패했습니다.");
        }
      })
      .catch((error) => {
        showMsg(loginContainer, "오류가 발생했습니다. 다시 시도해주세요.");
        console.error("Login Error:", error);
      });
  }
}

// 판매 회원 / 구매회원 버튼 클릭
function clickbuyBtn() {
  selectedUserType = "BUYER";

  buyerBtn.classList.remove("not-focusBtn");
  buyerBtn.classList.add("focusBtn");
  sellerBtn.classList.remove("focusBtn");
  sellerBtn.classList.add("not-focusBtn");
  loginForm.style.borderRadius = "0 10px 10px 10px";

  if (loginContainer.querySelector("p")) {
    loginContainer.querySelector("p").remove();
  }
}

function clicksellernBtn() {
  selectedUserType = "SELLER";

  sellerBtn.classList.remove("not-focusBtn");
  sellerBtn.classList.add("focusBtn");
  buyerBtn.classList.remove("focusBtn");
  buyerBtn.classList.add("not-focusBtn");
  loginForm.style.borderRadius = "10px 0 10px 10px";

  if (loginContainer.querySelector("p")) {
    loginContainer.querySelector("p").remove();
  }
}

buyerBtn.addEventListener("click", clickbuyBtn);
sellerBtn.addEventListener("click", clicksellernBtn);
loginForm.addEventListener("submit", ErrorMsg);
