# OP-AL 프로젝트

## 최초 clone 후 프로젝트 실행 방법

- npm i
- npm run start

## 초기 세팅(프로젝트 생성 및 eslint, prettier 설정은 아래 블로그를 참고했습니다.)

### cra 프로젝트 생성 및 초기설정

(참고했던 링크)

- https://velog.io/@junghyeonsu/React-create-react-app-Typescript-%EC%B4%88%EA%B8%B0-%EC%84%B8%ED%8C%85-%EC%99%84%EB%B2%BD-%EC%A0%95%EB%A6%AC

### 폴더구조(초기 디렉터리 생성)

- Assets: 폰트, 이미지 등을 담습니다(추후 사용하지 않을 시 삭제).
- Components: (재사용이 가능한) 컴포넌트들을 담습니다.
- Pages: Router를 사용하여 이동할 큼지막한 컴포넌트
  -> Home: 메인 페이지 입니다.
  -> MyPage: 마이페이지 입니다. 회인 개인정보 및 계좌등록 및 조회, 구매내역조회 등이 포함됩니다.
  -> ProductDetail: 한 제품(공간)의 상세정보를 담은 상세페이지입니다.
  -> ProductList: 검색 등을 통해 사용자에게 보여주는 제품(공간) 목록 페이지입니다.
  -> ProductPayment: 제품(공간) 결제 페이지입니다.
  -> SignIn: 로그인 페이지입니다.
  -> SignUp: 회원가입 페이지입니다.
- Store: 데이터와 데이터를 관리하는 파일들을 담습니다.
  -> Data: Redux 관련 store / Actions / Reducer 등
  -> Type: 인터페이스나 이미지 파일을 처리하는 모듈 등
- Styles: Style 관련 파일들을 담습니다.

(참고했던 링크)

- https://velog.io/@greatasher7/React-Typescript-Setup-without-CRA-4

## 현재 사용버전

- typescript: 4.9.5
- react: 18.2.0
- react-dom: 18.2.0
- styled-components: 5.3.10
- eslint: 8.42.0
- prettier: 2.8.8
