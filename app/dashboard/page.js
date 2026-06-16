'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Dashboard() {
  const [gebruiker, setGebruiker] = useState(null)
  const [lijstjes, setLijstjes] = useState([])
  const [laden, setLaden] = useState(true)
  const [toonFormulier, setToonFormulier] = useState(false)
  const [naam, setNaam] = useState('')
  const [leeftijd, setLeeftijd] = useState('')
  const [type, setType] = useState('')
  const [fout, setFout] = useState(null)
  const [opslaan, setOpslaan] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function laadData() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/inloggen'); return }
      setGebruiker(user)

      const { data } = await supabase
        .from('lijstjes')
        .select('*')
        .order('aangemaakt_op', { ascending: false })
      setLijstjes(data || [])
      setLaden(false)
    }
    laadData()
  }, [])

  async function handleUitloggen() {
    await supabase.auth.signOut()
    router.push('/')
  }

  async function handleNieuwLijstje(e) {
    e.preventDefault()
    if (!type) { setFout('Kies een type persoon.'); return }
    setFout(null)
    setOpslaan(true)

    const { data, error } = await supabase
      .from('lijstjes')
      .insert([{ naam, leeftijd: parseInt(leeftijd), type, user_id: gebruiker.id }])
      .select()

    setOpslaan(false)

    if (error) {
      setFout('Er ging iets mis. Probeer het opnieuw.')
    } else {
      setLijstjes([data[0], ...lijstjes])
      setNaam('')
      setLeeftijd('')
      setType('')
      setToonFormulier(false)
    }
  }

  async function handleVerwijder(id) {
    await supabase.from('lijstjes').delete().eq('id', id)
    setLijstjes(lijstjes.filter(l => l.id !== id))
  }

  const typeConfig = {
    jongetje: { emoji: '👦', label: 'Jongetje' },
    meisje:   { emoji: '👧', label: 'Meisje' },
    man:      { emoji: '👨', label: 'Man' },
    vrouw:    { emoji: '👩', label: 'Vrouw' },
  }

  const voornaam = gebruiker?.email?.split('@')[0] ?? 'daar'
  const uur = new Date().getHours()
  const begroeting = uur < 12 ? 'Goedemorgen' : uur < 18 ? 'Goedemiddag' : 'Goedenavond'

  if (laden) {
    return (
      <div style={{ minHeight: '100vh', background: '#F4F2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Poppins', system-ui, sans-serif" }}>
        <p style={{ color: '#6B6490', fontSize: '0.9rem' }}>Laden...</p>
      </div>
    )
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Poppins', system-ui, sans-serif; background: #F4F2FF; }

        .bj-lijstje-kaart { background: #fff; border-radius: 16px; padding: 1rem 1.25rem; border: 1px solid #DDD8F5; margin-bottom: 10px; display: flex; align-items: center; gap: 1rem; transition: border-color 0.15s; }
        .bj-lijstje-kaart:hover { border-color: #AFA9EC; }

        .bj-btn-bewerk { background: #F4F2FF; color: #2D2060; border: 1px solid #DDD8F5; padding: 0.35rem 0.85rem; border-radius: 99px; font-size: 0.75rem; font-weight: 500; cursor: pointer; font-family: inherit; transition: background 0.15s; }
        .bj-btn-bewerk:hover { background: #EEEDFE; }

        .bj-btn-deel { background: #2D2060; color: #fff; border: none; padding: 0.35rem 0.85rem; border-radius: 99px; font-size: 0.75rem; font-weight: 500; cursor: pointer; font-family: inherit; transition: background 0.15s; }
        .bj-btn-deel:hover { background: #3d2d7a; }

        .bj-btn-verwijder { background: transparent; color: #BDB8D8; border: none; padding: 0.35rem 0.5rem; border-radius: 99px; font-size: 0.75rem; cursor: pointer; font-family: inherit; transition: color 0.15s; }
        .bj-btn-verwijder:hover { color: #A32D2D; }

        .bj-gender-opt { background: #F4F2FF; border: 1.5px solid #E8E4F8; border-radius: 12px; padding: 0.75rem 0.5rem; text-align: center; cursor: pointer; font-family: inherit; transition: all 0.15s; }
        .bj-gender-opt:hover { background: #EEEDFE; border-color: #AFA9EC; }
        .bj-gender-opt.actief { background: #EEEDFE; border-color: #7F77DD; }

        .bj-field input, .bj-field select {
          width: 100%;
          background: #F4F2FF;
          border: 1.5px solid #E8E4F8;
          border-radius: 12px;
          padding: 0.7rem 1rem;
          font-size: 0.88rem;
          font-family: 'Poppins', system-ui, sans-serif;
          color: #2D2060;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .bj-field input::placeholder { color: #BDB8D8; }
        .bj-field input:focus, .bj-field select:focus { border-color: #7F77DD; box-shadow: 0 0 0 3px rgba(127,119,221,0.12); }

        .bj-btn-submit { background: #E8A020; color: #fff; border: none; padding: 0.75rem 1.75rem; border-radius: 99px; font-size: 0.9rem; font-weight: 600; cursor: pointer; font-family: inherit; transition: background 0.15s; }
        .bj-btn-submit:hover { background: #d4911c; }
        .bj-btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }

        .bj-btn-annuleer { background: #F4F2FF; color: #6B6490; border: 1px solid #DDD8F5; padding: 0.75rem 1.5rem; border-radius: 99px; font-size: 0.9rem; font-weight: 600; cursor: pointer; font-family: inherit; }
        .bj-btn-annuleer:hover { background: #EEEDFE; }
      `}</style>

      {/* NAVIGATIE */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', background: '#2D2060', fontFamily: "'Poppins', system-ui, sans-serif" }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '1rem', fontWeight: 700, color: '#fff', textDecoration: 'none' }}>
          <div style={{ width: 30, height: 30, background: 'rgba(255,255,255,0.15)', borderRadius: 99, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>🎂</div>
          Bijnajarig
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)' }}>{gebruiker?.email}</span>
          <button onClick={handleUitloggen} style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: 'none', padding: '0.35rem 0.9rem', borderRadius: 99, fontSize: '0.78rem', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
            Uitloggen
          </button>
        </div>
      </nav>

      {/* PAGINA */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '2.5rem 2rem', fontFamily: "'Poppins', system-ui, sans-serif" }}>

        {/* WELKOM */}
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#E8A020', marginBottom: '0.4rem' }}>Jouw overzicht</p>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#2D2060' }}>{begroeting}, {voornaam} 👋</h1>
        </div>

        {/* STATISTIEKEN */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: '2rem' }}>
          {[
            { num: lijstjes.length, label: 'Actieve lijstjes' },
            { num: lijstjes.length * 0, label: 'Items in totaal' },
            { num: 0, label: 'Al afgepikt' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 16, padding: '1.1rem 1.25rem', border: '1px solid #DDD8F5' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#2D2060', marginBottom: '0.15rem' }}>{s.num}</div>
              <div style={{ fontSize: '0.75rem', color: '#6B6490' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* MIJN LIJSTJES */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#2D2060' }}>Mijn lijstjes</h2>
          <button
            onClick={() => setToonFormulier(true)}
            style={{ background: '#E8A020', color: '#fff', border: 'none', padding: '0.5rem 1.1rem', borderRadius: 99, fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}
          >
            + Nieuw lijstje
          </button>
        </div>

        {lijstjes.length === 0 && !toonFormulier ? (
          <div style={{ background: '#fff', borderRadius: 16, padding: '2.5rem', border: '1.5px dashed #DDD8F5', textAlign: 'center', marginBottom: 10 }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🎁</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#2D2060', marginBottom: '0.4rem' }}>Nog geen lijstjes</div>
            <p style={{ fontSize: '0.8rem', color: '#9B90C4', marginBottom: '1.25rem', lineHeight: 1.6 }}>
              Maak je eerste verlanglijstje aan en deel het met vrienden en familie.
            </p>
            <button
              onClick={() => setToonFormulier(true)}
              style={{ background: '#E8A020', color: '#fff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: 99, fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Maak je eerste lijstje
            </button>
          </div>
        ) : (
          lijstjes.map((lijstje) => {
            const cfg = typeConfig[lijstje.type] || { emoji: '🎂', label: lijstje.type }
            return (
              <div key={lijstje.id} className="bj-lijstje-kaart">
                <div style={{ width: 42, height: 42, borderRadius: '50%', background: '#EEEDFE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
                  {cfg.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#2D2060', marginBottom: 2 }}>
                    {lijstje.naam} wordt {lijstje.leeftijd}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#9B90C4' }}>{cfg.label} · 0 items</div>
                </div>
                <span style={{ fontSize: '0.68rem', fontWeight: 600, background: '#FFF4DC', color: '#B87A10', padding: '3px 10px', borderRadius: 99 }}>
                  0 over
                </span>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <Link href={`/lijstje/${lijstje.id}`} className="bj-btn-bewerk" style={{ textDecoration: 'none' }}>Bewerken</Link>
                  <button className="bj-btn-deel" onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/lijstje/${lijstje.id}`); alert('Link gekopieerd!') }}>Delen</button>
                  <button className="bj-btn-verwijder" onClick={() => handleVerwijder(lijstje.id)} title="Verwijderen">✕</button>
                </div>
              </div>
            )
          })
        )}

        {/* NIEUW LIJSTJE FORMULIER */}
        {toonFormulier && (
          <div style={{ background: 'rgba(30,15,70,0.08)', borderRadius: 20, padding: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{ background: '#fff', borderRadius: 20, padding: '2rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#2D2060', marginBottom: '0.3rem' }}>Nieuw verlanglijstje</h3>
              <p style={{ fontSize: '0.82rem', color: '#6B6490', marginBottom: '1.75rem' }}>
                Vertel ons iets over de jarige — dan kunnen we het lijstje goed instellen.
              </p>

              <form onSubmit={handleNieuwLijstje}>

                {/* Voor wie */}
                <div className="bj-field" style={{ marginBottom: '1.1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#6B6490', marginBottom: '0.35rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                    Voor wie is het lijstje?
                  </label>
                  <input
                    type="text"
                    placeholder="Bijv. Tim, Emma, Papa..."
                    value={naam}
                    onChange={(e) => setNaam(e.target.value)}
                    required
                  />
                </div>

                {/* Leeftijd */}
                <div className="bj-field" style={{ marginBottom: '1.1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#6B6490', marginBottom: '0.35rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                    Hoe oud wordt de persoon?
                  </label>
                  <input
                    type="number"
                    placeholder="Bijv. 8"
                    min="1"
                    max="120"
                    value={leeftijd}
                    onChange={(e) => setLeeftijd(e.target.value)}
                    required
                  />
                </div>

                {/* Type */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#6B6490', marginBottom: '0.5rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                    Gaat het om een...
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                    {[
                      { waarde: 'jongetje', emoji: '👦', label: 'Jongetje' },
                      { waarde: 'meisje',   emoji: '👧', label: 'Meisje' },
                      { waarde: 'man',      emoji: '👨', label: 'Man' },
                      { waarde: 'vrouw',    emoji: '👩', label: 'Vrouw' },
                    ].map((opt) => (
                      <button
                        key={opt.waarde}
                        type="button"
                        className={`bj-gender-opt${type === opt.waarde ? ' actief' : ''}`}
                        onClick={() => setType(opt.waarde)}
                      >
                        <span style={{ fontSize: '1.3rem', display: 'block', marginBottom: 4 }}>{opt.emoji}</span>
                        <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#2D2060' }}>{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {fout && (
                  <p style={{ fontSize: '0.82rem', color: '#A32D2D', background: '#FCEBEB', border: '1px solid #F09595', borderRadius: 10, padding: '0.6rem 0.9rem', marginBottom: '1rem' }}>
                    {fout}
                  </p>
                )}

                <div style={{ display: 'flex', gap: 10 }}>
                  <button type="button" className="bj-btn-annuleer" onClick={() => { setToonFormulier(false); setFout(null) }}>
                    Annuleren
                  </button>
                  <button type="submit" className="bj-btn-submit" disabled={opslaan}>
                    {opslaan ? 'Opslaan...' : 'Lijstje aanmaken →'}
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

      </div>
    </>
  )
}