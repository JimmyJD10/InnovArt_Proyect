'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function CarritoPage() {
  const [carrito, setCarrito] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setCarrito([])
      setLoading(false)
      return
    }
    axios.get('https://innovart-backend.onrender.com/api/pedidos/carrito', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setCarrito(res.data)
        setLoading(false)
      })
      .catch(() => {
        setCarrito([])
        setLoading(false)
      })
  }, [])

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

  const eliminar = async (id: number) => {
    const token = localStorage.getItem('token')
    await axios.delete(`https://innovart-backend.onrender.com/api/pedidos/carrito/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setCarrito(carrito.filter(i => i.id !== id))
  }

  if (loading) return <div className="p-8">Cargando...</div>

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <div className="text-blue-700">Tu carrito está vacío.</div>
      ) : (
        <>
          <ul>
            {carrito.map((item) => (
              <li key={item.id} className="mb-2 flex justify-between items-center">
                <span>{item.nombre} x {item.cantidad}</span>
                <span>
                  ${item.precio * item.cantidad}
                  <button onClick={() => eliminar(item.id)} className="ml-4 text-red-600 hover:underline">Eliminar</button>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-lg font-bold text-blue-900">Total: ${total}</div>
          <button className="mt-6 bg-blue-700 text-white px-6 py-2 rounded">Proceder al pago</button>
        </>
      )}
      <div className="mt-8 text-blue-700">
        <b>¿Cómo funciona?</b> Agrega productos desde la galería o perfil de artesanos y vuelve aquí para finalizar tu compra.
      </div>
    </div>
  )
}
