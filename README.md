## ✏️ 요구사항

### Week 1

📝 1단계

- 메인 페이지 - Theme 카테고리 섹션
    - [ ] **`/api/v1/themes`**
- 메인 페이지 - 실시간 급상승 선물랭킹 섹션
    - [ ] **`/api/v1/ranking/products`**
    - [ ] 필터링 구현
- Theme 페이지 - header
    - [ ] url의 pathParams와 **`/api/v1/themes`**
    - [ ] **`themeKey`**가 잘못 된 경우 메인 페이지로 연결
- Theme 페이지 - 상품 목록 섹션
    - [ ] **`/api/v1/themes/{themeKey}/products`**
    - [ ] API 요청 시 한번에 20개의 상품 목록이 내려오도록