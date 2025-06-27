'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Pedidos() {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [clienteId, setClienteId] = useState('');
  const [productoId, setProductoId] = useState('');
  const [cantidad, setCantidad] = useState('');

  const fetchPedidos = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('https://innovart-backend.onrender.com/api/pedidos', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setPedidos(res.data);
  };

  const handleCrear = async () => {
    const token = localStorage.getItem('token');
    await axios.post('https://innovart-backend.onrender.com/api/pedidos', {
      clienteId: parseInt(clienteId),
      productoId: parseInt(productoId),
      cantidad: parseInt(cantidad)
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setClienteId('');
    setProductoId('');
    setCantidad('');
    fetchPedidos();
  };

  useEffect(() => { fetchPedidos(); }, []);

  return (
    <div className="p-5">
      <h2>Pedidos</h2>
      <div>
        <input placeholder="Cliente ID" value={clienteId} onChange={e => setClienteId(e.target.value)} />
        <input placeholder="Producto ID" value={productoId} onChange={e => setProductoId(e.target.value)} />
        <input placeholder="Cantidad" type="number" value={cantidad} onChange={e => setCantidad(e.target.value)} />
        <button onClick={handleCrear}>Crear pedido</button>
      </div>
      <ul>
        {pedidos.map(p => (
          <li key={p.id}>Cliente {p.clienteId} pidió {p.cantidad} de producto {p.productoId}</li>
        ))}
      </ul>
    </div>
  );
}
