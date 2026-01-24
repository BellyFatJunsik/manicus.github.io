# 배포 확인 가이드

## 배포 완료 확인

터미널 출력을 보면 배포가 성공했습니다:

```
✅  Production: https://manicus-a7tlsimla-manicus-projects.vercel.app
🔗  Aliased: https://manicus.vercel.app
```

## 배포 확인 체크리스트

### 1. 프론트엔드 확인

브라우저에서 접속:
- https://manicus.vercel.app
- https://manicus-a7tlsimla-manicus-projects.vercel.app

확인 사항:
- [ ] 홈페이지가 정상적으로 표시되는가?
- [ ] "상담 문의" 버튼이 작동하는가?
- [ ] Price 페이지가 정상적으로 표시되는가?

### 2. 백엔드 API 확인

Vercel 대시보드에서:
1. https://vercel.com/manicus-projects/manicus 접속
2. **Functions** 탭 클릭
3. `api/send-email` 함수가 있는지 확인

또는 직접 테스트:
```bash
curl -X POST https://manicus.vercel.app/api/send-email \
  -H "Content-Type: application/json" \
  -d '{"companyName":"테스트","userName":"테스트","phoneNumber":"010-1234-5678","emailAddress":"test@example.com","inquiryContent":"테스트"}'
```

### 3. 환경 변수 확인

Vercel 대시보드 → Settings → Environment Variables:

필수 환경 변수:
- [ ] `GMAIL_USER=gfccjs80@gmail.com`
- [ ] `GMAIL_APP_PASSWORD=앱비밀번호` (16자리)
- [ ] `RECEIVE_EMAIL=contact@manicus.co.kr`

**중요**: 환경 변수가 설정되지 않으면 이메일 전송이 실패합니다!

### 4. 이메일 전송 테스트

1. https://manicus.vercel.app 접속
2. "상담 문의" 버튼 클릭
3. 폼 작성 후 제출
4. 확인:
   - 성공 메시지가 표시되는가?
   - `contact@manicus.co.kr`로 이메일이 수신되는가?
   - Vercel 대시보드 → Functions → Logs에서 오류가 없는가?

## 문제 해결

### 프론트엔드는 보이지만 이메일 전송이 안 됨

1. Vercel 대시보드 → Functions → `api/send-email` 확인
2. Functions → Logs에서 에러 확인
3. 환경 변수가 올바르게 설정되었는지 확인

### 환경 변수 설정 방법

1. Vercel 대시보드 → Settings → Environment Variables
2. "Add New" 클릭
3. 다음 변수 추가:
   ```
   GMAIL_USER = gfccjs80@gmail.com
   GMAIL_APP_PASSWORD = 앱비밀번호
   RECEIVE_EMAIL = contact@manicus.co.kr
   ```
4. "Save" 클릭
5. **재배포 필요**: 환경 변수 변경 후 재배포해야 적용됩니다

### 재배포 방법

```bash
vercel --prod
```

또는 Vercel 대시보드에서 "Redeploy" 클릭

## 배포 URL

- **프로덕션**: https://manicus-a7tlsimla-manicus-projects.vercel.app
- **별칭**: https://manicus.vercel.app
- **API**: https://manicus.vercel.app/api/send-email

## 다음 단계

1. ✅ 배포 완료 확인
2. ⚠️ 환경 변수 설정 확인 (중요!)
3. ⚠️ 이메일 전송 테스트
4. ⚠️ 커스텀 도메인 연결 (선택사항)
