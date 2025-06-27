'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Productos() {
  const [productos, setProductos] = useState<any[]>([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [ubicacion, setUbicacion] = useState('');

  const fetchProductos = async () => {
    const res = await axios.get('https://innovart-backend.onrender.com/api/products', {
      params: { categoria, ubicacion }
    });
    setProductos(res.data);
  };

  const handleCrear = async () => {
    await axios.post('https://innovart-backend.onrender.com/api/products', {
      nombre,
      descripcion,
      precio: parseFloat(precio)
    });
    setNombre('');
    setDescripcion('');
    setPrecio('');
    fetchProductos();
  };

  useEffect(() => { fetchProductos(); }, []);

  return (
    <div className="p-5">
      <h2>Productos</h2>
      <div>
        <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
        <input placeholder="Descripción" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
        <input placeholder="Precio" type="number" value={precio} onChange={e => setPrecio(e.target.value)} />
        <button onClick={handleCrear}>Crear producto</button>
      </div>
      {/* Filtros rápidos */}
      <div className="flex gap-4 mb-4">
        <select value={categoria} onChange={e => setCategoria(e.target.value)} className="border rounded px-2 py-1">
          <option value="">Todas las categorías</option>
          {/* ...agrega tus categorías aquí... */}
        </select>
        <input
          type="text"
          placeholder="Ubicación"
          value={ubicacion}
          onChange={e => setUbicacion(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <button onClick={fetchProductos} className="bg-blue-700 text-white px-4 py-1 rounded">Filtrar</button>
      </div>
      <ul>
        {productos.map(p => (
          <li key={p.id}>{p.nombre} - {p.descripcion} - ${p.precio}</li>
        ))}
      </ul>
    </div>
  );
}