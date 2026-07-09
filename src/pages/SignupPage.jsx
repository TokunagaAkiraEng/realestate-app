import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export function SignupPage() {
  const { user, signUp } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [infoMessage, setInfoMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // ログイン済みの場合は物件一覧画面へ遷移する
  if (user) {
    return <Navigate to="/properties" replace />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setInfoMessage('')
    setIsSubmitting(true)

    const { error } = await signUp(email, password)

    setIsSubmitting(false)
    if (error) {
      setErrorMessage('会員登録に失敗しました：' + error.message)
      return
    }

    // メール確認が有効な場合は確認メール送信の案内を表示する
    setInfoMessage('確認メールを送信しました。メール内のリンクから登録を完了してください。')
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>会員登録</h1>

        <label htmlFor="email">メールアドレス</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">パスワード</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {infoMessage && <p className="info-message">{infoMessage}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '登録中...' : '会員登録'}
        </button>

        <p>
          既にアカウントをお持ちの方は <Link to="/login">こちらからログイン</Link>
        </p>
      </form>
    </div>
  )
}
