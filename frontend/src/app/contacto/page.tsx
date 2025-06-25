'use client'
export default function ContactoPage() {
  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-900 mb-4">Contacto</h2>
      <p className="mb-4 text-blue-800">¿Tienes dudas, sugerencias o quieres unirte a la red? Escríbenos:</p>
      <form className="flex flex-col gap-4">
        <input type="text" placeholder="Nombre" className="border rounded px-3 py-2" />
        <input type="email" placeholder="Correo" className="border rounded px-3 py-2" />
        <textarea placeholder="Mensaje" className="border rounded px-3 py-2" rows={5}></textarea>
        <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-full shadow transition">Enviar</button>
      </form>
      <div className="mt-6 text-blue-700">
        <div>Email: contacto@innovart.com</div>
        <div>Teléfono: +51 987 654 321</div>
      </div>
    </div>
  )
}
