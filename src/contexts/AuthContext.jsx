import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

// ログイン状態をアプリ全体で共有するためのコンテキスト
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 起動時に現在のセッション（ログイン状態）を取得する
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // ログイン・ログアウトなどセッションの変化を監視する
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      },
    )

    return () => subscription.unsubscribe()
  }, [])

  const value = {
    session,
    user: session?.user ?? null,
    // メールアドレスとパスワードでログインする
    signIn: (email, password) =>
      supabase.auth.signInWithPassword({ email, password }),
    // メールアドレスとパスワードで会員登録する
    signUp: (email, password) =>
      supabase.auth.signUp({ email, password }),
    // ログアウトする
    signOut: () => supabase.auth.signOut(),
  }

  if (loading) {
    return <p>読み込み中...</p>
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
