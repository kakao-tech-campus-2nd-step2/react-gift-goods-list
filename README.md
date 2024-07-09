# 🚀 1단계 - API 적용하기

### 진행 방식

- 미션은 과제 진행 요구 사항, 요구 사항 두 가지로 구성되어 있습니다.
- 두 개의 요구 사항을 만족하기 위해 노력합니다. 특히 기능을 구현하기 전에 기능 목록을 만들고 어떻게 만들 것인지 고민해보세요.
- 기능 단위로 커밋하는 방식으로 진행합니다.
- 기능 요구 사항에 기재되지 않은 내용은 스스로 판단하여 구현합니다.

## 📝 주요 요구사항

1. 본인만의 기준으로 일관된 코드를 작성합니다.
2. 첨부된 `oas.yaml` 파일을 토대로 Request, Response Type을 정의합니다.
3. React Query를 사용하지 말고 axios를 사용해서 구현합니다.
4. 첨부된 `oas.yaml` 파일과 목 API URL을 사용하여 API를 구현합니다.

## 🚀 Getting Started

- ✔️ Frontend에서 비동기 데이터를 처리하는 방법에 대해 고민해요.
- ✔️ Axios 만을 사용해서 React에서 비동기 데이터를 구현해요.
- ✔️ Suspense, Error Boundary를 사용하지 않고 fetch State를 관리해봐요.

### 메인 페이지

1. **Theme 카테고리 섹션**

   - `/api/v1/themes` API를 사용하여 섹션을 구현합니다.
   - API는 Axios를 사용하여 구현합니다.

2. **실시간 급상승 선물랭킹 섹션**
   - `/api/v1/ranking/products` API를 사용하여 섹션을 구현합니다. (Axios 사용 가능)
   - 필터 조건을 선택하면 해당 조건에 맞게 API를 요청하여 보여지도록 합니다.

### Theme 페이지

1. **Header**

   - URL의 pathParams와 `/api/v1/themes` API를 사용하여 섹션을 구현합니다.
   - themeKey가 잘못된 경우 메인 페이지로 연결합니다.

2. **상품 목록 섹션**
   - `/api/v1/themes/{themeKey}/products` API를 사용하여 상품 목록을 구현합니다.
   - API 요청 시 한번에 20개의 상품 목록이 내려오도록 합니다.

## Getting Started
