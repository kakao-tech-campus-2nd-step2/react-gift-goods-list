### How to Start
    npm i
    npm run start

### step3
- [x] 본인만의 기준으로 일관된 코드를 작성해주세요.
- [x] 스크롤을 내리면 추가로 데이터를 요청하여 보여지게 해요.
- [x] 1단계에서 구현한 API를 react-query를 사용해서 구현해봐요.

### 🚀 (선택) Render as You Fetch 으로 설계하기
- [x] 본인만의 기준으로 일관된 코드를 작성해주세요.
- [x] Suspense와 ErrorBoundary를 사용하여 선언적인 Data Fetch 방식으로 설계해요.

### step4
- 질문 1. CORS 에러는 무엇이고 언제 발생하는지 설명해주세요. 이를 해결할 수 있는 방법에 대해서도 설명해주세요.

        브라우저에서 웹 페이지가 자신이 속한 도메인과 다른 도메인의 리소스를 요청할 때 발생할 수 있는 보안 문제입니다.
        요청을 받는 곳이 다른 도메인이거나 포트 번호만 달라도 CORS를 허용하지 않는다면 사실 해결할 방법이 없습니다.
        예를 들어, 네이버 오픈 API의 경우 보안의 이유로 javascript 환경에서 발생한 요청을 허용하지 않습니다.
        대신, 동일한 도메인을 갖는 백엔드 서버를 두고 해당 proxy 서버를 통해서 요청하는 방법은 허용합니다.
        이렇게 요청을 받는 곳에서 열어둔 방법으로 우회해서 해결해야 합니다.
        아니면, 요청을 받는 곳에 Access-Control-Allow-Origin 도메인에 추가해달라고 요청해야합니다.

- 질문 2. 비동기 처리 방법인 callback, promise, async await에 대해 각각 장단점과 함께 설명해주세요.

      callback: 비동기 처리 방법중 가장 쉬운 방법입니다. 코드의 실행 순서를 가장 쉽게 보장할 수 있지만, 에러 처리에 try-catch 사용이 어렵습니다.
        
      promise: pending state와 resolve, reject를 활용한 비동기 처리 방법입니다. 장점은 resolve와 reject를 통한 로직 분리 및 체이닝입니다.
      단점은, 어렵다는 것입니다. throw Promise와 같은 코드를 실행할 수 있습니다.
      그런데 throw Promise를 하면 [Violation] message took 256ms 와 같은 경고가 뜹니다.

      async await: 비동기 코드를 동기 코드처럼 작성할 수 있습니다. try-catch를 통한 에러 처리가 가능합니다. 옛날 브라우저에선 지원하지 않습니다.

- 질문 3. react query의 주요 특징에 대해 설명하고, queryKey는 어떤 역할을 하는지 설명해주세요.

      내부적으로 useSyncExternalStore 훅을 사용해 리액트 엘리먼트가 아닌 객체를 사용하면서도 리렌더를 발생시킵니다.
      핵심 부품인 QueryClient, QueryCache, QueryObserver, focusManager, onlineManager, notifyManager 모두 클래스입니다.
      QueryClient -> QueryCache를, QueryObserver -> QueryClient를 소유합니다. (내부 객체로 들어감)
      추가적으로 queryKey는 QueryCache에서 아래와 같이 사용됩니다.

      export class QueryCache extends Subscribable<QueryCacheListener> {
        #queries: QueryStore

        constructor(public config: QueryCacheConfig = {}) {
        super()
        this.#queries = new Map<string, Query>()
        }
      . . .
      }