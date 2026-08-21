/**
 * Verifica el nombre canónico de conversión GA4/Ads y que RRHH no lo comparta.
 * Uso: pnpm exec tsx scripts/verify-form-conversion-event.ts
 */
import {
  FORM_CONVERSION_EVENT,
  FORM_RECRUITMENT_EVENT,
  buildFormSubmissionPayload,
  getFormDataLayerEventName,
} from '../lib/analytics/formTracking';

const emptyUtm = {
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
  utm_term: '',
  utm_content: '',
  gclid: '',
};

const commercialTypes = [
  'contacto',
  'cotizacion',
  'cotizador_inteligente',
  'landing_dinamico',
];

let failed = 0;
function assert(cond: unknown, msg: string): void {
  if (!cond) {
    failed += 1;
    console.error(`FAIL: ${msg}`);
  } else {
    console.log(`ok: ${msg}`);
  }
}

assert(
  FORM_CONVERSION_EVENT === 'submit_form_submission',
  'evento canónico Ads/GA4 es submit_form_submission',
);

for (const formType of commercialTypes) {
  assert(
    getFormDataLayerEventName(formType) === 'submit_form_submission',
    `${formType} dispara submit_form_submission`,
  );
  const payload = buildFormSubmissionPayload(
    { formType, additionalData: { event: 'form_submission', form_id: 'hack' } },
    `/${formType}`,
    emptyUtm,
  );
  assert(payload.event === 'submit_form_submission', `${formType}: additionalData no pisa event`);
  assert(payload.form_id === formType, `${formType}: form_id = formType`);
  assert(payload.page_path === `/${formType}`, `${formType}: page_path`);
}

assert(
  getFormDataLayerEventName('reclutamiento') === FORM_RECRUITMENT_EVENT,
  'reclutamiento no usa el evento de Ads',
);
assert(
  buildFormSubmissionPayload({ formType: 'reclutamiento' }, '/reclutamiento', emptyUtm).event
    === 'submit_form_reclutamiento',
  'postulación dispara submit_form_reclutamiento',
);

if (failed > 0) {
  console.error(`\n${failed} assertion(s) failed`);
  process.exit(1);
}
console.log('\nverify-form-conversion-event: all assertions passed');
