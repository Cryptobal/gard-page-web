/**
 * Prueba de envío a OPAI real - POST /api/public/leads
 * Ejecutar: node scripts/test-opai-lead.js
 */

const OPAI_URL = process.env.NEXT_PUBLIC_OPAI_API_URL || "https://opai.gard.cl";

// Payload idéntico al que envía el cotizador (modo rápido con 2 puestos)
const payload = {
  nombre: "Prueba",
  apellido: "OPAI Web Cotizador",
  email: "prueba-cotizador@test.gard.cl",
  celular: "912345678",
  empresa: "Test Gard Web",
  direccion: "Av. Prueba 123, Santiago",
  comuna: "Las Condes",
  ciudad: "Santiago",
  pagina_web: "https://test.gard.cl",
  industria: "Minería",
  servicio: "guardias_seguridad",
  detalle:
    "Prueba de envío desde cotizador web - dotación modo rápido. 1) 2 guardias 24h L-D. 2) 1 guardia 12h noche S-D.",
  dotacion: [
    {
      puesto: "Guardia de Seguridad",
      cantidad: 2,
      dias: [
        "lunes",
        "martes",
        "miercoles",
        "jueves",
        "viernes",
        "sabado",
        "domingo",
      ],
      horaInicio: "00:00",
      horaFin: "00:00",
    },
    {
      puesto: "Guardia de Seguridad",
      cantidad: 1,
      dias: ["sabado", "domingo"],
      horaInicio: "20:00",
      horaFin: "08:00",
    },
  ],
  source: "web_cotizador",
  whatsapp_prefilled_message:
    "Hola, Prueba. Soy Prueba OPAI Web Cotizador de Test Gard Web. Te envío una cotización y el detalle de la cotización.",
  whatsapp_message_comercial_to_cliente:
    "Hola Prueba, te contacto de gard.cl. Nos enviaste una cotización para la empresa Test Gard Web, ubicada en Av. Prueba 123, Santiago, Las Condes, Santiago, que consiste en 2 puestos de Guardia de Seguridad, 1 puesto de Guardia de Seguridad. Prueba de envío desde cotizador web...",
};

const url = `${OPAI_URL}/api/public/leads`;

async function main() {
  console.log("Enviando prueba a OPAI:", url);
  console.log("Payload (dotación):", JSON.stringify(payload.dotacion, null, 2));
  console.log("");

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }

  console.log("Status:", res.status, res.statusText);
  console.log("Response:", typeof data === "object" ? JSON.stringify(data, null, 2) : data);

  if (res.ok && data?.success) {
    console.log("\n✓ Lead creado en OPAI. ID:", data.data?.id ?? "(revisar en CRM)");
  } else {
    console.log("\n✗ Error:", data?.error ?? data);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
