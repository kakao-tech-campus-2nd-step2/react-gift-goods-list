# Bundler와 Transpiler

## JavaScript 모듈

- 모듈: 코드 분리, 재사용 가능
- 모듈 시스템: ES6, CommonJS 등

### ES6 모듈

: ESM(ECMAScript Modules)

- 최신 JavaScript 표준에서 도입된 모듈
- 브라우저와 Node.js 모두 사용 가능
- 컴파일 타임에 모듈 의존성 파악 가능
- import, export 키워드로 모듈을 가져오고, 내보는 방식
- 각 모듈은 자체적인 스코프를 가짐

### CommonJS

- 주로 Node.js 환경에서 사용
- require, module.exports 키워드로 모듈을 정의하고 불러오는 방식
- 모듈을 동기적으로 로드
  - require 함수 호출 시 해당 모듈이 완전 로드될 때까지 다음 코드 실행이 멈춤
- 파일 스코프 내에서 모듈이 실행됨

## Transpiler

- 트랜스파일러: 유사한 두 언어를 변환, 컴파일러 하위분류

### 특징

- 호환성 유지
  - 최신 언어 기능을 구형 브라우저에 사용가능하게 변환
- 다양한 언어 지원
  - 여러 언어로 작성된 코드를 한 언어로 통합, 변환
- 코드 최적화
  - 사용하지 않는 코드 제거, 코드 압축, 트리 쉐이킹 등 다양한 기법 사용

## Bundler

- 번들러: 다양한 파일과 모듈을 하나의 파일로 묶어주는 도구

### 배경

- 초기 웹 개발: 모든 코드를 한 파일에 작성 → 유지보수, 재사용 어려움
- 모듈화로 코드 분리 → 브라우저가 모듈화된 파일을 인식 못함
- 브라우저가 이해 가능하게 여러 모듈화된 파일을 하나로 묶어주는 작업 필요

### 특징

- 파일 로드 최적화
  - 파일을 하나로 묶어 네트워크 요청 횟수 감소
- 의존성 관리
  - 필요한 파일을 올바른 순서로 로드해 의존성을 자동으로 관리
- 코드 최적화
  - 번들링 과정에서 불필요한 코드 제거, 압축해 파일 크기 감소

#### 번들러의 최적화 기능

- Tree Shaking: 필요없는 코드를 제거 → 번들 파일의 크기, 시간 줄임
- HMR(Hot Module Replacement): 코드 변경 시 브라우저에 해당 모듈만 전달 해 전체 페이지 새로고침 없이 변경된 모듈만 갱신 → 빠른 피드백
- code splitting: 코드를 청크로 나누어 필요한 부분만 로드 → 초기 로드시간 단축

등등

## Bundler vs Transpiler

#### Bundler

- 여러 개의 모듈, 파일 → 하나의 파일
- 웹 어플리케이션 로딩 속도 최적화
- 쉬운 의존성 관리

#### Transpiler

- 프로그래밍 언어 → 다른 프로그래밍 언어
  - 주로 같은 수준의 언어간의 변화
- 최신 언어 기능을 여러 환경에 사용 가능하게 함
- 다른 언어의 기능 활용