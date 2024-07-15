# 카카오 테크 캠퍼스 - 프론트엔드 카카오 선물하기 편

## project structure

- `src/`: 소스 코드가 위치하는 디렉토리입니다. 주요 하위 디렉토리 및 파일은 다음과 같습니다.
  - `components/`: 재사용 가능한 컴포넌트들이 위치하는 디렉토리입니다.
    - `common/`: 공통 컴포넌트들이 위치하는 디렉토리입니다.
    - `features/`: 푸터 및 헤더 컴포넌트 등이 위치하는 디렉토리입니다.
  - `context/`: 상태 관리 로직이 위치하는 디렉토리입니다.
  - `pages/`: 각 페이지 컴포넌트들이 위치하는 디렉토리입니다. 로그인, 메인 페이지 등이 포함됩니다.
  - `styles/`: 전역 스타일 및 CSS 변수가 정의된 파일들이 위치하는 디렉토리입니다.
  - `App.tsx`, `index.tsx`: 애플리케이션의 진입점 및 루트 컴포넌트 파일입니다.

## 요구사항

### 1단계

- entities 추가
  - [x] `components.schemas.ThemeData`
  - [x] `conponents.schemas.ProductData`
- [x] 메인페이지-테마 카테고리 섹션: `/api/v1/themes`로부터 데이터를 받아 랜더링
  - res
    - themes: ThemeData array
- [x] 메인페이지-실시간 급상승 선물랭킹 섹션: `/api/v1/ranking/products/..query params..`
  - query params: targetType, rankType
  - res
    - products: ProductData array
- [x] themePage-header: `/api/v1/themes`
- [x] themePage-상품목록: `/api/v1/themes/{themeKey}/products`
  - path params: themeKey
  - query params
    - pageToken: 목록 불러오기에 사용할 페이지 토큰
    - maxResults
  - res
    - products: ProdectDtat array
    - nextPageToken
    - pageInfo: totalResults, resultsPerPage

### 2단계

- 각 API에서 Loading에 대한 UI 대응하기
- 데이터가 없는 경우 UI 대응
- Http Status에 따라 Error 처리

---

- [x] Loading 컴포넌트 추가
- [x] isLoading 결과에 따라 Loading 컴포넌트 랜더링
- [x] useGetAPI 함수 리턴값에 에러 상태 추가
- [x] 에러 처리

### 3단계

- [x] 프로젝트에 React Query 추가
- [x] (pages/Theme/index) React Query 적용
- [x] (pages/Theme/index)페이지네이션 구현

## page

## 과제 4단계

- 질문 1. CORS 에러는 무엇이고 언제 발생하는지 설명해주세요. 이를 해결할 수 있는 방법에 대해서도 설명해주세요.
  - CORS(Cross Origin Resource Sharing)는 SOP(Same Origin Policy)를 우회할 수 있는 기법입니다. SOP는 다른 도메인으로 부터 자원을 가져올 수 없게 하는 원칙으로, 세션 하이재킹(공격자가 이용자의 쿠키를 훔치는 것)을 막기 위해 존재합니다. 하지만 이 원칙에 의해 서버나 오픈소스에서 데이터를 요청할 수 없어지므로, CORS에 의해 정의된 몇가지 매커니즘에 따라 정보를 요청하면 다른 도메인에서 데이터를 가져오는 것을 가능하게 하였습니다.
  - 서버가 응답헤더 중 Access-Control-Allow-Origin에 허용하는 도메인을 담아 보내는데, 이와 origin이 일치하지 않으면 응답을 사용하지 않고 버립니다. 따라서 백엔드에게 오리진 허용 설정을 추가해달라고 요청해야 합니다.
- 질문 2. 비동기 처리 방법인 callback, promise, async await에 대해 각각 장단점과 함께 설명해주세요.
  - callback 자체의 정의는 함수의 인수로 전달되어 그 안에서 쓰이는 함수를 뜻합니다. 비동기 작업에서 의미하는 callback은, 비동기 작업이 끝난 후에 실행되도록 둔 함수를 인수로 받는 것을 말합니다.
    - 다른 기법이 들어가지 않아 간단하나, 여러 개의 비동기 함수를 사용할 경우 들여쓰기 깊이가 깊은 구조가 생성될 수 있습니다. 이를 콜백지옥이라고 부릅니다.

    ```javascript
      const func = callback => {
        setTimeout(() => {
          console.log(1);
          callback();
        }, 1000);
      }
    ```
  
  - promise는 클래스로, reslove와 then 함수를 이용해 비동기 실행 순서를 관리합니다.
    - 체이닝을 통해 콜백 지옥을 피하고 가독성 높은 코드를 제공합니다.

    ```javascript
    // a, b는 promise를 리턴하는 비동기 함수
    a()
      .then(b)
      .then(() => { console.log(3) });
    ```
  
  - async/await 패턴은 Promise 클래스를 다를 수 있는 또 다른 패턴입니다. async 함수 내에서 await 키워드를 사용해 프로미스가 해결될 때까지 기다리다 처리할 수 있습니다.
    - 코드 작성과 에러처리를 동기 코드처럼 처리할 수 있습니다.

    ```javascript
    const wrap = async () => {
      try{
        const res = await delayAdd(12);
        console.log(res);
      } catch(err){
        console.error(err);
      } finally{
        console.log('Done');
      }
    }
    ```

- 질문 3. react query의 주요 특징에 대해 설명하고, queryKey는 어떤 역할을 하는지 설명해주세요.
  - 서버 상태를 관리하는 라이브러리
  - 지원 기능
    1. 데이터 패칭 및 캐싱의 자동화
        - 자동 캐싱
        - 자동 리패칭: 특정 조건에서 자동으로 리패칭
            - 특정 조건
                - 컴포넌트 마운트
                - 일정 시간 간격마다
                - 관련 데이터 수정 요청 → **`refetch` 와 `invalidateQueries`이 사용됐을 때**
    2. 옵티미스틱 업데이트
        - 서버에 데이터가 저장되지 전에 UI를 먼저 업데이트
    3. 실시간 데이터 처리
        - 폴링, 웹소켓 등을 통해 실시간 데이터를 간단하게 관리하게 지원한다
    4. 개발자 도구(React Query DevTools)
    5. 페이지네이션
  - queryKey는 react Query내에서 쿼리를 식별할 때 사용하는 키입니다. React Query 기능은 React-Router를 불러오는 방법 중 BrowseRouter 방법처럼 query를 사용할 컴포넌트를 QueryClientProvider로 묶어 사용을 시작할 수 있습니다. 이 안에서 관리할 수 있는 서버 데이터는 여러 종류가 될 수 있으므로 (가령 게시물 목록, 친구 목록, 오늘 이벤트 등) queryKey로 식별하여 관리합니다.

## 🎸

### 과제 수행 일지

- [1단계 구현](https://www.notion.so/Day-12-3431b41b37c9495f9a38e716b76dbc3c?pvs=4#60529c9431f742cca9f32f0abfb023a9)
- [2단계 구현](https://www.notion.so/Day-13-3979aa2c2f24497fa46b8e4058ced32a?pvs=4#07345ce4a17e4f518b9341995aa40bc2)

### 궁금한 점
