# TOAST UI Doc

> TOAST UI 제품에서 사용하는 문서화 도구로, TOAST UI Doc을 사용해 자바스크립트 라이브러리 문서를 쉽게 만들 수 있다.

[![GitHub release](https://img.shields.io/github/release/nhn/toast-ui.doc.svg)](https://github.com/nhn/toast-ui.doc/releases/latest) [![npm](https://img.shields.io/npm/v/@toast-ui/vue-doc.svg)](https://www.npmjs.com/package/@toast-ui/doc) [![GitHub license](https://img.shields.io/github/license/nhn/toast-ui.doc.svg)](https://github.com/nhn/toast-ui.doc/blob/master/LICENSE) [![PRs welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg)](https://github.com/nhn/tui.chart/pulls) [![code with hearth by NHN](https://img.shields.io/badge/%3C%2F%3E%20with%20%E2%99%A5%20by-NHN-ff1414.svg)](https://github.com/nhn)

![toastui-doc](https://user-images.githubusercontent.com/18183560/63479557-bd9a7e00-c4c9-11e9-96d7-4a2cf694e1e7.png)


## 🚩 목차

* TOAST UI Doc이란?
* 주요 기능
    * API 페이지
    * Example 페이지
    * 검색 기능
    * 퍼머링크
    * 레이아웃 콘텐츠 커스터마이징
    * 간단한 빌드
* 데모
* 사용 방법
    * 설치
    * 설정 파일 추가
    * 설정 파일 옵션 설정
    * Examples 페이지 파일 설정
    * 커맨드 실행
* Pull Request 방법
    * 설치
    * 개발
    * Pull Request
* 컨트리뷰팅
* 라이선스

## 📑 TOAST UI Doc이란?

TOAST UI 제품에서 사용하는 문서화 도구로, [JSDoc](https://jsdoc.app/)을 파싱하여 API 문서를 생성하고 예제 페이지를 묶어 하나의 도큐먼트를 만들어주는 모듈이다. TOAST UI Doc은 [documentation.js](https://documentation.js.org)와 [Gatsby](https://www.gatsbyjs.org)를 사용한다. TOAST UI Doc 레이아웃은 Gatsby를 사용해 [리액트](https://reactjs.org/) 컴포넌트로 구성되어 있다. 옵션을 설정하고 TOAST UI Doc을 실행하기만 하면 자바스크립트 라이브러리를 위한 문서를 쉽게 만들어낼 수 있다.

## 🎨 주요 기능

### API 페이지

자바스크립트 파일에 작성된 JSDoc을 파싱하여 타입별로 API 페이지를 생성해준다. API 페이지는 크게 7가지 타입으로 그룹화되어 LNB의 메뉴로 노출된다.

* MODULES
* EXTERNALS
* CLASSES
* NAMESPACES
* MIXINS
* TYPEDEF

또한 각 타입별로 서브 메뉴가 생성되며 상속 관계, 멤버(속성, 메서드) 및 커스텀 이벤트 API 정보를 한 눈에 확인할 수 있다.

* EXTENDS
* STATIC PROPERTIES
* STATIC METHODS
* INSTANCE METHODS
* EVENTS

### Examples 페이지

HTML 파일을 읽어와 Examples 페이지로 생성해준다. 각 예제 페이지에 특정 셀렉터를 사용하면 자바스크립트, HTML 코드 스니펫을 보여줄 수 있다. 사용자가 직접 사용해볼 수 있는 데모 페이지와 각 코드 스니펫은 탭 형태로 제공된다.

### 검색 기능

LNB 영역 상단에 노출된 검색바를 통해 도큐먼트에서 제공하는 API 및 예제 페이지를 검색할 수 있다. 검색어 자동 완성 기능을 제공하여 빠르게 API 및 예제 페이지로 이동할 수 있다.

### 퍼머링크(Permalink)

[깃헙 퍼머링크](https://help.github.com/en/articles/getting-permanent-links-to-files)를 제공한다. 각 API 영역 오른쪽 상단에 노출되며, JSDoc이 작성된 파일 및 작성 위치를 깃헙 리포지터리로 링크해준다. API 코드를 확인하거나 JSDoc 작성 내용을 참조할 때 유용하다.

### 레이아웃 콘텐츠 커스터마이징

TOAST UI Doc 레이아웃은 크게 헤더, 푸터, LNB, 콘텐츠(메인, API, Examples) 페이지로 나뉜다. 설정 파일을 사용하면 헤더, 푸터 영역에 들어가는 콘텐츠를 사용자가 원하는대로 수정할 수 있다. 또한 필요한 경우에 예제 페이지 노출 여부를 설정할 수도 있다.

### 간단한 빌드

TOAST UI Doc은 Gatsby를 내장하고 있어 빌드를 실행하면 Gatsby 스크립트가 실행되면서 문서 파일을 묶어 폴더로 생성해준다. 생성된 폴더를 [깃헙 페이지](https://pages.github.com/) 또는 서버에 업로드하면 공개 API 페이지를 만들 수 있다.

아래 데모 페이지에서 주요 기능들을 확인해볼 수 있다.


## 🐾 데모

* https://nhn.github.io/toast-ui.doc/latest/

## 🔨 사용 방법

### 설치

npm을 사용하며 글로벌에 설치하여 사용한다.

``` sh
$ npm install -g @toast-ui/doc
```

### 설정 파일 추가

도큐먼트를 생성할 파일이 있는 프로젝트의 루트 경로에 설정 파일을 추가한다. `tuidoc.config.json` 이름으로 파일을 생성한다.

```
project/
├─ ...
├─ package.json
└─ tuidoc.config.json
```

### 설정 파일 옵션 설정

`tuidoc.config.json`에서 사용할 수 있는 옵션은 다음과 같다. 옵션을 설정하여 생성할 도큐먼트를 커스터마이징할 수 있다. 전체 옵션 사용 방법은 [다음](https://github.com/nhn/toast-ui.doc/blob/master/tuidoc.config.json)을 참고한다.

#### 헤더 영역 설정

`[로고] / [텍스트] [버전]`을 순서대로 노출할 수 있다.

| 옵션명 | 타입 | 설명 |
| --- | --- | --- |
| `header.logo.src` | `string` | 로고 이미지 경로를 설정한다. |
| `header.logo.linkUrl` | `?string` | 로고 이미지에 링크 URL을 설정한다. 기본값은 루트(`/`)로 설정된다. |
| `header.title` | `object \| boolean` | 로고 이미지 오른쪽에 텍스트를 노출할지 여부와 세부 내용을 설정한다. |
| `header.title.text` | `?string` | 텍스트를 노출할 때, 텍스트 값을 설정한다. 기본값은 `package.json`의 `name` 값으로 설정된다 . |
| `header.title.linkUrl` | `?string` | 텍스트를 노출할 때, 텍스트에 링크 URL을 설정한다. 기본값은 `package.json`의 `github` 값으로 설정된다. |
| `header.version` | `?boolean` | 모듈 버전을 노출할 수 있다. 기본값은 `true`이며 `package.json`의 `version` 값이 표시된다. |

#### 푸터 영역 설정

회사 정보 등 프로덕트와 관련된 링크 목록을 노출할 수 있다.

| 옵션명 | 타입 | 설명 |
| --- | --- | --- |
| `footer[].title` | `string` | 링크 텍스트를 설정한다. |
| `footer[].linkUrl` | `string` | 링크 URL을 설정한다. |

#### 메인 페이지 설정

| 옵션명 | 타입 | 설명 |
| --- | --- | --- |
| `main.filePath` | `string` | 메인 페이지에 노출될 파일 경로를 설정하며, 파일 형식은 마크다운(`*.md`)이어야 한다. 기본값은 프로젝트 폴더의 `README.md` 파일이다. |

#### API 페이지 설정

| 옵션명 | 타입 | 설명 |
| --- | --- | --- |
| `api.filePath` | `string \| array` | API 페이지에 노출될 파일(jsdoc을 파싱할 파일)을 설정한다. 폴더 전체는 `string` 타입으로 설정하고, 개별 파일은 `array` 타입으로 설정할 수 있다. 자바스크립트(`*.js`) 파일만 파싱된다. |
| `api.permalink` | `object \| boolean` | 퍼머링크 사용 여부를 설정한다. `false`로 설정할 경우, 퍼머링크가 노출되지 않는다. |
| `api.permalink.repository` | `?string` | 퍼머링크를 사용할 때, 깃헙 리포지터리 URL을 설정한다. 기본값은 `package.json`의 `github` 값으로 설정된다. |
| `api.permalink.ref` | `?string` | 퍼머링크를 사용할 때 참조할 브랜치 또는 태그를 설정한다. 특정 커밋 해쉬값을 지정할 수도 있다. 기본값은 `v{version}`으로 설정된다. |

#### Examples 페이지 설정

| 옵션명 | 타입 | 설명 |
| --- | --- | --- |
| `examples.filePath` | `string \| boolean` | Examples 페이지에 노출될 파일을 설정한다. 예제 파일이 있는 폴더를 `string` 타입으로 설정한다. `false`로 설정하면 LNB 영역에서 Examples 탭이 노출되지 않는다. |
| `examples.titles` | `object` | 각 예제 파일과 LNB에 노출될 메뉴명을 맵핑한다. `{ [Example 파일명]: [LNB 메뉴명] }` 형식으로 설정한다. |

#### 그 외

| 옵션명 | 타입 | 설명 |
| --- | --- | --- |
| `pathPrefix` | `string` | 생성된 도큐먼트 파일이 깃헙 페이지 또는 서버의 루트 경로가 아닌 특정 경로에 위치할 때 사용하며, 특정 경로명을 설정한다. 설정하지 않을 경우, 도큐먼트 내에서 링크 참조 에러가 발생한다.


### Examples 페이지 파일 설정

Examples 페이지의 각 탭 내용을 보여주기 위해 옵션 설정 외 추가 설정 작업이 필요하다. Result 탭에 노출되는 페이지는 `examples` 옵션에 설정된 파일이며 형식은 HTML이어야 한다. JavaScript 탭의 코드 스니펫은  `code-js`, HTML 탭의 코드 스니펫은 `code-html` 클래스 셀렉터로 지정하면 된다. 기본 템플릿은 [다음](https://github.nhnent.com/fe/tui.doc/blob/master/demo/examples/example01-default-template.html)을 참조한다.

```html
...
<div class="code-html">
  <div id="wrapper"></div>
</div>
...
<script type="text/javascript" class="code-js">
  alert('Hello!');
</script>
...
```

### 커맨드 실행

TOAST UI Doc은 `tuidoc` CLI를 제공하며, 다음 커맨드를 실행하면 위에서 설정한 환경 설정 파일을 기반으로 도큐먼트를 생성하기 위한 빌드가 실행된다. 랩핑하고 있는 Gatsby 빌드가 실행된다. `--serv` 옵션을 사용해 빌드하면 생성된 도큐먼트를 로컬에서 미리 확인할 수 있다.

``` sh
$ tuidoc --serv
```

로컬 확인이 끝나고 `tuidoc` 커맨드를 실행하면 프로젝트 루트 경로 아래에 `_latest`, `_[semver]` 2개 폴더가 생성된다. 이 폴더를 서버에 업로드하여 사용한다.

``` sh
$ tuidoc
```

또는 도큐먼트를 생성할 프로젝트의 `package.json` 파일에 스크립트를 추가해 실행할 수도 있다.

``` json
{
  "scripts" : {
    "doc:serve" : "tuidoc --serv",
    "doc" : "tuidoc"
  }
}
```

## 🔧 Pull Request 방법

TOAST UI 제품들은 오픈 소스로, 이슈를 수정하거나 기능을 추가 개발한 다음 Pull Request(PR)를 요청할 수 있다.

### 설치

`master` 브랜치를 개인 리포지터리로 포크한다. 포크한 리포지터리를 로컬에 클론한 다음 노드 모듈을 설치한다. 개발에 앞서 모듈이 정상적으로 동작하는지 확인해본다.

```sh
$ git clone https://github.com/{your-personal-repo}/toast-ui.doc.git
$ cd toast-ui.doc
$ npm install
$ npm run test
```

### 개발

로컬에서 개발을 한다. 개발 단계에서 2가지의 `tuidoc` 스크립트를 실행할 수 있으며, 개발 상황에 맞게 스크립트를 실행하면 된다.

#### 데브 서버 실행

스크립트를 실행하면 Gatsby에서 웹팩 데브 서버를 실행한다. `src` 경로 아래의 리액트 컴포넌트 파일을 수정할 때 실시간으로 수정 사항을 확인할 수 있다. `localhost:8000`으로 접속한다.

```sh
$ npm run tuidoc:dev
```

#### 빌드 상태 확인

스크립트를 실행하면 Gatsby 빌드가 실행되고 생성된 도큐먼트가 정상 동작하는지 확인할 수 있도록 서버가 실행된다. 서버에 도큐먼트 폴더를 배포하기 전 상태를 확인할 수 있다. `localhost:9000`으로 접속한다.

```sh
$ npm run tuidoc:serve
```

### Pull Request

PR을 요청하기 전 문제가 없는지 최종적으로 확인한다. 문제가 없으면 커밋하고 리포지터리에 푸시한다.

더 자세한 PR 방법은 아래 컨트리뷰팅 목차 링크를 참조한다.


## 💬 컨트리뷰팅

* [Code of Conduct](https://github.com/nhn/toast-ui.doc/blob/master/CODE_OF_CONDUCT.md)
* [Contributing guideline](https://github.com/nhn/toast-ui.doc/blob/master/CONTRIBUTING.md)
* [Commit convention](https://github.com/nhn/toast-ui.doc/blob/master/docs/COMMIT_MESSAGE_CONVENTION.md)
* [Issue guideline](https://github.com/nhn/toast-ui.doc/tree/master/.github/ISSUE_TEMPLATE)

## 📜 라이선스

이 소프트웨어는 [MIT](https://github.com/nhn/toast-ui.doc/blob/master/LICENSE) 라이선스를 사용한다. © [NHN](https://github.com/nhn).