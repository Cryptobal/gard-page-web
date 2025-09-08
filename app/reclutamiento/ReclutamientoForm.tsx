'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Loader } from '@googlemaps/js-api-loader';
import { 
  ArrowRight, 
  User, 
  Briefcase, 
  FileCheck, 
  BadgeCheck, 
  Users, 
  GraduationCap,
  CheckCircle,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Car,
  AlertCircle,
  Loader2,
  DollarSign,
  Award,
  Smile,
  Shield
} from 'lucide-react';

import CloudflareImage from '@/components/CloudflareImage';
import { cloudflareImages } from '@/lib/images';
import GardHero from '@/components/layouts/GardHero';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { trackFormSubmission } from '@/lib/analytics/formTracking';
import { API_URLS } from '@/config/api';

// Validador de RUT chileno usando algoritmo Módulo 11
const validateRut = (rut: string) => {
  // Eliminar puntos y guión
  const cleanRut = rut.replace(/[.-]/g, '');
  
  // Obtener dígito verificador
  const dv = cleanRut.slice(-1).toUpperCase();
  const rutNumber = parseInt(cleanRut.slice(0, -1), 10);
  
  // Algoritmo para calcular dígito verificador
  let suma = 0;
  let factor = 2;
  
  // Sumar dígitos multiplicados por factor
  for (let i = rutNumber.toString().length - 1; i >= 0; i--) {
    suma += parseInt(rutNumber.toString().charAt(i), 10) * factor;
    factor = factor === 7 ? 2 : factor + 1;
  }
  
  // Calcular dígito verificador
  const resultado = 11 - (suma % 11);
  
  // Determinar dígito verificador esperado
  let dvEsperado;
  if (resultado === 11) {
    dvEsperado = '0';
  } else if (resultado === 10) {
    dvEsperado = 'K';
  } else {
    dvEsperado = resultado.toString();
  }
  
  // Comparar dígito verificador calculado con el ingresado
  return dv === dvEsperado;
};

// Esquema de validación del formulario
const formSchema = z.object({
  nombre: z.string().min(2, { message: 'El nombre es obligatorio' }),
  apellido: z.string().min(2, { message: 'El apellido es obligatorio' }),
  rut: z.string()
    .min(8, { message: 'RUT inválido' })
    .refine((val) => validateRut(val), { message: 'RUT inválido, verifica el número y dígito verificador' }),
  email: z.string().email({ message: 'Correo electrónico inválido' }),
  telefono: z.string().regex(/^\d{9}$/, { message: 'El teléfono debe tener 9 dígitos' }),
  fechaNacimiento: z.string().min(1, { message: 'La fecha de nacimiento es obligatoria' }),
  direccion: z.string().min(5, { message: 'La dirección es obligatoria' }),
  comuna: z.string().min(1, { message: 'La comuna es obligatoria' }),
  ciudad: z.string().min(1, { message: 'La ciudad es obligatoria' }),
  movilizacionPropia: z.string(),
  certificadoOS10: z.string(),
  comentarios: z.string(),
  // No validamos los UTM ya que son opcionales
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_term: z.string().optional(),
  utm_content: z.string().optional(),
  gclid: z.string().optional(),
  landing_page: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ReclutamientoForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLDivElement>(null);
  const autocompleteInputRef = useRef<HTMLInputElement | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Configuración del formulario
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: '',
      apellido: '',
      rut: '',
      email: '',
      telefono: '',
      fechaNacimiento: '',
      direccion: '',
      comuna: '',
      ciudad: '',
      movilizacionPropia: 'no',
      certificadoOS10: 'no',
      comentarios: '',
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_term: '',
      utm_content: '',
      gclid: '',
      landing_page: '',
    }
  });

  const { setValue } = form;

  // Capturar parámetros UTM y gclid de la URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tags = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'];
      
      // Guardar en localStorage y en el formulario
      tags.forEach(tag => {
        const value = params.get(tag);
        if (value) {
          localStorage.setItem(tag, value);
          sessionStorage.setItem(tag, value);
          setValue(tag as keyof FormValues, value);
          console.log(`✅ Reclutamiento - Parámetro capturado: ${tag}=${value}`);
        } else if (localStorage.getItem(tag)) {
          // Si no está en la URL pero está en localStorage, usarlo
          setValue(tag as keyof FormValues, localStorage.getItem(tag) || '');
        }
      });
      
      // Guardar la página actual
      const landingPage = window.location.pathname;
      localStorage.setItem('landing_page', landingPage);
      sessionStorage.setItem('landing_page', landingPage);
      setValue('landing_page', landingPage);
      console.log(`✅ Reclutamiento - Landing page capturada: ${landingPage}`);
    }
  }, [setValue]);

  // Referencia para autocompletado de Google Places
  const autocompleteRef = (element: HTMLInputElement | null) => {
    autocompleteInputRef.current = element;
  };

  // Cargar API de Google Maps
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

  // Inicializar autocompletado cuando la API esté cargada
  useEffect(() => {
    if (mapLoaded && autocompleteInputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        autocompleteInputRef.current,
        { types: ['address'], componentRestrictions: { country: 'cl' } }
      );

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) return;

        setValue('direccion', place.formatted_address || '');

        // Extraer comuna y ciudad
        let comuna = '';
        let ciudad = '';

        if (place.address_components) {
          for (const component of place.address_components) {
            const componentType = component.types[0];

            if (componentType === 'locality') {
              ciudad = component.long_name;
            }

            if (componentType === 'administrative_area_level_3' || 
                componentType === 'sublocality_level_1' || 
                componentType === 'sublocality') {
              comuna = component.long_name;
            }

            // Si no encontramos comuna en los niveles anteriores, usar administrative_area_level_2
            if (!comuna && componentType === 'administrative_area_level_2') {
              comuna = component.long_name;
            }
          }
        }

        setValue('comuna', comuna);
        setValue('ciudad', ciudad);
      });
    }
  }, [mapLoaded, setValue]);

  // Manejar envío del formulario
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setFormStatus('idle');

    try {
      // Añadir UTM y otros datos de tracking al payload
      const utmData = {
        utm_source: data.utm_source || localStorage.getItem('utm_source') || '',
        utm_medium: data.utm_medium || localStorage.getItem('utm_medium') || '',
        utm_campaign: data.utm_campaign || localStorage.getItem('utm_campaign') || '',
        utm_term: data.utm_term || localStorage.getItem('utm_term') || '',
        utm_content: data.utm_content || localStorage.getItem('utm_content') || '',
        gclid: data.gclid || localStorage.getItem('gclid') || '',
        landing_page: data.landing_page || localStorage.getItem('landing_page') || window.location.pathname,
      };

      // Combinar con los datos del formulario
      const fullFormData = {
        ...data,
        ...utmData
      };

      const response = await fetch(API_URLS.RECLUTAMIENTO, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fullFormData),
      });

      if (response.ok) {
        setFormStatus('success');
        form.reset();
        
        // Evento de formulario enviado usando el helper centralizado
        trackFormSubmission({
          formType: 'reclutamiento',
          additionalData: {
            certificado_os10: data.certificadoOS10,
            movilizacion_propia: data.movilizacionPropia,
            // Incluir explícitamente parámetros UTM
            utm_source: utmData.utm_source,
            utm_medium: utmData.utm_medium,
            utm_campaign: utmData.utm_campaign,
            utm_term: utmData.utm_term,
            utm_content: utmData.utm_content,
            gclid: utmData.gclid,
            landing_page: utmData.landing_page
          }
        });
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Función para hacer scroll al formulario
  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Variantes de animación
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <main className="flex-grow">
      {/* Hero Principal */}
      <GardHero 
        title="Sé parte de Gard Security"
        subtitle="Buscamos guardias responsables, con vocación y compromiso."
        ctaTexto="Postula Aquí"
        badge={{
          icon: <Shield className="h-4 w-4" />,
          text: "Oportunidades Laborales"
        }}
        imageId="428c1028-8f6b-455a-e110-38421eeb5700"
        overlay={true}
        onScrollToForm={scrollToForm}
      />

      {/* ¿A quién buscamos? */}
      <section className="py-16 md:py-24 bg-white dark:bg-gradient-to-b dark:from-[hsl(var(--gard-background))] dark:to-[hsl(var(--gard-background)/_0.85)] dark:backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿A quién buscamos?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              En Gard Security seleccionamos a personas comprometidas, íntegras y capacitadas. 
              Nuestro equipo humano es el pilar de nuestra excelencia operativa.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: <BadgeCheck className="h-8 w-8 text-primary dark:text-[hsl(var(--gard-accent))]" />, title: "Certificado OS10 vigente", description: "Requisito fundamental para ejercer labores de seguridad privada" },
              { icon: <User className="h-8 w-8 text-primary dark:text-[hsl(var(--gard-accent))]" />, title: "Buena presencia", description: "Presentación personal impecable y trato profesional" },
              { icon: <CheckCircle className="h-8 w-8 text-primary dark:text-[hsl(var(--gard-accent))]" />, title: "Compromiso", description: "Responsabilidad, puntualidad y seriedad en el trabajo" },
              { icon: <Calendar className="h-8 w-8 text-primary dark:text-[hsl(var(--gard-accent))]" />, title: "Disponibilidad", description: "Flexibilidad para turnos rotativos según necesidades" },
              { icon: <Briefcase className="h-8 w-8 text-primary dark:text-[hsl(var(--gard-accent))]" />, title: "Experiencia", description: "Valoramos experiencia previa en seguridad (no excluyente)" },
              { icon: <Users className="h-8 w-8 text-primary dark:text-[hsl(var(--gard-accent))]" />, title: "Trabajo en equipo", description: "Capacidad para integrarse a equipos de alto rendimiento" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center p-6 text-center bg-white dark:bg-[hsl(var(--gard-card))] dark:border-[1px] dark:border-[hsl(var(--gard-accent)/_0.15)] rounded-2xl shadow-sm hover:shadow-md transition-all dark:hover:border-[hsl(var(--gard-accent)/_0.3)]"
              >
                <div className="mb-4 p-3 rounded-full bg-transparent dark:bg-[hsl(var(--gard-accent)/_0.1)] dark:backdrop-blur-md">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso de Reclutamiento */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-[#050505] dark:bg-[radial-gradient(circle_at_center,_rgba(15,15,15,0.5)_1px,transparent_1px)] dark:bg-[length:24px_24px]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Proceso de Reclutamiento</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Nuestro proceso garantiza excelencia desde el primer paso. Nos aseguramos de contratar a los mejores para entregar el mejor servicio.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: <Briefcase className="h-10 w-10 text-primary dark:text-[hsl(var(--gard-accent))]" />, title: "Identificación de necesidad", description: "Evaluamos requerimientos específicos del cliente" },
              { icon: <FileCheck className="h-10 w-10 text-primary dark:text-[hsl(var(--gard-accent))]" />, title: "Filtro documental", description: "Revisión de OS10, antecedentes y referencias" },
              { icon: <User className="h-10 w-10 text-primary dark:text-[hsl(var(--gard-accent))]" />, title: "Evaluación psicológica", description: "Evaluamos aptitudes y perfil psicológico" },
              { icon: <BadgeCheck className="h-10 w-10 text-primary dark:text-[hsl(var(--gard-accent))]" />, title: "Verificación de antecedentes", description: "Comprobación exhaustiva de historial laboral y personal" },
              { icon: <Users className="h-10 w-10 text-primary dark:text-[hsl(var(--gard-accent))]" />, title: "Entrevista personal", description: "Entrevista con nuestro equipo de Recursos Humanos" },
              { icon: <GraduationCap className="h-10 w-10 text-primary dark:text-[hsl(var(--gard-accent))]" />, title: "Capacitación inicial", description: "Formación específica según el servicio asignado" }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col bg-white dark:bg-black/50 dark:backdrop-blur-sm dark:border-[1px] dark:border-[rgba(255,255,255,0.07)] p-8 rounded-2xl shadow-sm hover:shadow-md transition-all dark:hover:border-[rgba(255,255,255,0.15)]"
              >
                <div className="flex justify-center items-center w-16 h-16 rounded-full bg-primary/10 dark:bg-[hsl(var(--gard-accent)/_0.1)] mb-6 mx-auto">
                  {step.icon}
                </div>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold mb-4 mx-auto">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">{step.title}</h3>
                <p className="text-muted-foreground text-center">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 md:py-24 bg-white dark:bg-[linear-gradient(180deg,#080808_0%,#0c0c0c_100%)] dark:before:content-[''] dark:before:absolute dark:before:inset-0 dark:before:bg-[linear-gradient(90deg,rgba(20,20,20,0.03)_1px,transparent_1px),linear-gradient(0deg,rgba(20,20,20,0.03)_1px,transparent_1px)] dark:before:bg-[size:20px_20px] dark:before:pointer-events-none dark:before:opacity-60">
        <div className="max-w-7xl mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Beneficios de trabajar en Gard</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Únete a un equipo donde valoramos a nuestros colaboradores y ofrecemos condiciones óptimas para tu desarrollo profesional.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-[rgba(15,15,15,0.5)] dark:backdrop-blur-sm dark:border-[1px] dark:border-[rgba(255,255,255,0.07)] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 dark:hover:border-[rgba(255,255,255,0.15)]"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-[hsl(var(--gard-accent)/_0.1)] rounded-full flex items-center justify-center mb-6">
                  <Briefcase className="h-8 w-8 text-[hsl(var(--gard-accent))]" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-4">Contrato formal</h3>
                <p className="text-muted-foreground">
                  Condiciones laborales claras y seguras desde el primer día.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-[rgba(15,15,15,0.5)] dark:backdrop-blur-sm dark:border-[1px] dark:border-[rgba(255,255,255,0.07)] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 dark:hover:border-[rgba(255,255,255,0.15)]"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-[hsl(var(--gard-accent)/_0.1)] rounded-full flex items-center justify-center mb-6">
                  <DollarSign className="h-8 w-8 text-[hsl(var(--gard-accent))]" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-4">Pagos puntuales</h3>
                <p className="text-muted-foreground">
                  Cumplimos rigurosamente con nuestras obligaciones salariales.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-[rgba(15,15,15,0.5)] dark:backdrop-blur-sm dark:border-[1px] dark:border-[rgba(255,255,255,0.07)] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 dark:hover:border-[rgba(255,255,255,0.15)]"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-[hsl(var(--gard-accent)/_0.1)] rounded-full flex items-center justify-center mb-6">
                  <GraduationCap className="h-8 w-8 text-[hsl(var(--gard-accent))]" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-4">Capacitación constante</h3>
                <p className="text-muted-foreground">
                  Formación presencial y online para tu desarrollo profesional.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-[rgba(15,15,15,0.5)] dark:backdrop-blur-sm dark:border-[1px] dark:border-[rgba(255,255,255,0.07)] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 dark:hover:border-[rgba(255,255,255,0.15)]"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-[hsl(var(--gard-accent)/_0.1)] rounded-full flex items-center justify-center mb-6">
                  <Award className="h-8 w-8 text-[hsl(var(--gard-accent))]" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-4">Crecimiento profesional</h3>
                <p className="text-muted-foreground">
                  Oportunidades reales de avanzar dentro de la empresa.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-[rgba(15,15,15,0.5)] dark:backdrop-blur-sm dark:border-[1px] dark:border-[rgba(255,255,255,0.07)] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 dark:hover:border-[rgba(255,255,255,0.15)]"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-[hsl(var(--gard-accent)/_0.1)] rounded-full flex items-center justify-center mb-6">
                  <Smile className="h-8 w-8 text-[hsl(var(--gard-accent))]" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-4">Excelente clima laboral</h3>
                <p className="text-muted-foreground">
                  Ambiente de trabajo respetuoso y profesional.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-[rgba(15,15,15,0.5)] dark:backdrop-blur-sm dark:border-[1px] dark:border-[rgba(255,255,255,0.07)] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 dark:hover:border-[rgba(255,255,255,0.15)]"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-[hsl(var(--gard-accent)/_0.1)] rounded-full flex items-center justify-center mb-6">
                  <Shield className="h-8 w-8 text-[hsl(var(--gard-accent))]" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-4">Implementos de calidad</h3>
                <p className="text-muted-foreground">
                  Equipamiento completo para realizar tu trabajo con seguridad.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Formulario de Postulación */}
      <section ref={formRef} className="py-16 md:py-24 bg-white dark:bg-[hsl(var(--gard-background))]">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white dark:bg-[hsl(var(--gard-card))] shadow-md rounded-2xl overflow-hidden"
          >
            <div className="relative h-32 md:h-48 bg-[hsl(var(--gard-accent))]">
              <CloudflareImage
                imageId={cloudflareImages.hero.reclutamiento}
                alt="Trabaja con nosotros - Gard Security"
                fill
                className="object-cover opacity-20"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                <h2 className="text-2xl md:text-3xl font-bold text-center">Formulario de Postulación</h2>
                <p className="text-center mt-2 max-w-xl">Complete sus datos para ser considerado en nuestros procesos de selección</p>
              </div>
            </div>

            {formStatus === 'success' ? (
              <div className="p-8">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-8 text-center">
                  <div className="inline-flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 w-16 h-16 mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">¡Postulación recibida con éxito!</h3>
                  <p className="text-muted-foreground mb-6">
                    Hemos recibido correctamente tu información. Nuestro equipo de recursos humanos revisará tu perfil y te contactará si tu candidatura avanza en el proceso de selección.
                  </p>
                  <Button variant="gard-primary" className="rounded-xl">
                    Volver al Inicio
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-8">
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
                              <Input placeholder="Ingrese su nombre" {...field} />
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
                              <Input placeholder="Ingrese su apellido" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="rut"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>RUT <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="12345678-9" 
                                {...field} 
                                onChange={(e) => {
                                  // Formatear RUT (opcional)
                                  field.onChange(e.target.value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Correo Electrónico <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="ejemplo@correo.com" 
                                {...field} 
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
                            <FormLabel>Teléfono Celular <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input 
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

                      <FormField
                        control={form.control}
                        name="fechaNacimiento"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fecha de Nacimiento <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input 
                                type="date" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="direccion"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dirección <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Ingrese su dirección" 
                              {...field} 
                              ref={autocompleteRef}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="comuna"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Comuna <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Comuna" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="ciudad"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ciudad <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Ciudad" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="movilizacionPropia"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>¿Cuenta con movilización propia? <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex space-x-6"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="si" id="movilizacion-si" />
                                <label htmlFor="movilizacion-si" className="cursor-pointer">
                                  Sí
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="movilizacion-no" />
                                <label htmlFor="movilizacion-no" className="cursor-pointer">
                                  No
                                </label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="certificadoOS10"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>¿Cuenta con certificado OS10 vigente? <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex space-x-6"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="si" id="os10-si" />
                                <label htmlFor="os10-si" className="cursor-pointer">
                                  Sí
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="os10-no" />
                                <label htmlFor="os10-no" className="cursor-pointer">
                                  No
                                </label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="comentarios"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Comentarios Adicionales</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Indique experiencia previa, disponibilidad horaria, u otra información relevante..."
                              className="resize-none"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {formStatus === 'error' && (
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-800 dark:text-red-300 rounded-md flex items-start text-sm">
                        <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Hubo un problema al enviar el formulario. Por favor, inténtelo nuevamente.</span>
                      </div>
                    )}

                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        className="w-full rounded-xl"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            Enviar postulación
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 md:py-20 bg-primary gard-dark-bg">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">¿Listo para proteger con excelencia?</h2>
            <p className="text-xl text-white/80 mb-8">
              Únete a Gard Security y desarrolla tu carrera en una empresa líder del sector.
            </p>
            <Button
              onClick={scrollToForm}
              size="lg"
              className="bg-[hsl(var(--gard-accent))] text-white hover:bg-[hsl(var(--gard-accent))]/90 text-lg px-8 py-6 h-auto rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Postula Ahora →
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 