# Frontend Research Project

프론트엔드 개발 관련 연구 내용을 Marp를 활용하여 슬라이드쇼로 제작하고 공유하는 프로젝트입니다.

## 프로젝트 소개

이 프로젝트는 프론트엔드 개발과 관련된 다양한 주제들(예: React, TypeScript, 웹 성능, UI/UX 등)에 대한 연구 내용을 Markdown으로 작성하고, Marp를 통해 아름다운 프레젠테이션 슬라이드로 변환하여 공유하는 것을 목적으로 합니다.

## 배포

이 프로젝트는 Vercel을 통해 배포되어 있으며, 다음 URL에서 접근할 수 있습니다: [https://research.yceffort.kr/](https://research.yceffort.kr/)

## 기술 스택

- **프레임워크**: Next.js 15.2.3
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **패키지 매니저**: pnpm 10.6.5
- **Node.js 버전**: 22.12.0
- **프레젠테이션**: Marp

## 주요 기능

### Marp 프레젠테이션

- Markdown으로 작성된 프레젠테이션 슬라이드 지원
- 다크/라이트 테마 지원
- 키보드 네비게이션 (좌/우 화살표)
- 슬라이드 클릭 네비게이션
- URL 해시 기반 슬라이드 네비게이션
- 코드 하이라이팅
- 커스텀 CSS 스타일링 지원

### 기타 기능

- 반응형 디자인
- Markdown 문서 지원

## 시작하기

### 사전 요구사항

- Node.js 22.12.0
- pnpm 10.6.5

### 설치

```bash
pnpm install
```

### 개발 서버 실행

```bash
pnpm dev
```

### 빌드

```bash
pnpm build
```

### 프로덕션 서버 실행

```bash
pnpm start
```

## 프로젝트 구조

```
src/
├── app/          # Next.js 앱 라우터
│   └── slides/   # Marp 슬라이드 페이지
├── components/   # 재사용 가능한 컴포넌트
│   └── MarpSlides.tsx  # Marp 슬라이드 컴포넌트
├── hooks/        # 커스텀 React 훅
├── lib/          # 유틸리티 함수
├── config.ts     # 설정 파일
└── global.css    # 전역 스타일
research/         # Markdown 슬라이드 파일
```

## Marp 슬라이드 작성하기

`research` 디렉토리에 `.md` 파일을 생성하여 Marp 슬라이드를 작성할 수 있습니다.

```markdown
---
title: 프론트엔드 성능 최적화 기법
marp: true
theme: lead
tags:
  - frontend
  - performance
date: 2024-03-28
---

# 프론트엔드 성능 최적화 기법

- 번들 사이즈 최적화
- 이미지 최적화
- 렌더링 최적화

---

# 번들 사이즈 최적화

1. 코드 스플리팅
2. 트리쉐이킹
3. 동적 임포트
```

## 코드 품질 관리

- ESLint를 통한 코드 린팅
- Prettier를 통한 코드 포맷팅
- TypeScript를 통한 타입 체크

### 린트 실행

```bash
pnpm lint
```

### 코드 포맷팅

```bash
pnpm prettier:fix
```

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.
