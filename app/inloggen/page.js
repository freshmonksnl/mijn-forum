'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Inloggen() {
  const [email, setEmail] = useState('')
  const [wachtwoord, setWachtwoord] = useState('')
  const [fout, setFout] = useState(null)
  const router = useRouter()
  const supabase = createClient()

  async function handleInloggen(e) {
    e.preventDefault()
    setFout(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: wachtwoord,
    })

    if (error) {
      setFout(error.message)
    } else {
      router.push('/')
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Inloggen</h1>

        <form onSubmit={handleInloggen} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Wachtwoord</label>
            <input
              type="password"
              value={wachtwoord}
              onChange={(e) => setWachtwoord(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          {fout && <p className="text-red-500 text-sm">{fout}</p>}

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Inloggen
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Nog geen account?{' '}
          <Link href="/registreren" className="text-blue-600 hover:underline">
            Registreren
          </Link>
        </p>
      </div>
    </main>
  )
}