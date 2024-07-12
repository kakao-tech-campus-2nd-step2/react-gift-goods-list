# react-gift-goods-list
FE 카카오 선물하기 3주차 과제: 상품 리스트 구현
### 🌱 1단계 - API 적용
- [X] 첨부된 `oas.yaml` 파일을 토대로 Request, Response Type을 정의
- [X] React Query를 사용하지 않고 Axios를 사용해서 구현
- [X] 첨부된 `oas.yaml` 파일과 Mock API URL을 사용하여 API 구현
	- **메인 페이지 - Theme 카테고리 섹션**
		- [X] `/api/v1/themes` API를 사용하여 Section 구현
		- [X] API는 Axios 또는 React Query 등을 모두 활용해서 구현 가능
	- **메인 페이지 - 실시간 급상승 선물 랭킹 섹션**
		- [X] `/api/v1/ranking/products` API를 사용하여 Section 구현(Axios 사용 가능)
		- [X] 필터 조건을 선택하면 해당 조건에 맞게 API를 요청하여 보여지도록 구현
	- **Theme 페이지 - Header**
		- [X] URL의 pathParams와 `/api/v1/themes` API를 사용하여 Section을 구현
		- [X] `themeKey`가 잘못된 경우 메인 페이지로 연결
	- **Theme 페이지 - 상품 목록 섹션**
		- [X] `/api/v1/themes/{themeKey}/products` API를 사용하여 상품 목록 구현
		- [X] API 요청 시 한 번에 20개의 상품 목록이 내려오도록 구현
### 🌿 2단계 - Error, Loading Status 핸들링
- [X] 각 API에서 Loading 상태에 대한 UI 대응
- [X] 데이터가 없는 경우에 대한 UI 대응
- [X] HTTP Status에 따라 Error를 다르게 처리
### 🪴 3단계 - 테마 별 선물 추천 API에 페이지네이션 구현 & React Query 사용
- [X] 스크롤을 내리면 추가로 데이터를 요청하여 표시
- [X] 1단계에서 구현한 API를 react-query를 사용해서 구현
### 🌳 4단계 - 질문에 대한 답변
**질문 1.** CORS 에러는 무엇이고, 언제 발생하는지 설명해주세요. 이를 해결할 수 있는 방법에 대해서도 설명해주세요.
> CORS 에러는 웹 브라우저가 자바스크립트를 통해 다른 출처에서 리소스를 요청할 때 발생하는 에러입니다.  클라이언트 애플리케이션이 출처를 구성하는 3요소인 프로토콜, 도메인, 포트 중 하나라도 다른 곳에 리소스를 요청할 때, 또는 서버가 CORS 헤더를 설정하지 않았을 때 발생할 수 있습니다. 이는 서버의 응답에 `Access-Control-Allow-Origin` 헤더를 추가하여 특정 출처나 모든 출처를 허용하도록 설정함으로써 해결할 수 있습니다.

**질문 2.** 비동기 처리 방법인 callback, promise, async/await에 대해 각각 장단점과 함께 설명해주세요.
> `callback` 함수는 다른 함수의 인자로 전달되어 특정 작업이 완료된 후에 호출되는 함수입니다.  필요한 로직을 다양한 방식으로 구현할 수 있어 유연성이 높고 단순하다는 장점이 있습니다. 하지만 중첩된 `callback` 함수들이 많아지면 코드가 난해해지고 가독성이 떨어진다는 단점이 있습니다.

> `promise`는 비동기 작업이 완료된 후 결과 값을 나타내는 객체입니다. `promise`를 사용하면 callback hell을 피할 수 있어 코드의 가독성이 좋아진다는 장점이 있습니다. 하지만 여러 개의 `promise`를 chaining하거나 병렬로 처리할 때 비동기 흐름을 따라가며 디버깅하는 것이 어려울 수 있다는 단점이 있습니다.

> `async/await`은 `promise`를 더 간단하게 사용할 수 있게 해주는 문법입니다. `aync` 함수는 항상 `promise`를 반환하고, `await` 키워드는 `promise`가 처리될 때까지 기다립니다. `try/catch` 구문을 통해 에러를 쉽게 처리할 수 있다는 장점이 있지만, 구형 브라우저에서는 지원되지 않을 수 있다는 단점이 있습니다.


**질문 3.** React query의 주요 특징에 대해 설명하고, queryKey는 어떤 역할을 하는지 설명해주세요.
> `React query`는 데이터를 자동으로 캐싱하여 같은 데이터에 대한 여러 번의 요청을 방지합니다. 사용자가 브라우저로 돌아올 때나 특정 이벤트가 발생할 때 자동으로 데이터를 다시 가져오며, `useQuery`와 `useMutation` 훅을 통해 간편하게 비동기 작업을 처리할 수 있습니다.  `queryKey`는 react query에서 데이터의 고유 식별자로 사용되며, 이를 통해 캐시된 데이터를 특정 키로 식별하고 관리할 수 있습니다.