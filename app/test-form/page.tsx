'use client';

import { useState } from 'react';

export default function TestFormPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación simple
    if (!formData.nombre || !formData.email || !formData.telefono || !formData.mensaje) {
      setError('Por favor complete todos los campos obligatorios.');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    // Simular envío
    setTimeout(() => {
      console.log('Formulario enviado:', formData);
      setSuccess(true);
      setLoading(false);
      
      // Reset form
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
      });
    }, 1500);
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Formulario de prueba</h1>
      
      {success ? (
        <div className="bg-green-100 p-4 rounded-md">
          <h2 className="text-green-800 font-medium">¡Formulario enviado!</h2>
          <p className="text-green-700 mt-2">Hemos recibido tu mensaje correctamente.</p>
          <button 
            onClick={() => setSuccess(false)} 
            className="mt-3 bg-green-600 text-white px-4 py-2 rounded-md"
          >
            Enviar otro mensaje
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nombre" className="block mb-1 font-medium">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          
          <div>
            <label htmlFor="telefono" className="block mb-1 font-medium">Teléfono</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          
          <div>
            <label htmlFor="mensaje" className="block mb-1 font-medium">Mensaje</label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              rows={4}
              className="w-full p-2 border rounded-md"
            ></textarea>
          </div>
          
          {error && (
            <div className="bg-red-100 p-3 rounded-md text-red-800">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            {loading ? 'Enviando...' : 'Enviar mensaje'}
          </button>
        </form>
      )}
    </div>
  );
} 