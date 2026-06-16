'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LijstjePagina({ params: paramsPromise }) {
  const [lijstje, setLijstje] = useState(null)
  const [items, setItems] = useState([])
  const [laden, setLaden] = useState(true)
  const [gebruiker, setGebruiker] = useState(null)
  const [naam, setNaam] = useState('')
  const [link, setLink] = useState('')
  const [opslaan, setOpslaan] = useState(false)
  const [fout, setFout] = useState(null)
  const [toonFormulier, setToonFormulier] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function laadData() {
      const params = await paramsPromise
      const id = params.id

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/inloggen'); return }
      setGebruiker(user)

      const { data: lijstjeData } = await supabase
        .from('lijstjes')
        .select('*')
        .eq('id', id)
        .single()

      if (!lijstjeData) { router.push('/dashboard'); return }
      setLijstje(lijstjeData)

      const { data: itemsData } = await supabase
        .from('items')
        .select('*')
        .eq('lijstje_id', id)
        .order('aangemaakt_op', { ascending: true })

      setItems(itemsData || [])
      setLaden(false)
    }
    laadData()
  }, [])

  async function handleToevoegen(e) {
    e.preventDefault()
    setFout(null)
    setOpslaan(true)

    const linkOpgemaakt = link && !link.startsWith('http') ? 'https://' + link : link

    const { data, error } = await supabase
      .from('items')
      .insert([{
        lijstje_id: lijstje.id,
        user_id: gebruiker.id,
        naam,
        link: linkOpgemaakt || null,
      }])
      .select()

    setOpslaan(false)

    if (error) {
      setFout('Er ging iets mis. Probeer het opnieuw.')
    } else {
      setItems([...items, data[0]])
      setNaam('')
      setLink('')
      setToonFormulier(false)
    }
  }

  async function handleVerwijder(id) {
    await supabase.from('items').delete().eq('id', id)
    setItems(items.filter(i => i.id !== id))
  }

  const typeConfig = {
    jongetje: { emoji: '👦', label: 'Jongetje' },
    meisje:   { emoji: '👧', label: 'Meisje' },
    man:      { emoji: '👨', label: 'Man' },
    vrouw:    { emoji: '👩', label: 'Vrouw' },
  }

  if (laden) {
    return (
      <div style={{ minHeight: '100vh', background: '#F4F2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Poppins', system-ui, sans-serif" }}>
        <p style={{ color: '#6B6490', fontSize: '0.9rem' }}>Laden...</p>
      </div>
    )
  }

  const cfg = typeConfig[lijstje.type] || { emoji: '🎂', label: lijstje.type }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Poppins', system-ui, sans-serif; background: #F4F2FF; }

        .bj-item-rij { background: #fff; border-radius: 14px; padding: 0.9rem 1.1rem; border: 1px solid #DDD8F5; margin-bottom: 8px; display: flex; align-items: center; gap: 1rem; transition: border-color 0.15s; }
        .bj-item-rij:hover { border-color: #AFA9EC; }

        .bj-item-link { font-size: 0.78rem; color: #7F77DD; text-decoration: none; display: flex; align-items: center; gap: 4px; }
        .bj-item-link:hover { text-decoration: underline; }

        .bj-btn-verwijder { background: transparent; color: #BDB8D8; border: none; padding: 0.35rem 0.5rem; border-radius: 99px; font-size: 0.8rem; cursor: pointer; font-family: inherit; transition: color 0.15s; flex-shrink: 0; }
        .bj-btn-verwijder:hover { color: #A32D2D; }

        .bj-field input {
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
        .bj-field input:focus { border-color: #7F77DD; box-shadow: 0 0 0 3px rgba(127,119,221,0.12); }

        .bj-btn-submit { background: #E8A020; color: #fff; border: none; padding: 0.75rem 1.75rem; border-radius: 99px; font-size: 0.9rem; font-weight: 600; cursor: pointer; font-family: inherit; transition: background 0.15s; }
        .bj-btn-submit:hover { background: #d4911c; }
        .bj-btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }

        .bj-btn-annuleer { background: #F4F2FF; color: #6B6490; border: 1px solid #DDD8F5; padding: 0.75rem 1.5rem; border-radius: 99px; font-size: 0.9rem; font-weight: 600; cursor: pointer; font-family: inherit; }
        .bj-btn-annuleer:hover { background: #EEEDFE; }

        .bj-btn-nieuw { background: #E8A020; color: #fff; border: none; padding: 0.5rem 1.1rem; border-radius: 99px; font-size: 0.82rem; font-weight: 600; cursor: pointer; font-family: inherit; display: flex; align-items: center; gap: 6px; }
        .bj-btn-nieuw:hover { background: #d4911c; }
      `}</style>

      {/* NAVIGATIE */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', background: '#2D2060', fontFamily: "'Poppins', system-ui, sans-serif" }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '1rem', fontWeight: 700, color: '#fff', textDecoration: 'none' }}>
          <div style={{ width: 30, height: 30, background: 'rgba(255,255,255,0.15)', borderRadius: 99, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>🎂</div>
          Bijnajarig
        </Link>
        <Link href="/dashboard" style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
          ← Terug naar dashboard
        </Link>
      </nav>

      {/* PAGINA */}
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '2.5rem 2rem', fontFamily: "'Poppins', system-ui, sans-serif" }}>

        {/* HEADER */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '1.5rem', border: '1px solid #DDD8F5', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#EEEDFE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', flexShrink: 0 }}>
            {cfg.emoji}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#E8A020', marginBottom: '0.25rem' }}>
              {cfg.label}
            </p>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#2D2060', lineHeight: 1.2 }}>
              {lijstje.naam} wordt {lijstje.leeftijd}
            </h1>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#2D2060' }}>{items.length}</div>
            <div style={{ fontSize: '0.72rem', color: '#6B6490' }}>items</div>
          </div>
        </div>

        {/* ITEMS SECTIE */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#2D2060' }}>Producten op het lijstje</h2>
          {!toonFormulier && (
            <button className="bj-btn-nieuw" onClick={() => setToonFormulier(true)}>
              + Product toevoegen
            </button>
          )}
        </div>

        {/* NIEUW PRODUCT FORMULIER */}
        {toonFormulier && (
          <div style={{ background: 'rgba(30,15,70,0.06)', borderRadius: 20, padding: '1.25rem', marginBottom: '1rem' }}>
            <div style={{ background: '#fff', borderRadius: 16, padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#2D2060', marginBottom: '0.25rem' }}>Product toevoegen</h3>
              <p style={{ fontSize: '0.8rem', color: '#6B6490', marginBottom: '1.25rem' }}>
                Voeg een product toe met een naam en optioneel een link.
              </p>

              <form onSubmit={handleToevoegen}>

                {/* Naam */}
                <div className="bj-field" style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#6B6490', marginBottom: '0.35rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                    Naam van het product
                  </label>
                  <input
                    type="text"
                    placeholder="Bijv. Lego City set, rode sneakers..."
                    value={naam}
                    onChange={(e) => setNaam(e.target.value)}
                    required
                    autoFocus
                  />
                </div>

                {/* Link */}
                <div className="bj-field" style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#6B6490', marginBottom: '0.35rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                    Link naar product{' '}
                    <span style={{ fontWeight: 400, textTransform: 'none', color: '#BDB8D8' }}>(optioneel)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="bijv. bol.com/product/..."
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                </div>

                {fout && (
                  <p style={{ fontSize: '0.82rem', color: '#A32D2D', background: '#FCEBEB', border: '1px solid #F09595', borderRadius: 10, padding: '0.6rem 0.9rem', marginBottom: '1rem' }}>
                    {fout}
                  </p>
                )}

                <div style={{ display: 'flex', gap: 10 }}>
                  <button type="button" className="bj-btn-annuleer" onClick={() => { setToonFormulier(false); setFout(null); setNaam(''); setLink('') }}>
                    Annuleren
                  </button>
                  <button type="submit" className="bj-btn-submit" disabled={opslaan}>
                    {opslaan ? 'Opslaan...' : 'Toevoegen →'}
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* LEGE STAAT */}
        {items.length === 0 && !toonFormulier && (
          <div style={{ background: '#fff', borderRadius: 16, padding: '2.5rem', border: '1.5px dashed #DDD8F5', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🛍️</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#2D2060', marginBottom: '0.4rem' }}>Nog geen producten</div>
            <p style={{ fontSize: '0.8rem', color: '#9B90C4', marginBottom: '1.25rem', lineHeight: 1.6 }}>
              Voeg producten toe die {lijstje.naam} graag wil hebben.
            </p>
            <button className="bj-btn-nieuw" onClick={() => setToonFormulier(true)} style={{ margin: '0 auto' }}>
              + Eerste product toevoegen
            </button>
          </div>
        )}

        {/* ITEMS LIJST */}
        {items.map((item, i) => (
          <div key={item.id} className="bj-item-rij">
            <div style={{ width: 32, height: 32, borderRadius: 8, background: '#F4F2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.75rem', fontWeight: 700, color: '#9B90C4' }}>
              {i + 1}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#2D2060', marginBottom: item.link ? 3 : 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.naam}
              </div>
              {item.link && (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="bj-item-link">
                  🔗 Bekijk product
                </a>
              )}
            </div>
            {!item.link && (
              <span style={{ fontSize: '0.72rem', color: '#DDD8F5', fontStyle: 'italic' }}>Geen link</span>
            )}
            <button className="bj-btn-verwijder" onClick={() => handleVerwijder(item.id)} title="Verwijderen">
              ✕
            </button>
          </div>
        ))}

        {/* ONDERAAN: DEEL KNOP */}
        {items.length > 0 && (
          <div style={{ marginTop: '2rem', background: '#2D2060', borderRadius: 16, padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#fff', marginBottom: 2 }}>Klaar om te delen?</div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)' }}>Deel dit lijstje met vrienden en familie.</div>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                alert('Link gekopieerd!')
              }}
              style={{ background: '#E8A020', color: '#fff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: 99, fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
            >
              🔗 Kopieer link
            </button>
          </div>
        )}

      </div>
    </>
  )
}