# 매니커스 홈페이지 - React 버전

이 프로젝트는 매니커스 홈페이지를 React로 변환한 버전입니다.

## 기능

- React Router를 사용한 SPA (Single Page Application)
- SEO 최적화 (메타 태그, Open Graph, Twitter Card)
- 반응형 디자인
- 캔버스 기반 인터랙티브 애니메이션
- 상담 문의 모달

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

## GitHub Pages 배포

1. GitHub 저장소에 코드를 푸시합니다.
2. GitHub 저장소 Settings > Pages에서 GitHub Actions를 선택합니다.
3. `main` 브랜치에 푸시하면 자동으로 배포됩니다.

## 프로젝트 구조

```
react-app/
├── src/
│   ├── components/      # 재사용 가능한 컴포넌트
│   │   ├── Header.jsx
│   │   ├── InquiryModal.jsx
│   │   └── HeroCanvas.jsx
│   ├── pages/           # 페이지 컴포넌트
│   │   ├── Home.jsx
│   │   └── Price.jsx
│   ├── hooks/           # 커스텀 훅
│   │   └── useSEO.js
│   ├── styles/           # CSS 파일
│   ├── App.jsx           # 메인 앱 컴포넌트
│   └── main.jsx          # 진입점
├── public/               # 정적 파일
└── .github/workflows/    # GitHub Actions 워크플로우
```

## SEO 최적화

각 페이지는 `useSEO` 훅을 사용하여 다음을 설정합니다:
- 페이지 제목
- 메타 설명
- 키워드
- Open Graph 태그
- Twitter Card 태그

## 기술 스택

- React 19
- React Router DOM
- Vite
- CSS3
