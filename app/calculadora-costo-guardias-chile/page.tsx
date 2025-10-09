'use client';

import React, { useState } from 'react';
import { Calculator, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import FormularioCotizacionSeccion from '@/app/components/FormularioCotizacionSeccion';
import { FAQSection } from '@/components/seo/FAQSchema';

const faqs = [
  { question: '¿Estos precios son exactos?', answer: 'Los precios mostrados son estimaciones basadas en tarifas promedio 2025. El costo final puede variar según ubicación específica, horarios, tecnología adicional y volumen de servicio. Solicite cotización personalizada para precio exacto.' },
  { question: '¿Qué incluye el precio base?', answer: 'El precio incluye: personal capacitado y uniformado, supervisión de turno, bitácora digital, reemplazo por ausencias, y respuesta a incidentes. No incluye: equipamiento especial, tecnología CCTV, o servicios adicionales que se cotizan por separado.' },
  { question: '¿Hay descuentos por volumen?', answer: 'Sí, ofrecemos descuentos progresivos: 5% para 6+ guardias, 10% para 12+ guardias, 15% para 20+ guardias. También descuentos por contratos anuales vs mensuales.' },
  { question: '¿El precio incluye certificación OS10 para minería?', answer: 'Sí, para servicios en faenas mineras, el 100% de nuestro personal cuenta con certificación OS10 vigente sin costo adicional. Es parte de nuestro estándar para el sector minero.' }
];

export default function CalculadoraCostosPage() {
  const [industria, setIndustria] = useState('');
  const [numGuardias, setNumGuardias] = useState('2');
  const [ciudad, setCiudad] = useState('');
  const [turno, setTurno] = useState('');
  const [costoEstimado, setCostoEstimado] = useState<number | null>(null);

  const calcularCosto = () => {
    let costoBase = 0;
    
    // Costo base por industria
    const costosIndustria: Record<string, number> = {
      'mineria': 2000000,
      'logistica': 1200000,
      'corporativo': 1400000,
      'construccion': 1000000,
      'retail': 1100000,
      'otro': 1200000
    };
    
    costoBase = costosIndustria[industria] || 1200000;
    
    // Multiplicador por turno
    const multiplicadorTurno: Record<string, number> = {
      '12h-diurno': 1.0,
      '12h-nocturno': 1.15,
      '24h': 2.2
    };
    
    costoBase *= (multiplicadorTurno[turno] || 1.0);
    
    // Multiplicador por ciudad (costo de vida)
    const multiplicadorCiudad: Record<string, number> = {
      'santiago': 1.1,
      'antofagasta': 1.3,
      'iquique': 1.25,
      'valparaiso': 1.05,
      'concepcion': 1.0,
      'otra': 1.0
    };
    
    costoBase *= (multiplicadorCiudad[ciudad] || 1.0);
    
    // Multiplicar por número de guardias
    const guardias = parseInt(numGuardias);
    let costoTotal = costoBase * guardias;
    
    // Descuento por volumen
    if (guardias >= 20) costoTotal *= 0.85;
    else if (guardias >= 12) costoTotal *= 0.90;
    else if (guardias >= 6) costoTotal *= 0.95;
    
    setCostoEstimado(Math.round(costoTotal));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const puedeCalcular = industria && ciudad && turno;

  return (
    <>
      <section className="gard-section py-16 md:py-24">
        <div className="gard-container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
              <Calculator className="h-4 w-4 mr-2" />
              <span>Calculadora Actualizada 2025</span>
            </div>
            <h1 className="text-heading-1 mb-6">Calculadora de Costo: Guardias de Seguridad en Chile</h1>
            <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
              Estime el costo mensual de guardias de seguridad para su empresa. Precios basados en tarifas reales 2025.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-card rounded-2xl shadow-xl p-8 border">
              <h2 className="text-2xl font-semibold mb-6">Configure su Servicio</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Industria o Sector</label>
                  <Select value={industria} onValueChange={setIndustria}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione su industria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mineria">Minería (Certificación OS10)</SelectItem>
                      <SelectItem value="logistica">Bodegas y Logística</SelectItem>
                      <SelectItem value="corporativo">Edificios Corporativos</SelectItem>
                      <SelectItem value="construccion">Construcción</SelectItem>
                      <SelectItem value="retail">Retail y Comercio</SelectItem>
                      <SelectItem value="otro">Otra Industria</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Ciudad</label>
                  <Select value={ciudad} onValueChange={setCiudad}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione ciudad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="santiago">Santiago (RM)</SelectItem>
                      <SelectItem value="antofagasta">Antofagasta</SelectItem>
                      <SelectItem value="valparaiso">Valparaíso</SelectItem>
                      <SelectItem value="concepcion">Concepción</SelectItem>
                      <SelectItem value="iquique">Iquique</SelectItem>
                      <SelectItem value="otra">Otra Ciudad</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tipo de Turno</label>
                  <Select value={turno} onValueChange={setTurno}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione turno" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12h-diurno">12 horas Diurno (8:00-20:00)</SelectItem>
                      <SelectItem value="12h-nocturno">12 horas Nocturno (20:00-8:00)</SelectItem>
                      <SelectItem value="24h">24 horas (Cobertura Completa)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Número de Guardias</label>
                  <Select value={numGuardias} onValueChange={setNumGuardias}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione cantidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 guardia</SelectItem>
                      <SelectItem value="2">2 guardias</SelectItem>
                      <SelectItem value="3">3 guardias</SelectItem>
                      <SelectItem value="4">4 guardias</SelectItem>
                      <SelectItem value="5">5 guardias</SelectItem>
                      <SelectItem value="6">6 guardias (5% descuento)</SelectItem>
                      <SelectItem value="8">8 guardias (5% descuento)</SelectItem>
                      <SelectItem value="10">10 guardias (5% descuento)</SelectItem>
                      <SelectItem value="12">12 guardias (10% descuento)</SelectItem>
                      <SelectItem value="15">15 guardias (10% descuento)</SelectItem>
                      <SelectItem value="20">20+ guardias (15% descuento)</SelectItem>
                    </SelectContent>
                  </Select>
                  {parseInt(numGuardias) >= 6 && (
                    <p className="text-sm text-green-600 mt-2">
                      ✅ Elegible para descuento por volumen ({parseInt(numGuardias) >= 20 ? '15%' : parseInt(numGuardias) >= 12 ? '10%' : '5%'})
                    </p>
                  )}
                </div>

                <Button
                  onClick={calcularCosto}
                  disabled={!puedeCalcular}
                  className="w-full gard-btn-lg"
                  variant="gard-primary"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Calcular Costo Estimado
                </Button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
              {costoEstimado ? (
                <>
                  <div className="text-center mb-8">
                    <TrendingUp className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold mb-2">Costo Estimado Mensual</h3>
                    <div className="text-5xl font-bold text-primary mb-2">
                      {formatCurrency(costoEstimado)}
                    </div>
                    <p className="text-sm text-muted-foreground">Precio estimado por mes</p>
                  </div>

                  <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 mb-6">
                    <h4 className="font-semibold mb-4">Desglose del Servicio</h4>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>{numGuardias}</strong> {parseInt(numGuardias) === 1 ? 'guardia' : 'guardias'} {industria === 'mineria' ? 'certificados OS10' : 'capacitados'}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Turno: {turno === '24h' ? '24 horas continuas' : turno === '12h-nocturno' ? '12h nocturno' : '12h diurno'}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Ubicación: {ciudad === 'santiago' ? 'Santiago' : ciudad === 'antofagasta' ? 'Antofagasta' : ciudad.charAt(0).toUpperCase() + ciudad.slice(1)}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Supervisión remota 24/7</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Bitácora digital en tiempo real</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Reemplazo por ausencias sin costo</span>
                      </li>
                      {parseInt(numGuardias) >= 6 && (
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-green-600 font-semibold">Descuento por volumen aplicado</span>
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      ⚡ Esta es una estimación. Para precio exacto y propuesta personalizada:
                    </p>
                    <a href="#cotizar" className="gard-btn gard-btn-primary gard-btn-lg inline-flex items-center w-full justify-center">
                      Solicitar Cotización Exacta <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <Calculator className="h-24 w-24 text-muted-foreground mx-auto mb-4 opacity-30" />
                  <h3 className="text-xl font-semibold mb-2">Configure su servicio</h3>
                  <p className="text-muted-foreground">
                    Complete los campos de la izquierda para calcular el costo estimado de guardias de seguridad para su empresa.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-12 bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500 p-6 rounded-r-xl">
            <h3 className="font-semibold mb-2">💡 Nota Importante</h3>
            <p className="text-sm text-muted-foreground">
              Los precios mostrados son estimaciones basadas en configuraciones estándar. Factores que pueden afectar el costo final: ubicación específica, requisitos especiales de certificación, tecnología adicional (CCTV, drones), horarios irregulares, y volumen de servicio. Para una cotización exacta adaptada a sus necesidades, complete el formulario más abajo.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-heading-2 text-center mb-8">Precios Promedio por Industria en Chile 2025</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-card rounded-xl overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-left">Industria</th>
                    <th className="px-6 py-4 text-center">Guardias</th>
                    <th className="px-6 py-4 text-center">Turno</th>
                    <th className="px-6 py-4 text-right">Precio/Mes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-6 py-4 font-medium">Minería (OS10)</td>
                    <td className="px-6 py-4 text-center">4</td>
                    <td className="px-6 py-4 text-center">24/7</td>
                    <td className="px-6 py-4 text-right font-semibold">$8.000.000 - $12.000.000</td>
                  </tr>
                  <tr className="border-b bg-muted/30">
                    <td className="px-6 py-4 font-medium">Bodegas Logísticas</td>
                    <td className="px-6 py-4 text-center">2</td>
                    <td className="px-6 py-4 text-center">12h</td>
                    <td className="px-6 py-4 text-right font-semibold">$2.500.000 - $4.000.000</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-6 py-4 font-medium">Edificios Corporativos</td>
                    <td className="px-6 py-4 text-center">2-3</td>
                    <td className="px-6 py-4 text-center">24/7</td>
                    <td className="px-6 py-4 text-right font-semibold">$3.500.000 - $6.000.000</td>
                  </tr>
                  <tr className="border-b bg-muted/30">
                    <td className="px-6 py-4 font-medium">Construcción</td>
                    <td className="px-6 py-4 text-center">1-2</td>
                    <td className="px-6 py-4 text-center">12h noche</td>
                    <td className="px-6 py-4 text-right font-semibold">$2.000.000 - $3.500.000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Retail</td>
                    <td className="px-6 py-4 text-center">2</td>
                    <td className="px-6 py-4 text-center">12h día</td>
                    <td className="px-6 py-4 text-right font-semibold">$2.200.000 - $3.800.000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p className="text-sm text-muted-foreground mt-4 text-center">
              Precios incluyen: Personal, uniformes, supervisión, bitácora digital. Última actualización: Octubre 2025.
            </p>
          </div>
        </div>
      </section>

      <FAQSection
        title="Preguntas Frecuentes sobre Precios"
        description="Dudas comunes sobre costos de guardias de seguridad en Chile"
        faqs={faqs}
      />

      <FormularioCotizacionSeccion id="cotizar" />
    </>
  );
}

