# Vercel API 엔드포인트 생성 방법

## Vercel 서버리스 함수 자동 생성

Vercel은 `api/` 폴더에 있는 파일을 **자동으로 서버리스 함수로 인식**합니다.

### 현재 구조

```
manicus/
├── api/
│   └── send-email.js    ← 이 파일이 자동으로 /api/send-email 엔드포인트가 됩니다
├── src/
└── vercel.json
```

### 작동 원리

1. **파일 위치**: `api/send-email.js`
2. **자동 생성 엔드포인트**: `https://your-project.vercel.app/api/send-email`
3. **HTTP 메서드**: 파일 내부에서 `req.method`로 처리

### API 파일 형식

```javascript
// api/send-email.js
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // CORS 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'POST') {
    // POST 요청 처리
    const data = req.body;
    // ... 로직 처리
    res.status(200).json({ success: true });
  }
};
```

### 프론트엔드에서 호출

```javascript
// Vercel 배포 시 자동으로 /api/send-email 사용
const apiUrl = '/api/send-email';

fetch(apiUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});
```

## 배포 후 확인

1. Vercel에 배포
2. Functions 탭에서 확인:
   - `api/send-email.js` → `/api/send-email` 엔드포인트 자동 생성
3. 테스트:
   ```bash
   curl -X POST https://your-project.vercel.app/api/send-email \
     -H "Content-Type: application/json" \
     -d '{"companyName":"테스트"}'
   ```

## 환경 변수 설정

Vercel 대시보드 → Settings → Environment Variables:

```
GMAIL_USER=gfccjs80@gmail.com
GMAIL_APP_PASSWORD=ntiydmjbjyezzzdf
RECEIVE_EMAIL=contact@manicus.co.kr
```

## 추가 API 엔드포인트 만들기

새로운 API를 만들려면:

1. `api/` 폴더에 새 파일 생성
   ```
   api/new-endpoint.js
   ```

2. 자동으로 엔드포인트 생성
   ```
   /api/new-endpoint
   ```

3. 파일 내용 예시:
   ```javascript
   module.exports = async (req, res) => {
     res.json({ message: 'Hello from Vercel!' });
   };
   ```

## 현재 설정 상태

✅ `api/send-email.js` 파일 존재
✅ Vercel에 배포하면 자동으로 `/api/send-email` 엔드포인트 생성
✅ 프론트엔드에서 `/api/send-email` 호출 가능

**결론**: 이미 설정이 완료되어 있습니다! Vercel에 배포하면 자동으로 작동합니다.
