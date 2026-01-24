# Vercel 배포 가이드

## 빠른 배포

### 방법 1: Vercel CLI 사용 (가장 빠름)

```bash
# Vercel CLI 설치
npm i -g vercel

# Vercel 로그인
vercel login

# 프로젝트 배포 (첫 배포)
vercel

# 프로덕션 배포
vercel --prod
```

### 방법 2: Vercel 웹 대시보드 사용

1. [vercel.com](https://vercel.com)에 가입/로그인
2. "Add New Project" 클릭
3. GitHub 저장소 연결
4. 프로젝트 설정 (자동 감지됨):
   - **Framework Preset**: Vite (자동 감지)
   - **Root Directory**: `./` (루트)
   - **Build Command**: `npm run build` (자동 감지)
   - **Output Directory**: `dist` (자동 감지)
5. 환경 변수 추가 (Settings → Environment Variables):
   ```
   GMAIL_USER=gfccjs80@gmail.com
   GMAIL_APP_PASSWORD=ntiydmjbjyezzzdf
   RECEIVE_EMAIL=contact@manicus.co.kr
   ```
6. "Deploy" 클릭

## 환경 변수 설정

Vercel 대시보드 → Settings → Environment Variables에서 다음을 설정:

```
GMAIL_USER=gfccjs80@gmail.com
GMAIL_APP_PASSWORD=ntiydmjbjyezzzdf
RECEIVE_EMAIL=contact@manicus.co.kr
```

## API 엔드포인트

배포 후 다음 URL로 접근 가능:
- 프론트엔드: `https://your-project.vercel.app`
- API: `https://your-project.vercel.app/api/send-email`

## 커스텀 도메인

1. Vercel 대시보드 → Settings → Domains
2. 도메인 추가: `manicus.co.kr`
3. DNS 설정 안내에 따라 도메인 설정

## 자동 배포

GitHub 저장소를 연결하면:
- `main` 브랜치에 푸시할 때마다 자동 배포
- Pull Request 생성 시 프리뷰 배포
