'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'

export default function ArtesanoPerfil() {
  const params = useParams()
  const id = params?.id
  const [artesano, setArtesano] = useState<any>(null)

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3001/api/users/${id}`)
        .then(res => setArtesano(res.data));
    }
  }, [id])

  if (!artesano) return <div className="p-6">Cargando...</div>

  return (
    <div className="p-6 flex flex-col items-center">
      <img src={artesano.foto_perfil || '/default-profile.png'} alt={artesano.nombre_completo} className="h-28 w-28 rounded-full object-cover mb-4" />
      <h2 className="text-2xl font-bold text-blue-900">{artesano.nombre_completo}</h2>
      <div className="text-blue-700">{artesano.ciudad}, {artesano.pais}</div>
      <div className="mt-2 text-blue-800">{artesano.descripcion}</div>
      <div className="mt-2 text-blue-800">{artesano.especialidades}</div>
      {/* Puedes mostrar portafolio, redes, etc. */}
    </div>
  )
}
