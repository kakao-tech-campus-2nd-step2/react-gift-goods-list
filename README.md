## 3주차 질문

### 질문 1. CORS 에러는 무엇이고 언제 발생하는지 설명해주세요. 이를 해결할 수 있는 방법에 대해서도 설명해주세요.

CORS 에러는 Cross Origin Resource Sharing의 약자로 Origin의 웹 페이지가 다른 도메인을 가진 리소스에 액세스 할 수 있게하는 보안 메커니즘 입니다.

즉 한 마디로, 동일한 출처의 리소스에서만 접근하도록 제한을 하는 것입니다.

보통 협업을 진행을 할 때, 다른 포트의 리소스에 접근을 하거나 다른 도메인에서 API를 호출을 하는 경우가 많기 때문에 CORS 에러가 발생하게 됩니다.

예시로, Spring은 http://localhost:8080으로 실행이 되지만
React는 http://localhost:3000 이나 http://localhost:5173으로 실행이 됩니다.

이때 다른 포트 번호이기 때문에 CORS 에러가 발생하게 됩니다.

이를 해결하기 위해서는 Frontend에서나 Backend에서 해결하기 위한 두 가지 방법이 있습니다.

우선 서버에서는 Access-Control-Allow-Origin 헤더를 설정하여 특정 도메인 또는 모든 도메인(\*)을 설정 해주는 방법이 있습니다.

웹 클라이언트에서는 프록시 서버를 활용하여 서버의 URL가 동일하게 만들어
해결하는 방법이 있습니다.

예시로 Vite 환경에서는 vite.config.ts 파일에서 proxy를 설정하여
해결할 수 있습니다.

```
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://your-api-server.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

하지만 가장 큰 문제점은 dev환경에서만 해결이 가능하고 프로덕션 환경에서는 실제 API 서버로 직접 요청이 가기 때문에 따로 Nginx라던가 Apache 같은 웹서버를 사용하여 프론트엔드와 백엔드 사이의 리버스 프록시를 따로 설정을 해줘야 합니다.
결국 서버 측에서 CORS에러를 해결해주는 편이 젤 좋은 편이긴 하죠.

### 질문 2. 비동기 처리 방법인 callback, promise, async await에 대해 각각 장단점과 함께 설명해주세요.

JS는 메인스레드인 이벤트 루프가 기본적인 싱글 스레드 형식으로 움직입니다. 그래서 기본적인 함수나 훅이 실행이 될 때 다음 함수는 Blocking을 당할 수 밖에 없습니다.

이를 해결해주는 방식이 비동기 처리 방식인데 callback, promise, async await 방식이 존재합니다.

callback 함수는 함수의 내부에서 실행이 되기 때문에 함수에 이름을 붙이지 않아도 됩니다.


또한 null과 undefined 타입을 제외하고 모든 것을 객체로 다룹니다. 그래서 다른 함수의 변수처럼 사용할 수 있습니다.

그러나 this를 사용하여 익명함수를 전달하는 과정에서 코드 들여쓰기가 많아지게 되면 매우 복잡해집니다. 이를 막기 위해 promise, async await이 등장하게 되었습니다.

promise는 결과를 아직 반환하지 않은 객체를 뜻하며 ES6에서 처음 등장하게 되었습니다.

promise가 callback을 대체하기 위해 나온 개념은 아니지만 콜백을 예측가능한 패턴으로 사용할 수 있게 합니다.

특히 chaining을 통해 순차적으로 비동기 작업을 깔끔하게 표시할 수 있거나 에러 처리에 용이합니다.
또한 Promise.all()을 통해서 병렬 처리도 가능합니다.

하지만 체이닝도 복잡해지게 되면 여전히 콜백지옥이 발생할 수 있게 되므로

async await이라는 개념이 탄생하게 됩니다.

aysnc awiat은 ES8에 추가된 문법으로 promise의 간결성, 에러 핸들링, 에러 위치 확인 같은 여러 불편한 점을 해결하기 위해 추가된 문법으로
비동기 코드를 동기 코드처럼 직관적이고 쉽게 작성할 수 있다는 장점이 있습니다.

또한 try/catch문을 활용하게 된다면 더욱 일관되게 예외처리가 가능하게 됩니다.

하지만 async await은 promise 기반 문법이기 때문에 promise에 대해서 더 자세히 이해하고 사용할 필요가 있습니다.

또한 오래된 브라우저에서는 지원하지 않습니다.

### 질문 3. react query의 주요 특징에 대해 설명하고, queryKey는 어떤 역할을 하는지 설명해주세요.

우선적으로 react query는 버전별로 이름이 다릅니다.
우선 v3을 기준으로 v3까지는 우리가 늘 부르는 react query로 부릅니다.
v4 이후로는 tanstack query라고 부릅니다.

그래서 최신버전을 사용하거나 기술적으로 얘기를 할 때 tanstack query랑 react query를 어떻게 용어의 이름을 부르느냐에 따라 버전이 차이가 날 수 있다고 봐야합니다.

**1. 설치**

```
npm i @tanstack/react-query
```

**2. Tanstack Query 세팅**

```
import { createRoot } from 'react-dom/client';

import { queryClient } from '@/hooks/queries/Http';

import App from '@/App.tsx';
import { QueryClientProvider } from '@tanstack/react-query';

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

```

QueryClientProvider는 리액트 애플리케이션에서 비동기 요청을 처리하기위한 Context Provider로 동작하며 하위 컴포넌트에서 QueryClient를 사용할 수 있게 해줍니다.

**3. 주요 특징**
보통 tanstack query를 사용할 때 useQuery랑 useMutation을 제일 많이 사용하게 됩니다. 우선 그 특징에 대해서 간단히 알아볼 예정입니다.

(1) useQuery

- GET API 요청을 수행하기 위한 hook
- enabled 옵션을 통해 useQuery를 동기적으로도 사용이 가능합니다.

  (1-1) 파라미터

  - `unique key` : 해당 쿼리의 고유 식별자입니다.
  - `queryFn` : 쿼리에 사용할 promise기반 비동기 API 함수가 위치합니다.
  - `options`: 쿼리에 사용할 옵션들입니다.

  (1-2) 반환값

  - `data`: fetch한 데이터값. fetch하기 전에는 `undefined` 값을 가집니다.
  - `isPending, isLoading, is Fetching` : 쿼리가 fetching 중인지 여부를 나타내는 값으로 Boolean 값을 가집니다.
  - `error`: 발생한 오류를 나타냅니다. 없을 경우에는 `undefined`값을 가집니다.
  - `refetch`: 만료된 캐시 데이터를 서버에서 데이터를 가지고 와서 업데이트 시킵니다.

  (1-3) Query Keys

  - useQuery에서 파라미터로 사용되는 Query Key는 React Query에서 쿼리 캐싱을 관리하기 위한 unique key입니다
  - unique key를 배열로 넣으면 query함수 내부에서 변수로 사용 가능합니다.

(2) useMutation

- create, update, delete하거나 서버의 side-effect를 수행할 때 사용됩니다.

  (1-1) 파라미터

  - `mutationKey` : mutation에 사용할 unique key 값입니다.
  - `mutationFn` : mutation에 사용할 promise 기반의 비동기 API 함수가 위치합니다.
  - `onSuccess` : mutation이 성공적으로 실행이 되었을때 조건문을 집어넣을 수 있습니다.
  - `options`: mutation에 사용할 옵션 들입니다.

  (1-2) 반환값

  - `data`: fetch한 데이터값. fetch하기 전에는 `undefined` 값을 가집니다.
  - `isPending, isLoading, is Fetching` : 쿼리가 fetching 중인지 여부를 나타내는 값으로 Boolean 값을 가집니다.
  - `error`: 발생한 오류를 나타냅니다. 없을 경우에는 `undefined`값을 가집니다.
