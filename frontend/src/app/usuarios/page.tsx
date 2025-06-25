'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<any[]>([])
  const [form, setForm] = useState({
    nombre_completo: '',
    correo: '',
    contraseña: '',
    rol: 'cliente',
    telefono: '',
    genero: '',
    fecha_nacimiento: '',
    direccion: '',
    ciudad: '',
    pais: '',
    foto_perfil: '',
    // Artesano extra
    descripcion: '',
    especialidades: '',
    portafolio: '',
    redes_sociales: '',
    disponibilidad: '',
    metodos_pago_aceptados: '',
    ubicacion_precisa: '',
    certificaciones: '',
    experiencia_anios: '',
    // Cliente extra
    favoritos: ''
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
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
      await axios.post('http://localhost:3001/api/users', data)
      setSuccess('Registro exitoso. Ahora puedes iniciar sesión.')
      setForm({
        nombre_completo: '',
        correo: '',
        contraseña: '',
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
      setTimeout(() => router.push('/login'), 1500)
    } catch (err: any) {
      setError(err.response?.data?.mensaje || 'Error al registrar usuario')
    }
  }

  return (
    <div className="flex flex-col items-center py-12 bg-gradient-to-br from-white via-sky-100 to-blue-200 min-h-screen">
      <div className="bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">Registro de Usuario</h2>
        <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit} autoComplete="off">
          <input name="nombre_completo" value={form.nombre_completo} onChange={handleChange} placeholder="Nombre completo *" className="border px-2 py-1 rounded" required />
          <input name="correo" type="email" value={form.correo} onChange={handleChange} placeholder="Correo electrónico *" className="border px-2 py-1 rounded" required />
          <input name="contraseña" type="password" value={form.contraseña} onChange={handleChange} placeholder="Contraseña *" className="border px-2 py-1 rounded" required />
          <select name="rol" value={form.rol} onChange={handleRolChange} className="border px-2 py-1 rounded" required>
            <option value="cliente">Cliente</option>
            <option value="artesano">Artesano</option>
          </select>
          <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono" className="border px-2 py-1 rounded" />
          <select name="genero" value={form.genero} onChange={handleChange} className="border px-2 py-1 rounded">
            <option value="">Género</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
          <input name="fecha_nacimiento" type="date" value={form.fecha_nacimiento} onChange={handleChange} placeholder="Fecha de nacimiento" className="border px-2 py-1 rounded" />
          <input name="direccion" value={form.direccion} onChange={handleChange} placeholder="Dirección" className="border px-2 py-1 rounded" />
          <input name="ciudad" value={form.ciudad} onChange={handleChange} placeholder="Ciudad" className="border px-2 py-1 rounded" />
          <input name="pais" value={form.pais} onChange={handleChange} placeholder="País" className="border px-2 py-1 rounded" />
          <input name="foto_perfil" value={form.foto_perfil} onChange={handleChange} placeholder="URL de foto de perfil" className="border px-2 py-1 rounded" />
          {/* Campos solo para artesano */}
          {form.rol === 'artesano' && (
            <>
              <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción (sobre ti y tu trabajo)" className="border px-2 py-1 rounded" />
              <input name="especialidades" value={form.especialidades} onChange={handleChange} placeholder="Especialidades (separadas por coma)" className="border px-2 py-1 rounded" />
              <input name="portafolio" value={form.portafolio} onChange={handleChange} placeholder="URLs de portafolio (separadas por coma)" className="border px-2 py-1 rounded" />
              <input name="redes_sociales" value={form.redes_sociales} onChange={handleChange} placeholder='Redes sociales (JSON o "facebook,instagram,whatsapp")' className="border px-2 py-1 rounded" />
              <input name="disponibilidad" value={form.disponibilidad} onChange={handleChange} placeholder="Disponibilidad (Disponible/No disponible)" className="border px-2 py-1 rounded" />
              <input name="metodos_pago_aceptados" value={form.metodos_pago_aceptados} onChange={handleChange} placeholder="Métodos de pago (separados por coma)" className="border px-2 py-1 rounded" />
              <input name="ubicacion_precisa" value={form.ubicacion_precisa} onChange={handleChange} placeholder="Ubicación precisa (lat,lng)" className="border px-2 py-1 rounded" />
              <input name="certificaciones" value={form.certificaciones} onChange={handleChange} placeholder="Certificaciones (separadas por coma)" className="border px-2 py-1 rounded" />
              <input name="experiencia_anios" type="number" value={form.experiencia_anios} onChange={handleChange} placeholder="Años de experiencia" className="border px-2 py-1 rounded" />
            </>
          )}
          {/* Campos solo para cliente */}
          {form.rol === 'cliente' && (
            <input name="favoritos" value={form.favoritos} onChange={handleChange} placeholder="Favoritos (IDs separados por coma)" className="border px-2 py-1 rounded" />
          )}
          <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded font-semibold mt-2">Registrar usuario</button>
        </form>
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 border border-red-300 mt-4 w-full text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 border border-green-300 mt-4 w-full text-center">
            {success}
          </div>
        )}
        <div className="mt-6 text-blue-700 text-sm text-center">
          ¿Ya tienes cuenta? <a href="/login" className="underline text-blue-900">Inicia sesión aquí</a>
        </div>
      </div>
    </div>
  )
}