## **경북대 FE\_정솔빈\_2주차 과제 Week 3**

### 1단계 - API 적용하기

**할 일 목록:**

- [x] Request, Response Type 정의, API 구현
- [x] 메인 페이지 - Theme 카테고리 섹션
  - [x] /api/v1/themes API를 사용하여 section을 구현
- [x] 메인 페이지 - 실시간 급상승 선물 랭킹 섹션
  - [x] /api/v1/ranking/products API를 사용하여 section 구현
  - [x] 필터 조건을 선택하면 해당 조건에 맞게 API를 요청해서 보이도록 구현
- [x] Theme 페이지 - header
  - [x] url의 pathParams와 /api/v1/themes API를 사용하여 section을 구현
  - [x] themeKey가 잘못된 경우 메인 페이지로 연결
- [x] Theme 페이지 - 상품 목록 섹션
  - [x] /api/v1/themes/{themeKey}/products API를 사용하여 상품 목록 구현
  - [x] API 요청 시 한번에 20개의 상품 목록이 내려오도록 구현

### 2단계 - Error, Loading Status 핸들링 하기

**할 일 목록:**

- [x] 각 API에서 Loading 상태에 대한 UI 대응
- [x] 데이터가 없는 경우에 대한 UI 대응
- [x] Http Status에 따라 Error를 다르게 처리

### 3단계 - 테마 별 선물 추천 API에 페이지네이션 구현하기 & React Query 사용해보기

**할 일 목록:**

- [x] 스크롤 내리면 추가로 데이터를 요청하여 보여지도록 구현하기
- [x] 1단계에서 구현한 API를 react-query를 사용해서 구현하기

---

### 4단계 - 질문의 답변을 README에 작성

**1. CORS 에러는 무엇이고 언제 발생하는지 설명해주세요. 이를 해결할 수 있는 방법에 대해서도 설명해주세요.**

CORS (Cross-Origin Resource Sharing)는 웹 어플리케이션에서 다른 도메인의 리소스에 접근할 때 발생하는 보안 이슈를 해결하기 위한 표준 방법입니다. 즉, 영어 의미 그대로 엇갈린 다른 출처로 인한 에러를 의미합니다. 웹 브라우저는 HTTP 요청에 대해서 각기 다른 특징을 가지고 있기 때문에 이러한 에러가 발생합니다. 동일 출처 정책 (Same-Origin Policy)은 동일한 출처(URL) 서버에 있는 리소스는 가져올 수 있지만 다른 출처(Cross-Origin) 서버에 있는 이미지와 유튜브 영상 같은 리소스는 상호작용이 불가능합니다. 이때 출처는 Protocol, Host, Port로 동일함을 판단합니다. 예를 들어 <img>, <video>, <script>, <link> 태그 는 Cross-Origin 정책을 지원하고 Fetch API 스크립트는 Same-Origin 정책을 따릅니다.

동작 원리를 알아보자면

1. 클라이언트 HTTP 요청의 헤더에 Origin 정보를 담어서 보냅니다.

   _이때까지 헤더의 역할을 제대로 이해하지 않고 사용한 것 같아 반성합니다.._

   HTTP 헤더는 저장되거나 전송되는 데이터 블록의 맨 앞에 위치한 데이터를 의미하며 클라이언트와 서버가 요청 또는 응답으로 부가적인 정보를 전송할 수 있도록 합니다.

   웹이 HTTP 프로토콜을 이용하여 서버의 요청을 보낼 때 브라우저는 요청 헤더에 Origin이라는 필드에 출처를 함께 보냅니다.

2. 서버 응답 헤더에 Acces-Control-Allow-Origin 정보를 클라이언트로 보냅니다.

   여기서 Acces-Control-Allow-Origin이란 응답 헤더 중 하나로, 다른 도메인에서 요청하는 경우 어떤 도메인에서 요청을 허용할 것인지를 명시합니다.
   예를 들어, 서버 A에서 도메인이 www.abc.com인데 다른 도메인에서 이 자원에 접근하려는 경우, www.abc.com 서버에서 Acces-Control-Allow-Origin 헤더에 접근하고자 하는 다른 도메인을 명시해 요청을 허용할 수 있습니다.

3. 비교
   요청할 때 보낸 Origin 정보와 서버에 보낸 Acces-Control-Allow-Origin 정보를 비교해서 서버에서 보내준 Acces-Control-Allow-Origin의 차단 유무를 결정합니다. 만약 유효하지 않다면 그 응답을 사용하지 않고 버리는데 이때 CORS 에러가 발생합니다!

이러한 에러를 해결하기 위해서 서버에서 Access-Control-Allow-Origin 헤더를 직접 세팅에 해결할 수 있습니다. CORS의 동작원리를 통해 해결방법을 생각했을 때 가장 명확하게 해결할 수 있는 방법이라고 생각합니다.

또, 요청해야하는 URL 앞에 프록시 서버 URL을 붙혀 요청하게 되면 해결할 수 있습니다.

여기서 프록시(Proxy) 서버란 클라이언트가 자신을 거쳐 다른 네트워크에 접속할 수 있도록 중간에서 대리로 통신해주는 서버를 의미합니다.

```
클라이언트에서 프록시 서버로 데이터를 전송 -> 프록시 서버에서 다시 웹 서버로 웹 요청 -> 웹 서버에서 프록시 서버로 웹 응답 -> 프록시 서버에서 클라이언트로 데이터 전송
```

마지막으로 Chrome의 확장 프로그램을 이용하여 해결할 수 있습니다.

**2. 비동기 처리 방법인 callback, promise, async await에 대해 각각 장단점과 함께 설명해주세요.**

**3. react query의 주요 특징에 대해 설명하고, queryKey는 어떤 역할을 하는지 설명해주세요.**

---

### 코드 작성하면서 어려웠던 점

- CORS의 동작 원리를 알아보는 과정에서 HTTP 요청과 응답의 상호작용에 대해 이해하기 어려웠습니다. 서버와 브라우저 간의 상호작용에서 처음 알게 된 내용들이 많았습니다😢

### 마무리 및 질문

**1. Unexpected Application Error**
홈 화면에서 처음 각 테마 중 하나를 눌러서 테마 페이지로 이동하면 Unexpected Application Error가 발생합니다. 다시 이전 화면으로 돌아가서 테마를 누르면 정상적으로 코드가 작동됩니다.

시도1. 오류 페이지에서 동기 입력에 응답하면서 컴포넌트가 중단되었고, startTrannsition을 사용하여 중단을 최소화할 수 있다고 해서 startTransition을 이용했지만 똑같은 오류가 발생합니다.
