'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Artesanias() {
  const [resenas, setResenas] = useState<any[]>([]);
  const [comentario, setComentario] = useState('');
  const [calificacion, setCalificacion] = useState('');
  const [clienteId, setClienteId] = useState('');
  const [artesanoId, setArtesanoId] = useState('');

  const fetchResenas = async () => {
    const res = await axios.get('https://innovart-backend.onrender.com/api/resenas');
    setResenas(res.data);
  };

  const handleCrear = async () => {
    await axios.post('https://innovart-backend.onrender.com/api/resenas', {
      comentario,
      calificacion: parseInt(calificacion),
      clienteId: parseInt(clienteId),
      artesanoId: parseInt(artesanoId)
    });
    setComentario('');
    setCalificacion('');
    setClienteId('');
    setArtesanoId('');
    fetchResenas();
  };

  useEffect(() => { fetchResenas(); }, []);

  return (
    <div className="p-5">
      <h2>Reseñas</h2>
      <div>
        <input placeholder="Comentario" value={comentario} onChange={e => setComentario(e.target.value)} />
        <input placeholder="Calificación" type="number" value={calificacion} onChange={e => setCalificacion(e.target.value)} />
        <input placeholder="Cliente ID" value={clienteId} onChange={e => setClienteId(e.target.value)} />
        <input placeholder="Artesano ID" value={artesanoId} onChange={e => setArtesanoId(e.target.value)} />
        <button onClick={handleCrear}>Crear reseña</button>
      </div>
      <ul>
        {resenas.map(r => (
          <li key={r.id}>{r.comentario} - {r.calificacion} estrellas (Cliente {r.clienteId}, Artesano {r.artesanoId})</li>
        ))}
      </ul>
    </div>
  );
}