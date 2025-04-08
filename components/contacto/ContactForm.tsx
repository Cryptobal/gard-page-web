'use client';

import React, { useState } from 'react';
import { Send } from 'lucide-react';
import API_URLS from '@/app/config/api';
import { trackFormSubmission } from '@/lib/analytics/formTracking';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Si es el campo de teléfono, solo permitir números y máximo 9 dígitos
    if (name === 'telefono') {
      const onlyNums = value.replace(/[^0-9]/g, '');
      if (onlyNums.length <= 9) {
        setFormData({ ...formData, [name]: onlyNums });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(API_URLS.CONTACTO, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setEnviado(true);
        setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });
        
        // Evento de formulario enviado usando el helper centralizado
        trackFormSubmission({
          formType: 'contacto',
          additionalData: {
            has_phone: !!formData.telefono
          }
        });
      } else {
        setError('Hubo un problema al enviar el mensaje. Por favor, inténtelo de nuevo.');
      }
    } catch (err) {
      setError('Error de conexión. Por favor, inténtelo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[hsl(var(--gard-card))] p-8 rounded-xl shadow-sm border border-[hsl(var(--gard-accent))] ring-2 ring-[hsl(var(--gard-accent))]/20">
      <h2 className="text-heading-4 mb-6">Formulario de contacto</h2>
      <p className="mb-6 text-[hsl(var(--gard-muted-foreground))]">
        Complete el formulario a continuación y uno de nuestros asesores se pondrá en contacto con usted a la brevedad.
      </p>
      
      {enviado ? (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 text-green-800 dark:text-green-300 p-6 rounded-xl">
          <h3 className="font-semibold mb-2">¡Mensaje enviado con éxito!</h3>
          <p>Gracias por contactarnos. Un asesor se comunicará con usted a la brevedad.</p>
        </div>
      ) : (
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium mb-2">Nombre completo</label>
            <input 
              type="text" 
              id="nombre" 
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full p-3 border border-[hsl(var(--gard-border))] rounded-lg bg-[hsl(var(--gard-background))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gard-accent))] focus:border-transparent transition-all" 
              placeholder="Ingrese su nombre" 
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">Correo electrónico</label>
            <input 
              type="email" 
              id="email"
              name="email" 
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-[hsl(var(--gard-border))] rounded-lg bg-[hsl(var(--gard-background))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gard-accent))] focus:border-transparent transition-all" 
              placeholder="ejemplo@correo.com" 
              required
            />
          </div>
          
          <div>
            <label htmlFor="telefono" className="block text-sm font-medium mb-2">Teléfono (9 dígitos)</label>
            <input 
              type="tel" 
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full p-3 border border-[hsl(var(--gard-border))] rounded-lg bg-[hsl(var(--gard-background))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gard-accent))] focus:border-transparent transition-all" 
              placeholder="912345678" 
              required
            />
            <p className="text-xs text-[hsl(var(--gard-muted-foreground))] mt-2">Ingrese solo 9 dígitos, sin espacios ni guiones</p>
          </div>
          
          <div>
            <label htmlFor="mensaje" className="block text-sm font-medium mb-2">Mensaje</label>
            <textarea 
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              rows={4} 
              className="w-full p-3 border border-[hsl(var(--gard-border))] rounded-lg bg-[hsl(var(--gard-background))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gard-accent))] focus:border-transparent transition-all" 
              placeholder="Describa su consulta o necesidad..." 
              required
            ></textarea>
          </div>
          
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-800 dark:text-red-300 p-4 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <button 
            type="submit" 
            className="w-full bg-[hsl(var(--gard-accent))] text-white py-3 rounded-lg hover:bg-[hsl(var(--gard-accent))/90] transition-all duration-200 flex items-center justify-center font-medium"
            disabled={loading}
          >
            {loading ? (
              <span>Enviando...</span>
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                Enviar mensaje
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
} 