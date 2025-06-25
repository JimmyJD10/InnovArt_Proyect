'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Mensajes() {
  const [mensajes, setMensajes] = useState<any[]>([]);
  const [contenido, setContenido] = useState('');
  const [remitenteId, setRemitenteId] = useState('');
  const [destinatarioId, setDestinatarioId] = useState('');

  const fetchMensajes = async () => {
    const res = await axios.get('http://localhost:3001/api/mensajes');
    setMensajes(res.data);
  };

  const handleCrear = async () => {
    await axios.post('http://localhost:3001/api/mensajes', {
      contenido,
      remitenteId: parseInt(remitenteId),
      destinatarioId: parseInt(destinatarioId)
    });
    setContenido('');
    setRemitenteId('');
    setDestinatarioId('');
    fetchMensajes();
  };

  useEffect(() => { fetchMensajes(); }, []);

  return (
    <div className="p-5">
      <h2>Mensajes</h2>
      <div>
        <input placeholder="Contenido" value={contenido} onChange={e => setContenido(e.target.value)} />
        <input placeholder="Remitente ID" value={remitenteId} onChange={e => setRemitenteId(e.target.value)} />
        <input placeholder="Destinatario ID" value={destinatarioId} onChange={e => setDestinatarioId(e.target.value)} />
        <button onClick={handleCrear}>Enviar mensaje</button>
      </div>
      <ul>
        {mensajes.map(m => (
          <li key={m.id}>{m.contenido} (De {m.remitenteId} a {m.destinatarioId})</li>
        ))}
      </ul>
    </div>
  );
}
