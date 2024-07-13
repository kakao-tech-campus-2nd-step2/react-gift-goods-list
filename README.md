## 1단계 - API 적용하기

### 구현 기능 목록

- [x] API 모듈 작성 (Request, Response Type 정의)
- [x] 메인 페이지 Theme 카테고리 섹션 API 구현
- [x] 메인 페이지 실시간 급상승 선물랭킹 섹션 API 구현
- [x] Theme 페이지 Header API 구현
- [x] Theme 페이지 상품 목록 섹션 API 구현

## 2단계 - Error, Loading Status 핸들링 하기

(각 페이지에서 Loading/데이터가 없는 경우 UI 대응 및 Error 처리)

- [x] 메인 페이지 실시간 급상승 선물랭킹 섹션 UI 대응 및 Error 처리
- [x] Theme 페이지 상품 목록 섹션 UI 대응 및 Error 처리
- [x] Themes API UI 대응 및 Error 처리

## 3단계 - 테마 별 선물 추천 API에 페이지네이션 구현하기 & React Query 사용해보기

- [x] Theme 페이지에 페이지네이션 구현
- [x] API를 react-query를 사용해 구현

## 4단계 - 질문의 답변을 README에 작성

### 질문 1. CORS 에러는 무엇이고 언제 발생하는지 설명해주세요. 이를 해결할 수 있는 방법에 대해서도 설명해주세요.

- CORS 에러 (Cross-Origin Resource Sharing) : 웹 브라우저에서 다른 도메인, 프로토콜, 포트 등의 리소스에 접근하려고 할 때 발생하는 보안 에러
- 발생하는 경우
  - 기본적으로 웹 브라우저는 보안 상의 이유로 다른 출처의 리소스에 대한 요청을 제한함 → 서버가 올바른 CORS 헤더를 포함하지 않을 경우 요청이 제한되면서 CORS 에러 발생
- 해결 방법
  - 서버가 올바른 CORS 헤더를 포함해 응답하도록 설정
  - 개발 중에 프록시 서버 사용

### 질문 2. 비동기 처리 방법인 callback, promise, async await에 대해 각각 장단점과 함께 설명해주세요.

- Callback
  - 장점
    - 간단하고 직관적
  - 단점
    - 중첩된 Callback이 많아지면 코드가 복잡해짐 (Callback Hell)
    - 에러 처리가 분산됨
- Promise
  - 장점
    - then과 catch를 사용해 체이닝과 에러 처리가 더 명확해짐
    - Callback Hell을 피할 수 있음
  - 단점
    - 복잡한 로직에서는 체이닝이 길어질 수도 있음
- Async/Await
  - 장점
    - 비동기 코드를 동기 코드처럼 작성 가능 → 가독성이 좋음
    - try-catch 사용으로 에러 처리가 명확해짐
  - 단점
    - async 함수 안에서만 awiat을 사용할 수 있음

### 질문 3. react query의 주요 특징에 대해 설명하고, queryKey는 어떤 역할을 하는지 설명해주세요.

- React Query의 주요 특징
  - 서버 상태를 클라이언트에서 관리하고 업데이트하는 것을 쉽게 만듦
  - 자동 Refeching: 의존성 데이터가 변경되거나, 브라우저 창이 포커스 될 때, 네트워크가 다시 연결될 때 자동으로 데이터를 다시 가져옴
  - Caching 및 백그라운드 데이터 동기화: caching으로 성능을 최적화하고, 백그라운드에서 데이터를 동기화해 최신 상태 유지
  - 다양한 옵션과 hook을 제공
- queryKey의 역할
  - 고유 식별자: 각 query를 식별하는데 사용됨. 동일한 queryKey를 가진 query는 동일한 데이터를 공유
  - Caching: queryKey를 기준으로 데이터를 caching하고 관리
  - 의존성 관리: queryKey는 해당 query의 의존성을 나타냄 → 변경되면 query를 다시 실행
