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

## 🎁 3단계 - 테마 별 선물 추천 API에 페이지네이션 구현하기 & React Query 사용해보기
### ✅ 기능 목록
- [x] 스크롤을 내리면 추가로 데이터를 요청
- [x] 1단계에서 구현한 API를 react-query로 구현

## 🤔 4단계 - 질문의 답변을 README에 작성
### 질문 1. CORS 에러
CORS 에러는 웹 애플리케이션이 다른 도메인에서 리소스를 요청할 때 발생합니다. 해결 방법으로는 서버에서 CORS 헤더 추가, 프록시 서버 사용, 개발 중 브라우저 설정 변경 등이 있습니다.

### 질문 2. 비동기 처리 방법
Callback은 간단하지만 콜백 지옥이 발생할 수 있습니다. Promise는 체이닝을 통해 가독성이 좋지만 코드가 길어질 수 있습니다. Async/Await는 동기식 코드처럼 읽혀 가독성이 뛰어나지만 예외 처리를 위해 try/catch를 사용해야 합니다.

### 질문 3. React Query와 queryKey
React Query는 서버 상태 관리, 캐싱, 비동기 데이터 페칭을 간소화합니다. queryKey는 각 쿼리를 고유하게 식별하여 캐싱, 업데이트, 무효화를 효율적으로 관리하는 데 사용됩니다.


## 🛠️ 코드 리뷰 반영
### 📄 요구 사항
- [x] .env파일 .gitignore에 추가
- [x] 불필요한 rest operator 제거
- [x] 불필요한 barrel file pattern 지양하도록 리팩토링
- [x] useInfiniteScroll scroll 조건과 fetchNextPage를 인자로 받아 hook을 개선
- [] useGoodsItemListQuery hook
  - [x] queryKey 오타 수정
  - [x] queryKey, queryFn 분리 제거
  - [x] useInfiniteQuery 타입 지정 오류 개선
- [] type 절대경로 네임스페이스 지정