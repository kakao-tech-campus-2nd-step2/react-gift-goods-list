<h1>카카오 테크 캠퍼스 3주차 과제</h1><br>

<h1>1단계 - API 적용하기</h1>
<p>첨부된 oas.yaml 파일과 목 API URL을 사용하여 API를 구현</p>

<div><b>메인 페이지 - Theme 카테고리 섹션</b>
<li>/api/v1/themes API를 사용하여 Section을 구현</li></div><br>
<div><b>메인 페이지 - 실시간 급상승 선물랭킹 섹션</b>
<li>/api/v1/ranking/products API를 사용하여 Section을 구현</li>
<li>필터 조건을 선택 하면 해당 조건에 맞게 API를 요청하여 보여지게</li></div><br>
<div><b>Theme 페이지 - header</b>
<li>url의 pathParams와 /api/v1/themes API를 사용하여 Section을 구현</li>
<li>themeKey가 잘못 된 경우 메인 페이지로 연결</li></div><br>
<div><b>Theme 페이지 - 상품 목록 섹션</b>
<li>/api/v1/themes/{themeKey}/products API를 사용하여 상품 목록을 구현</li>
<li>API 요청 시 한번에 20개의 상품 목록이 내려오도록</li></div><br><br>

<h1>2단계 - Error, Loading Status 핸들링</h1>

<p>각 API에서 Loading 상태에 대한 UI 대응</p>
<p>데이터가 없는 경우에 대한 UI 대응</p>
<p>Http Status에 따라 Error를 다르게 처리</p><br><br>

<h1>3단계 - 테마 별 선물 추천 API에 페이지네이션 구현 & React Query 사용</h1>
<p>스크롤을 내리면 추가로 데이터를 요청하여 보여지게</p>
<p>1단계에서 구현한 API를 react-query를 사용해서 구현</p><br><br>

<h1>4단계 - 질문의 답변을 README에 작성</h1>
<b>- 질문 1. CORS 에러는 무엇이고 언제 발생하는지 설명해주세요. 이를 해결할 수 있는 방법에 대해서도 설명해주세요.</b>
<p>A: CORS(Cross-Origin Resource Sharing) 오류는 웹 페이지가 다른 도메인의 자원을 요청할 때 발생하는 보안 메커니즘으로, 동일 출처 정책을 위반할 때 발생합니다. 이를 해결하는 방법은 서버에서 적절한 CORS 헤더를 설정하여 요청을 허용하는 도메인을 지정하는 것입니다.</p>
<b>- 질문 2. 비동기 처리 방법인 callback, promise, async await에 대해 각각 장단점과 함께 설명해주세요.</b>
<p>A: callback은 가장 기본적인 비동기 처리 방법으로, 함수를 다른 함수의 인자로 넘겨 실행 완료 후 호출되도록 하는 방식입니다. 하지만 복잡한 비동기 로직 처리 시 콜백 지옥으로 코드가 복잡해지는 단점이 있습니다. Promise는 비동기 작업의 최종 성공 또는 실패를 나타내는 객체로, 연쇄적인 비동기 작업을 .then()과 .catch() 메소드를 사용해 처리할 수 있으며, 콜백에 비해 가독성이 좋습니다. Async/await는 Promise를 더욱 쉽게 사용할 수 있게 하는 문법으로, 비동기 코드를 동기 코드처럼 보이게 하여 가독성을 향상시킵니다. 하지만 에러 처리가 복잡할 수 있습니다.</p>
<b>- 질문 3. react query의 주요 특징에 대해 설명하고, queryKey는 어떤 역할을 하는지 설명해주세요.</b>
<p>A: React Query는 서버 상태 관리를 위한 라이브러리로 데이터 페칭, 캐싱, 동기화 및 업데이트를 자동으로 처리합니다. 주요 특징으로는 백그라운드 업데이트, 캐싱, 자동 재요청 등이 있습니다. queryKey는 쿼리의 고유 식별자 역할을 하며, 캐싱 및 데이터 무효화 시 사용됩니다. 이 쿼리 키를 기반으로 쿼리 결과가 캐시되며, 동일한 키를 가진 쿼리 호출 시 캐시된 데이터를 재사용할 수 있습니다.</p>
