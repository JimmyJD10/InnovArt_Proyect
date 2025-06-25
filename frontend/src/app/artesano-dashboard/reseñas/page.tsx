'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function ReseñasArtesano() {
  const [resenas, setResenas] = useState<any[]>([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get('http://localhost:3001/api/resenas', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setResenas(res.data.filter((r: any) => r.artesanoId)))
  }, [])

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Mis Reseñas Recibidas</h2>
      <ul>
        {resenas.map(r => (
          <li key={r.id} className="mb-2">
            <span className="font-semibold">{r.cliente_nombre || 'Cliente'}:</span> {r.comentario} <span className="text-yellow-600">({r.calificacion} estrellas)</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
