### Checklist WCAG 2.2 AA (borrador con evidencias a completar)

- Perceptible: texto alternativo en todas las imágenes (CloudflareImage `alt` requerido) [EVIDENCIA pendiente]
- Adaptable: estructura semántica con headings H1–H6, landmarks (`header`, `main`, `footer`) [EVIDENCIA]
- Distinguible: contraste ≥ AA, focus visible, no solo color [EVIDENCIA]
- Operable: teclado 100%, skip link, foco gestionado en modales [EVIDENCIA]
- Tiempo: no hay límites estrictos [EVIDENCIA]
- Convulsiones: no animaciones > 3 flashes/s [EVIDENCIA]
- Navegable: títulos de página únicos, breadcrumbs [EVIDENCIA]
- Entrada: labels asociados, descripciones, errores claros [EVIDENCIA]
- Compatible: roles/aria válidos, nombres/roles/valores correctos [EVIDENCIA]
- 2.2: patrones de arrastre con alternativa, objetivos táctiles 24x24, foco no secuestrado [EVIDENCIA]

Ejecutar: `npx @axe-core/cli https://www.gard.cl --save ./auditoria_gardcl/20250814/40_A11Y/axe_report.json`
