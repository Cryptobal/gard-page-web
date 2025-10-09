'use client';

import React, { useState } from 'react';
import { Calculator, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import FormularioCotizacionSeccion from '@/app/components/FormularioCotizacionSeccion';
import { FAQSection } from '@/components/seo/FAQSchema';

const faqs = [
  { question: '¿Estos precios son exactos?', answer: 'Los precios mostrados son estimaciones base. El costo final puede variar según: necesidad de transporte de guardias, solicitud de vehículos, ubicaciones muy remotas, tecnología adicional (CCTV, drones), y otros requerimientos específicos. Solicite cotización personalizada para precio exacto adaptado a su operación.' },
  { question: '¿Qué incluye el precio base de $1.200.000 por guardia?', answer: 'El precio base incluye: guardia capacitado y uniformado, supervisión de turno, bitácora digital, reemplazo por ausencias, y respuesta a incidentes. NO incluye: transporte de guardias (si ubicación remota requiere movilización), vehículos, equipamiento especial, tecnología CCTV, o servicios adicionales que se cotizan por separado.' },
  { question: '¿Hay descuentos por volumen?', answer: 'Sí, ofrecemos descuentos progresivos: 5% para 6-9 guardias, 8% para 10-15 guardias, 10% para 16-20 guardias, 12% para 20+ guardias. También ofrecemos descuentos adicionales por contratos anuales vs mensuales.' },
  { question: '¿Por qué la minería es más cara?', answer: 'El precio para minería ($1.900.000/guardia) es superior debido a: certificación OS10 obligatoria por SERNAGEOMIN, capacitación especializada en protocolos mineros, operación frecuente en faenas remotas, y requisitos de equipamiento adicional para ambientes industriales. El 100% de nuestro personal minero cuenta con OS10 vigente.' },
  { question: '¿El precio varía por turno diurno vs nocturno?', answer: 'No, nuestros precios NO varían entre turno diurno o nocturno. El precio base es el mismo independiente del horario de operación.' },
  { question: '¿El precio varía según la ciudad?', answer: 'No, el precio base NO varía por ciudad. Sin embargo, si la ubicación requiere transporte especial de guardias (ej: faena muy remota) o movilización fuera del radio urbano normal, puede haber costo adicional de traslado que se cotiza por separado.' }
];

export default function CalculadoraCostosPage() {
  const [industria, setIndustria] = useState('');
  const [numGuardias, setNumGuardias] = useState('2');
  const [costoEstimado, setCostoEstimado] = useState<number | null>(null);

  const calcularCosto = () => {
    console.log('🔍 Calculando con:', { industria, numGuardias });
    
    // Precio base por guardia: $1.2M/mes
    // Minería más cara por certificación OS10 y faenas remotas: $1.9M/mes
    const costoPorGuardia = industria === 'mineria' ? 1900000 : 1200000;
    
    // Multiplicar por número de guardias
    const guardias = parseInt(numGuardias);
    let costoTotal = costoPorGuardia * guardias;
    
    console.log('💰 Costo base:', costoPorGuardia, '× guardias:', guardias, '=', costoTotal);
    
    // Descuentos por volumen
    if (guardias >= 20) costoTotal *= 0.88; // -12%
    else if (guardias >= 16) costoTotal *= 0.90; // -10%
    else if (guardias >= 10) costoTotal *= 0.92; // -8%
    else if (guardias >= 6) costoTotal *= 0.95; // -5%
    
    const costoFinal = Math.round(costoTotal);
    console.log('✅ Costo final con descuento:', costoFinal);
    setCostoEstimado(costoFinal);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const puedeCalcular = industria && numGuardias;

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
                      ✅ Elegible para descuento por volumen ({parseInt(numGuardias) >= 20 ? '-12%' : parseInt(numGuardias) >= 16 ? '-10%' : parseInt(numGuardias) >= 10 ? '-8%' : '-5%'})
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  {!puedeCalcular && (
                    <p className="text-sm text-amber-600">
                      ⚠️ Seleccione industria y número de guardias para calcular
                    </p>
                  )}
                  <Button
                    onClick={calcularCosto}
                    disabled={!puedeCalcular}
                    className="w-full gard-btn-lg"
                    variant="gard-primary"
                  >
                    <Calculator className="mr-2 h-5 w-5" />
                    {!puedeCalcular ? 'Complete los campos para calcular' : 'Calcular Costo Estimado'}
                  </Button>
                </div>
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
                        <span>Cobertura configurada según necesidad</span>
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
                          <span className="text-green-600 font-semibold">Descuento por volumen aplicado ({parseInt(numGuardias) >= 20 ? '12%' : parseInt(numGuardias) >= 16 ? '10%' : parseInt(numGuardias) >= 10 ? '8%' : '5%'})</span>
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="text-center">
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
                      <p className="text-sm font-semibold mb-2">⚠️ Valores Tentativos</p>
                      <p className="text-xs text-muted-foreground">
                        * Los precios pueden variar según: ubicación específica, necesidad de transporte de guardias, 
                        solicitud de vehículos, horarios especiales, y otros requerimientos. 
                        Esta es solo una estimación base.
                      </p>
                    </div>
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
            <h3 className="font-semibold mb-2">💡 Nota Importante sobre Precios</h3>
            <p className="text-sm text-muted-foreground mb-3">
              <strong>Precio base:</strong> $1.200.000 por guardia/mes (industrias generales) | $1.900.000 por guardia/mes (minería con OS10)
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>* Los precios NO varían por:</strong> Turno diurno/nocturno, ciudad de operación.<br/>
              <strong>* Los precios SÍ pueden variar por:</strong> Necesidad de transporte de guardias, solicitud de vehículos, ubicaciones muy remotas, horarios especiales, tecnología adicional (CCTV, drones), y otros requerimientos específicos.
            </p>
            <p className="text-sm text-muted-foreground mt-3">
              <strong>Descuentos por volumen:</strong> 5% (6-9 guardias), 8% (10-15), 10% (16-20), 12% (20+)
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
                    <td className="px-6 py-4 text-center">1</td>
                    <td className="px-6 py-4 text-center">Por guardia</td>
                    <td className="px-6 py-4 text-right font-semibold">$1.900.000*</td>
                  </tr>
                  <tr className="border-b bg-muted/30">
                    <td className="px-6 py-4 font-medium">Bodegas Logísticas</td>
                    <td className="px-6 py-4 text-center">1</td>
                    <td className="px-6 py-4 text-center">Por guardia</td>
                    <td className="px-6 py-4 text-right font-semibold">$1.200.000*</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-6 py-4 font-medium">Edificios Corporativos</td>
                    <td className="px-6 py-4 text-center">1</td>
                    <td className="px-6 py-4 text-center">Por guardia</td>
                    <td className="px-6 py-4 text-right font-semibold">$1.200.000*</td>
                  </tr>
                  <tr className="border-b bg-muted/30">
                    <td className="px-6 py-4 font-medium">Construcción</td>
                    <td className="px-6 py-4 text-center">1</td>
                    <td className="px-6 py-4 text-center">Por guardia</td>
                    <td className="px-6 py-4 text-right font-semibold">$1.200.000*</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Retail / Otros</td>
                    <td className="px-6 py-4 text-center">1</td>
                    <td className="px-6 py-4 text-center">Por guardia</td>
                    <td className="px-6 py-4 text-right font-semibold">$1.200.000*</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p className="text-sm text-muted-foreground mt-4 text-center">
              * Precios base por guardia/mes. No varían por turno ni ciudad. Incluyen: Personal, uniformes, supervisión, bitácora digital.<br/>
              ** Valores sujetos a variables: transporte, vehículos, ubicaciones remotas. Última actualización: Octubre 2025.
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

