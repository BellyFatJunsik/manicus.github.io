# 매니커스 홈페이지

React 기반의 매니커스 홈페이지입니다.

## 프로젝트 구조

```
manicus/
├── react-app/          # React 애플리케이션
│   ├── src/            # 소스 코드
│   ├── public/         # 정적 파일 (이미지, SVG 등)
│   ├── api/            # Vercel 서버리스 함수
│   └── .github/        # GitHub Actions 워크플로우 (이전 위치)
├── .github/workflows/  # GitHub Actions 워크플로우 (현재 위치)
├── backend/            # 로컬 개발용 Express 서버
└── README.md
```

## 배포

### GitHub Pages (프론트엔드)

GitHub Actions를 통해 자동 배포됩니다.

1. `main` 브랜치에 푸시하면 자동으로 빌드 및 배포
2. GitHub 저장소 Settings > Pages에서 확인
3. 배포 URL: `https://your-username.github.io/manicus/` 또는 `https://manicus.co.kr` (CNAME 설정 시)

### Vercel (백엔드 API)

이메일 전송 기능은 Vercel 서버리스 함수로 배포됩니다.

자세한 내용은 `react-app/DEPLOY.md`를 참고하세요.

## 로컬 개발

### 프론트엔드

```bash
cd react-app
npm install
npm run dev
```

### 백엔드 (로컬 개발)

```bash
cd backend
npm install
npm start
```

## 기술 스택

- **Frontend**: React 19, Vite, React Router
- **Backend**: Express, Nodemailer
- **Deployment**: GitHub Pages, Vercel

## 환경 변수

### Vercel 환경 변수

```
GMAIL_USER=gfccjs80@gmail.com
GMAIL_APP_PASSWORD=ntiydmjbjyezzzdf
RECEIVE_EMAIL=contact@manicus.co.kr
```

### 로컬 개발 환경 변수

`backend/.env`:
```env
GMAIL_USER=gfccjs80@gmail.com
GMAIL_APP_PASSWORD=ntiydmjbjyezzzdf
RECEIVE_EMAIL=contact@manicus.co.kr
PORT=3001
```

## 파일 구조

- **정적 파일**: `react-app/public/` (이미지, SVG 등)
- **소스 코드**: `react-app/src/`
- **빌드 결과**: `react-app/dist/` (자동 생성)

## 문서

- `react-app/DEPLOY.md`: 배포 가이드
- `EXPRESS_SETUP.md`: Express 백엔드 설정 가이드
- `backend/README.md`: 백엔드 서버 가이드
