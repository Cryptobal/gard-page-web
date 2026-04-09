"use strict";(()=>{var e={};e.id=3784,e.ids=[3784],e.modules={10846:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},44870:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},29294:e=>{e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},46116:(e,t,o)=>{o.r(t),o.d(t,{patchFetch:()=>u,routeModule:()=>n,serverHooks:()=>c,workAsyncStorage:()=>p,workUnitAsyncStorage:()=>d});var r={};o.r(r),o.d(r,{GET:()=>i});var s=o(8527),a=o(85624),l=o(13591);function i(){return new Response(`# https://www.robotstxt.org/robotstxt.html

# Bots de IA - Permitir acceso expl\xedcito para GEO
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Applebot
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: FacebookBot
Allow: /

User-agent: cohere-ai
Allow: /

# Todos los dem\xe1s bots
User-agent: *
Allow: /

# Secciones espec\xedficas que queremos que sean indexadas
Allow: /servicios-por-industria/
Allow: /servicios/
Allow: /industrias/
Allow: /blog/
Allow: /cotizar

# Archivos espec\xedficos a no indexar para mejorar rendimiento
Disallow: /*.json$
Disallow: /*_buildManifest.js$
Disallow: /*_ssgManifest.js$
Disallow: /*.js.map$
Disallow: /api/
Disallow: /static/

# Permitir recursos est\xe1ticos cr\xedticos de Next.js
Allow: /_next/static/
Allow: /_next/image

# Sitemap
Sitemap: https://www.gard.cl/sitemap.xml
`,{headers:{"Content-Type":"text/plain","Cache-Control":"public, max-age=86400, s-maxage=86400"}})}let n=new s.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/robots.txt/route",pathname:"/robots.txt",filename:"route",bundlePath:"app/robots.txt/route"},resolvedPagePath:"/Users/caco/Desktop/gard-web/app/robots.txt/route.ts",nextConfigOutput:"",userland:r}),{workAsyncStorage:p,workUnitAsyncStorage:d,serverHooks:c}=n;function u(){return(0,l.patchFetch)({workAsyncStorage:p,workUnitAsyncStorage:d})}},8527:(e,t,o)=>{e.exports=o(44870)}};var t=require("../../webpack-runtime.js");t.C(e);var o=e=>t(t.s=e),r=t.X(0,[3591],()=>o(46116));module.exports=r})();