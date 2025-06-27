'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { FaStar, FaArrowLeft, FaSearch } from 'react-icons/fa'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

export default function GaleriaPage() {
  const [productos, setProductos] = useState<any[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const [busqueda, setBusqueda] = useState(searchParams.get('busqueda') || '')

  useEffect(() => {
    axios.get('https://innovart-backend.onrender.com/api/products')
      .then(res => setProductos(res.data))
  }, [])

  // Filtra productos si hay búsqueda
  const productosFiltrados = busqueda
    ? productos.filter(p =>
        (p.titulo || '').toLowerCase().includes(busqueda.toLowerCase()) ||
        (p.descripcion || '').toLowerCase().includes(busqueda.toLowerCase()) ||
        (p.artesano?.nombre_completo || '').toLowerCase().includes(busqueda.toLowerCase())
      )
    : productos

  const handleBusqueda = () => {
    router.push(`/galeria?busqueda=${encodeURIComponent(busqueda)}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-100 to-blue-200">
      {/* Barra de navegación anclada */}
      <nav className="w-full bg-blue-900 shadow-lg flex items-center justify-between px-8 py-4 z-30 sticky top-0 left-0">
        <div className="flex items-center gap-6">
          <button
            onClick={() => router.back()}
            className="text-white font-semibold hover:text-blue-300 transition-colors flex items-center gap-2 bg-transparent border-none outline-none"
            style={{ background: 'none', border: 'none', padding: 0 }}
            title="Volver"
          >
            <FaArrowLeft className="mr-1" /> Volver
          </button>
          <Link href="/" className="text-white font-semibold hover:text-blue-300 transition-colors">INICIO</Link>
          <Link href="/artesanos" className="text-white font-semibold hover:text-blue-300 transition-colors">ARTESANOS</Link>
          <Link href="/galeria" className="text-white font-semibold hover:text-blue-300 transition-colors">GALERÍA</Link>
          <Link href="/contacto" className="text-white font-semibold hover:text-blue-300 transition-colors">CONTACTO</Link>
        </div>
        {/* Barra de búsqueda igual a la de inicio */}
        <div className="flex bg-white/90 rounded-full shadow px-6 py-2 items-center max-w-lg w-full ml-8">
          <FaSearch className="text-blue-400 mr-2" />
          <input
            type="text"
            placeholder="Buscar artesanías, productos o artesanos..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="flex-1 border-none outline-none bg-transparent text-blue-900"
            onKeyDown={e => e.key === 'Enter' && handleBusqueda()}
          />
          <button
            onClick={handleBusqueda}
            className="ml-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-1 rounded-full font-semibold transition"
          >
            Buscar
          </button>
        </div>
      </nav>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-900">Galería de Artesanías</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {productosFiltrados.map(p => (
            <div key={p.id} className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
              <img src={p.imagen || '/default-artesania.png'} alt={p.titulo} className="h-32 w-full object-cover rounded mb-2" />
              <div className="font-bold text-blue-900">{p.titulo}</div>
              {/* Descripción */}
              {p.descripcion && (
                <div className="text-blue-800 text-sm mt-1 mb-1 text-center line-clamp-2">{p.descripcion}</div>
              )}
              {/* Nombre del artesano */}
              {p.artesano && p.artesano.nombre_completo && (
                <div className="text-blue-700 text-xs mb-1">
                  Artesano: <Link href={`/artesanos/${p.artesano.id}`} className="underline">{p.artesano.nombre_completo}</Link>
                </div>
              )}
              {/* Valoración promedio */}
              <div className="flex items-center gap-1 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < Math.round(p.calificacion_promedio || 0) ? 'text-yellow-500' : 'text-gray-300'}
                  />
                ))}
                <span className="text-blue-700 text-xs ml-1">
                  {typeof p.calificacion_promedio === 'number'
                    ? p.calificacion_promedio.toFixed(1)
                    : '0.0'}
                </span>
              </div>
              <div className="text-blue-800 font-semibold mt-1">${p.precio}</div>
              <Link href={`/productos/${p.id}`} className="mt-3 bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-full font-semibold transition">
                Más información
              </Link>
            </div>
          ))}
        </div>
        {productosFiltrados.length === 0 && (
          <div className="text-blue-700 mt-8 text-center">No se encontraron productos para tu búsqueda.</div>
        )}
      </div>
    </div>
  )
}
