const menuToggle=document.querySelector('.menu-toggle');
const siteNav=document.querySelector('.header nav');
if(menuToggle&&siteNav){menuToggle.addEventListener('click',()=>siteNav.classList.toggle('open'));}

(() => {
  const siteUrl = 'https://tramites-minam-azsa.vercel.app';
  const pageUrl = `${siteUrl}${location.pathname}`;
  const title = document.title;
  const description = document.querySelector('meta[name="description"]')?.content || '';
  const image = `${siteUrl}/hero-azsa.jpg`;
  const ensureMeta = (selector, attributes) => {
    if (document.head.querySelector(selector)) return;
    const meta = document.createElement('meta');
    Object.entries(attributes).forEach(([name, value]) => meta.setAttribute(name, value));
    document.head.append(meta);
  };
  ensureMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: 'AZTECA SERVICIOS AMBIENTALES SAC' });
  ensureMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
  ensureMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
  ensureMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image });
  const faq = [...document.querySelectorAll('details')].map(detail => {
    const question = detail.querySelector('summary')?.textContent.trim();
    const answer = detail.querySelector('p')?.textContent.trim();
    return question && answer ? { '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } } : null;
  }).filter(Boolean);
  const label = document.querySelector('h1')?.textContent.replace(/\s+/g, ' ').trim() || title;
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', '@id': `${pageUrl}#webpage`, url: pageUrl, name: title, description, inLanguage: 'es-PE', isPartOf: { '@id': `${siteUrl}/#website` } },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Inicio', item: `${siteUrl}/` }, { '@type': 'ListItem', position: 2, name: label, item: pageUrl }] }
    ]
  };
  if (faq.length) data['@graph'].push({ '@type': 'FAQPage', mainEntity: faq });
  const schema = document.createElement('script');
  schema.type = 'application/ld+json';
  schema.textContent = JSON.stringify(data);
  document.head.append(schema);
})();
