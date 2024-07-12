# 카카오 테크 캠퍼스 Step2 과제(3주차)
###  사용한 기술 스택
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white">
</br>

### 프로젝트 설명
**[카카오 선물하기 사이트](https://gift.kakao.com/home)** 를 만들려한다.

이번 주차의 목표는 API를 활용한 비동기 처리 및 Error, Loading 등의 Status 핸들링이다.


### 프로젝트 요구사항
- [X] axios를 사용하여 API path 구현
  - [X] axios 설치
  - [X] Base URL 설정
- [X] 메인 페이지 
  - [X] Theme 카테고리 섹션(/api/v1/themes)
  - [X] Trending 선물랭킹 섹션(/api/v1/ranking/products)
    - [X] 필터 조건 선택하면 해당 조건에 맞게 API 요청해서 보여지게 함
- [X] Theme 페이지
  - [X] Header 섹션 themekey에 따라 내용 달라지게
  - [X] Products 섹션 (api/themes/{themeKey}/products)
  - [X] API 요청 시 한 번에 20개의 상품 목록이 내려오도록 한다.
- [X] Error, Loading Status 핸들링하기
  - [X] Loading 스피너 고르기
  - [X] 각 API에서 Loading 상태에 대한 UI 대응 하기(Skeleton 방식으로 일단 시도,,!(포기,, 걍 Spinner 돌리자)))
  - [X] 데이터가 없는 경우에 대한 UI 대응
  - [X] Http Status에 따라 Error 다르게 처리(일단 400, 404만..)
  - [ ] Error 페이지 제작,,(시간관계상 포기)


  ### 프로젝트 링크
  https://react-gift-goods-list-git-step1-joshuadesus-projects.vercel.app/