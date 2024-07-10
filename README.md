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
- [ ] axios를 사용하여 API path 구현
  - [ ] axios 설치
  - [ ] Base URL 설정
- [ ] 메인 페이지 
  - [ ] Theme 카테고리 섹션(/api/v1/themes)
  - [ ] Trending 선물랭킹 섹션(/api/v1/ranking/products)
    - [ ] 필터 조건 선택하면 해당 조건에 맞게 API 요청해서 보여지게 함
- [ ] Theme 페이지
  - [ ] Header 섹션 themekey에 따라 내용 달라지게
  - [ ] Products 섹션 (api/themes/{themeKey}/products)
  - [ ] API 요청 시 한 번에 20개의 상품 목록이 내려오도록 한다.
- [ ] Error, Loading Status 핸들링하기
  - [ ] 각 API에서 Loading 상태에 대한 UI 대응 하기(Skeleton 방식으로 일단 시도,,!)
  - [ ] 데이터가 없는 경우에 대한 UI 대응
  - [ ] Http Status에 따라 Error 다르게 처리
