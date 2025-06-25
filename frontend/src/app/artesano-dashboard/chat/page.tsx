'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function ChatArtesano() {
  const [mensajes, setMensajes] = useState<any[]>([])
  const [contenido, setContenido] = useState('')
  const [destinatarioId, setDestinatarioId] = useState('')

  const fetchMensajes = async () => {
    const res = await axios.get('http://localhost:3001/api/mensajes')
    setMensajes(res.data)
  }

  const handleEnviar = async () => {
    const token = localStorage.getItem('token')
    await axios.post('http://localhost:3001/api/mensajes', {
      contenido,
      remitenteId: JSON.parse(localStorage.getItem('user') || '{}').id,
      destinatarioId: parseInt(destinatarioId)
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setContenido('')
    setDestinatarioId('')
    fetchMensajes()
  }

  useEffect(() => { fetchMensajes() }, [])

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Chat con Clientes</h2>
      <div className="mb-4">
        <input placeholder="ID Cliente" value={destinatarioId} onChange={e => setDestinatarioId(e.target.value)} className="border px-2 py-1 mr-2" />
        <input placeholder="Mensaje" value={contenido} onChange={e => setContenido(e.target.value)} className="border px-2 py-1 mr-2" />
        <button onClick={handleEnviar} className="bg-blue-700 text-white px-4 py-1 rounded">Enviar</button>
      </div>
      <ul>
        {mensajes.map(m => (
          <li key={m.id} className="mb-2">
            <span className="font-semibold">{m.remitenteId}:</span> {m.contenido} <span className="text-blue-700">(Para {m.destinatarioId})</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
