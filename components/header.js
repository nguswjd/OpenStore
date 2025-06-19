document.querySelector("header").innerHTML = `
    <section class="logo-search">
      <h1>
        <img src="assets/icons/Logo-hodu.png" alt="호두마켓 로고">
      </h1>

      <form class="search-box" id="search-form">
        <input type="text" placeholder="상품을 검색해보세요!" id="search-input" name="search">
        <button type="submit">
          <img src="assets/icons/search.svg" alt="검색">
        </button>
      </form>
    </section>

    <section class="user-menu">
      <h2 class="sr-only">장바구니 및 로그인</h2>
      <ul>
        <li id="shopping-mypage">
          <a href="#">
            <img src="assets/icons/icon-shopping-cart.svg" alt="장바구니">
            <span>장바구니</span>
          </a>
        </li>
        <li id="mypage-seller">
          <a href="login.html">
            <img src="assets/icons/icon-user.svg" alt="로그인">
            로그인
          </a>
        </li>
      </ul>
    </section>
`;
