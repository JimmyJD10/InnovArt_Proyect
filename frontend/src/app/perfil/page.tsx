'use client'

import Link from 'next/link'
import { FaUserCircle, FaUserTie, FaUser, FaInstagram, FaFacebook, FaWhatsapp, FaCertificate, FaStar, FaUserShield } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import axios from 'axios'

type User = {
  id: number
  nombre_completo: string
  correo: string
  foto_perfil?: string
  telefono?: string
  genero?: string
  fecha_nacimiento?: string
  direccion?: string
  ciudad?: string
  pais?: string
  fecha_registro?: string
  rol: 'artesano' | 'cliente' | 'admin'
  // Artesano extra
  descripcion?: string
  especialidades?: string
  portafolio?: string
  redes_sociales?: string
  calificacion_promedio?: number
  total_reseñas?: number
  disponibilidad?: string
  metodos_pago_aceptados?: string
  ubicacion_precisa?: string
  certificaciones?: string
  experiencia_anios?: number
  // Cliente extra
  favoritos?: string
}

export default function PerfilPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      setLoading(false);
      setUser(null);
      return;
    }
    axios.get('https://innovart-backend.onrender.com/api/users/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setLoading(false);
      });
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-white via-sky-100 to-blue-200">
        <span className="text-blue-900 font-semibold">Cargando perfil...</span>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-white via-sky-100 to-blue-200">
        <FaUserCircle size={80} className="text-blue-400 mb-6" />
        <h2 className="text-2xl font-bold text-blue-900 mb-2">¡Debes iniciar sesión o registrarte!</h2>
        <p className="text-blue-800 mb-6">Para ver tu perfil, primero crea una cuenta o inicia sesión.</p>
        <div className="flex gap-4">
          <Link href="/login">
            <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-full shadow transition">Iniciar sesión</button>
          </Link>
          <Link href="/usuarios">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-2 px-6 rounded-full shadow transition">Registrarse</button>
          </Link>
        </div>
      </div>
    )
  }

  // Parse campos JSON si existen
  let portafolio: string[] = []
  let redes: any = {}
  let especialidades: string[] = []
  let metodosPago: string[] = []
  let certificaciones: string[] = []

  try {
    portafolio = user.portafolio ? JSON.parse(user.portafolio) : []
  } catch {}
  try {
    redes = user.redes_sociales ? JSON.parse(user.redes_sociales) : {}
  } catch {}
  try {
    especialidades = user.especialidades ? user.especialidades.split(',') : []
  } catch {}
  try {
    metodosPago = user.metodos_pago_aceptados ? user.metodos_pago_aceptados.split(',') : []
  } catch {}
  try {
    certificaciones = user.certificaciones ? JSON.parse(user.certificaciones) : []
  } catch {}

  return (
    <div className="flex flex-col items-center py-12 bg-gradient-to-br from-white via-sky-100 to-blue-200 min-h-[60vh]">
      <div className="bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center max-w-2xl w-full">
        <img src={user.foto_perfil || '/default-profile.png'} alt={user.nombre_completo} className="h-28 w-28 rounded-full object-cover border-4 border-blue-200 mb-4" />
        <h2 className="text-2xl font-bold text-blue-900 mb-1 flex items-center gap-2">
          {user.nombre_completo}
          {user.rol === 'artesano' ? (
            <FaUserTie className="text-blue-700" title="Artesano" />
          ) : user.rol === 'admin' ? (
            <FaUserShield className="text-red-600" title="Administrador" />
          ) : (
            <FaUser className="text-yellow-600" title="Cliente" />
          )}
        </h2>
        <div className="text-blue-700 mb-2">{user.correo}</div>
        <div className="flex flex-col gap-1 text-blue-800 text-base mt-2 w-full">
          <span>
            <b>Rol:</b> {user.rol === 'artesano' ? 'Artesano' : user.rol === 'admin' ? 'Administrador' : 'Cliente'}
          </span>
          {user.telefono && <span><b>Teléfono:</b> {user.telefono}</span>}
          {user.genero && <span><b>Género:</b> {user.genero}</span>}
          {user.fecha_nacimiento && <span><b>Fecha de nacimiento:</b> {user.fecha_nacimiento.slice(0,10)}</span>}
          {user.direccion && <span><b>Dirección:</b> {user.direccion}</span>}
          {user.ciudad && <span><b>Ciudad:</b> {user.ciudad}</span>}
          {user.pais && <span><b>País:</b> {user.pais}</span>}
          {user.fecha_registro && <span><b>Registrado desde:</b> {user.fecha_registro.slice(0,10)}</span>}
        </div>
        {user.rol === 'artesano' && (
          <div className="w-full mt-6">
            <h3 className="text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
              <FaUserTie /> Perfil Artesano
            </h3>
            {user.descripcion && <div className="mb-2 text-blue-800"><b>Descripción:</b> {user.descripcion}</div>}
            {especialidades.length > 0 && (
              <div className="mb-2 text-blue-800">
                <b>Especialidades:</b> {especialidades.join(', ')}
              </div>
            )}
            {portafolio.length > 0 && (
              <div className="mb-2">
                <b className="text-blue-800">Portafolio:</b>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {portafolio.map((url, i) => (
                    <img key={i} src={url} alt={`Portafolio ${i+1}`} className="h-16 w-16 object-cover rounded shadow" />
                  ))}
                </div>
              </div>
            )}
            {redes && (
              <div className="mb-2 flex gap-3 items-center">
                {redes.facebook && <a href={redes.facebook} target="_blank" rel="noopener noreferrer"><FaFacebook className="text-blue-700" size={22} /></a>}
                {redes.instagram && <a href={redes.instagram} target="_blank" rel="noopener noreferrer"><FaInstagram className="text-pink-500" size={22} /></a>}
                {redes.whatsapp && <a href={redes.whatsapp} target="_blank" rel="noopener noreferrer"><FaWhatsapp className="text-green-500" size={22} /></a>}
              </div>
            )}
            <div className="flex gap-4 flex-wrap mb-2">
              {typeof user.calificacion_promedio === 'number' && (
                <span className="flex items-center gap-1 text-yellow-600"><FaStar /> {user.calificacion_promedio.toFixed(1)} / 5</span>
              )}
              {typeof user.total_reseñas === 'number' && (
                <span className="text-blue-800">{user.total_reseñas} reseñas</span>
              )}
              {user.disponibilidad && (
                <span className="text-green-700 font-semibold">{user.disponibilidad}</span>
              )}
            </div>
            {metodosPago.length > 0 && (
              <div className="mb-2 text-blue-800">
                <b>Métodos de pago:</b> {metodosPago.join(', ')}
              </div>
            )}
            {user.ubicacion_precisa && (
              <div className="mb-2 text-blue-800">
                <b>Ubicación precisa:</b> {user.ubicacion_precisa}
              </div>
            )}
            {certificaciones.length > 0 && (
              <div className="mb-2 text-blue-800 flex flex-wrap gap-2">
                <b>Certificaciones:</b>
                {certificaciones.map((c, i) => (
                  <span key={i} className="flex items-center gap-1 bg-blue-100 px-2 py-0.5 rounded text-blue-900 text-xs"><FaCertificate /> {c}</span>
                ))}
              </div>
            )}
            {typeof user.experiencia_anios === 'number' && (
              <div className="mb-2 text-blue-800">
                <b>Experiencia:</b> {user.experiencia_anios} años
              </div>
            )}
          </div>
        )}
        {user.rol === 'cliente' && (
          <div className="w-full mt-6">
            <h3 className="text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
              <FaUser /> Perfil Cliente
            </h3>
            {/* Puedes mostrar favoritos, compras, reseñas, etc. aquí */}
          </div>
        )}
        {user.rol === 'admin' && (
          <div className="w-full mt-6">
            <h3 className="text-lg font-bold text-red-700 mb-2 flex items-center gap-2">
              <FaUserShield /> Perfil Administrador
            </h3>
            <div className="mb-2 text-blue-800">
              Tienes acceso total para gestionar usuarios, productos, mensajes y contenido de la plataforma.
            </div>
          </div>
        )}
        <div className="flex gap-4 mt-4">
          <Link href="/perfil/editar">
            <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-full shadow transition">
              Editar perfil
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
