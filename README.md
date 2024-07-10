# react-gift-goods-list
FE 카카오 선물하기 3주차 과제
### 🌱 1단계 - API 적용하기
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
- [ ] 각 API에서 Loading 상태에 대한 UI 대응
- [ ] 데이터가 없는 경우에 대한 UI 대응
- [ ] HTTP Status에 따라 Error를 다르게 처리