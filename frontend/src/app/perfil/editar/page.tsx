'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function EditarPerfil() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState('')
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }
    axios.get('https://innovart-backend.onrender.com/api/users/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setUser(res.data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        router.push('/login')
      })
  }, [router])

  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    const token = localStorage.getItem('token')
    try {
      await axios.put(`https://innovart-backend.onrender.com/api/users/${user.id}`, user, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMsg('Perfil actualizado correctamente')
      localStorage.setItem('user', JSON.stringify(user))
    } catch {
      setMsg('Error al actualizar perfil')
    }
  }

  if (loading) return <div className="p-8">Cargando...</div>
  if (!user) return null

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Editar Perfil</h2>
      <div className="flex flex-col gap-3">
        <input name="nombre_completo" value={user.nombre_completo || ''} onChange={handleChange} placeholder="Nombre completo" className="border px-2 py-1" />
        <input name="correo" value={user.correo || ''} onChange={handleChange} placeholder="Correo" className="border px-2 py-1" />
        <input name="telefono" value={user.telefono || ''} onChange={handleChange} placeholder="Teléfono" className="border px-2 py-1" />
        <input name="ciudad" value={user.ciudad || ''} onChange={handleChange} placeholder="Ciudad" className="border px-2 py-1" />
        <input name="pais" value={user.pais || ''} onChange={handleChange} placeholder="País" className="border px-2 py-1" />
        <div className="text-blue-800 font-semibold">
          Rol: {user.rol}
        </div>
        {user.rol === 'artesano' && (
          <>
            <textarea name="descripcion" value={user.descripcion || ''} onChange={handleChange} placeholder="Descripción" className="border px-2 py-1" />
            <input name="especialidades" value={user.especialidades || ''} onChange={handleChange} placeholder="Especialidades (separadas por coma)" className="border px-2 py-1" />
          </>
        )}
        <button onClick={handleSave} className="bg-blue-700 text-white px-4 py-2 rounded">Guardar cambios</button>
        {msg && <div className="text-green-700 mt-2">{msg}</div>}
      </div>
    </div>
  )
}
