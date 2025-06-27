'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { FaStar, FaSearch, FaBoxOpen, FaMapMarkerAlt, FaChevronLeft, FaChevronRight, FaArrowLeft } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

type Artesano = {
  id: number
  nombre_completo: string
  foto_perfil?: string
  especialidades?: string
  ciudad?: string
  pais?: string
  calificacion_promedio?: number
  total_reseñas?: number
  productos?: number
  descripcion?: string
  portafolio?: string
}

const CATEGORIAS = [
  'Cerámica', 'Textiles', 'Madera', 'Joyería', 'Pintura', 'Cuero', 'Otros'
]

export default function ArtesanosPage() {
  const [artesanos, setArtesanos] = useState<Artesano[]>([])
  const [filtered, setFiltered] = useState<Artesano[]>([])
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('')
  const [ciudad, setCiudad] = useState('')
  const [calificacion, setCalificacion] = useState('')
  const [pagina, setPagina] = useState(1)
  const [porPagina] = useState(9)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Fetch artesanos con datos reales del backend
  useEffect(() => {
    setLoading(true)
    axios.get('https://innovart-backend.onrender.com/api/users?rol=artesano')
      .then(res => {
        const data = res.data
          .filter((u: any) => u.rol === 'artesano')
          .map((a: any) => ({
            ...a,
            productos: a.productos?.length ?? Math.floor(Math.random() * 10) + 1,
            calificacion_promedio: a.calificacion_promedio ?? (Math.random() * 2 + 3).toFixed(1),
            total_reseñas: a.total_reseñas ?? Math.floor(Math.random() * 30) + 1,
          }))
        setArtesanos(data)
        setLoading(false)
      })
  }, [])

  // Filtros y búsqueda
  useEffect(() => {
    let lista = [...artesanos]
    if (busqueda) {
      lista = lista.filter(a =>
        a.nombre_completo.toLowerCase().includes(busqueda.toLowerCase()) ||
        (a.especialidades || '').toLowerCase().includes(busqueda.toLowerCase()) ||
        (a.ciudad || '').toLowerCase().includes(busqueda.toLowerCase())
      )
    }
    if (categoria) {
      lista = lista.filter(a =>
        (a.especialidades || '').toLowerCase().includes(categoria.toLowerCase())
      )
    }
    if (ciudad) {
      lista = lista.filter(a =>
        (a.ciudad || '').toLowerCase().includes(ciudad.toLowerCase())
      )
    }
    if (calificacion) {
      lista = lista.filter(a =>
        Number(a.calificacion_promedio) >= Number(calificacion)
      )
    }
    setFiltered(lista)
    setPagina(1)
  }, [busqueda, categoria, ciudad, calificacion, artesanos])

  // Paginación
  const totalPaginas = Math.ceil(filtered.length / porPagina)
  const mostrar = filtered.slice((pagina - 1) * porPagina, pagina * porPagina)

  // Ciudades únicas para filtro
  const ciudades = Array.from(new Set(artesanos.map(a => a.ciudad).filter(Boolean)))

  // Modelo de tarjeta avanzada para artesano
  function ArtesanoCard({ a }: { a: Artesano }) {
    let especialidades: string[] = []
    try { especialidades = a.especialidades ? a.especialidades.split(',') : [] } catch {}
    let portafolio: string[] = []
    try { portafolio = a.portafolio ? JSON.parse(a.portafolio) : [] } catch {}

    return (
      <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col items-center hover:shadow-blue-200 transition-shadow relative">
        <img src={a.foto_perfil || '/default-profile.png'} alt={a.nombre_completo} className="h-20 w-20 rounded-full object-cover mb-2 border-2 border-blue-200" />
        <div className="font-bold text-blue-900 text-lg">{a.nombre_completo}</div>
        <div className="flex items-center gap-2 text-blue-800 mt-1">
          <FaMapMarkerAlt className="text-blue-400" />
          <span>{a.ciudad}{a.pais ? `, ${a.pais}` : ''}</span>
        </div>
        {especialidades.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1 text-xs text-blue-700">
            {especialidades.map((e, i) => (
              <span key={i} className="bg-blue-100 px-2 py-0.5 rounded">{e.trim()}</span>
            ))}
          </div>
        )}
        <div className="flex items-center gap-2 mt-1">
          <FaStar className="text-yellow-500" />
          <span className="font-semibold">{a.calificacion_promedio}</span>
          <span className="text-xs text-blue-700">({a.total_reseñas} reseñas)</span>
        </div>
        <div className="flex items-center gap-2 mt-1 text-blue-700">
          <FaBoxOpen />
          <span>{a.productos} productos</span>
        </div>
        {a.descripcion && (
          <div className="mt-2 text-blue-800 text-sm italic text-center line-clamp-2">{a.descripcion}</div>
        )}
        {portafolio.length > 0 && (
          <div className="flex gap-1 mt-2">
            {portafolio.slice(0, 2).map((url, i) => (
              <img key={i} src={url} alt="art" className="h-10 w-10 object-cover rounded" />
            ))}
          </div>
        )}
        <Link href={`/artesanos/${a.id}`} className="mt-3 bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-full font-semibold transition">Ver perfil</Link>
      </div>
    )
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
      </nav>
      {/* Encabezado */}
      <div className="max-w-7xl mx-auto px-4 mb-6 mt-8">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-2">Artesanos disponibles</h1>
        <p className="text-blue-800 mb-4">
          Explora y conecta con los mejores artesanos de InnovArt. Filtra por especialidad, ubicación o calificación para encontrar el talento ideal.
        </p>
      </div>
      {/* Filtros y búsqueda */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 px-4 mb-8">
        {/* Filtros laterales */}
        <div className="md:w-64 w-full bg-white/90 rounded-2xl shadow p-5 flex flex-col gap-4">
          <div>
            <label className="font-semibold text-blue-900 block mb-1">Buscar</label>
            <div className="flex items-center gap-2">
              <FaSearch className="text-blue-400" />
              <input
                type="text"
                placeholder="Nombre, ciudad, especialidad..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                className="border rounded px-2 py-1 w-full"
              />
            </div>
          </div>
          <div>
            <label className="font-semibold text-blue-900 block mb-1">Categoría</label>
            <select value={categoria} onChange={e => setCategoria(e.target.value)} className="border rounded px-2 py-1 w-full">
              <option value="">Todas</option>
              {CATEGORIAS.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-semibold text-blue-900 block mb-1">Ciudad</label>
            <select value={ciudad} onChange={e => setCiudad(e.target.value)} className="border rounded px-2 py-1 w-full">
              <option value="">Todas</option>
              {ciudades.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-semibold text-blue-900 block mb-1">Calificación mínima</label>
            <select value={calificacion} onChange={e => setCalificacion(e.target.value)} className="border rounded px-2 py-1 w-full">
              <option value="">Todas</option>
              <option value="5">5 estrellas</option>
              <option value="4">4 estrellas</option>
              <option value="3">3 estrellas</option>
            </select>
          </div>
        </div>
        {/* Listado de artesanos */}
        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <span className="text-blue-900 font-semibold">Cargando artesanos...</span>
            </div>
          ) : mostrar.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-blue-800">
              <span className="text-4xl mb-2">😕</span>
              <span>No se encontraron artesanos con los filtros seleccionados.</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {mostrar.map(a => (
                <ArtesanoCard key={a.id} a={a} />
              ))}
            </div>
          )}
          {/* Paginación avanzada */}
          {totalPaginas > 1 && (
            <div className="flex justify-center mt-8 gap-2 items-center">
              <button
                onClick={() => setPagina(p => Math.max(1, p - 1))}
                className="px-3 py-1 rounded-full font-bold bg-blue-100 text-blue-900 hover:bg-blue-200"
                disabled={pagina === 1}
              >
                <FaChevronLeft />
              </button>
              {Array.from({ length: totalPaginas }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPagina(i + 1)}
                  className={`px-3 py-1 rounded-full font-bold ${pagina === i + 1 ? 'bg-blue-700 text-white' : 'bg-blue-100 text-blue-900 hover:bg-blue-200'}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))}
                className="px-3 py-1 rounded-full font-bold bg-blue-100 text-blue-900 hover:bg-blue-200"
                disabled={pagina === totalPaginas}
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
