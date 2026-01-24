# GitHub Pages + Vercel 배포 가이드

이 프로젝트는 GitHub Pages로 프론트엔드를 배포하고, Vercel로 서버리스 함수를 배포합니다.

## 배포 방법

### 1. GitHub Pages 배포 (프론트엔드)

1. GitHub 저장소에 코드 푸시
2. GitHub 저장소 Settings > Pages에서:
   - Source: GitHub Actions 선택
   - `main` 브랜치에 푸시하면 자동 배포

### 2. Vercel 배포 (서버리스 함수)

#### 방법 1: Vercel CLI 사용

```bash
# Vercel CLI 설치
npm i -g vercel

# Vercel 로그인
vercel login

# 프로젝트 배포
cd react-app
vercel

# 프로덕션 배포
vercel --prod
```

#### 방법 2: Vercel 웹 대시보드 사용

1. [Vercel](https://vercel.com)에 가입/로그인
2. "Add New Project" 클릭
3. GitHub 저장소 연결
4. 프로젝트 설정:
   - **Root Directory**: `react-app`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. 환경 변수 추가:
   - `GMAIL_USER`: Gmail 주소
   - `GMAIL_APP_PASSWORD`: Gmail 앱 비밀번호
   - `RECEIVE_EMAIL`: `contact@manicus.co.kr`
6. "Deploy" 클릭

### 3. 환경 변수 설정

#### Vercel 환경 변수

Vercel 대시보드에서 다음 환경 변수를 설정하세요:

```
GMAIL_USER=gfccjs80@gmail.com
GMAIL_APP_PASSWORD=ntiydmjbjyezzzdf
RECEIVE_EMAIL=contact@manicus.co.kr
```

#### React 앱 환경 변수 (선택사항)

로컬 개발 시 `.env` 파일:

```env
REACT_APP_API_URL=http://localhost:3001/api/send-email
```

### 4. API URL 설정

프로덕션에서는 Vercel 서버리스 함수를 사용하도록 자동 설정되어 있습니다.

- **프로덕션**: `/api/send-email` (Vercel 서버리스 함수)
- **개발**: `http://localhost:3001/api/send-email` (로컬 백엔드)

## Gmail 앱 비밀번호 생성

1. Google 계정 설정 → 보안
2. 2단계 인증 활성화
3. 앱 비밀번호 생성
4. 생성된 16자리 비밀번호를 `GMAIL_APP_PASSWORD`에 입력

**참고**: Gmail은 일반 비밀번호가 아닌 앱 비밀번호를 사용해야 합니다.

## 배포 후 확인

1. GitHub Pages URL에서 프론트엔드 확인
2. Vercel URL에서 서버리스 함수 확인
3. 상담 문의 폼 제출 테스트

## 문제 해결

### CORS 오류
- Vercel 서버리스 함수에 CORS 헤더가 설정되어 있습니다.
- 여전히 오류가 발생하면 Vercel 함수의 CORS 설정을 확인하세요.

### 이메일 전송 실패
- 네이버 앱 비밀번호가 올바른지 확인
- Vercel 환경 변수가 올바르게 설정되었는지 확인
- Vercel 함수 로그 확인 (Vercel 대시보드 → Functions → Logs)
