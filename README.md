# 카카오 테크 캠퍼스 - 프론트엔드 카카오 선물하기 편

## Week 3. 2단계 - Error, Loading Status 핸들링 하기

### 📝 요구사항

- 각 API에서 Loading 상태에 대한 UI 대응을 해요.
- 데이터가 없는 경우에 대한 UI 대응을 해요.
- Http Status에 따라 Error를 다르게 처리해요.

### 🚀 구현할 기능 목록

#### 로딩

- [x] 로딩 UI 제작

#### 에러

- [x] 데이터가 없는 경우 UI 제작
- [x] http status에 따라 에러 핸들링하기
- [x] 존재하지 않는 페이지 처리

## Week 3. 3단계 - React Query와 페이지네이션

### 📝 요구사항

- 스크롤을 내리면 추가로 데이터를 요청하여 보여지게 해요.
- 1단계에서 구현한 API를 react-query를 사용해서 구현해봐요.

### 🚀 구현할 기능 목록

#### React Query 세팅

- [x] React Query 설치하기
- [x] React Query 초기 설정

#### 무한스크롤

- [x] Theme 페이지의 테마 굿즈

#### React Query로 바꾸기

- Home 페이지
  - [x] 테마 카테고리
  - [x] 랭킹 굿즈
- [x] Theme 페이지의 테마 정보

#### themeKey가 잘못된 경우 메인 페이지로 연결하기

- [x] suspense 추가하기
- [x] error boundary 처리하기

## Week 3. 4단계 - 질문의 답변

### 질문 1. CORS 에러는 무엇이고 언제 발생하는지 설명해주세요. 이를 해결할 수 있는 방법에 대해서도 설명해주세요.

CORS는 Cross-Origin Resource Sharing으로 브라우저에서 다른 origin의 리소스에 접근할 때 적용되는 보안 정책입니다. CORS 에러는 허용되지 않은 origin에서 리소스에 접근 시에 발생하는 에러입니다. 즉, 브라우저에서 자바스크립트를 통해 다른 출처의 리소스를 불러올 때 CORS 에러가 발생합니다. 서버 측에서 CORS 정책을 설정해 특정 origin의 접근을 허용하거나 클라이언트 측에서 프록시 서버를 사용해 CORS 정책을 우회해 CORS 에러를 해결할 수 있습니다.

### 질문 2. 비동기 처리 방법인 callback, promise, async await에 대해 각각 장단점과 함께 설명해주세요.

callback은 함수의 인수로 사용되는 함수로, 다른 코드에게 인자로 넘겨줌으로써 제어권도 함께 넘겨줍니다. 비동기 작업이 완료된 후에 호출되어 코드의 실행 위치를 보장하며, 간단하고 이해하기 쉽다는 장점이 있지만, 중첩 사용 시 코드의 들여쓰기가 깊어지는 콜백 지옥이 발생할 수 있습니다. promise는 비동기 작업의 성공, 실패 상태를 나타내는 객체로, .then() 메서드로 비동기 작업 완료 후 실행될 코드를, .catch() 메서드로 비동기 작업 실패 시 실행될 코드를 지정할 수 있습니다. 프로미스는 콜백 지옥을 해결할 수 있고, Promise.all()로 비동기를 병렬로 처리 가능하지만, 복잡한 비동기 처리를 다루기에는 어려움이 있습니다. 마지막으로 async/await는 프로미스 기반으로 비동기 코드를 직관적으로 작성할 수 있게 해주는 문법입니다. async 함수 내부에서 await를 사용하면 비동기 작업이 완료될 때까지 기다리고 결과를 반환할 수 있어 가독성이 좋지만, ES2017(ES8)에 도입된 문법이라 구형 브라우저에서는 지원되지 않습니다.

### 질문 3. react query의 주요 특징에 대해 설명하고, queryKey는 어떤 역할을 하는지 설명해주세요.

react query는 서버의 상태를 관리하는 라이브러리로 데이터 페칭, 캐싱, 동기화를 효율적으로 처리합니다. 데이터의 신선도를 유지하고자 컴포넌트가 마운트될 때 , 윈도우 포커스가 변경될 때, 네트워크 연결이 복구 될 때 자동으로 데이터를 리페칭합니다. 캐싱을 이용해 불필요한 네트워크 요청을 줄입니다. 캐싱 시간은 기본적으로 5분으로 설정되어 있고, 데이터의 유효 시간은 0으로 설정되어있습니다. 따라서 데이터의 유효 시간을 staleTime 옵션을 통해 설정해 캐싱된 데이터를 사용 가능하게 해야합니다. 또한, 비동기 로직을 간단하게 처리 가능할 수 있는 다양한 hook을 제공합니다. queryKey는 고유한 키로 데이터 요청을 식별합니다. queryKey는 배열 형태로 표현되어 데이터의 의존성을 쉽게 추적 가능합니다. 또한, 기능별로 queryKey를 정의하고 병합해 관련된 작업을 한번에 관리할 수 있다는 장점이 있습니다.
