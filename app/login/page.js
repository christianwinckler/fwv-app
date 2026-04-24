'use client'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'

function LoginContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const pending = sessionStorage.getItem('pwa_redirect')
    if (pending) {
      sessionStorage.removeItem('pwa_redirect')
      window.location.replace(pending)
      return
    }
  }, [])

  useEffect(() => {
    try {
      if (localStorage.getItem('fwv_dark') === '1') setDark(true)
    } catch (e) {}
  }, [])

  const handleLogin = () => {
    sessionStorage.setItem('pwa_redirect', '/home')
    signIn('google', { callbackUrl: '/home' })
  }

  const toggleDark = () => {
    const next = !dark
    setDark(next)
    try { localStorage.setItem('fwv_dark', next ? '1' : '0') } catch (e) {}
  }

  let errorMsg = null
  if (error === 'AccessDenied') {
    errorMsg = 'Tu cuenta no tiene acceso a esta aplicación.'
  } else if (error) {
    errorMsg = 'Ocurrió un error al iniciar sesión. Intenta de nuevo.'
  }

  const bg       = dark ? '#0f0f10'                : '#f5f5f7'
  const card     = dark ? '#1c1c1e'                : '#ffffff'
  const border   = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'
  const shadow   = dark
    ? '0 2px 8px rgba(0,0,0,0.4), 0 8px 32px rgba(0,0,0,0.3)'
    : '0 2px 8px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.05)'
  const text2    = dark ? '#98989f' : '#6b7280'
  const text3    = dark ? '#636366' : '#9ca3af'
  const iconBg   = dark ? '#f2f2f7' : '#111111'
  const iconFill = dark ? '#111111' : '#ffffff'

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap"
      />
      <div style={{
        fontFamily: "'DM Sans', -apple-system, sans-serif",
        background: bg,
        color: dark ? '#f2f2f7' : '#111111',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        transition: 'background 0.25s, color 0.25s',
      }}>

        {/* Dark mode toggle */}
        <button
          onClick={toggleDark}
          style={{
            position: 'fixed', top: '18px', right: '18px',
            width: '36px', height: '36px', borderRadius: '11px',
            border: `1px solid ${border}`,
            background: card,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '16px',
            transition: 'all 0.2s',
          }}
        >
          {dark ? '🌙' : '☀️'}
        </button>

        {/* Card */}
        <div style={{
          width: '100%', maxWidth: '380px',
          background: card,
          borderRadius: '18px',
          border: `1px solid ${border}`,
          boxShadow: shadow,
          padding: '36px 32px 32px',
          display: 'flex', flexDirection: 'column',
        }}>

          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '28px' }}>
            <div style={{
              width: '52px', height: '52px', borderRadius: '16px',
              background: iconBg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '14px',
            }}>
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="11" width="18" height="12" rx="2.5" fill={iconFill} opacity="0.9"/>
                <path d="M2 13L13 4L24 13" stroke={iconFill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
                <rect x="9" y="16" width="8" height="7" rx="1.5" fill={iconBg} opacity="0.25"/>
              </svg>
            </div>
            <div style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.02em' }}>FWV Apps</div>
            <div style={{ fontSize: '12px', color: text3, marginTop: '2px' }}>Finanzas personales</div>
          </div>

          {/* Error message */}
          {errorMsg && (
            <div style={{
              background: '#fee2e2', color: '#dc2626',
              borderRadius: '10px', padding: '10px 14px',
              fontSize: '13px', marginBottom: '16px',
              textAlign: 'left', lineHeight: '1.4',
            }}>
              {errorMsg}
            </div>
          )}

          {/* Google sign-in */}
          <button
            onClick={handleLogin}
            style={{
              width: '100%', padding: '12px',
              background: bg,
              color: text2,
              border: `1px solid ${border}`,
              borderRadius: '13px',
              fontFamily: 'inherit', fontSize: '14px', fontWeight: 500,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              transition: 'background 0.15s, box-shadow 0.15s',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.29-8.16 2.29-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Continuar con Google
          </button>
        </div>
      </div>
    </>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  )
}
