'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function MisProductos() {
  const [productos, setProductos] = useState<any[]>([])
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [precio, setPrecio] = useState('')
  const [editId, setEditId] = useState<number | null>(null)

  const fetchProductos = async () => {
    const token = localStorage.getItem('token')
    const res = await axios.get('http://localhost:3001/api/products', {
      headers: { Authorization: `Bearer ${token}` }
    })
    setProductos(res.data)
  }

  useEffect(() => { fetchProductos() }, [])

  const handleCrear = async () => {
    const token = localStorage.getItem('token')
    await axios.post('http://localhost:3001/api/products', {
      titulo, descripcion, precio: parseFloat(precio)
    }, { headers: { Authorization: `Bearer ${token}` } })
    setTitulo('')
    setDescripcion('')
    setPrecio('')
    fetchProductos()
  }

  const handleEditar = (p: any) => {
    setEditId(p.id)
    setTitulo(p.titulo)
    setDescripcion(p.descripcion)
    setPrecio(p.precio)
  }

  const handleActualizar = async () => {
    const token = localStorage.getItem('token')
    await axios.put(`http://localhost:3001/api/products/${editId}`, {
      titulo, descripcion, precio: parseFloat(precio)
    }, { headers: { Authorization: `Bearer ${token}` } })
    setEditId(null)
    setTitulo('')
    setDescripcion('')
    setPrecio('')
    fetchProductos()
  }

  const handleEliminar = async (id: number) => {
    const token = localStorage.getItem('token')
    await axios.delete(`http://localhost:3001/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    fetchProductos()
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Mis Productos</h2>
      <div className="mb-4 flex flex-col gap-2">
        <input placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)} className="border px-2 py-1" />
        <input placeholder="Descripción" value={descripcion} onChange={e => setDescripcion(e.target.value)} className="border px-2 py-1" />
        <input placeholder="Precio" type="number" value={precio} onChange={e => setPrecio(e.target.value)} className="border px-2 py-1" />
        {editId ? (
          <button onClick={handleActualizar} className="bg-blue-700 text-white px-4 py-2 rounded">Actualizar</button>
        ) : (
          <button onClick={handleCrear} className="bg-blue-700 text-white px-4 py-2 rounded">Crear producto</button>
        )}
      </div>
      <ul>
        {productos.map(p => (
          <li key={p.id} className="mb-2 flex justify-between items-center">
            <span>{p.titulo} - ${p.precio}</span>
            <span>
              <button onClick={() => handleEditar(p)} className="text-blue-700 mr-2">Editar</button>
              <button onClick={() => handleEliminar(p.id)} className="text-red-600">Eliminar</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
