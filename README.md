# 카카오 테크 캠퍼스 Step2 과제(3주차)
###  사용한 기술 스택
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white">
</br>

### 프로젝트 설명
**[카카오 선물하기 사이트](https://gift.kakao.com/home)** 를 만들려한다.

이번 주차의 목표는 API를 활용한 비동기 처리 및 Error, Loading 등의 Status 핸들링이다.


### 프로젝트 요구사항
- [X] axios를 사용하여 API path 구현
  - [X] axios 설치
  - [X] Base URL 설정
- [X] 메인 페이지 
  - [X] Theme 카테고리 섹션(/api/v1/themes)
  - [X] Trending 선물랭킹 섹션(/api/v1/ranking/products)
    - [X] 필터 조건 선택하면 해당 조건에 맞게 API 요청해서 보여지게 함
- [X] Theme 페이지
  - [X] Header 섹션 themekey에 따라 내용 달라지게
  - [X] Products 섹션 (api/themes/{themeKey}/products)
  - [X] API 요청 시 한 번에 20개의 상품 목록이 내려오도록 한다.
- [X] Error, Loading Status 핸들링하기
  - [X] Loading 스피너 고르기
  - [X] 각 API에서 Loading 상태에 대한 UI 대응 하기(Skeleton 방식으로 일단 시도,,!(포기,, 걍 Spinner 돌리자)))
  - [X] 데이터가 없는 경우에 대한 UI 대응
  - [X] Http Status에 따라 Error 다르게 처리(일단 400, 404만..)
  - [ ] Error 페이지 제작,,(시간관계상 포기)


  ### 프로젝트 링크
  https://react-gift-goods-list-mphmos1x2-joshuadesus-projects.vercel.app/

  ### 3주차 질문 답변
  1. CORS에러는 무엇이고 언제 발생하는지 설명해주세요. 이를 해결할 수 있는 방법에 대해서도 설명해주세요.
    
      CORS는 Cross-Origin Resource Sharing의 약어이다. 이는 웹 애플리케이션에서 브라우저가 다른 도메인, 프로토콜, 또는 포트에서 리소스를 요청할 때 발생하는 **보안**에러이다. 
    이 친구는 웹 브라우저의 Same-Origin Policy에 의해 제어되며, 기본적으로 다른 출처에서 리소스를 가져오는 것을 제한하여 잠재적 보안 위협을 방지한다. 
    위에서 언급한 것 처럼 CORS 에러는 보통 (1) 다른 도메인으로 요청을 보낼 때 (2) 다른 프로토콜로 요청을 보낼 때 (3) 다른 포트로 요청을 보낼때 총 3가지의 경우에 나타나게 된다.
    
      이러한 CORS에러를 해결하는 방법에는 일단 Access-Control-Allow-Origin 헤더 설정을 통해 서버 단에서 허용할 도메인을 설정할 수 있다. (내가 가장 선호하는 방식이다.)
    다음으로는 프록시 서버를 두어 정책을 우회하는 방법도 있다. 다만, 이 방식은 딱히 추천되지 않는다.. (아무래도 보안 문제가 걸림,,)
    아마도 가장 쉬운 방법은 미들웨어 사용을 통해 CORS 설정을 하는 것이다. Node.js 환경에서는 'cors'패키지 깔면 CORS 설정할 수 있다고 한다.

  2. 비동기 처리 방법인 callback, promise, async await에 대해 각각 장단점과 함께 설명해주세요.

      (1) 우선 이번 프로젝트에서 가장 많이 사용한 async/await에 대해 설명해보면, 뒤에 설명할 프로미스를 더욱 직관적으로 사용할 수 있도록 ES2017에 도입된 문법이다.

      이 친구의 장점은 바로 가독성과 디버깅의 용이에 있다. 그리고 이번 과제를 하며 지겹도록 쓴 try/catch를 통해 에러를 일관되게 처리한 것이 위의 장점과 연결된다. 이 친구는 코드만 봐도 바로 이해가 가서 정말 편하다. 물론, 단점 또한 존재하는데 단점은 바로 프라미스를 알아야 한다는 점이다... 그리고 늦게 나온 친구인 만큼 예전 브라우저를 지원하지 않을 수 있다. (아마 오페라처럼 옛날 친구는 지원하지 않지 않을까 싶다. 개인적으로 예전 윈도우에 존재하던 윈도우 버전 사파리로 함 테스트 해볼까 싶다.)

      이 친구는 다 좋지만, 프라미스에 대한 이해가 선행되어야 하며, try/catch를 통해서만 처리하다보니 로직이 복잡해지면 '읭....' 하면서 당황스러운 경우가 생긴다.
      
      (2) 다음으로는 바로 콜백이다. 콜백은 비동기 작업(이벤트)이 완료된 후 실행되는 함수인데, 오늘 언급할 세 얼간이 중에서 가장 기초가 되는 친구이다. 
      이 친구의 장점은 바로 기초가 되는 친구인 만큼 단순하고 옛날 JS나 브라우저에서도 돌아간다는 점이다..! 위의 MZ한 신입은 본인 이름도 한자로 못쓰는데 이 친구는 한자로 작문까지 가능한 것이다. (~~물론 난 한자를 잘한다. 글로벌 시대에 중국 상대하려면 한자는 잘해야지~~)

      그런데 또 단점으로는, 에러 처리가 어렵다. callback이라는 이름 그대로 각 단계마다 에러 처리를 해야 한다는 단점이 있는데 이 과정에서 코드가 진짜 어어어어엄청나게 복잡해지고 소위 말하는 redundancy가 엄청나게 발생하는 CALLBACK HELL에 빠져버리게 된다. ~~한자는 쓸 줄 아는데 과유불급이라는 사자성어 공부는 안한 모양이다.~~

      (3) 마지막으로 프로미스에 대해 공부해보자. 
      이 친구는 별거 없다. 비동기 작업의 완료 또는 실패를 처리할 수 있는 객체를 말하는데, 위의 async/await가 try/catch문으로 처리하는 것을 보면 바로 이 특징이 그대로 반영된 것을 알 수 있지 않겠는가? 

      바로 장점 가겠다. 이 친구는 가독성이 callback에 비해 뛰어나다. 콜백 지옥의 해결이 가능하기 때문에 훨씬 간편하다. 또한 .then과 .catch를 사용하여 sequential한 처리가 가능하다.추가로 이러한 .then/.catch를 통해 프로세스를 블록화하여 관리할 수 있다는 것도 장점이겠다.

      단점은 바로 콜백에 비해 조금 어렵다는 것이다. 포심만 던지다가 커브 던지려면 당연히 공부와 연습도 해야하고 더 어렵지 않겠는가?
      그거랑 같다. 더 어렵지만 강력한 무기를 사용하기 위해선 학습이 필요한 것이다.


  3. react query의 주요 특징에 대해 설명하고, queryKey는 어떤 역할을 하는지 설명해주세요.

      (1) 리액트 쿼리는 서버 상태를 관리하고 비동기 데이터를 쉽게 처리할 수 있도록 도와주는 라이브러리이다. 이거 배워두면 더 편할 것이다.

      리액트 쿼리의 가장 큰 특징은 바로 데이터를 자동으로 가져오고 캐싱하는 것이다. 때문에 복잡하고 장황한 코드 없이도 컴포넌트 내부에서 간단하게 API를 만질 수 있다. 
      [특징을 알아보며 읽어본 아티클](https://tech.kakaopay.com/post/react-query-1/)인데 카카오페이에서 실제 사례와 연관지어 설명해주니 잘 와닿았다. 

      queryKey는 이름 그대로 쿼리를 식별하기 위한 **"고유한 키"** 이다. 이 친구가 하는 역할은 아래와 같다.
          
        1. 쿼리 캐싱 및 공유
        2. 쿼리 무효화 및 리패칭
        3. 데이터 식별
  
      결국 리액트 쿼리는 쿼리키를 통해 본인의 역할을 효과적으로 관리할 수 있게 되는 것이며, 리액트 쿼리는 개발자에게 있어 굉장히 고마운 친구이다. 