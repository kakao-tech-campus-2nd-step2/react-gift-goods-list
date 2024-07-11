# 카카오 테크 캠퍼스 - 프론트엔드 카카오 선물하기 편

## FE 카카오 선물하기 3주차 과제: API 적용하기

### 1단계

1. README에 구현할 기능 목록 정리
2. Request, Response Type 정의
3. 메인 페이지 - Theme 카테고리 섹션 API
4. 메인 페이지 - 실시간 급상승 선물랭킹 섹션 API
5. Theme 페이지 - header API
6. Theme 페이지 - 상품 목록 섹션 API

### 2단계

7. Loading 상태에 대한 UI 설정
8. 데이터가 없는 경우에 대한 UI 설정
9. Http Status에 따라 Error를 다르게 처리

### 3단계

10. IntersectionObserver로 페이지네이션 구현
11. 1단계에서 진행한 API를 react-query를 사용해서 재구현

---

### 3주차 질문

#### 질문 1. CORS 에러는 무엇이고 언제 발생하는지 설명해주세요. 이를 해결할 수 있는 방법에 대해서도 설명해주세요.

- CORS(Cross Origin Resource Sharing, 교차-출처 리소스 공유): 한 도메인 또는 Origin의 웹 페이지가 다른 도메인 (도메인 간 요청)을 가진 리소스에 액세스 할 수 있게하는 보안 메커니즘, 동일 출처 정책때문에 등장함

- 동일 출처 정책: 동일한 출처의 리소스에만 접근하도록 제한하는 것<br>
  출처(Origin): Protocol, Host, 포트번호

- 모든 출처를 허용한다면?
  https://bank.com 이라는 도메인 사이트가 있고, api 주소는 https://bank.com/api이다. 사용자가 은행 사이트에서 로그인을 한 후 인증 토큰을 받았다. 그런데 사용자가 로그인한 상태에서 https://evil.com사이트에 접속하게 되면, https://evil.com사이트에서 https://bank.com/api로 ajax 요청을 보낼 때 유저가 획득한 인증 토큰이 자동으로 첨부되어 사용자인 척 하면서 요청을 보낼 수 있게 된다!

- CORS 필요성
  클라이언트에서 도메인이 다른 서버에서 제공하는 API를 사용하는 일이 많아짐!<br>
  웹에서 다른 출처로 리소스를 요청할 때 브라우저는 origin이라는 필드에 요청을 보내는 출처를 담아서 보낸다.<br>
  이후 서버가 이 요청에 대한 응답을 할 때 응답헤더 Access-Control-Allow-Origin 라는 값에 이 리소스에 접근하는 것이 허용된 출처를 같이 보내주고, 응답을 받은 브라우저는 자신이 보낸 Origin 과 서버가 보내준 응답의 Access-Control-Allow-Origin 를 비교한 후 이 응답이 유효한지 판별한다.

- 요청 종류

  1. Preflight Request<br>
     브라우저는 요청을 한 번에 보내지 않고 예비 요청(Preflight)과 본 요청으로 나누어서 서버로 전송한다.
     '응답 헤더에 유효한 Access-Control-Allow-Origin이 있는가!'
     예비 요청이 실패해서 성공 코드가 아니더라도 헤더에 저 값이 제대로 들어가있다면 CORS 정책 위반이 아니다.

  2. Simple Request<br>
     예비 요청 없이 바로 서버에서 본 요청을 보내는 것

- CORS 에러 해결 방법

  1. 서버에서 해결하기

     - @CrossOrigin 어노테이션 사용하기
     - CorsFilter 사용하기

  2. 클라이언트에서 해결하기

     - 남이 만든 프록시 서버 사용하기<br>
       프록시 서버는 클라이언트가 프록시 서버 자신을 통해서 다른 네트워크 서비스에 간접적으로 접속할 수 있게 해준다.<br>
       요청해야하는 URL 앞에 프록시 서버 URL 을 붙혀 요청(https://cors-anywhere/herokuapp.com)

     ```
     axois({
         method:"GET",
         url:`https://cors-anywhere/herokuapp.com/{주소},
         header:{
             'APIKey':{@@@}
         }
     })
     ```

     - 로컬 한정 http-proxy-middleware 사용하기<br>
       http-proxy-middleware를 설치, setupProxy.js 생성
     - jsonp 방식으로 json 데이터 가져오기<br>
       자바스크립트 파일이나 css 파일은 동일 출처 정책에 영향을 받지 않고 가져올 수 있다.<br>
       이를 이용해서 자바스크립트 파일을 가져와서 이를 json 형식으로 파싱해서 데이터를 사용할 수 있다.

---

#### 질문 2. 비동기 처리 방법인 callback, promise, async await에 대해 각각 장단점과 함께 설명해주세요.

- callback
  - 나중에 호출할 함수, Callback Hell, 콜백 함수 호출 시점의 권한이 개발자에게 있는 것이 아니라 제어권을 넘겨받은 코드에게 있어 수동적으로 함수를 지켜봐야함
- promise

  - 비동기 작업이 종료된 후, 실행이 잘 성공했는지 혹은 실패했는지, 결과 값이 무엇인지를 미래에 반환해주겠다고 약속해주는 객체
  - callback hell 해결!
  - return value를 이용할 수 있음(동기코드와 마찬가지로 return 값을 변수에 할당하거나, 다양한 메소드를 사용하는 것과 같이 자유로운 추가 작업이 가능)
  - error handling이 동기식 코드와 유사하게 쓰일 수 있음(then, catch등을 통해 에러에 대한 대처가 간결해지고, 동기 방식의 try catch 구문과 유사함)

- async await
  - async 함수를 실행하게 되면 무조건 Promise 객체가 반환, 함수의 return은 반환된 Promise 객체의 결과값
  - await는 반드시 async함수 안에서만 사용, await 키워드를 만나게 되면 해당 함수가 Promise 상태가 이행될 때까지 기다렸다가, 이행이 완료되면 그 결과 값을 반환하고 다음 코드를 실행
  - 실행 순서가 예측이 불가능했던 비동기 작동 방식이 동기적으로 실행되는 코드처럼 예측 가능해짐
  - Promise 결과 값을 then, catch 대신 변수의 담아 동기적 코드처럼 작성
  - 에러 핸들링은 try catch 사용

---

#### 질문 3. react query의 주요 특징에 대해 설명하고, queryKey는 어떤 역할을 하는지 설명해주세요.

- React Application에서 서버 상태를 불러오고, 캐싱하며, 지속적으로 동기화하고 업데이트하는 작업을 도와주는 라이브러리
- 리액트 컴포넌트 내부에서 간단하고 직관적으로 API 사용 가능
- 특징
  1. 캐싱: 반복적인 비동기 데이터 호출을 방지, 불필요한 API 콜을 줄임 -> 서버에 대한 부하 줄임
  2. Client 데이터와 Server 데이터 간의 분리: Redux, Recoil ... 같은 전역 상태 관리 라이브러리들이 서버 데이터까지 관리하는데 한계가 있음
  3. 첫 번째 파라미터 queryKey: unique key
  4. 두 번째 파라미터 queryFn: 실제 호출하고자 하는 비동기 함수(Promise를 반환)
  5. 반환 값: status, data, error... 등 데이터 사용에 필요한 정보
- queryKey
  - query keys를 기반으로 쿼리 캐싱을 관리함!
  - 문자열, 문자열의 배열 혹은 중첩된 객체(nested object)로 지정 가능
  - query data에 고유하고 직렬화하여 사용해야함
  - queryKey는 queryFunction의 변수도 포함함<br>
    (ex.<br>
    ```
    function Todos({ todoId }) {
        const result = useQuery(['todos', todoId], () => fetchTodoById(todoId))
    }
    ```
    fetchTodoById라는 queryFn에서 todoId라는 변수에 의존적 -> 이 변수는 queryKeys에도 포함되어야함!)
