"use client";

import React, { useState, useEffect, useRef, RefCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Loader } from '@googlemaps/js-api-loader';
import { useGtmEvent } from '../../components/EventTracker';
import API_URLS from '@/app/config/api';
import { trackFormSubmission } from '@/lib/analytics/formTracking';

// Declaración simplificada para Google Maps API
declare global {
  interface Window {
    google: any;
  }
}

const formSchema = z.object({
  nombre: z.string().min(2, { message: 'El nombre es obligatorio' }),
  apellido: z.string().min(2, { message: 'El apellido es obligatorio' }),
  email: z.string().email({ message: 'Ingresa un correo electrónico válido' }),
  telefono: z.string().regex(/^\d{9}$/, { message: 'El teléfono debe tener 9 dígitos numéricos' }),
  empresa: z.string().min(2, { message: 'La empresa es obligatoria' }),
  direccion: z.string().min(5, { message: 'La dirección es obligatoria' }),
  comuna: z.string().optional(),
  ciudad: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  tipoIndustria: z.string().min(1, { message: 'Selecciona un tipo de industria' }),
  servicioRequerido: z.string().min(1, { message: 'Selecciona un servicio requerido' }),
  cotizacion: z.string().min(3, { message: 'Proporciona los detalles de tu solicitud' }),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_term: z.string().optional(),
  utm_content: z.string().optional(),
  gclid: z.string().optional(),
  landing_page: z.string().optional(),
});

// Lista de servicios
const servicios = [
  'Guardias de Seguridad',
  'Vigilancia Electrónica',
  'Control de Acceso',
  'Monitoreo 24/7',
  'Seguridad Perimetral',
  'Drones de Seguridad',
  'Consultoría de Seguridad',
  'Auditoría de Seguridad',
  'Prevención de Intrusiones',
  'Otro',
];

type FormValues = z.infer<typeof formSchema>;

interface CotizacionFormProps {
  prefillServicio?: string;
  prefillIndustria?: string;
}

// Función para generar el enlace de Google Maps
const getGoogleMapsLink = (direccion: string) => {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`;
};

export default function CotizacionForm({ prefillServicio, prefillIndustria }: CotizacionFormProps = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const autocompleteInputRef = useRef<HTMLInputElement | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const { pushEvent } = useGtmEvent();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
      tipoIndustria: '',
      servicioRequerido: '',
      cotizacion: '',
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_term: '',
      utm_content: '',
      gclid: '',
      landing_page: '',
    },
  });

  const { setValue } = form;

  // Crear una ref callback que pueda ser usada directamente
  const autocompleteRef: RefCallback<HTMLInputElement> = (element) => {
    autocompleteInputRef.current = element;
  };

  // Efecto para recuperar datos desde sessionStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Obtener valores guardados en navegación previa o desde props
    const savedIndustry = prefillIndustria || sessionStorage.getItem('user_industry') || '';
    const savedService = prefillServicio || sessionStorage.getItem('user_service') || '';
    
    // Rellenar formulario con datos guardados si existen
    if (savedIndustry) {
      setValue('tipoIndustria', savedIndustry);
      console.log('✅ Industria cargada:', savedIndustry);
    }
    
    // Autocompletar el servicio requerido si existe
    if (savedService) {
      // Buscar coincidencia en la lista de servicios
      const servicioEncontrado = servicios.find(s => 
        s.toLowerCase().includes(savedService.toLowerCase())
      );
      
      if (servicioEncontrado) {
        setValue('servicioRequerido', servicioEncontrado);
        console.log('✅ Servicio requerido cargado:', servicioEncontrado);
      }
      
      // Personalizar el texto de cotización con el servicio
      const cotizacionInicial = `Estoy interesado en contratar servicios de ${savedService}`;
      setValue('cotizacion', cotizacionInicial);
      console.log('✅ Servicio cargado:', savedService);
    }
    
    // Capturar parámetros UTM de la URL y localStorage
    const urlParams = new URLSearchParams(window.location.search);
    
    // Lista de parámetros a capturar
    const trackingParams = [
      'utm_source', 
      'utm_medium', 
      'utm_campaign', 
      'utm_term', 
      'utm_content', 
      'gclid'
    ];
    
    // Capturar valores de URL o localStorage
    trackingParams.forEach(param => {
      // Priorizar valor de URL
      const value = urlParams.get(param) || localStorage.getItem(param) || sessionStorage.getItem(param) || '';
      if (value) {
        setValue(param as keyof FormValues, value);
        // Guardar en storage para persistencia
        localStorage.setItem(param, value);
        sessionStorage.setItem(param, value);
        console.log(`✅ Parámetro capturado: ${param}=${value}`);
      }
    });
    
    // Capturar landing_page (página actual)
    const landing = window.location.pathname;
    setValue('landing_page', landing);
    localStorage.setItem('landing_page', landing);
    sessionStorage.setItem('landing_page', landing);
  }, [setValue, prefillServicio, prefillIndustria]);

  useEffect(() => {
    // Carga de la API de Google Maps
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

  useEffect(() => {
    if (!mapLoaded || !autocompleteInputRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(autocompleteInputRef.current, {
      types: ['address'],
      componentRestrictions: { country: 'cl' },
    });

    // Determinar si estamos en un dispositivo móvil
    const isMobile = window.innerWidth < 768;
    
    // Ajustar opciones de autocompletado para móviles
    if (isMobile) {
      // Limitar el número de predicciones en móviles para evitar que ocupe demasiado espacio
      autocomplete.setOptions({
        fields: ['formatted_address', 'geometry', 'address_components'],
      });
    }

    // Prevenir el scroll automático en móviles cuando se abre el autocompletado
    if (isMobile && autocompleteInputRef.current) {
      autocompleteInputRef.current.addEventListener('focus', (e) => {
        // Mantener la posición de scroll actual
        const currentScrollPos = window.scrollY;
        
        // Pequeño retraso para asegurar que el evento se maneja después de que el navegador
        // intente hacer scroll automáticamente
        setTimeout(() => {
          window.scrollTo({
            top: currentScrollPos,
            behavior: 'auto'
          });
        }, 10);
      });
    }

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.address_components) return;

      setValue('direccion', place.formatted_address || '');

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

      // Seguir capturando comuna y ciudad pero no mostrarlos visualmente
      setValue('comuna', comuna);
      setValue('ciudad', ciudad);

      // Extraer coordenadas de latitud y longitud
      if (place.geometry && place.geometry.location) {
        setValue('latitude', place.geometry.location.lat());
        setValue('longitude', place.geometry.location.lng());
        console.log('Coordenadas extraídas:', {
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng()
        });
      }
      
      // En móviles, después de seleccionar una dirección, asegurar que el usuario
      // pueda seguir viendo el formulario correctamente
      if (isMobile) {
        // Pequeño retraso para dar tiempo a que se complete el autocompletado
        setTimeout(() => {
          // Obtener el siguiente campo después de la dirección para asegurar una buena UX
          const nextField = document.querySelector('[name="tipoIndustria"]');
          if (nextField) {
            // Scroll para asegurar que los campos siguientes sean visibles
            window.scrollBy({
              top: 100,
              behavior: 'smooth'
            });
          }
        }, 300);
      }
    });

    return () => {
      // Cleanup si es necesario
      if (isMobile && autocompleteInputRef.current) {
        autocompleteInputRef.current.removeEventListener('focus', () => {});
      }
    };
  }, [mapLoaded, setValue]);

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      
      // Asegurar que los parámetros UTM estén incluidos antes de enviar
      const completeData = {
        ...data,
        utm_source: data.utm_source || localStorage.getItem('utm_source') || '',
        utm_medium: data.utm_medium || localStorage.getItem('utm_medium') || '',
        utm_campaign: data.utm_campaign || localStorage.getItem('utm_campaign') || '',
        utm_term: data.utm_term || localStorage.getItem('utm_term') || '',
        utm_content: data.utm_content || localStorage.getItem('utm_content') || '',
        gclid: data.gclid || localStorage.getItem('gclid') || '',
        landing_page: data.landing_page || localStorage.getItem('landing_page') || window.location.pathname,
        // Agregar el enlace de Google Maps
        direccionGoogleMaps: getGoogleMapsLink(data.direccion),
      };
      
      const response = await fetch(API_URLS.COTIZACION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(completeData),
      });
      
      if (response.ok) {
        setFormStatus('success');
        form.reset();
        // Limpiar sessionStorage después de enviar el formulario
        sessionStorage.removeItem('user_service');
        sessionStorage.removeItem('user_industry');
        sessionStorage.removeItem('user_service_slug');
        sessionStorage.removeItem('user_industry_slug');
        
        // Evento de formulario enviado usando el helper centralizado
        trackFormSubmission({
          formType: 'cotizacion',
          additionalData: {
            tipo_industria: data.tipoIndustria,
            servicio_requerido: data.servicioRequerido,
            pagina_origen: window.location.pathname,
            // Incluir explícitamente parámetros UTM
            utm_source: completeData.utm_source,
            utm_medium: completeData.utm_medium,
            utm_campaign: completeData.utm_campaign,
            utm_term: completeData.utm_term,
            utm_content: completeData.utm_content,
            gclid: completeData.gclid,
            landing_page: completeData.landing_page
          }
        });
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
      console.error('Error al enviar el formulario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-sm p-6 md:p-8 border border-gray-200 dark:border-gray-700">
      {formStatus === 'success' ? (
        <div className="text-center py-8">
          <h2 className="text-heading-4 text-primary mb-4">¡Tu solicitud ha sido enviada correctamente!</h2>
          <p className="text-body-base mb-6">Te contactaremos en menos de 12 horas.</p>
          <Button 
            onClick={() => setFormStatus('idle')}
            variant="gard-primary"
            className="rounded-2xl"
          >
            Enviar otra cotización
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Tu nombre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="apellido"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Tu apellido" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email de contacto <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="correo@ejemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="telefono"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de teléfono <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="912345678"
                        maxLength={9}
                        {...field}
                        onChange={(e) => {
                          // Solo permitir números
                          const value = e.target.value.replace(/\D/g, '');
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="empresa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Empresa <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre de tu empresa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="direccion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección o ubicación del servicio <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingresa la dirección"
                      {...field}
                      ref={autocompleteRef}
                      // Añadir atributos para mejorar la experiencia móvil
                      autoComplete="street-address"
                      onFocus={(e) => {
                        // En móviles, asegurar que el campo permanezca visible al enfocarlo
                        if (window.innerWidth < 768) {
                          // Pequeño retraso para permitir que el teclado aparezca primero
                          setTimeout(() => {
                            e.target.scrollIntoView({
                              behavior: 'smooth',
                              block: 'center'
                            });
                          }, 100);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <input type="hidden" {...form.register('comuna')} />
            <input type="hidden" {...form.register('ciudad')} />
            <input type="hidden" {...form.register('latitude')} />
            <input type="hidden" {...form.register('longitude')} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="tipoIndustria"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de industria <span className="text-red-500">*</span></FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona el tipo de industria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Banca y Finanzas">Banca y Finanzas</SelectItem>
                        <SelectItem value="Retail y Centros Comerciales">Retail y Centros Comerciales</SelectItem>
                        <SelectItem value="Salud (Hospitales y Clínicas)">Salud (Hospitales y Clínicas)</SelectItem>
                        <SelectItem value="Educación (Colegios y Universidades)">Educación (Colegios y Universidades)</SelectItem>
                        <SelectItem value="Infraestructura Crítica">Infraestructura Crítica</SelectItem>
                        <SelectItem value="Transporte y Logística">Transporte y Logística</SelectItem>
                        <SelectItem value="Construcción e Inmobiliario">Construcción e Inmobiliario</SelectItem>
                        <SelectItem value="Minería y Energía">Minería y Energía</SelectItem>
                        <SelectItem value="Corporativo y Oficinas">Corporativo y Oficinas</SelectItem>
                        <SelectItem value="Condominios y Residencias">Condominios y Residencias</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="servicioRequerido"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Servicio requerido <span className="text-red-500">*</span></FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona el servicio que necesitas" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {servicios.map((servicio) => (
                          <SelectItem key={servicio} value={servicio}>{servicio}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="cotizacion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cotización <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Explícanos tus necesidades de seguridad para ofrecerte una cotización personalizada" 
                      rows={5}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {formStatus === 'error' && (
              <div className="bg-red-50 p-4 rounded-md text-red-700 text-sm">
                Hubo un error al enviar. Intenta nuevamente.
              </div>
            )}

            <Button 
              type="submit" 
              disabled={isSubmitting}
              variant="gard-primary"
              size="lg"
              className="w-full md:w-auto rounded-2xl"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar Cotización"
              )}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
} 