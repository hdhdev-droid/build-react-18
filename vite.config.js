import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    // 데모용 mock 로그인 API (실제 백엔드 연동 시 이 미들웨어 제거 또는 proxy 사용)
    {
      name: 'mock-login',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/api/auth/login' && req.method === 'POST') {
            let body = ''
            req.on('data', (chunk) => { body += chunk })
            req.on('end', () => {
              try {
                const { email } = JSON.parse(body || '{}')
                res.setHeader('Content-Type', 'application/json')
                res.end(
                  JSON.stringify({
                    user: { name: email?.split('@')[0] || '사용자', email },
                    token: 'mock-jwt-token-' + Date.now(),
                  })
                )
              } catch {
                res.statusCode = 400
                res.end(JSON.stringify({ message: '잘못된 요청입니다.' }))
              }
            })
            return
          }
          next()
        })
      },
    },
  ],
  server: {
    port: 3000,
  },
})
