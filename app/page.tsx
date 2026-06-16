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
    <main style={{ background: '#fff', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>

      {/* Navigatie */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', borderBottom: '0.5px solid #ede8f5', background: '#fff' }}>
        <div style={{ fontSize: '1.1rem', fontWeight: '500', color: '#3d2d7a', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🎂 Bijnajarig
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {email ? (
            <>
              <span style={{ fontSize: '0.85rem', color: '#9b8fd4' }}>{email}</span>
              <button
                onClick={handleUitloggen}
                style={{ background: 'transparent', border: '0.5px solid #c9bee8', color: '#3d2d7a', padding: '0.35rem 0.9rem', borderRadius: '8px', fontSize: '0.85rem', cursor: 'pointer' }}
              >
                Uitloggen
              </button>
            </>
          ) : (
            <>
              <Link href="/inloggen" style={{ background: 'transparent', border: '0.5px solid #c9bee8', color: '#3d2d7a', padding: '0.35rem 0.9rem', borderRadius: '8px', fontSize: '0.85rem', textDecoration: 'none' }}>
                Inloggen
              </Link>
              <Link href="/registreren" style={{ background: '#7F77DD', color: '#fff', padding: '0.35rem 0.9rem', borderRadius: '8px', fontSize: '0.85rem', textDecoration: 'none' }}>
                Maak een lijstje
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: '680px', margin: '0 auto', padding: '3.5rem 2rem 2.5rem' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9b8fd4', marginBottom: '1.25rem' }}>
          Gratis · Simpel · Deelbaar
        </p>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.6rem)', fontWeight: '500', lineHeight: '1.15', color: '#1a1230', marginBottom: '1rem' }}>
          Jouw verlanglijstje,{' '}
          <span style={{ color: '#7F77DD' }}>klaar voor je verjaardag</span>
        </h1>
        <p style={{ fontSize: '1rem', color: '#6b6080', lineHeight: '1.7', marginBottom: '2rem', maxWidth: '460px' }}>
          Zet alles op je lijstje wat je graag wil. Deel het met vrienden en familie. Zij zien wat er nog te pakken is — jij wordt gewoon verrast.
        </p>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {email ? (
            <Link href="/lijstjes" style={{ background: '#7F77DD', color: '#fff', padding: '0.75rem 1.75rem', borderRadius: '8px', fontSize: '0.95rem', textDecoration: 'none' }}>
              Naar mijn lijstjes →
            </Link>
          ) : (
            <>
              <Link href="/registreren" style={{ background: '#7F77DD', color: '#fff', padding: '0.75rem 1.75rem', borderRadius: '8px', fontSize: '0.95rem', textDecoration: 'none' }}>
                Maak jouw lijstje →
              </Link>
              <Link href="/inloggen" style={{ background: '#f5f2ff', color: '#534AB7', padding: '0.75rem 1.75rem', borderRadius: '8px', fontSize: '0.95rem', textDecoration: 'none', border: '0.5px solid #c9bee8' }}>
                Inloggen
              </Link>
            </>
          )}
        </div>

        {/* Voorbeeld lijstje */}
        <div style={{ background: '#f9f7ff', borderRadius: '12px', padding: '1.25rem', border: '0.5px solid #ede8f5' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: '500', color: '#1a1230' }}>🎁 Verjaardag Lisa — 14 april</span>
            <span style={{ fontSize: '0.7rem', background: '#EEEDFE', color: '#534AB7', padding: '3px 10px', borderRadius: '99px' }}>3 van 5 over</span>
          </div>
          {[
            { naam: 'Draadloze koptelefoon', prijs: '€89', gedaan: true },
            { naam: 'Atomic Habits', prijs: '€18', gedaan: false },
            { naam: 'Kamerplant naar keuze', prijs: '€25', gedaan: true },
            { naam: 'Trui maat M, liefst groen', prijs: '€45', gedaan: false },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0.65rem 0', borderBottom: i < 3 ? '0.5px solid #ede8f5' : 'none' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#EEEDFE', flexShrink: 0 }} />
              <span style={{ fontSize: '0.85rem', color: '#1a1230', flex: 1 }}>{item.naam}</span>
              <span style={{ fontSize: '0.8rem', color: '#9b8fd4' }}>{item.prijs}</span>
              <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: item.gedaan ? '#7F77DD' : '#fff', border: item.gedaan ? 'none' : '0.5px solid #c9bee8', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {item.gedaan && <span style={{ color: '#fff', fontSize: '10px' }}>✓</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Zo werkt het */}
      <div style={{ height: '0.5px', background: '#ede8f5', maxWidth: '680px', margin: '0 auto' }} />
      <section style={{ maxWidth: '680px', margin: '0 auto', padding: '2.5rem 2rem' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9b8fd4', marginBottom: '1.5rem' }}>
          Zo werkt het
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
          {[
            { num: '1', titel: 'Maak een lijstje', omschrijving: 'Voeg items toe met naam, prijs en een link.' },
            { num: '2', titel: 'Deel de link', omschrijving: 'Stuur je lijstje naar familie en vrienden.' },
            { num: '3', titel: 'Word verrast', omschrijving: 'Zij vinken af wat ze kopen — jij ziet het niet.' },
          ].map((stap, i) => (
            <div key={i} style={{ background: '#f9f7ff', borderRadius: '12px', padding: '1.25rem', border: '0.5px solid #ede8f5' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: '500', color: '#c9bee8', marginBottom: '0.5rem' }}>{stap.num}</div>
              <div style={{ fontSize: '0.85rem', fontWeight: '500', color: '#1a1230', marginBottom: '0.3rem' }}>{stap.titel}</div>
              <div style={{ fontSize: '0.8rem', color: '#6b6080', lineHeight: '1.5' }}>{stap.omschrijving}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Onderkant */}
      <section style={{ maxWidth: '680px', margin: '0 auto', padding: '1.5rem 2rem', background: '#f9f7ff', borderTop: '0.5px solid #ede8f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <p style={{ fontSize: '0.9rem', color: '#1a1230' }}>
          Al <span style={{ color: '#7F77DD', fontWeight: '500' }}>1.243 lijstjes</span> aangemaakt deze maand
        </p>
        <Link href="/registreren" style={{ background: '#7F77DD', color: '#fff', padding: '0.5rem 1.25rem', borderRadius: '8px', fontSize: '0.85rem', textDecoration: 'none' }}>
          Begin nu gratis →
        </Link>
      </section>

    </main>
  )
}