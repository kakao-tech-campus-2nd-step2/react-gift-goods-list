# 3️⃣ 3주차 API
## 📡 1단계 - API 적용하기
### ✅ 기능 목록
- [x] `oas.yaml` 파일을 토대로 Request, Response Type을 정의
- [x] axios 설치
- [x] `oas.yaml` 파일과 목 API URL을 사용하여 API를 구현
  - 메인 페이지 - Theme 카테고리 섹션
    - [x] `/api/v1/themes` API를 사용하여 Section을 구현
    - [x] API는 Axios 또는 React Query 등을 모두 활용해서 구현
  - 메인 페이지 - 실시간 급상승 선물랭킹 섹션
    - [x] `/api/v1/ranking/products` API를 사용하여 Section을 구현 (Axios 사용 가능)
    - [x] 필터 조건을 선택 하면 해당 조건에 맞게 API를 요청하여 보여지게 구현
  - Theme 페이지 - header
    - [x] url의 pathParams와 `/api/v1/themes` API를 사용하여 Section을 구현
    - [x] `themeKey`가 잘못 된 경우 메인 페이지로 연결
  - Theme 페이지 - 상품 목록 섹션
    - [x] `/api/v1/themes/{themeKey}/products` API를 사용하여 상품 목록을 구현
    - [x] API 요청 시 한번에 20개의 상품 목록이 내려오도록 구현

## ⚠️ 2단계 - Error, Loading Status 핸들링 하기
### ✅ 기능 목록
- [x] Loading 상태에 대한 UI 대응
- [x] 데이터가 없는 경우에 대한 UI 대응
- [x] Http Status에 따라 Error를 다르게 처리
