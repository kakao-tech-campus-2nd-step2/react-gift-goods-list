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
<p>Http Status에 따라 Error를 다르게 처리</p>
