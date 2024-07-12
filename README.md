#week3: 상품 리스트 구현 - api

## 프로젝트 실행 방법
```
git clone https://github.com/ychy61/react-gift-goods-list.git week3
cd week3
npm install
npm run start
```

## 1단계 - API 적용하기

- [X] 첨부된 oas.yaml 파일을 토대로 Request, Response Type을 정의
- [X] React Query를 사용하지 말고 axios를 사용해서 구현
- [X] 첨부된 oas.yaml 파일과 목 API URL을 사용하여 API를 구현
   - 메인 페이지 - Theme 카테고리 섹션
    - [X] `/api/v1/themes` API를 사용하여 Section 구현
    - 메인 페이지 - 실시간 급상승 선물랭킹 섹션
    - [X] `/api/v1/ranking/` products API를 사용하여 Section 구현
    - [X] 필터 조건을 선택 하면 해당 조건에 맞게 API를 요청하여 보여지게 함.
    - Theme 페이지 - header
    - [X] url의 pathParams와 `/api/v1/themes API`를 사용하여 Section 구현
    - [X] `themeKey`가 잘못 된 경우 메인 페이지로 연결
    - Theme 페이지 - 상품 목록 섹션
    - [X] `/api/v1/themes/{themeKey}/products` API를 사용하여 상품 목록 구현
    - [X] API 요청 시 한번에 20개의 상품 목록이 내려오도록 함.

### 2단계 - Error, Loading Status 핸들링 하기

- [X] 각 API에서 Loading 상태에 대한 UI 대응
- [X] 데이터가 없는 경우에 대한 UI 대응
- [X] Http Status에 따라 Error를 다르게 처리
