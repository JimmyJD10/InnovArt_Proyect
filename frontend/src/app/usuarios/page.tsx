'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaUserPlus, FaUserTie, FaUser, FaCheckCircle } from 'react-icons/fa'

export default function Usuarios() {
  const [form, setForm] = useState({
    nombre_completo: '',
    correo: '',
    contraseña: '',
    confirmar_contraseña: '',
    rol: 'cliente',
    telefono: '',
    genero: '',
    fecha_nacimiento: '',
    direccion: '',
    ciudad: '',
    pais: '',
    foto_perfil: '',
    descripcion: '',
    especialidades: '',
    portafolio: '',
    redes_sociales: '',
    disponibilidad: '',
    metodos_pago_aceptados: '',
    ubicacion_precisa: '',
    certificaciones: '',
    experiencia_anios: '',
    favoritos: ''
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleRolChange = (e: any) => {
    setForm({ ...form, rol: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    // Validación frontend: contraseñas iguales
    if (form.contraseña !== form.confirmar_contraseña) {
      setError('Las contraseñas no coinciden')
      return
    }
    setLoading(true)
    try {
      // Prepara campos especiales
      let data: any = { ...form }
      if (form.rol === 'artesano') {
        // Portafolio y certificaciones como JSON string si hay más de una url/certificado
        if (form.portafolio) data.portafolio = JSON.stringify(form.portafolio.split(',').map(s => s.trim()))
        if (form.certificaciones) data.certificaciones = JSON.stringify(form.certificaciones.split(',').map(s => s.trim()))
        if (form.redes_sociales) {
          // redes_sociales como JSON string
          try {
            data.redes_sociales = JSON.stringify(JSON.parse(form.redes_sociales))
          } catch {
            // Si no es JSON, intenta parsear como facebook,instagram,whatsapp
            const [facebook, instagram, whatsapp] = form.redes_sociales.split(',').map(s => s.trim())
            data.redes_sociales = JSON.stringify({ facebook, instagram, whatsapp })
          }
        }
        if (form.experiencia_anios) data.experiencia_anios = parseInt(form.experiencia_anios)
      }
      if (form.rol === 'cliente' && form.favoritos) {
        data.favoritos = JSON.stringify(form.favoritos.split(',').map(s => s.trim()))
      }
      // Elimina campos vacíos
      Object.keys(data).forEach(k => (data[k] === '' || data[k] === null) && delete data[k])
      await axios.post('https://innovart-backend.onrender.com/api/users', data)
      setSuccess('¡Registro exitoso! Ahora puedes iniciar sesión.')
      setForm({
        nombre_completo: '',
        correo: '',
        contraseña: '',
        confirmar_contraseña: '',
        rol: 'cliente',
        telefono: '',
        genero: '',
        fecha_nacimiento: '',
        direccion: '',
        ciudad: '',
        pais: '',
        foto_perfil: '',
        descripcion: '',
        especialidades: '',
        portafolio: '',
        redes_sociales: '',
        disponibilidad: '',
        metodos_pago_aceptados: '',
        ubicacion_precisa: '',
        certificaciones: '',
        experiencia_anios: '',
        favoritos: ''
      })
      setTimeout(() => router.push('/login'), 1800)
    } catch (err: any) {
      setError(err.response?.data?.mensaje || 'Error al registrar usuario')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-sky-100 to-blue-200 py-10">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl px-8 py-10 flex flex-col items-center border border-blue-100">
          <img src="/logo_innovart_white.png" alt="Logo InnovArt" className="h-16 mb-4 drop-shadow" />
          <h2 className="text-3xl font-extrabold text-blue-900 mb-2 flex items-center gap-2">
            <FaUserPlus className="text-blue-700" /> Crear cuenta InnovArt
          </h2>
          <p className="text-blue-700 mb-6 text-center text-base">
            Únete gratis y accede a productos únicos, conecta con artesanos y disfruta de beneficios exclusivos.
          </p>
          <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit} autoComplete="off">
            <input name="nombre_completo" value={form.nombre_completo} onChange={handleChange} placeholder="Nombre completo *" className="border px-3 py-2 rounded focus:outline-blue-400" required />
            <input name="correo" type="email" value={form.correo} onChange={handleChange} placeholder="Correo electrónico *" className="border px-3 py-2 rounded focus:outline-blue-400" required />
            <input name="contraseña" type="password" value={form.contraseña} onChange={handleChange} placeholder="Contraseña *" className="border px-3 py-2 rounded focus:outline-blue-400" required minLength={8} />
            <input name="confirmar_contraseña" type="password" value={form.confirmar_contraseña} onChange={handleChange} placeholder="Confirmar contraseña *" className="border px-3 py-2 rounded focus:outline-blue-400" required minLength={8} />
            <select name="rol" value={form.rol} onChange={handleRolChange} className="border px-3 py-2 rounded focus:outline-blue-400" required>
              <option value="cliente">Cliente</option>
              <option value="artesano">Artesano</option>
            </select>
            <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono (opcional)" className="border px-3 py-2 rounded focus:outline-blue-400" />
            <select name="genero" value={form.genero} onChange={handleChange} className="border px-3 py-2 rounded focus:outline-blue-400">
              <option value="">Género (opcional)</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
            <input name="fecha_nacimiento" type="date" value={form.fecha_nacimiento} onChange={handleChange} placeholder="Fecha de nacimiento" className="border px-3 py-2 rounded focus:outline-blue-400" />
            <input name="direccion" value={form.direccion} onChange={handleChange} placeholder="Dirección (opcional)" className="border px-3 py-2 rounded focus:outline-blue-400" />
            <input name="ciudad" value={form.ciudad} onChange={handleChange} placeholder="Ciudad (opcional)" className="border px-3 py-2 rounded focus:outline-blue-400" />
            <input name="pais" value={form.pais} onChange={handleChange} placeholder="País (opcional)" className="border px-3 py-2 rounded focus:outline-blue-400" />
            <input name="foto_perfil" value={form.foto_perfil} onChange={handleChange} placeholder="URL de foto de perfil (opcional)" className="border px-3 py-2 rounded focus:outline-blue-400" />
            {/* Campos solo para artesano */}
            {form.rol === 'artesano' && (
              <div className="bg-blue-50 rounded-lg p-4 mt-2 mb-2 border border-blue-100">
                <div className="flex items-center gap-2 mb-2 text-blue-900 font-bold">
                  <FaUserTie /> Registro como Artesano
                </div>
                <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción (sobre ti y tu trabajo)" className="border px-3 py-2 rounded w-full mb-2 focus:outline-blue-400" />
                <input name="especialidades" value={form.especialidades} onChange={handleChange} placeholder="Especialidades (separadas por coma)" className="border px-3 py-2 rounded w-full mb-2 focus:outline-blue-400" />
                <input name="portafolio" value={form.portafolio} onChange={handleChange} placeholder="URLs de portafolio (separadas por coma)" className="border px-3 py-2 rounded w-full mb-2 focus:outline-blue-400" />
                <input name="redes_sociales" value={form.redes_sociales} onChange={handleChange} placeholder='Redes sociales (JSON o "facebook,instagram,whatsapp")' className="border px-3 py-2 rounded w-full mb-2 focus:outline-blue-400" />
                <input name="disponibilidad" value={form.disponibilidad} onChange={handleChange} placeholder="Disponibilidad (Disponible/No disponible)" className="border px-3 py-2 rounded w-full mb-2 focus:outline-blue-400" />
                <input name="metodos_pago_aceptados" value={form.metodos_pago_aceptados} onChange={handleChange} placeholder="Métodos de pago (separados por coma)" className="border px-3 py-2 rounded w-full mb-2 focus:outline-blue-400" />
                <input name="ubicacion_precisa" value={form.ubicacion_precisa} onChange={handleChange} placeholder="Ubicación precisa (lat,lng)" className="border px-3 py-2 rounded w-full mb-2 focus:outline-blue-400" />
                <input name="certificaciones" value={form.certificaciones} onChange={handleChange} placeholder="Certificaciones (separadas por coma)" className="border px-3 py-2 rounded w-full mb-2 focus:outline-blue-400" />
                <input name="experiencia_anios" type="number" value={form.experiencia_anios} onChange={handleChange} placeholder="Años de experiencia" className="border px-3 py-2 rounded w-full mb-2 focus:outline-blue-400" />
              </div>
            )}
            {/* Campos solo para cliente */}
            {form.rol === 'cliente' && (
              <input name="favoritos" value={form.favoritos} onChange={handleChange} placeholder="Favoritos (IDs separados por coma)" className="border px-3 py-2 rounded focus:outline-blue-400" />
            )}
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-6 rounded-full shadow transition mt-2 flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? 'Registrando...' : 'Crear cuenta'}
            </button>
          </form>
          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded border border-red-300 mt-4 w-full text-center">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded border border-green-300 mt-4 w-full text-center flex items-center justify-center gap-2">
              <FaCheckCircle className="text-green-600" /> {success}
            </div>
          )}
          <div className="mt-6 text-blue-700 text-sm text-center">
            ¿Ya tienes cuenta? <Link href="/login" className="underline text-blue-900 font-semibold">Inicia sesión aquí</Link>
          </div>
        </div>
        {/* Beneficios visuales */}
        <div className="mt-8 bg-white/80 rounded-xl shadow p-6 text-blue-900 text-base">
          <h3 className="font-bold text-lg mb-2">¿Por qué registrarte en InnovArt?</h3>
          <ul className="list-disc ml-6">
            <li>Compra productos únicos y apoya a artesanos locales.</li>
            <li>Accede a ofertas y novedades exclusivas.</li>
            <li>Contacta directamente con los mejores artesanos del país.</li>
            <li>Publica tus productos y haz crecer tu negocio (si eres artesano).</li>
            <li>Gestión segura de tus datos y compras.</li>
          </ul>
        </div>
      </div>
      <style jsx>{`
        input:focus, textarea:focus, select:focus {
          outline: 2px solid #2563eb;
          box-shadow: 0 0 0 2px #93c5fd;
        }
      `}</style>
    </div>
  )
}