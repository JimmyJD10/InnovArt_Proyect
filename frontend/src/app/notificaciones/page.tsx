'use client'
import { useState } from 'react'

export default function NotificacionesPage() {
  const [notificaciones, setNotificaciones] = useState([
    { mensaje: "Tienes un nuevo mensaje de Juan", leido: false },
    { mensaje: "Tu pedido #123 fue enviado", leido: true }
  ])

  const marcarLeido = (idx: number) => {
    setNotificaciones(notificaciones.map((n, i) => i === idx ? { ...n, leido: true } : n))
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Notificaciones</h2>
      {notificaciones.length === 0 ? (
        <div className="text-blue-700">No tienes notificaciones nuevas.</div>
      ) : (
        <ul>
          {notificaciones.map((n, idx) => (
            <li key={idx} className={`mb-2 flex justify-between items-center ${n.leido ? 'text-gray-500' : 'text-blue-900 font-semibold'}`}>
              <span>{n.mensaje}</span>
              {!n.leido && (
                <button onClick={() => marcarLeido(idx)} className="text-blue-600 hover:underline text-sm">Marcar como leído</button>
              )}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-8 text-blue-700">
        <b>¿Qué son?</b> Aquí verás avisos de mensajes, pedidos, reseñas y novedades importantes.
      </div>
    </div>
  )
}
