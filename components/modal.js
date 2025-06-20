document.getElementById("modal").innerHTML = `
    <p>로그인이 필요한 서비스입니다. <br>
    로그인 하시겠습니까? </p>

    <section>
        <a id="go-back-btn">아니오</a>
        <a href="login.html" id="go-login-btn">네</a>
    </section>

    <button id="delete">
        <img src="assets/icons/icon-delete.svg" alt="">
    </button>
`;
