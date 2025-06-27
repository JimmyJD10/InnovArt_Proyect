'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaSignInAlt, FaUserCircle, FaCheckCircle } from 'react-icons/fa'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loggedUser, setLoggedUser] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) setLoggedUser(JSON.parse(user))
  }, [])

  const handleLogin = async (e?: any) => {
    if (e) e.preventDefault()
    setError(null)
    setLoading(true)
    if (!email || !password) {
      setError('Completa todos los campos')
      setLoading(false)
      return
    }
    try {
      const res = await axios.post('https://innovart-backend.onrender.com/api/users/login', { correo: email, contraseña: password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      setLoggedUser(res.data.user)
      setLoading(false)
      router.push('/')
    } catch (err: any) {
      setError(err.response?.data?.mensaje || 'Error de login')
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setLoggedUser(null)
  }

  if (loggedUser) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-sky-100 to-blue-200">
        <div className="bg-white rounded-2xl shadow-2xl px-8 py-10 flex flex-col items-center border border-blue-100 max-w-md w-full">
          <FaCheckCircle size={48} className="text-green-600 mb-4" />
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Ya has iniciado sesión</h2>
          <div className="text-blue-800 mb-4">{loggedUser.nombre_completo || loggedUser.nombre}</div>
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold transition">Cerrar sesión</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-sky-100 to-blue-200 py-10">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl px-8 py-10 flex flex-col items-center border border-blue-100">
          <img src="/logo_innovart_white.png" alt="Logo InnovArt" className="h-16 mb-4 drop-shadow" />
          <h2 className="text-3xl font-extrabold text-blue-900 mb-2 flex items-center gap-2">
            <FaSignInAlt className="text-blue-700" /> Iniciar Sesión
          </h2>
          <p className="text-blue-700 mb-6 text-center text-base">
            Ingresa con tu correo y contraseña para acceder a tu cuenta.
          </p>
          <form className="flex flex-col gap-3 w-full" onSubmit={handleLogin} autoComplete="off">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              className="border px-3 py-2 rounded focus:outline-blue-400"
              required
              autoFocus
            />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="border px-3 py-2 rounded focus:outline-blue-400"
              required
              minLength={8}
            />
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-full shadow transition mt-2 flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? 'Ingresando...' : <>Ingresar <FaSignInAlt /></>}
            </button>
          </form>
          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded border border-red-300 mt-4 w-full text-center">
              {error}
            </div>
          )}
          <div className="mt-6 text-blue-700 text-sm text-center">
            ¿No tienes cuenta? <Link href="/usuarios" className="underline text-blue-900 font-semibold">Regístrate aquí</Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        input:focus {
          outline: 2px solid #2563eb;
          box-shadow: 0 0 0 2px #93c5fd;
        }
      `}</style>
    </div>
  )
}