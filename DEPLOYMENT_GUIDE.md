# 배포 가이드 - GitHub + Vercel

## 배포 구조

현재 프로젝트는 **두 가지 플랫폼**에 배포해야 합니다:

1. **GitHub Pages**: 프론트엔드 (React 앱)
2. **Vercel**: 백엔드 API (서버리스 함수)

## GitHub에 배포하면?

### ✅ 자동으로 처리되는 것
- **프론트엔드만** GitHub Pages에 배포됩니다
- React 앱이 빌드되어 정적 파일로 배포됩니다
- `main` 브랜치에 푸시하면 자동 배포됩니다

### ❌ 자동으로 처리되지 않는 것
- **백엔드 API는 배포되지 않습니다**
- 이메일 전송 기능이 작동하지 않습니다
- `/api/send-email` 엔드포인트가 없습니다

## 완전한 배포를 위한 두 가지 방법

### 방법 1: GitHub Pages + Vercel (권장)

#### 1단계: GitHub Pages 배포 (프론트엔드)
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```
- 자동으로 GitHub Pages에 배포됩니다
- URL: `https://your-username.github.io/manicus/` 또는 `https://manicus.co.kr`

#### 2단계: Vercel 배포 (백엔드 API)
```bash
# Vercel CLI 사용
npm i -g vercel
vercel login
vercel --prod

# 또는 Vercel 웹 대시보드에서 GitHub 저장소 연결
```

**Vercel 환경 변수 설정:**
```
GMAIL_USER=gfccjs80@gmail.com
GMAIL_APP_PASSWORD=ntiydmjbjyezzzdf
RECEIVE_EMAIL=contact@manicus.co.kr
```

#### 3단계: 프론트엔드 API URL 수정

Vercel 배포 후 생성된 URL을 사용하도록 수정:

```javascript
// src/components/InquiryModal.jsx
const apiUrl = import.meta.env.PROD 
  ? 'https://your-vercel-project.vercel.app/api/send-email'  // Vercel URL
  : 'http://localhost:3001/api/send-email';  // 로컬 개발
```

### 방법 2: Vercel에 전체 배포 (더 간단)

GitHub Pages 대신 **Vercel에 프론트엔드와 백엔드를 모두 배포**:

```bash
# Vercel CLI 사용
npm i -g vercel
vercel login
vercel --prod
```

**장점:**
- 한 번의 배포로 프론트엔드 + 백엔드 모두 배포
- API 엔드포인트가 같은 도메인에서 작동
- 환경 변수 관리가 간단

**단점:**
- GitHub Pages의 무료 호스팅을 사용하지 않음

## 현재 설정 상태

### GitHub Pages (프론트엔드)
- ✅ `.github/workflows/deploy.yml` 설정 완료
- ✅ `main` 브랜치 푸시 시 자동 배포
- ❌ 백엔드 API는 포함되지 않음

### Vercel (백엔드 API)
- ✅ `api/send-email.js` 파일 준비됨
- ✅ `vercel.json` 설정 완료
- ⚠️ 아직 배포되지 않음 (수동 배포 필요)

## 권장 배포 방법

### 옵션 A: Vercel에 전체 배포 (가장 간단)

1. Vercel에 가입/로그인
2. GitHub 저장소 연결
3. 환경 변수 설정
4. 배포 완료

**결과:**
- 프론트엔드: `https://your-project.vercel.app`
- 백엔드 API: `https://your-project.vercel.app/api/send-email`
- 모두 같은 도메인에서 작동

### 옵션 B: GitHub Pages + Vercel (분리 배포)

1. GitHub Pages: 프론트엔드 배포 (자동)
2. Vercel: 백엔드 API 배포 (수동)
3. 프론트엔드 코드에서 Vercel API URL 사용

**결과:**
- 프론트엔드: `https://manicus.co.kr` (GitHub Pages)
- 백엔드 API: `https://your-project.vercel.app/api/send-email` (Vercel)

## 결론

**GitHub에 배포만으로는 완전하지 않습니다.**

- ✅ 프론트엔드는 배포됩니다
- ❌ 백엔드 API는 별도로 Vercel에 배포해야 합니다

**가장 간단한 방법**: Vercel에 전체 프로젝트를 배포하면 프론트엔드와 백엔드가 모두 한 번에 배포됩니다.
