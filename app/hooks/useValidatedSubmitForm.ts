"use client";

import { useState } from 'react';

interface SubmitOptions<T> {
  endpoint: string;
  payload: T;
  validate?: (data: T) => string | null;
  gtmEventName?: string;
  gtmFormType?: string;
  onSuccess?: () => void;
  onError?: (msg: string) => void;
}

export function useValidatedSubmitForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async <T>({ 
    endpoint, 
    payload, 
    validate, 
    gtmEventName,
    gtmFormType,
    onSuccess, 
    onError 
  }: SubmitOptions<T>) => {
    // Reset states
    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      // Validate data if validator provided
      if (validate) {
        const validationError = validate(payload);
        if (validationError) {
          setError(validationError);
          setLoading(false);
          if (onError) onError(validationError);
          return;
        }
      }

      // Collect UTM parameters from sessionStorage
      const utmSource = sessionStorage.getItem("utm_source") || "";
      const utmMedium = sessionStorage.getItem("utm_medium") || "";
      const utmCampaign = sessionStorage.getItem("utm_campaign") || "";
      const utmTerm = sessionStorage.getItem("utm_term") || "";
      const utmContent = sessionStorage.getItem("utm_content") || "";

      // Add UTM parameters to payload
      const payloadWithUtm = {
        ...payload,
        utm: {
          utm_source: utmSource,
          utm_medium: utmMedium,
          utm_campaign: utmCampaign,
          utm_term: utmTerm,
          utm_content: utmContent,
        },
      };

      // Determinar si estamos en desarrollo
      const isDev = typeof window !== 'undefined' && 
                   (window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1');

      // En desarrollo, simular una respuesta exitosa después de 1 segundo
      if (isDev) {
        console.log('Modo desarrollo: Simulando envío exitoso al backend');
        console.log('Datos enviados:', payloadWithUtm);
        
        // Simular tiempo de respuesta
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simular respuesta exitosa
        setSuccess(true);
        
        // GTM
        if (gtmEventName) {
          console.log('Evento GTM:', gtmEventName, {
            form_type: gtmFormType || 'form',
            page_path: window.location.pathname,
            ...payloadWithUtm.utm
          });
        }
        
        if (onSuccess) onSuccess();
      } else {
        // En producción, enviar datos reales al API
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payloadWithUtm),
        });

        if (!response.ok) {
          let errorMessage = 'Error al enviar el formulario';
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
          } catch (e) {
            // Si no podemos parsear el JSON, usamos el mensaje genérico
          }
          throw new Error(errorMessage);
        }

        // Handle success
        setSuccess(true);

        // Push event to GTM if configured
        if (gtmEventName) {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: gtmEventName,
            form_type: gtmFormType || 'form',
            page_path: window.location.pathname,
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign: utmCampaign,
            utm_term: utmTerm,
            utm_content: utmContent
          });
        }

        // Call onSuccess callback if provided
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      // Handle error
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      if (onError) onError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, success, error };
}

export default useValidatedSubmitForm; 