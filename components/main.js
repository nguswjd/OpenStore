document.querySelector("main").innerHTML = `
    <!-- 메인 슬라이드 -->
    <section class="main-slide">
        <h2 class="sr-only">페이지 소개 슬라이드</h2>
        <button>
            <img src="assets/icons/icon-swiper-1.svg" alt="왼쪽으로 슬라이드 넘기기">
        </button>

        <ul class="main-slide-list">
            <li>
                <!-- TODO: 이미지 수정 필요 -->
                <!-- <img src="assets/products/딥러닝_무릎담요.png" alt="슬라이드 이미지"> -->
            </li>
        </ul>

        <button>
            <img src="assets/icons/icon-swiper-2.svg" alt="오른쪽으로 슬라이드 넘기기">
        </button>
    </section>

    <!-- 상품 목록 -->
    <section class="product-list">
        <h2 class="sr-only">상품 목록</h2>
        <ul></ul>
    </section>
`;
