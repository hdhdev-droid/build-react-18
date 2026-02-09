/**
 * 로그인 API
 * 실제 백엔드 URL은 .env의 VITE_API_URL 또는 아래 loginUrl로 설정하세요.
 */

const DEFAULT_LOGIN_URL = '/api/auth/login'

async function login(email, password) {
  const url = import.meta.env.VITE_LOGIN_URL || DEFAULT_LOGIN_URL

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}))
    throw new Error(errBody.message || `로그인 실패 (${res.status})`)
  }

  const data = await res.json()
  return data
}

export { login }
