# Express 백엔드 구조 유지 (현재 구조)

현재 Express + Nodemailer 구조를 유지하며 Vercel에 배포합니다.

## 현재 구조

### 1. 로컬 개발 (Express 서버)
- **위치**: `backend/server.js`
- **기능**: Gmail SMTP로 이메일 전송
- **실행**: `cd backend && npm start`

### 2. 프로덕션 (Vercel 서버리스 함수)
- **위치**: `react-app/api/send-email.js`
- **기능**: 동일한 이메일 전송 기능
- **배포**: Vercel에 자동 배포

## 배포 방법

### 1. GitHub Pages (프론트엔드)
```bash
# GitHub에 푸시하면 자동 배포
git push origin main
```

### 2. Vercel (백엔드 API)

#### 방법 A: Vercel 웹 대시보드
1. [vercel.com](https://vercel.com) 가입/로그인
2. "Add New Project" 클릭
3. GitHub 저장소 연결
4. 설정:
   - **Root Directory**: `react-app`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. 환경 변수 추가:
   ```
   GMAIL_USER=gfccjs80@gmail.com
   GMAIL_APP_PASSWORD=ntiydmjbjyezzzdf
   RECEIVE_EMAIL=contact@manicus.co.kr
   ```
6. "Deploy" 클릭

#### 방법 B: Vercel CLI
```bash
cd react-app
npm i -g vercel
vercel login
vercel --prod
```

## 환경 변수 설정

### Vercel 환경 변수
Vercel 대시보드 → Settings → Environment Variables에서 설정:
- `GMAIL_USER`: `gfccjs80@gmail.com`
- `GMAIL_APP_PASSWORD`: `ntiydmjbjyezzzdf`
- `RECEIVE_EMAIL`: `contact@manicus.co.kr`

### 로컬 개발 환경 변수
`backend/.env` 파일:
```env
GMAIL_USER=gfccjs80@gmail.com
GMAIL_APP_PASSWORD=ntiydmjbjyezzzdf
RECEIVE_EMAIL=contact@manicus.co.kr
PORT=3001
```

## Gmail 앱 비밀번호 생성

1. Google 계정 설정 → 보안
2. 2단계 인증 활성화
3. 앱 비밀번호 생성
4. 생성된 16자리 비밀번호를 환경 변수에 입력

**참고**: 제공된 앱 비밀번호(`ntiydmjbjyezzzdf`)가 이미 설정되어 있습니다.

## API 엔드포인트

### 프로덕션
- **URL**: `https://your-project.vercel.app/api/send-email`
- **Method**: POST
- **Content-Type**: application/json

### 로컬 개발
- **URL**: `http://localhost:3001/api/send-email`
- **Method**: POST
- **Content-Type**: application/json

### Request Body
```json
{
  "companyName": "회사명",
  "userName": "이름",
  "phoneNumber": "휴대폰번호",
  "emailAddress": "이메일주소",
  "inquiryContent": "문의내용"
}
```

### Response
```json
{
  "success": true,
  "message": "이메일이 성공적으로 전송되었습니다."
}
```

## 현재 구조의 장점

✅ **간단함**: Express는 가볍고 빠름
✅ **서버리스 최적화**: Vercel 서버리스 함수에 적합
✅ **빠른 배포**: 설정이 간단함
✅ **충분한 기능**: 이메일 전송에 필요한 모든 기능 제공

## 문제 해결

### CORS 오류
- Vercel 서버리스 함수에 CORS 헤더가 설정되어 있습니다.
- 여전히 오류가 발생하면 Vercel 함수의 CORS 설정을 확인하세요.

### 이메일 전송 실패
- Gmail 앱 비밀번호가 올바른지 확인
- Vercel 환경 변수가 올바르게 설정되었는지 확인
- Vercel 함수 로그 확인 (Vercel 대시보드 → Functions → Logs)

## 다음 단계

1. Vercel에 가입하고 프로젝트 배포
2. 환경 변수 설정
3. 상담 문의 폼 테스트
4. GitHub Pages와 Vercel URL 연결 확인
