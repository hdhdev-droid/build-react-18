# React 18 로그인 요청 프로젝트

React 18 + Vite 기반 로그인 폼과 API 요청 데모입니다.

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 으로 접속하세요.

## 기능

- 이메일 / 비밀번호 로그인 폼
- `POST /api/auth/login` 로그인 요청 (데모용 mock 서버 포함)
- 로딩 상태, 에러 메시지 표시
- 로그인 성공 시 환영 화면 및 로그아웃

## 실제 백엔드 연동

1. `vite.config.js`에서 `mock-login` 플러그인을 제거하세요.
2. `.env` 파일을 만들고 로그인 API URL을 설정하세요:

   ```
   VITE_LOGIN_URL=https://your-api.com/auth/login
   ```

3. `src/api/auth.js`의 `login` 함수가 해당 URL로 `POST` 요청을 보냅니다.  
   요청 body: `{ "email": "...", "password": "..." }`

## 기술 스택

- React 18 (createRoot)
- Vite 5
- CSS (별도 UI 라이브러리 없음)
