# 매니커스 백엔드 서버

Gmail을 사용하여 상담 문의 이메일을 전송하는 백엔드 서버입니다.

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일을 열어 Gmail 계정 정보를 입력하세요

# 서버 실행
npm start

# 개발 모드 (nodemon 사용)
npm run dev
```

## 환경 변수 설정

`.env` 파일에 다음 정보를 입력하세요:

```env
GMAIL_USER=gfccjs80@gmail.com
GMAIL_APP_PASSWORD=ntiydmjbjyezzzdf
RECEIVE_EMAIL=contact@manicus.co.kr
PORT=3001
```

## Gmail 앱 비밀번호 생성 방법

1. Google 계정 설정 → **보안**
2. **2단계 인증** 활성화
3. **앱 비밀번호** 생성
4. 생성된 16자리 비밀번호를 `GMAIL_APP_PASSWORD`에 입력

**중요**: Gmail은 일반 비밀번호가 아닌 **앱 비밀번호**를 사용해야 합니다.

## API 엔드포인트

### POST /api/send-email

상담 문의를 이메일로 전송합니다.

**Request Body:**
```json
{
  "companyName": "회사명",
  "userName": "이름",
  "phoneNumber": "휴대폰번호",
  "emailAddress": "이메일주소",
  "inquiryContent": "문의내용"
}
```

**Response:**
```json
{
  "success": true,
  "message": "이메일이 성공적으로 전송되었습니다."
}
```
