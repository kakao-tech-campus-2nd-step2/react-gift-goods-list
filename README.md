# FE 카카오 선물하기 3주차 과제
---
## 요구사항
__step1__
첨부된 oas.yaml 파일을 토대로 Request, Response Type을 정의
첨부된 oas.yaml 파일과 목 API URL을 사용하여 API를 구현
* 메인 페이지 - Theme 카테고리 섹션
/api/v1/themes API를 사용하여 Section을 구현.

* 메인 페이지 - 실시간 급상승 선물랭킹 섹션
/api/v1/ranking/products API를 사용하여 Section을 구현.
필필터 조건을 선택 하면 해당 조건에 맞게 API를 요청하여 보여지게 구현.

* Theme 페이지 - header
url의 pathParams와 /api/v1/themes API를 사용하여 Section을 구현.
themeKey가 잘못 된 경우 메인 페이지로 연결.

* Theme 페이지 - 상품 목록 섹션
/api/v1/themes/{themeKey}/products API를 사용하여 상품 목록을 구현

__step2__
각 API에서 Loading 상태에 대한 UI 대응 구현.
데이터가 없는 경우에 대한 UI 대응 구현.
Http Status에 따라 Error를 다르게 처리.

__step3__
스크롤을 내리면 추가로 데이터를 요청하여 보여지게 구현.
1단계에서 구현한 API를 react-query를 사용해서 구현.


## 실행
npm run start를 통해 개발서버 실행

---

### 질문 1. CORS 에러는 무엇이고 언제 발생하는지 설명해주세요. 이를 해결할 수 있는 방법에 대해서도 설명해주세요.
CORS란 Cross-Origin Resoure Sharing의 줄임말로 다른 출처(origin)에서 자원을 요청할 때 발생할 수 있는 문제다.
즉, 다른 출처라고도 말할 수 있고 다른 출처이기 때문에 발생하는 에러라고도 할 수 있다. 이때 출처는 Protocol, Host, 포트번호를 의미한다.

브라우저에서는 동일 출처 정책(Same-Origin Policy)을 따르기 때문에 다른 출처에서 자원을 요청할 때 CORS에러가 발생할 수 있다.

이를 해결하기 위한 대표적인 방법으로 서버에서 CORS를 설정하는 방법이 있다. 서버 측에서 HTTP 헤더를 이용하여 CORS를 허용하도록 설정하며 주로 사용되는 헤더는 다음과 같다.
Access-Control-Allow-Origin: 요청을 허용할 출처(Origin)
Access-Control-Allow-Methods: 허용할 HTTP 메서드(GET, POST 등)
Access-Control-Allow-Headers: 허용할 HTTP 헤더(Content-Type 등)
Access-Control-Allow-Credentials: 인증 정보를 포함할지 여부

예를 들어 모든 출처에서 요청을 허용하려면 다음과 같이 설정할 수 있다.
Access-Control-Allow-Origin: *

프론트 쪽에서 해결하기 위해선 클라이언트에서 직접 요청을 보내기 전에 프록시 서버를 사용하여 CORS 문제를 우회하는 방법이 있다. 프록시 서버는 요청을 받아서 다른 서버로 전달하고 응답을 클라이언트에게 전달함으로써 문제를 해결한다.

### 질문 2. 비동기 처리 방법인 callback, promise, async await에 대해 각각 장단점과 함께 설명해주세요.
__Callback__
장점: 초기 JS에서 사용되던 비동기 처리 방식으로 단순하고 직관적이다.
단점: 콜백 지옥이 생긴다면 중첩이 깊어져서 나중에 유지보수가 힘들어진다.

__Promise__
장점: 콜백 헬을 해결할 수 있으며 Chaining을 통해 연속적 비동기 작업을 처리할 수 있다.
단점: 처음에 이해하기 어려운 개념이다.

__async, await__
장점: 비동기 코드를 동기식 코드처럼 작성할 수 있어 가독성이 위 두 방법보다 좋다.
단점: async 함수 내에서만 await를 사용할 수 있어, 일반 함수나 전역 범위에서는 직접적으로 사용할 수 없다.

### 질문 3. react query의 주요 특징에 대해 설명하고, queryKey는 어떤 역할을 하는지 설명해주세요.
__React Query란?__
fetching, caching, 서버 데이터와의 동기화를 지원해주는 라이브러리이다.
__React Query의 주요 특징__
1. 리액트 쿼리는 자동으로 데이터를 캐싱하여 이전에 불러온 데이터를 재사용하고, 상태 관리를 쉽게 할 수 있다.
2. 네트워크 오류 처리와 재시도 로직을 내장하여 안정적이게 데이터를 요청할 수 있다.

__queryKey의 역할__
queryKey는 React Query에서 각각의 쿼리를 고유하게 식별하는 역할을 한다. 첫 번째 요소는 쿼리의 이름 또는 식별자, 그 뒤로는 해당 쿼리에 필요한 추가적인 매개변수들로 구성된다. 예를 들어, ['todos', { userId: 1 }]와 같이 사용자의 ID에 따라 todos를 가져오는 쿼리를 정의할 수 있다.
