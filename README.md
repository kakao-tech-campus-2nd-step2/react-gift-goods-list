# 카카오 테크 캠퍼스 - 프론트엔드 카카오 선물하기 편 Week3

[🔗 link](https://edu.nextstep.camp/s/hazAC9xa)

## ✏ 기능 목록

### STEP1

- [x] 메인페이지 API 연결
  - [x] Theme 카테고리 섹션 API 연결 : /api/v1/themes API 사용.
  - [x] 실시간 급상승 선물랭킹 섹션 API 연결 : /api/v1/ranking/products API 사용.
    - [x] 필터 조건을 선택하면 해당 조건에 맞게 API를 요청해서 보여지게 함.
- [x] Theme 페이지 API 연결
  - [x] Header API 연결 : url의 pathParams와 /api/v1/themes API 사용.
    - [x] themeKey가 잘못된 경우 메인페이지로 연결.
  - [x] 상품목록 섹션 API 연결 : /api/v1/themes/{themeKey}/products API 연결
    - [x] API 요청 시 한 번에 20개 상품 보여지도록 함.

### STEP2

- [x] 메인페이지 ThemeCategorySection 에러처리
- [x] 메인페이지 실시간 급상승 Section 에러처리
- [ ] Theme페이지 헤더부분 에러처리
- [ ] Tehme페이지 상품부분 에러처리
