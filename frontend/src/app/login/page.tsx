'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedUser, setLoggedUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) setLoggedUser(JSON.parse(user));
  }, []);

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3001/api/users/login', { correo: email, contraseña: password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setLoggedUser(res.data.user);
      router.push('/');
    } catch (error) {
      alert('Error de login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLoggedUser(null);
  };

  if (loggedUser) {
    return (
      <div className='p-5'>
        <h2>Ya has iniciado sesión como {loggedUser.nombre_completo || loggedUser.nombre}</h2>
        <button onClick={handleLogout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Cerrar sesión</button>
      </div>
    );
  }

  return (
    <div className='p-5'>
      <h2>Iniciar Sesión</h2>
      <input type='email' onChange={(e) => setEmail(e.target.value)} placeholder='Correo' className="block mb-2 border px-2 py-1" />
      <input type='password' onChange={(e) => setPassword(e.target.value)} placeholder='Contraseña' className="block mb-2 border px-2 py-1" />
      <button onClick={handleLogin} className="bg-blue-700 text-white px-4 py-2 rounded">Iniciar sesión</button>
    </div>
  );
}