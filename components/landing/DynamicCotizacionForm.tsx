'use client';

import { useState, FormEvent, useEffect, useRef, RefCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AlertCircle, Loader2, CheckCircle, ArrowRight } from 'lucide-react';
import { Loader } from '@googlemaps/js-api-loader';
import { trackFormSubmission } from '@/lib/analytics/formTracking';
import { API_URLS } from '@/app/config/api';

// Declaración para Google Maps API
declare global {
  interface Window {
    google: any;
  }
}

// Componente para el formulario de cotización
interface DynamicCotizacionFormProps {
  industria: string;
  servicio: string;
  ctaText?: string;
}

export default function DynamicCotizacionForm({
  industria,
  servicio,
  ctaText = 'Cotizar Ahora'
}: DynamicCotizacionFormProps) {
  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    empresa: '',
    direccion: '',
    comuna: '',
    ciudad: '',
    latitude: undefined as number | undefined,
    longitude: undefined as number | undefined,
    mensaje: '',
    // UTM params se inicializan vacíos y se rellenan en useEffect
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_content: ''
  });
  
  // Estados para la UI
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [mapLoaded, setMapLoaded] = useState(false);
  const autocompleteInputRef = useRef<HTMLInputElement | null>(null);
  
  // Crear una ref callback que pueda ser usada directamente
  const autocompleteRef: RefCallback<HTMLInputElement> = (element) => {
    autocompleteInputRef.current = element;
  };
  
  // Carga de la API de Google Maps
  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyBHIoHJDp6StLJlUAQV_gK7woFsEYgbzHY',
      version: 'weekly',
      libraries: ['places'],
    });

    loader.load().then(() => {
      setMapLoaded(true);
    }).catch(error => {
      console.error('Error cargando Google Maps API:', error);
    });
  }, []);
  
  // Configurar autocompletado para el campo de dirección
  useEffect(() => {
    if (!mapLoaded || !autocompleteInputRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(autocompleteInputRef.current, {
      types: ['address'],
      componentRestrictions: { country: 'cl' },
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.address_components) return;

      setFormData(prev => ({
        ...prev,
        direccion: place.formatted_address || ''
      }));

      // Extraer comuna y ciudad
      let comuna = '';
      let ciudad = '';

      place.address_components.forEach((component: any) => {
        const types = component.types;
        
        if (types.includes('locality')) {
          ciudad = component.long_name;
        }
        
        if (types.includes('administrative_area_level_3') || 
            types.includes('sublocality_level_1') || 
            types.includes('sublocality')) {
          comuna = component.long_name;
        }
      });

      setFormData(prev => ({
        ...prev,
        comuna,
        ciudad
      }));

      // Extraer coordenadas de latitud y longitud
      if (place.geometry && place.geometry.location) {
        setFormData(prev => ({
          ...prev,
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng()
        }));
        console.log('Coordenadas extraídas:', {
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng()
        });
      }
    });
  }, [mapLoaded]);
  
  // Extraer UTM params de la URL al cargar el componente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      
      const utmParams = {
        utm_source: urlParams.get('utm_source') || '',
        utm_medium: urlParams.get('utm_medium') || '',
        utm_campaign: urlParams.get('utm_campaign') || '',
        utm_term: urlParams.get('utm_term') || '',
        utm_content: urlParams.get('utm_content') || ''
      };
      
      setFormData(prev => ({
        ...prev,
        ...utmParams
      }));
    }
  }, []);
  
  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Manejar envío del formulario
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');
    setSuccessMessage('');
    
    try {
      // Validación básica
      if (!formData.nombre || !formData.email || !formData.telefono || !formData.direccion) {
        throw new Error('Por favor completa los campos obligatorios');
      }
      
      // Validación de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Por favor ingresa un email válido');
      }
      
      // Datos a enviar incluyendo industria y servicio
      const dataToSend = {
        ...formData,
        industria,
        servicio,
        fecha: new Date().toISOString()
      };
      
      // Enviar al webhook
      const response = await fetch(API_URLS.LANDING_DINAMICO, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      
      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }
      
      // Lanzar evento de formulario enviado usando el helper centralizado
      trackFormSubmission({
        formType: 'landing_dinamico',
        industria,
        servicio
      });
      
      // Mostrar mensaje de éxito
      setSuccessMessage('¡Formulario enviado! Nos pondremos en contacto contigo a la brevedad.');
      
      // Resetear formulario
      setFormData({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        empresa: '',
        direccion: '',
        comuna: '',
        ciudad: '',
        latitude: undefined,
        longitude: undefined,
        mensaje: '',
        utm_source: formData.utm_source,
        utm_medium: formData.utm_medium,
        utm_campaign: formData.utm_campaign,
        utm_term: formData.utm_term,
        utm_content: formData.utm_content
      });
      
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-4">
      {successMessage && (
        <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 p-4 rounded-xl flex items-start gap-3">
          <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <p>{successMessage}</p>
        </div>
      )}
      
      <form 
        onSubmit={handleSubmit} 
        className="gard-card space-y-4 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm"
        id="cotizacion-form"
      >
        <h3 className="text-heading-3 text-center mb-6">Solicita tu cotización</h3>
        
        {/* Campos visibles */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre *</Label>
            <Input
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ingresa tu nombre"
              required
              className="rounded-xl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="apellido">Apellido *</Label>
            <Input
              id="apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              placeholder="Ingresa tu apellido"
              required
              className="rounded-xl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="nombre@empresa.com"
              required
              className="rounded-xl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="telefono">Teléfono *</Label>
            <Input
              id="telefono"
              name="telefono"
              type="tel"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="+56 9 1234 5678"
              required
              className="rounded-xl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="empresa">Nombre de Empresa *</Label>
            <Input
              id="empresa"
              name="empresa"
              value={formData.empresa}
              onChange={handleChange}
              placeholder="Nombre de tu empresa"
              required
              className="rounded-xl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="direccion">Dirección *</Label>
            <Input
              id="direccion"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              placeholder="Ingresa la dirección"
              className="rounded-xl"
              ref={autocompleteRef}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="comuna">Comuna</Label>
              <Input
                id="comuna"
                name="comuna"
                value={formData.comuna}
                onChange={handleChange}
                placeholder="Comuna"
                readOnly
                className="rounded-xl"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ciudad">Ciudad</Label>
              <Input
                id="ciudad"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleChange}
                placeholder="Ciudad"
                readOnly
                className="rounded-xl"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="mensaje">Mensaje</Label>
            <Textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              placeholder="Cuéntanos sobre tus necesidades de seguridad"
              className="rounded-xl min-h-[100px]"
            />
          </div>
        </div>
        
        {/* Campos ocultos */}
        <input type="hidden" name="industria" value={industria} />
        <input type="hidden" name="servicio" value={servicio} />
        <input type="hidden" name="utm_source" value={formData.utm_source} />
        <input type="hidden" name="utm_medium" value={formData.utm_medium} />
        <input type="hidden" name="utm_campaign" value={formData.utm_campaign} />
        <input type="hidden" name="utm_term" value={formData.utm_term} />
        <input type="hidden" name="utm_content" value={formData.utm_content} />
        
        {/* Mensaje de error */}
        {formError && (
          <div className="flex items-center gap-2 text-destructive text-sm">
            <AlertCircle size={16} />
            <span>{formError}</span>
          </div>
        )}
        
        {/* Botón de envío */}
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full rounded-xl py-6 text-lg bg-accent hover:bg-accent/90 text-white transition-all duration-300 hover:scale-105 transform"
          id="form-submit"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin" size={18} />
              Procesando solicitud...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              {ctaText}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </span>
          )}
        </Button>
        
        <p className="text-center text-muted-foreground text-sm">
          Al enviar aceptas nuestra{' '}
          <a href="/privacidad" className="underline hover:text-primary">
            Política de Privacidad
          </a>
        </p>
      </form>
    </div>
  );
} 