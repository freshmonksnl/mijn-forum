'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Inloggen() {
  const [email, setEmail] = useState('')
  const [wachtwoord, setWachtwoord] = useState('')
  const [fout, setFout] = useState(null)
  const [laden, setLaden] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleInloggen(e) {
    e.preventDefault()
    setFout(null)
    setLaden(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: wachtwoord,
    })

    setLaden(false)

    if (error) {
      setFout('E-mailadres of wachtwoord klopt niet. Probeer het opnieuw.')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Poppins', system-ui, sans-serif; background: #F4F2FF; }

        .bj-nav-back { font-size: 0.82rem; color: rgba(255,255,255,0.7); text-decoration: none; display: flex; align-items: center; gap: 6px; transition: color 0.15s; }
        .bj-nav-back:hover { color: #fff; }

        .bj-field input {
          width: 100%;
          background: #fff;
          border: 1.5px solid #E8E4F8;
          border-radius: 12px;
          padding: 0.75rem 1rem 0.75rem 2.75rem;
          font-size: 0.88rem;
          font-family: 'Poppins', system-ui, sans-serif;
          color: #2D2060;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .bj-field input::placeholder { color: #BDB8D8; }
        .bj-field input:focus { border-color: #7F77DD; box-shadow: 0 0 0 3px rgba(127,119,221,0.12); }

        .bj-btn-submit { width: 100%; background: #E8A020; color: #fff; border: none; padding: 0.85rem; border-radius: 99px; font-size: 0.95rem; font-weight: 600; cursor: pointer; font-family: 'Poppins', system-ui, sans-serif; letter-spacing: 0.01em; transition: background 0.15s; }
        .bj-btn-submit:hover { background: #d4911c; }
        .bj-btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }

        .bj-btn-google { width: 100%; background: #fff; color: #2D2060; border: 1.5px solid #E8E4F8; padding: 0.75rem; border-radius: 99px; font-size: 0.88rem; font-weight: 600; cursor: pointer; font-family: 'Poppins', system-ui, sans-serif; display: flex; align-items: center; justify-content: center; gap: 8px; transition: border-color 0.15s; }
        .bj-btn-google:hover { border-color: #7F77DD; }

        .bj-feature { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 1rem; }
        .bj-feature-dot { width: 28px; height: 28px; border-radius: 50%; background: rgba(232,160,32,0.2); display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
      `}</style>

      {/* NAVIGATIE */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1rem 2rem', background: '#2D2060',
        fontFamily: "'Poppins', system-ui, sans-serif"
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '1rem', fontWeight: 700, color: '#fff', textDecoration: 'none' }}>
          <div style={{ width: 30, height: 30, background: 'rgba(255,255,255,0.15)', borderRadius: 99, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>
            🎂
          </div>
          Bijnajarig
        </Link>
        <Link href="/" className="bj-nav-back">
          ← Terug naar home
        </Link>
      </nav>

      {/* TWEE KOLOMMEN */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'calc(100vh - 56px)', fontFamily: "'Poppins', system-ui, sans-serif" }}>

        {/* LINKERKANT — paars */}
        <div style={{ background: '#2D2060', padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#E8A020', marginBottom: '1rem' }}>
            Welkom terug
          </p>
          <h2 style={{ fontSize: '1.9rem', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '1rem' }}>
            Fijn dat je er<br />
            <span style={{ color: '#E8A020' }}>weer bent</span>
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: '2rem' }}>
            Log in en beheer al je verlanglijstjes op één plek.
          </p>

          {[
            { titel: 'Jouw lijstjes', desc: 'Bekijk en bewerk al je verlanglijstjes.' },
            { titel: 'Altijd up-to-date', desc: 'Zie in real-time wat er al is afgepikt.' },
            { titel: 'Deel eenvoudig', desc: 'Stuur je lijstje met één klik naar vrienden.' },
          ].map((item, i) => (
            <div key={i} className="bj-feature">
              <div className="bj-feature-dot">
                <span style={{ fontSize: 12, color: '#E8A020' }}>✓</span>
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginBottom: 2 }}>{item.titel}</div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* RECHTERKANT — formulier */}
        <div style={{ background: '#F4F2FF', padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ maxWidth: 380, width: '100%', margin: '0 auto' }}>

            <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#2D2060', marginBottom: '0.35rem' }}>
              Inloggen
            </h1>
            <p style={{ fontSize: '0.82rem', color: '#6B6490', marginBottom: '2rem' }}>
              Nog geen account?{' '}
              <Link href="/registreren" style={{ color: '#7F77DD', textDecoration: 'none', fontWeight: 600 }}>Registreren</Link>
            </p>

            <form onSubmit={handleInloggen}>

              {/* E-mail */}
              <div className="bj-field" style={{ marginBottom: '1.1rem', position: 'relative' }}>
                <label style={{ display: 'block', fontSize: '0.73rem', fontWeight: 600, color: '#6B6490', marginBottom: '0.35rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  E-mailadres
                </label>
                <span style={{ position: 'absolute', left: '0.9rem', top: '2.4rem', color: '#BDB8D8', fontSize: 15, pointerEvents: 'none' }}>✉</span>
                <input
                  type="email"
                  placeholder="jouw@email.nl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Wachtwoord */}
              <div className="bj-field" style={{ marginBottom: '0.5rem', position: 'relative' }}>
                <label style={{ display: 'block', fontSize: '0.73rem', fontWeight: 600, color: '#6B6490', marginBottom: '0.35rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  Wachtwoord
                </label>
                <span style={{ position: 'absolute', left: '0.9rem', top: '2.4rem', color: '#BDB8D8', fontSize: 15, pointerEvents: 'none' }}>🔒</span>
                <input
                  type="password"
                  placeholder="Jouw wachtwoord"
                  value={wachtwoord}
                  onChange={(e) => setWachtwoord(e.target.value)}
                  required
                />
              </div>

              {/* Wachtwoord vergeten */}
              <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
                <Link href="/wachtwoord-vergeten" style={{ fontSize: '0.78rem', color: '#7F77DD', textDecoration: 'none', fontWeight: 500 }}>
                  Wachtwoord vergeten?
                </Link>
              </div>

              {fout && (
                <p style={{ fontSize: '0.82rem', color: '#A32D2D', background: '#FCEBEB', border: '1px solid #F09595', borderRadius: 10, padding: '0.6rem 0.9rem', marginBottom: '1rem' }}>
                  {fout}
                </p>
              )}

              <button type="submit" className="bj-btn-submit" disabled={laden}>
                {laden ? 'Inloggen...' : 'Inloggen →'}
              </button>

            </form>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1.25rem 0' }}>
              <div style={{ flex: 1, height: 1, background: '#DDD8F5' }} />
              <span style={{ fontSize: '0.73rem', color: '#9B90C4' }}>of</span>
              <div style={{ flex: 1, height: 1, background: '#DDD8F5' }} />
            </div>

            <button className="bj-btn-google">
              <span style={{ fontSize: 16 }}>G</span>
              Doorgaan met Google
            </button>

            <p style={{ fontSize: '0.72rem', color: '#9B90C4', textAlign: 'center', marginTop: '1.25rem', lineHeight: 1.6 }}>
              Nog geen account?{' '}
              <Link href="/registreren" style={{ color: '#7F77DD', textDecoration: 'none', fontWeight: 600 }}>
                Maak er gratis een aan
              </Link>.
            </p>

          </div>
        </div>

      </div>
    </>
  )
}