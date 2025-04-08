"use client";

import { useState } from "react";

type SubmitOptions = {
  endpoint: string;
  payload: any;
  onSuccess?: () => void;
  onError?: (message: string) => void;
};

export const useSubmitForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async ({ endpoint, payload, onSuccess, onError }: SubmitOptions) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const message = errorData.message || res.statusText || "Error al enviar el formulario";
        setError(message);
        onError?.(message);
        return;
      }

      setSuccess(true);
      onSuccess?.();
    } catch (err: any) {
      const message = err.message || "No se pudo conectar al servidor";
      setError(message);
      onError?.(message);
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, success, error };
}; 