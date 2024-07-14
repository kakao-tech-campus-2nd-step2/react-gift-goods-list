# 3주차 과제

## 단계별 요구사항

<details>
<summary style="font-size:150%"><b>📝 1단계 요구사항</b></summary>
<div markdown="1">

- [x] 본인만의 기준으로 일관된 코드를 작성해주세요.
- [x] 첨부된 `oas.yaml` 파일을 토대로 Request, Response Type을 정의해요.
- [x] React Query를 사용하지 말고 axios 를 사용해서 구현해요.
- [x] 첨부된 `oas.yaml` 파일과 목 API URL을 사용하여 API를 구현해요.

## 메인 페이지 - Theme 카테고리 섹션

- [x] `/api/v1/themes` API를 사용하여 Section을 구현해요.
- [x] API는 Axios또는 React Query 등을 모두 활용해서 구현해도 좋아요.

### 메인 페이지 - 실시간 급상승 선물랭킹 섹션

- [x] `/api/v1/ranking/products` API를 사용하여 Section을 구현해요. (Axios 사용
      가능)
- [x] 필터 조건을 선택 하면 해당 조건에 맞게 API를 요청하여 보여지게 해요.

### Theme 페이지 - header

- [x] url의 pathParams와 `/api/v1/themes` API를 사용하여 Section을 구현해요.
- [x] `themeKey`가 잘못 된 경우 메인 페이지로 연결해요.

### Theme 페이지 - 상품 목록 섹션

- [x] `/api/v1/themes/{themeKey}/products` API를 사용하여 상품 목록을 구현해요.
- [x] API 요청 시 한번에 20개의 상품 목록이 내려오도록 해요.

</div>
</details>

<br />

<details>
<summary style="font-size:150%"><b>📝 2단계 요구사항</b></summary>
<div markdown="1">

- [x] 본인만의 기준으로 일관된 코드를 작성해주세요.
- [x] 각 API에서 Loading 상태에 대한 UI 대응을 해요.
- [x] 데이터가 없는 경우에 대한 UI 대응을 해요.
- [x] Http Status에 따라 Error를 다르게 처리해요.

</div>
</details>

<br />

<details>
<summary style="font-size:150%"><b>📝 3단계 요구사항</b></summary>
<div markdown="1">

- [x] 본인만의 기준으로 일관된 코드를 작성해주세요.
- [x] 스크롤을 내리면 추가로 데이터를 요청하여 보여지게 해요.
- [x] 1단계에서 구현한 API를 react-query를 사용해서 구현해봐요.

</div>
</details>

<br />

<details>
<summary style="font-size:150%"><b>📝 4단계 요구사항</b></summary>
<div markdown="1">

## 3주차 질문

### 질문 1. CORS 에러는 무엇이고 언제 발생하는지 설명해주세요. 이를 해결할 수 있는 방법에 대해서도 설명해주세요.

CORS는 `Cross-Origin Resource Sharing` 의 줄임말로 교차-출처 리소스 공유하고도
한다. 한 도메인이 도메인 간의 요청을 가진 다른 도메인의 리소스에 액세스할 수
있게 해주는 보안 메커니즘으로 최신 브라우저에서 구현된 동일 출처 정책 때문에
등장하게 되었다.

클라이언트에서 proxy 서버 설정을 이용해 우회하는 방법이 있고, 서버에서 주소를
등록하거나 '\*' 을 이용해 다른 도메인도 허용해주어 해결하는 방법이 있는 것으로
알고있다.

### 질문 2. 비동기 처리 방법인 callback, promise, async await에 대해 각각 장단점과 함께 설명해주세요.

1. callback : 다른 함수가 실행을 끝낸 뒤에 실행하는 함수를 '콜백 함수' 라고
   부른다. JS 에서 비동기적 프로그래밍을 구현할 때 사용을 하게 된다. 하지만
   과도한 콜백함수를 사용하게 되면 콜백지옥에 빠질수 가 있고, 이는 Promise,
   async/await 등을 사용해 방지할 수 있다고 한다.

2. Promise : JS 에서 비동기 처리에 사용되는 객체이며, 싱글스레드인 JS에서 비동기
   처리를 막을 수 있게 해준다.
3. async/await : 비동기식 코드를 동기식으로 표현하여 간단하게 나타내는 것을
   의미하며 기존에 사용한 Promise의 단점을 보완하기 위해 생긴 ES8에서 도입된
   비동기 처리 방식의 가장 최신 문법이다. 또한 async/await은 Promise 객체를
   반환하여 then()을 사용할 수 있다.

### 질문 3. react query의 주요 특징에 대해 설명하고, queryKey는 어떤 역할을 하는지 설명해주세요.

react query에 대해 아직 완벽하게 이해하고 있지 않다고 생각하여 아는만큼
설명해보겠습니다.

기존에는 단순하게 axios를 활용하여 코드를 작성하고, useEffect를 이용하여 비동기
처리를 하는 방식으로 데이터를 저장하였다. 이 과정을 tanstack/react-query를
활용하여 코드 자체를 조금 더 짧게 작성할 수 있게 해주고, 캐싱기능을 통해
불필요한 API호출을 막고 캐싱된 데이터 이용이 가능하다. queryKey 는 배열의 형태로
작성하고, 쿼리 데이터에 대한 고유한 키를 의미한다. 각 데이터에 대한 고유 값이기
때문에 항목을 식별하기 위해 작성하는 키라고도 생각할 수 있을 것 같다.

</div>
</details>
