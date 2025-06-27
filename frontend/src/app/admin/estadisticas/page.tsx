'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function AdminEstadisticasPage() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token')
      try {
        const res = await axios.get('https://innovart-backend.onrender.com/api/admin/summary', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setStats(res.data)
      } catch {
        setStats(null)
      }
      setLoading(false)
    }
    fetchStats()
  }, [])

  if (loading) return <div className="p-8">Cargando...</div>

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Estadísticas de la Plataforma</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-blue-50 rounded-xl p-6 flex flex-col items-center">
          <span className="text-3xl font-bold text-blue-900">{stats?.usuarios ?? '...'}</span>
          <span className="text-blue-700">Usuarios registrados</span>
        </div>
        <div className="bg-blue-50 rounded-xl p-6 flex flex-col items-center">
          <span className="text-3xl font-bold text-blue-900">{stats?.productos ?? '...'}</span>
          <span className="text-blue-700">Productos publicados</span>
        </div>
        <div className="bg-blue-50 rounded-xl p-6 flex flex-col items-center">
          <span className="text-3xl font-bold text-blue-900">{stats?.pedidos ?? '...'}</span>
          <span className="text-blue-700">Pedidos completados</span>
        </div>
        <div className="bg-blue-50 rounded-xl p-6 flex flex-col items-center">
          <span className="text-3xl font-bold text-blue-900">{stats?.mensajes ?? '...'}</span>
          <span className="text-blue-700">Mensajes enviados</span>
        </div>
      </div>
      <div className="mt-8 text-blue-700">
        <b>Consejo:</b> Usa estos datos para tomar decisiones y mejorar la plataforma.
      </div>
    </div>
  )
}
