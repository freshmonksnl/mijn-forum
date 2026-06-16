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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        body { font-family: 'Poppins', system-ui, sans-serif; background: #F4F2FF; margin: 0; }
        * { box-sizing: border-box; }

        .bj-nav-link { font-size: 0.83rem; font-weight: 500; color: rgba(255,255,255,0.85); text-decoration: none; padding: 0.4rem 0.75rem; border-radius: 99px; transition: background 0.15s; }
        .bj-nav-link:hover { background: rgba(255,255,255,0.12); }
        .bj-footer-link { display: block; font-size: 0.8rem; color: #9B90C4; text-decoration: none; margin-bottom: 0.5rem; transition: color 0.15s; }
        .bj-footer-link:hover { color: #fff; }
        .bj-footer-bottom-link { font-size: 0.75rem; color: #9B90C4; text-decoration: none; }
        .bj-footer-bottom-link:hover { color: #fff; }
        .bj-faq-item { border-bottom: 1px solid #DDD8F5; padding: 1.1rem 0; }
        .bj-step { background: #F4F2FF; border-radius: 16px; padding: 1.4rem; border: 1px solid #DDD8F5; }
        .bj-stat { background: #fff; border-radius: 16px; padding: 1.4rem; border: 1px solid #DDD8F5; text-align: center; }
        .bj-hc-item { display: flex; align-items: center; gap: 8px; padding: 0.45rem 0; border-bottom: 1px solid #F4F2FF; }
        .bj-hc-item:last-child { border-bottom: none; }
      `}</style>

      {/* NAVIGATIE */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1rem 2.5rem', background: 'rgba(0,0,0,0.25)',
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
        fontFamily: "'Poppins', system-ui, sans-serif"
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>
          <div style={{ width: 32, height: 32, background: 'rgba(255,255,255,0.2)', borderRadius: 99, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>
            🎂
          </div>
          Bijnajarig
        </div>

        <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <a className="bj-nav-link" href="#">Hoe het werkt</a>
          <a className="bj-nav-link" href="#">Voorbeelden</a>
          <a className="bj-nav-link" href="#">Prijzen</a>
          <a className="bj-nav-link" href="#">Blog</a>
          <a className="bj-nav-link" href="#">Over ons</a>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {email ? (
            <>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.75)' }}>{email}</span>
              <button onClick={handleUitloggen} style={{ background: '#fff', color: '#2D2060', border: 'none', padding: '0.45rem 1.1rem', borderRadius: 99, fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                Uitloggen
              </button>
            </>
          ) : (
            <>
              <Link href="/inloggen" style={{ background: '#fff', color: '#2D2060', border: 'none', padding: '0.45rem 1.1rem', borderRadius: 99, fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>
                Inloggen
              </Link>
              <Link href="/registreren" style={{ background: '#E8A020', color: '#fff', border: 'none', padding: '0.45rem 1.1rem', borderRadius: 99, fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>
                Maak een lijstje
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* HERO MET FOTO */}
      <div style={{ position: 'relative', overflow: 'hidden', fontFamily: "'Poppins', system-ui, sans-serif" }}>
        <img
          src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1400&q=80"
          alt="Blij kind op verjaardag"
          style={{ width: '100%', height: 420, objectFit: 'cover', objectPosition: 'center 20%', display: 'block', filter: 'brightness(0.55)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(30,15,70,0.45) 0%, rgba(30,15,70,0.72) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 2.5rem' }}>
          <div style={{ maxWidth: 780, margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', gap: '2rem' }}>

            {/* Tekst */}
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#E8A020', marginBottom: '1rem' }}>
                Gratis · Simpel · Deelbaar
              </p>
              <h1 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.7rem)', fontWeight: 700, lineHeight: 1.15, color: '#fff', marginBottom: '1rem' }}>
                Jouw verjaardag,{' '}
                <span style={{ color: '#E8A020' }}>jouw cadeau's</span>
              </h1>
              <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.75, marginBottom: '1.25rem', maxWidth: 380 }}>
                Maak een verlanglijstje en deel het met wie jij wil. Zij zien wat er nog te pakken is — jij wordt gewoon verrast.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link href="/registreren" style={{ background: '#E8A020', color: '#fff', border: 'none', padding: '0.75rem 1.75rem', borderRadius: 99, fontSize: '0.95rem', fontWeight: 600, textDecoration: 'none' }}>
                  Maak jouw lijstje →
                </Link>
                <button style={{ background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.5)', padding: '0.75rem 1.5rem', borderRadius: 99, fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                  Bekijk voorbeeld
                </button>
              </div>
            </div>

            {/* Voorbeeld kaart */}
            <div style={{ flexShrink: 0, width: 215, background: '#fff', borderRadius: 20, padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#2D2060' }}>🎁 Lisa, 14 april</span>
                <span style={{ fontSize: '0.62rem', fontWeight: 600, background: '#FFF4DC', color: '#B87A10', padding: '2px 8px', borderRadius: 99 }}>3 over</span>
              </div>
              {[
                { icon: '🎧', naam: 'Koptelefoon', prijs: '€89', gedaan: true },
                { icon: '📚', naam: 'Atomic Habits', prijs: '€18', gedaan: false },
                { icon: '🌿', naam: 'Kamerplant', prijs: '€25', gedaan: true },
                { icon: '👕', naam: 'Trui maat M', prijs: '€45', gedaan: false },
              ].map((item, i) => (
                <div key={i} className="bj-hc-item">
                  <div style={{ width: 26, height: 26, borderRadius: 8, background: '#F4F2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 12 }}>
                    {item.icon}
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#2D2060', flex: 1, fontWeight: 500 }}>{item.naam}</span>
                  <span style={{ fontSize: '0.68rem', color: '#6B6490' }}>{item.prijs}</span>
                  <div style={{ width: 16, height: 16, borderRadius: '50%', background: item.gedaan ? '#2D2060' : '#fff', border: item.gedaan ? 'none' : '1.5px solid #DDD8F5', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.gedaan && <span style={{ color: '#fff', fontSize: 9 }}>✓</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* GOLF OVERGANG */}
      <svg viewBox="0 0 800 50" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 50, background: '#F4F2FF' }}>
        <path d="M0 50 L800 50 L800 10 C600 50 200 0 0 30 Z" fill="#fff" />
      </svg>

      {/* ZO WERKT HET */}
      <section style={{ background: '#fff', padding: '2.5rem 2rem', fontFamily: "'Poppins', system-ui, sans-serif" }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#E8A020', marginBottom: '0.6rem' }}>Zo werkt het</p>
          <p style={{ fontSize: '1.3rem', fontWeight: 700, color: '#2D2060', marginBottom: '1.25rem' }}>In drie stappen klaar</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 16 }}>
            {[
              { num: '1', titel: 'Maak een lijstje', desc: 'Voeg items toe met naam, prijs en een link naar de webshop.' },
              { num: '2', titel: 'Deel de link', desc: 'Stuur je lijstje naar vrienden en familie via een simpele link.' },
              { num: '3', titel: 'Word verrast', desc: 'Zij vinken af wat ze kopen — jij ziet het pas als je het cadeau krijgt.' },
            ].map((stap, i) => (
              <div key={i} className="bj-step">
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#2D2060', color: '#fff', fontSize: '0.82rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.6rem' }}>
                  {stap.num}
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#2D2060', marginBottom: '0.35rem' }}>{stap.titel}</div>
                <div style={{ fontSize: '0.8rem', color: '#6B6490', lineHeight: 1.6 }}>{stap.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GOLF OVERGANG */}
      <svg viewBox="0 0 800 50" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 50, background: '#fff' }}>
        <path d="M0 50 L800 50 L800 20 C600 0 200 50 0 10 Z" fill="#F4F2FF" />
      </svg>

      {/* STATISTIEKEN */}
      <section style={{ background: '#F4F2FF', padding: '2.5rem 2rem', fontFamily: "'Poppins', system-ui, sans-serif" }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#E8A020', marginBottom: '0.6rem' }}>In goede handen</p>
          <p style={{ fontSize: '1.3rem', fontWeight: 700, color: '#2D2060', marginBottom: '1.25rem' }}>Al veel Nederlanders gingen je voor</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16 }}>
            {[
              { num: '12.400', label: 'Lijstjes aangemaakt' },
              { num: '98%', label: 'Tevreden gebruikers' },
              { num: 'Gratis', label: 'Altijd en voor iedereen' },
            ].map((stat, i) => (
              <div key={i} className="bj-stat">
                <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#2D2060', marginBottom: '0.2rem' }}>{stat.num}</div>
                <div style={{ fontSize: '0.78rem', color: '#6B6490' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GOLF OVERGANG */}
      <svg viewBox="0 0 800 50" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 50, background: '#F4F2FF' }}>
        <path d="M0 50 L800 50 L800 20 C500 50 300 0 0 30 Z" fill="#fff" />
      </svg>

      {/* VEELGESTELDE VRAGEN */}
      <section style={{ background: '#fff', padding: '2.5rem 2rem', fontFamily: "'Poppins', system-ui, sans-serif" }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#E8A020', marginBottom: '0.6rem' }}>Veelgestelde vragen</p>
          <p style={{ fontSize: '1.3rem', fontWeight: 700, color: '#2D2060', marginBottom: '1.25rem' }}>Alles wat je wil weten</p>
          {[
            { v: 'Is Bijnajarig gratis?', a: 'Ja, volledig gratis. Je hebt alleen een account nodig om een lijstje aan te maken.' },
            { v: 'Zie ik wie wat heeft gekocht?', a: 'Nee — dat is juist de verrassing. Je ziet pas wat je krijgt als je het cadeau uitpakt.' },
            { v: 'Kunnen mensen items toevoegen aan mijn lijstje?', a: 'Nee, alleen jij beheert je eigen lijstje. Anderen kunnen alleen items afvinken.' },
            { v: 'Kan ik meerdere lijstjes aanmaken?', a: 'Ja, je kunt zoveel lijstjes aanmaken als je wil — voor elke gelegenheid een apart lijstje.' },
          ].map((faq, i) => (
            <div key={i} className="bj-faq-item">
              <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#2D2060', marginBottom: '0.4rem' }}>{faq.v}</div>
              <div style={{ fontSize: '0.83rem', color: '#6B6490', lineHeight: 1.65 }}>{faq.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#2D2060', padding: '2rem 2rem 1.5rem', fontFamily: "'Poppins', system-ui, sans-serif" }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>

            {/* Kolom 1: Logo + tagline */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
                <div style={{ width: 28, height: 28, background: 'rgba(255,255,255,0.15)', borderRadius: 99, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>🎂</div>
                Bijnajarig
              </div>
              <p style={{ fontSize: '0.78rem', color: '#9B90C4', lineHeight: 1.6 }}>
                Gratis verlanglijstjes voor elke verjaardag. Simpel, deelbaar en altijd een verrassing.
              </p>
            </div>

            {/* Kolom 2: Platform */}
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', marginBottom: '1rem' }}>Platform</div>
              <a className="bj-footer-link" href="#">Hoe het werkt</a>
              <a className="bj-footer-link" href="#">Maak een lijstje</a>
              <a className="bj-footer-link" href="#">Voorbeelden</a>
              <a className="bj-footer-link" href="#">Prijzen</a>
            </div>

            {/* Kolom 3: Bedrijf */}
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', marginBottom: '1rem' }}>Bedrijf</div>
              <a className="bj-footer-link" href="#">Over ons</a>
              <a className="bj-footer-link" href="#">Blog</a>
              <a className="bj-footer-link" href="#">Pers</a>
              <a className="bj-footer-link" href="#">Contact</a>
            </div>

            {/* Kolom 4: Support */}
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', marginBottom: '1rem' }}>Support</div>
              <a className="bj-footer-link" href="#">Veelgestelde vragen</a>
              <a className="bj-footer-link" href="#">Helpcentrum</a>
              <a className="bj-footer-link" href="#">Privacy</a>
              <a className="bj-footer-link" href="#">Voorwaarden</a>
            </div>

          </div>

          {/* Footer bottom */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#9B90C4' }}>© 2026 Bijnajarig · Gemaakt met liefde in Nederland</span>
            <div style={{ display: 'flex', gap: '1.25rem' }}>
              <a className="bj-footer-bottom-link" href="#">Privacy</a>
              <a className="bj-footer-bottom-link" href="#">Cookies</a>
              <a className="bj-footer-bottom-link" href="#">Voorwaarden</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}