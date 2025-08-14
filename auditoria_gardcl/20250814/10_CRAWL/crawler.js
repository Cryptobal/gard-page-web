const https = require('https');
const fs = require('fs');
const path = require('path');

const CSV_PATH = path.resolve(__dirname, 'crawl.csv');
const START_SITEMAP = 'https://www.gard.cl/sitemap.xml';

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function main() {
  const header = 'url,status,canonical,meta_robots,noindex,hreflang,title,h1,word_count,inlinks,outlinks,depth,template\n';
  fs.writeFileSync(CSV_PATH, header, 'utf8');
  try {
    const { body } = await fetch(START_SITEMAP);
    const locs = [...body.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
    for (const url of locs) {
      fs.appendFileSync(CSV_PATH, `${url},,,index,follow,,,,,,,\n`, 'utf8');
    }
    console.log(`Wrote ${locs.length} URLs to crawl.csv`);
  } catch (e) {
    console.error('Sitemap fetch failed:', e.message);
  }
}

main();


