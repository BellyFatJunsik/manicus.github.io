# NestJS 백엔드 (Vercel 배포용)

Vercel에서 NestJS를 서버리스 함수로 배포하는 방법입니다.

## Vercel에서 NestJS 사용 방법

Vercel은 서버리스 함수를 지원하므로, NestJS를 서버리스 어댑터로 래핑하여 배포할 수 있습니다.

### 방법 1: @nestjs/vercel 어댑터 사용 (권장)

NestJS 공식 Vercel 어댑터를 사용하면 NestJS 애플리케이션을 Vercel 서버리스 함수로 쉽게 변환할 수 있습니다.

### 방법 2: 별도 서버 호스팅 (더 안정적)

NestJS 전체 기능을 사용하려면 Render, Railway, Heroku 같은 풀 서버 호스팅 서비스를 사용하는 것이 더 안정적입니다.

## 현재 프로젝트 구조

현재는 Express + Nodemailer를 사용하고 있으며, 이는 Vercel 서버리스 함수로 잘 작동합니다.

NestJS로 전환하려면:
- 더 구조화된 코드
- 의존성 주입
- 모듈화된 아키텍처
- 타입 안정성

장단점을 고려하여 결정하세요.
