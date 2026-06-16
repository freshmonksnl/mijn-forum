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
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-md text-center">
        <h1 className="text-4xl font-bold mb-4">Welkom op mijn forum</h1>

        {email ? (
          <div className="flex flex-col gap-4">
            <p className="text-gray-600">
              Ingelogd als <span className="font-medium">{email}</span>
            </p>
            <button
              onClick={handleUitloggen}
              className="bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              Uitloggen
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="text-gray-600 mb-2">Je bent niet ingelogd.</p>
            <Link
              href="/inloggen"
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Inloggen
            </Link>
            <Link
              href="/registreren"
              className="bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300"
            >
              Registreren
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}