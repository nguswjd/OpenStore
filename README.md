# OpenStore

## 배포 URL
https://nguswjd.github.io/OpenStore/

<hr>

## ⚙️ 기술 스택
### Front-end
<div>
  <img src="./assets/readme-Image/HTMLCSS.png" width="80">
  <img src="./assets/readme-Image/JavaScript.png" width="80">
</div>

### Tools
<div>
  <img src="./assets/readme-Image/Github.png" width="80">
  <img src="./assets/readme-Image/Notion.png" width="80">
</div>

<hr>

## 📁 프로젝트 구조
```
📦OpenStore
 ┣ 📂assets                   <!-- icon 이미지 파일 -->
 ┃ ┗ 📜icons                         
 ┣ 📂components               <!-- header, main, footer, modal을 재사용을 하기 위한 폴더 -->
 ┃ ┣ 📜header.js
 ┃ ┣ 📜main.js                     
 ┃ ┣ 📜footer.js                   
 ┃ ┗ 📜modal.js                        
 ┣ 📂css                               
 ┃ ┣ 📜reset.css
 ┃ ┣ 📜style.js               <!-- 로그인 페이지, 회원가입 페이지, 제품 상세 페이지 제외 스타일 css -->
 ┃ ┣ 📜login-join.js          <!-- 로그인 페이지, 회원가입 페이지 스타일 css -->
 ┃ ┗ 📜product_details.js     <!-- 제품 상세 페이지 스타일 css -->
 ┣ 📂js
 ┃ ┣ 📜api.js                 <!-- api 모음 -->
 ┃ ┣ 📜DOM.js                 <!-- DOM 모음 -->
 ┃ ┣ 📜main.js
 ┃ ┣ 📜product_details.js
 ┃ ┣ 📜login.js
 ┃ ┗ 📜join.js
 ┣ 📜index.html
 ┣ 📜product_details.html
 ┣ 📜login.html
 ┣ 📜join.html
 ┗ 📜404.html
```

### 📂 js 파일
#### 📜main.js
|사용자 종류에 따른 header 변경|
|:---:|
|<img src="./assets/readme-Image/screen/비사용자-헤더.png" width = "450px;">|
|만약 localStorage가 빈 상태일 때 장바구니/마이페이지가 비사용자 모드|
|:---:|
|<img src="./assets/readme-Image/screen/구매자-헤더.png" width = "450px;">|
|만약 localStorage에서 불러온 `user_type`이 `BUYER`인 상태일 때 장바구니/마이페이지 상태를 변경|
|:---:|
|<img src="./assets/readme-Image/screen/판매자-헤더.png" width = "450px;">|
|만약 localStorage에서 불러온 `user_type`이 `SELLER`인 상태일 때 장바구니/마이페이지 상태를 변경|


#### 📜product_details.js

#### 📜login.js

#### 📜join.js


<hr>

## ⚒️ 추후에 구현할 부분
- SPA(Single Page Application) 방식 적용
- login.js > 94번 째 줄, 108번 쨰 줄 css 로 수정 필요

