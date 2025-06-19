const loginForm = document.getElementById("loginForm");
const userIdInput = document.getElementById("user-id");
const userPwInput = document.getElementById("user-pw");
const loginContainer = document.querySelector("#loginForm > div");

function showMSG(parentElement, text, color = "#EB5757") {
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
function Errormsg(e) {
    if (userIdInput.value === '') {
        e.preventDefault();
        showMSG(loginContainer, "아이디를 입력해 주세요.");
        userIdInput.focus();
    } else if (userPwInput.value === '') {
        e.preventDefault();
        showMSG(loginContainer, "비밀번호를 입력해 주세요.");
        userPwInput.focus();
    }
}

loginForm.addEventListener("submit", Errormsg);

// 판매 회원 / 구매회원 버튼 클릭
const buyerBtn = document.getElementById("buyer-btn");
const sellerBtn = document.getElementById("seller-btn");

function clickbuyBtn() {
    buyerBtn.classList.remove("not-focusBtn");
    buyerBtn.classList.add("focusBtn");
    sellerBtn.classList.remove("focusBtn");
    sellerBtn.classList.add("not-focusBtn");
    loginForm.style.borderRadius = '0 10px 10px 10px';
}

function clicksellernBtn() {
    sellerBtn.classList.remove("not-focusBtn");
    sellerBtn.classList.add("focusBtn");
    buyerBtn.classList.remove("focusBtn");
    buyerBtn.classList.add("not-focusBtn");
    loginForm.style.borderRadius = '10px 0 10px 10px';
}

buyerBtn.addEventListener("click", clickbuyBtn);
sellerBtn.addEventListener("click", clicksellernBtn);