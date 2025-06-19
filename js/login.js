// 기본 url
const baseUrl = 'https://api.wenivops.co.kr/services/open-market/';

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
    e.preventDefault();
    
    if (userIdInput.value === '') {
        showMSG(loginContainer, "아이디를 입력해 주세요.");
        userIdInput.focus();
    } else if (userPwInput.value === '') {
        showMSG(loginContainer, "비밀번호를 입력해 주세요.");
        userPwInput.focus();
    } else {
        // 로그인 API 호출
        const loginData = {
            username: userIdInput.value,
            password: userPwInput.value
        };
        
        fetch(`${baseUrl}accounts/login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        })
        .then(res => res.json())
        .then(data => {
            if (data.access && data.refresh && data.user) {
                // console.log('로그인', data);
                if (data.user.user_type === 'BUYER') {
                    // window.location.href = '구매자로.html'; 
                } else if (data.user.user_type === 'SELLER') {
                    // window.location.href = '판매자로.html'; 
                }
            } else if (data.error) {
                // 로그인 실패
                showMSG(loginContainer, data.error);
            }
        })
        .catch(error => {
            showMSG(loginContainer, "오류가 발생했습니다. 다시 시도해주세요.");
            console.error("Login Error:", error);
        });
    }
}

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
loginForm.addEventListener("submit", Errormsg);