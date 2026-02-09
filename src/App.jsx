import { useState } from 'react'
import { login } from './api/auth'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = await login(email, password)
      setUser(data)
    } catch (err) {
      setError(err.message || '로그인에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setUser(null)
    setEmail('')
    setPassword('')
    setError('')
  }

  if (user) {
    return (
      <div className="card welcome">
        <h1>로그인 성공</h1>
        <p className="welcome-message">
          {user.user?.name || user.name || user.email || email}님, 환영합니다.
        </p>
        <button type="button" className="btn btn-secondary" onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    )
  }

  return (
    <div className="card login-card">
      <h1>로그인</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="user@example.com"
          required
          autoComplete="email"
          disabled={loading}
        />
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          autoComplete="current-password"
          disabled={loading}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? '로그인 중...' : '로그인'}
        </button>
      </form>
    </div>
  )
}

export default App
