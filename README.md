# 💰 Monthly-Expenditure

## 🖥️프로젝트 소개

- 이 프로젝트는 JWT 인증을 통해 보호된 환경에서 사용자가 자신의 지출 내역을 관리합니다.<br>
- 지출내역을 월별로 조회하고 수정/삭제가 가능하며, 프로필 정보를 수정할 수 있는 기능을 제공합니다.<br>
- json-server 배포를 통해 glitch 를 익혀봅니다.

<br>

## 🕰️개발 기간

- 24.06.10 ~ 06.14

<br>

## 📌기능

- jwt 인증 서버를 사용하여 인증되어야 서비스를 이용할 수 있습니다.
  - accessToken 만료시 로그아웃 처리
  - 인증된 유저만 mypage 에 접근이 가능합니다.
- json-server 를 이용해서 지출데이터에 대한 CRUD 구현 (작성, 조회, 수정, 삭제)
  - 지출내역 작성 / 삭제시 유효성 검사를 통해 사용자의 입력 오류를 사전에 방지할 수 있습니다.
  - 누가 해당 지출을 생성했는지 (userID) 가 나타나도록 합니다.
- 월별 지출 조회 기능 구현 (Home - Read)
  - 차트와 리스트를 통해 지출내역을 입체적으로 파악할 수 있습니다.
- 월별 지출 항목 등록 구현 (Home - Create)
  - 특정 월을 선택하여 해당 월의 지출내역을 확인할 수 있습니다.
- 지출 상세 화면 구현 (Detail - Read)
- 지출항목 수정/삭제의 경우 작성자만 본인의 내역을 수정/삭제 할 수 있습니다.
  - 상세화면에서 지출 항목 수정 구현 (Detail - Update)
  - 상세화면에서 지출 항목 삭제 구현 (Detail - Delete)
- Mypage 에서 로그인한 유저의 정보를 바꿀수 있습니다.
  - 닉네임, 프로필이미지 수정가능

<br>

## 🗂️ 폴더구조

```
📦
├─ .eslintrc.cjs
├─ .gitignore
├─ README.md
├─ db.json
├─ index.html
├─ package.json
├─ public
│  └─ vite.svg
├─ src
│  ├─ App.jsx
│  ├─ QueryClientSetup.jsx
│  ├─ api
│  │  ├─ Auth.js
│  │  └─ Expenses.js
│  ├─ assets
│  │  ├─ profileDefault.png
│  │  └─ react.svg
│  ├─ components
│  │  ├─ GlobalStyles.jsx
│  │  ├─ Header.jsx
│  │  ├─ InputForm.jsx
│  │  ├─ Layout.jsx
│  │  ├─ List.jsx
│  │  ├─ MonthButton.jsx
│  │  └─ PieChart.jsx
│  ├─ context
│  │  └─ AuthContext.jsx
│  ├─ hooks
│  │  └─ useUserInfo.jsx
│  ├─ main.jsx
│  ├─ pages
│  │  ├─ Detail.jsx
│  │  ├─ Home.jsx
│  │  ├─ Login.jsx
│  │  ├─ Mypage.jsx
│  │  └─ Signup.jsx
│  ├─ redux
│  │  ├─ config
│  │  │  └─ configStore.js
│  │  └─ slices
│  │     └─ DataSlice.js
│  └─ shared
│     └─ Router.jsx
├─ vite.config.js
└─ yarn.lock
```

<br>

## 🗄️파일설명

### 📂api

- Auth.js : Axios를 사용하여 인증 API 요청과 토큰 만료 시 자동 로그아웃 기능을 제공하는 커스텀 훅을 정의합니다.
- Expenses.js : Axios를 사용하여 JSON 서버에서 CRUD 작업을 수행하는 여러 함수들을 정의합니다.

### 📂components

- GlobalStyles.jsx : Styled Components 라이브러리를 사용하여 전역 스타일링을 구현하는 컴포넌트입니다.
- Layout.jsx : 인증 인터셉터를 적용하고 헤더와 자식 컴포넌트를 렌더링하는 레이아웃 컴포넌트를 정의합니다.
- Header.jsx : 사용자 정보와 로그아웃 기능을 포함한 헤더 컴포넌트를 정의하고 스타일링합니다. Mypage 로 이동이 가능합니다.
- InputForm.jsx : 날짜, 카테고리, 금액, 내용에 대해 입력해서 지출내역을 생성하는 컴포넌트입니다.
- List.jsx : 작성된 지출내역을 리스트 형태로 보여주는 컴포넌트입니다. 작성자의 userid 와 함께 보여집니다.
- MonthButton.jsx : 월별 버튼 컴포넌트를 구현한 것입니다. 사용자가 버튼을 클릭하면 Redux 상태의 activeIndex 값이 변경되어 선택된 월을 표시합니다.
- PieChart.jsx : 지출내역에 대해 시각적인 효과를 줄 수 있도록 사용한 pie chart 입니다.

### 📂shared

- Router.jsx : id 값을 기준으로 home -> detail 페이지로 이동할 수 있도록 클라이언트 사이드 라우팅을 구현했습니다. React Router를 사용하여 인증 상태에 따라 접근을 제어하는 (PrivateRoute, PublicRoute) 라우팅 설정을 정의합니다.

### 📂pages

- Home.jsx : 헤더, 입력 폼, 월별 버튼, 파이 차트, 목록 등의 전체적인 UI 요소를 포함하고 있습니다.
- Detail.jsx : 지출내역 수정/삭제 기능을 구현한 지출 상세 페이지입니다. 본인이 작성한 내역만 변경사항을 반영할 수 있습니다.
- Login.jsx : 사용자 로그인 폼을 구성하고 로그인 성공 시 홈 화면으로 이동시키며 실패 시 경고 메시지를 표시하는 로그인 컴포넌트를 정의합니다.
- Signup.jsx : 사용자가 회원가입을 할 수 있도록 입력 폼과 유효성 검사, 회원가입 요청 및 결과 처리 기능을 제공합니다.
- Mypage.jsx : 사용자가 닉네임과 프로필 사진을 변경할 수 있는 컴포넌트입니다.

### 📂hooks

- useUserinfo.jsx : fetchUserInfo를 사용하여 사용자 정보를 가져오는 useUserInfo 커스텀 훅을 정의하며, 에러 발생 시 처리할 함수도 설정합니다.

### 📂Redux

- configstore.js : Redux Toolkit을 사용하여 Redux 스토어를 구성하는 파일로, DataSlice 리듀서를 스토어에 등록하고 있습니다.
- DataSlice.js : 전역적으로 사용하고 있는 데이터 관리를 위한 setActiveIndex, setData 리듀서를 구성하고있습니다.

### 📂Root

- App.jsx : Redux 스토어와 글로벌 스타일을 제공하고 React Router를 사용하여 라우팅을 구현합니다.
- main.jsx : QueryClientSetup 로 감싸고 root 엘리먼트에 렌더링합니다.
- QueryClientSetup.jsx : React Query 클라이언트를 설정하고 제공하는 QueryClientSetup 컴포넌트를 정의합니다.
