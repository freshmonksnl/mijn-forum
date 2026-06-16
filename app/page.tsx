'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [email, setEmail] = useState('')
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    async function haalGebruikerOp() {
      const { data } = await supabase.auth.getUser()
      if (data.user) {
        setEmail(data.user.email ?? '')
      }
    }
    haalGebruikerOp()
  }, [])

  async function handleUitloggen() {
    await supabase.auth.signOut()
    setEmail('')
    router.refresh()
  }

  return (
    <main style={{ background: '#0f0f0f', minHeight: '100vh', color: '#f0ede8', fontFamily: 'Georgia, serif' }}>

      {/* Navigatie */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 2.5rem', borderBottom: '1px solid #1e1e1e' }}>
        <span style={{ fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '0.05em', color: '#f0ede8' }}>
          🔥 Forum
        </span>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {email ? (
            <>
              <span style={{ fontSize: '0.85rem', color: '#888' }}>{email}</span>
              <button
                onClick={handleUitloggen}
                style={{ background: 'transparent', border: '1px solid #444', color: '#f0ede8', padding: '0.4rem 1rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                Uitloggen
              </button>
            </>
          ) : (
            <>
              <Link href="/inloggen" style={{ color: '#f0ede8', textDecoration: 'none', fontSize: '0.9rem' }}>Inloggen</Link>
              <Link href="/registreren" style={{ background: '#e07b2a', color: '#fff', padding: '0.4rem 1.1rem', borderRadius: '4px', textDecoration: 'none', fontSize: '0.9rem' }}>
                Registreren
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: '720px', margin: '0 auto', padding: '6rem 2rem 4rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#e07b2a', marginBottom: '1.5rem' }}>
          Gemeenschap · Gesprek · Ideeën
        </p>
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 'bold', lineHeight: 1.1, marginBottom: '1.5rem', color: '#f0ede8' }}>
          Waar goede<br />
          <span style={{ color: '#e07b2a' }}>gesprekken</span><br />
          beginnen
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#999', lineHeight: 1.7, marginBottom: '2.5rem', fontFamily: 'system-ui, sans-serif' }}>
          Stel vragen, deel ideeën en praat mee over onderwerpen die jou bezighouden. Altijd respectvol, altijd open.
        </p>

        {email ? (
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/forum" style={{ background: '#e07b2a', color: '#fff', padding: '0.85rem 2rem', borderRadius: '6px', textDecoration: 'none', fontSize: '1rem', fontFamily: 'system-ui, sans-serif' }}>
              Naar het forum →
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/registreren" style={{ background: '#e07b2a', color: '#fff', padding: '0.85rem 2rem', borderRadius: '6px', textDecoration: 'none', fontSize: '1rem', fontFamily: 'system-ui, sans-serif' }}>
              Begin mee te praten →
            </Link>
            <Link href="/inloggen" style={{ background: 'transparent', color: '#f0ede8', padding: '0.85rem 2rem', borderRadius: '6px', textDecoration: 'none', fontSize: '1rem', border: '1px solid #333', fontFamily: 'system-ui, sans-serif' }}>
              Inloggen
            </Link>
          </div>
        )}
      </section>

      {/* Voorbeeldberichten */}
      <section style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 2rem 6rem' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#555', marginBottom: '1.5rem', fontFamily: 'system-ui, sans-serif' }}>
          Recente gesprekken
        </p>
        {[
          { naam: 'Sara', tijd: '2 min geleden', bericht: 'Wat zijn goede tips om te beginnen met programmeren in 2025?', reacties: 12 },
          { naam: 'Thomas', tijd: '18 min geleden', bericht: 'Heeft iemand ervaring met Next.js en Supabase combineren?', reacties: 7 },
          { naam: 'Lena', tijd: '1 uur geleden', bericht: 'Ik zoek een goede podcast over technologie en maatschappij.', reacties: 23 },
        ].map((post, i) => (
          <div key={i} style={{ borderTop: '1px solid #1e1e1e', padding: '1.25rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#e07b2a22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: '#e07b2a', fontFamily: 'system-ui' }}>
                  {post.naam[0]}
                </div>
                <span style={{ fontSize: '0.8rem', color: '#666', fontFamily: 'system-ui, sans-serif' }}>{post.naam} · {post.tijd}</span>
              </div>
              <p style={{ fontSize: '0.95rem', color: '#ccc', lineHeight: 1.5, fontFamily: 'system-ui, sans-serif' }}>{post.bericht}</p>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#555', whiteSpace: 'nowrap', fontFamily: 'system-ui, sans-serif', marginTop: '0.25rem' }}>
              💬 {post.reacties}
            </span>
          </div>
        ))}
      </section>

    </main>
  )
}