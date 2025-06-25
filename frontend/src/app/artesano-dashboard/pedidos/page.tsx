'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function PedidosArtesano() {
  const [pedidos, setPedidos] = useState<any[]>([])

  const fetchPedidos = async () => {
    const token = localStorage.getItem('token')
    const res = await axios.get('http://localhost:3001/api/pedidos', {
      headers: { Authorization: `Bearer ${token}` }
    })
    setPedidos(res.data)
  }

  const actualizarEstado = async (id: number, estado: string) => {
    const token = localStorage.getItem('token')
    await axios.put(`http://localhost:3001/api/pedidos/${id}`, { estado }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    fetchPedidos()
  }

  useEffect(() => { fetchPedidos() }, [])

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Pedidos Recibidos</h2>
      <ul>
        {pedidos.map(p => (
          <li key={p.id} className="mb-2 flex justify-between items-center">
            <span>Pedido #{p.id} - Producto {p.productoId} - Cliente {p.clienteId} - Estado: {p.estado}</span>
            <span>
              {p.estado !== 'completado' && (
                <>
                  <button onClick={() => actualizarEstado(p.id, 'enviado')} className="text-blue-700 mr-2">Marcar Enviado</button>
                  <button onClick={() => actualizarEstado(p.id, 'completado')} className="text-green-700">Finalizar</button>
                </>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
