"use client";

import React, { useState, useEffect, useRef, RefCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, CheckCircle } from 'lucide-react';
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
import { motion, AnimatePresence } from 'framer-motion';
import API_URLS from '@/app/config/api';
import { trackFormSubmission } from '@/lib/analytics/formTracking';

// Declaración simplificada para Google Maps API
declare global {
  interface Window {
    google: any;
    gtag?: (command: string, action: string, params?: any) => void;
  }
}

// Lista de industrias
const industrias = [
  'Banca y Finanzas',
  'Retail y Centros Comerciales',
  'Salud (Hospitales y Clínicas)',
  'Educación (Colegios y Universidades)',
  'Infraestructura Crítica',
  'Transporte y Logística',
  'Construcción e Inmobiliario',
  'Minería y Energía',
  'Corporativo y Oficinas',
  'Condominios y Residencias',
];

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

// Ciudades principales de Chile
const ciudades = [
  'Santiago',
  'Valparaíso',
  'Concepción',
  'La Serena',
  'Antofagasta',
  'Viña del Mar',
  'Temuco',
  'Rancagua',
  'Talca',
  'Puerto Montt',
  'Otra',
];

const formSchema = z.object({
  nombre: z.string().min(2, { message: 'El nombre es obligatorio' }),
  apellidos: z.string().optional(),
  email: z.string().email({ message: 'Ingresa un correo electrónico válido' }),
  telefono: z.string().regex(/^\d{9}$/, { message: 'El teléfono debe tener 9 dígitos numéricos' }).optional(),
  empresa: z.string().min(2, { message: 'La empresa es obligatoria' }),
  paginaWeb: z.string().optional(),
  ciudad: z.string().min(2, { message: 'La ciudad es obligatoria' }),
  industria: z.string().min(1, { message: 'Selecciona una industria' }),
  servicio: z.string().min(1, { message: 'Selecciona un servicio requerido' }),
  comentarios: z.string().optional(),
  pagina_origen: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface CotizadorReutilizableProps {
  className?: string;
  prefillServicio?: string;
  prefillIndustria?: string;
}

export default function CotizadorReutilizable({ 
  className = "", 
  prefillServicio, 
  prefillIndustria 
}: CotizadorReutilizableProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: '',
      apellidos: '',
      email: '',
      telefono: '',
      empresa: '',
      paginaWeb: '',
      ciudad: '',
      industria: '',
      servicio: '',
      comentarios: '',
      pagina_origen: '',
    },
  });

  const { setValue } = form;

  // Efecto para obtener la URL actual y prefill de datos
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Capturar la URL de origen automáticamente
      setValue('pagina_origen', window.location.href);
      
      // Auto-rellenar campos desde los props o parámetros de URL
      if (prefillServicio) {
        setValue('servicio', prefillServicio);
      }
      
      if (prefillIndustria) {
        setValue('industria', prefillIndustria);
      }
      
      // Extraer automáticamente de la URL
      const path = window.location.pathname;
      
      // Auto-rellenar desde URL si no se especificó en props
      if (!prefillServicio) {
        // Detectar si estamos en una página de servicio
        if (path.includes('/servicios/')) {
          const servicioSlug = path.split('/servicios/')[1]?.split('/')[0];
          if (servicioSlug) {
            // Convertir slug a nombre de servicio
            const servicioFormateado = servicioSlug
              .split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
            
            // Buscar coincidencia parcial en la lista de servicios
            const servicioEncontrado = servicios.find(s => 
              s.toLowerCase().includes(servicioFormateado.toLowerCase())
            );
            
            if (servicioEncontrado) {
              setValue('servicio', servicioEncontrado);
            }
          }
        }
      }
      
      // Auto-rellenar industria desde URL si no se especificó en props
      if (!prefillIndustria) {
        if (path.includes('/industrias/')) {
          const industriaSlug = path.split('/industrias/')[1]?.split('/')[0];
          if (industriaSlug) {
            // Convertir slug a nombre de industria
            const industriaFormateada = industriaSlug
              .split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
            
            // Buscar coincidencia parcial en la lista de industrias
            const industriaEncontrada = industrias.find(i => 
              i.toLowerCase().includes(industriaFormateada.toLowerCase())
            );
            
            if (industriaEncontrada) {
              setValue('industria', industriaEncontrada);
            }
          }
        }
      }
    }
  }, [setValue, prefillServicio, prefillIndustria]);

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      
      const response = await fetch(API_URLS.COTIZACION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        setFormStatus('success');
        form.reset();
        
        // Emitir evento para GA4
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'submit_form_submission', { 
            page_location: window.location.href 
          });
        }
        
        // Evento de formulario enviado usando el helper centralizado
        trackFormSubmission({
          formType: 'cotizacion',
          additionalData: {
            tipo_industria: data.industria,
            tipo_servicio: data.servicio,
            pagina_origen: data.pagina_origen
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

  // Volver al inicio de la página
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Redirigir a servicios
  const goToServices = () => {
    window.location.href = '/servicios';
  };

  return (
    <div className={`bg-gray-900 bg-opacity-95 rounded-xl shadow-lg border border-gray-800 p-6 md:p-8 ${className} relative overflow-hidden`}>
      {/* Textura sutil de ruido para el fondo */}
      <div className="absolute inset-0 bg-[url('/assets/noise-pattern.png')] opacity-5 pointer-events-none"></div>
      
      {/* Degradado sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none"></div>
      
      {formStatus === 'success' ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8 relative z-10"
        >
          {/* Animación de éxito */}
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                transition: { duration: 0.5 }
              }}
            >
              <svg 
                className="w-24 h-24 text-primary"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="8"
                  initial={{ pathLength: 0 }}
                  animate={{ 
                    pathLength: 1,
                    transition: { delay: 0.2, duration: 0.8, ease: "easeOut" }
                  }}
                />
                <motion.path
                  d="M30 50L45 65L70 35"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ 
                    pathLength: 1,
                    transition: { delay: 0.8, duration: 0.6, ease: "easeOut" }
                  }}
                />
              </svg>
            </motion.div>
          </div>
          
          <h2 className="text-heading-4 text-primary mb-4">¡Gracias por confiar en <strong>Gard Security</strong>!</h2>
          <p className="text-body-base text-white/90 mb-8">Un ejecutivo se pondrá en contacto contigo en menos de 12 horas.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={scrollToTop}
              variant="outline"
              className="rounded-xl border-gray-700 text-white hover:bg-gray-800 hover:text-white"
            >
              Volver arriba
            </Button>
            <Button 
              onClick={goToServices}
              variant="gard-primary"
              className="rounded-xl"
            >
              Explorar servicios
            </Button>
          </div>
        </motion.div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/90">Nombre *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Tu nombre" 
                        {...field} 
                        className="bg-gray-800/70 border-gray-700 text-white placeholder:text-gray-400 rounded-xl focus-visible:ring-primary/70"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="apellidos"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/90">Apellidos</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Tus apellidos" 
                        {...field} 
                        className="bg-gray-800/70 border-gray-700 text-white placeholder:text-gray-400 rounded-xl focus-visible:ring-primary/70"
                      />
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
                    <FormLabel className="text-white/90">Email de contacto *</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="correo@empresa.com" 
                        {...field} 
                        className="bg-gray-800/70 border-gray-700 text-white placeholder:text-gray-400 rounded-xl focus-visible:ring-primary/70"
                      />
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
                    <FormLabel className="text-white/90">Número de teléfono</FormLabel>
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
                        className="bg-gray-800/70 border-gray-700 text-white placeholder:text-gray-400 rounded-xl focus-visible:ring-primary/70"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="empresa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/90">Empresa *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Nombre de tu empresa" 
                        {...field} 
                        className="bg-gray-800/70 border-gray-700 text-white placeholder:text-gray-400 rounded-xl focus-visible:ring-primary/70"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="paginaWeb"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/90">Página Web</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="www.ejemplo.com" 
                        {...field} 
                        className="bg-gray-800/70 border-gray-700 text-white placeholder:text-gray-400 rounded-xl focus-visible:ring-primary/70"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="ciudad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/90">Ciudad *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-gray-800/70 border-gray-700 text-white rounded-xl focus-visible:ring-primary/70">
                        <SelectValue placeholder="Selecciona tu ciudad" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      {ciudades.map((ciudad) => (
                        <SelectItem key={ciudad} value={ciudad}>{ciudad}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="industria"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/90">Industria *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-gray-800/70 border-gray-700 text-white rounded-xl focus-visible:ring-primary/70">
                          <SelectValue placeholder="Selecciona la industria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        {industrias.map((industria) => (
                          <SelectItem key={industria} value={industria}>{industria}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="servicio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/90">Servicio requerido *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-gray-800/70 border-gray-700 text-white rounded-xl focus-visible:ring-primary/70">
                          <SelectValue placeholder="Selecciona el servicio" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
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
              name="comentarios"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/90">Comentarios adicionales</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Cuéntanos más sobre tus necesidades de seguridad" 
                      rows={4}
                      {...field} 
                      className="bg-gray-800/70 border-gray-700 text-white placeholder:text-gray-400 rounded-xl focus-visible:ring-primary/70 resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {formStatus === 'error' && (
              <div className="bg-red-900/30 border border-red-700/50 p-4 rounded-xl text-red-300 text-sm">
                Hubo un error al enviar el formulario. Por favor, intenta nuevamente.
              </div>
            )}

            <Button 
              type="submit" 
              disabled={isSubmitting}
              variant="gard-primary"
              size="lg"
              className="w-full md:w-auto rounded-xl shadow-lg hover:shadow-primary/20 transition-all"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
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