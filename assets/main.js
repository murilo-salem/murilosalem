(() => {
  'use strict';
  const data = window.portfolio || {};
  const text = (id, value) => { if (value) document.getElementById(id).textContent = value; };
  if (data.name) {
    document.querySelectorAll('[data-name]').forEach(node => { node.textContent = data.name; });
    const parts = data.name.trim().split(/\s+/);
    const first = document.createElement('span');
    first.textContent = parts.shift();
    const rest = document.createElement('em');
    rest.textContent = parts.length ? `${parts.join(' ')}.` : '';
    document.getElementById('titulo').replaceChildren(first, rest);
    document.title = `${data.fullName || data.name} | ${data.role || 'Pesquisa em IA'}`;
  }
  if (data.role) {
    const role = document.getElementById('role');
    const split = data.role.indexOf('&');
    if (split !== -1) {
      role.replaceChildren(document.createTextNode(data.role.slice(0, split + 1)), document.createElement('br'), document.createTextNode(data.role.slice(split + 1).trim()));
    } else role.textContent = data.role;
  }
  text('introduction', data.introduction);
  text('about-details', data.aboutDetails);
  if (data.about) {
    const about = document.getElementById('about');
    const match = data.about.match(/inteligência artificial\.?/i);
    if (match) {
      const emphasis = document.createElement('em');
      emphasis.textContent = match[0];
      about.replaceChildren(document.createTextNode(data.about.slice(0, match.index)), emphasis, document.createTextNode(data.about.slice(match.index + match[0].length)));
    } else about.textContent = data.about;
  }
  function element(tag, value, className) {
    const node = document.createElement(tag);
    node.textContent = value || '';
    if (className) node.className = className;
    return node;
  }
  function link(label, url) {
    try {
      const parsed = new URL(url);
      if (!['https:', 'http:'].includes(parsed.protocol)) return element('span', label);
      const node = element('a', label);
      node.href = parsed.href;
      return node;
    } catch { return element('span', label); }
  }
  document.getElementById('social-links').replaceChildren(...(data.links || []).map(item => link(item.label, item.url)));
  function media(item) {
    const image = document.createElement('img');
    image.src = item.src;
    image.alt = item.alt;
    image.loading = 'lazy';
    image.decoding = 'async';
    if (item.width) image.width = item.width;
    if (item.height) image.height = item.height;
    return image;
  }
  if (data.profileImages?.length) {
    const gallery = element('div', '', 'portrait-gallery');
    gallery.append(...data.profileImages.map(item => {
      const figure = element('figure', '', 'portrait');
      figure.append(media(item), element('figcaption', item.caption));
      return figure;
    }));
    document.getElementById('profile-image').replaceChildren(gallery);
  } else if (data.profileImage) {
    const figure = element('figure', '', 'portrait');
    const caption = element('figcaption');
    caption.append(link(data.profileImage.credit, data.profileImage.source));
    figure.append(media(data.profileImage), caption);
    document.getElementById('profile-image').replaceChildren(figure);
  }
  if (data.institutions?.length) {
    document.getElementById('institution-images').replaceChildren(...data.institutions.map((item, index) => {
      const figure = element('figure', '', `institution institution-${index}`);
      const target = link('', item.url);
      const frame = element('span', '', 'institution-frame');
      frame.append(media(item));
      target.append(frame, element('span', item.name, 'institution-name'));
      figure.append(target);
      return figure;
    }));
  }
  if (data.paperImages?.length) {
    document.getElementById('paper-images').replaceChildren(...data.paperImages.map(item => {
      const figure = element('figure', '', 'paper-preview');
      const target = link('', item.pdf || item.url);
      target.className = 'paper-preview-link';
      target.target = '_blank';
      target.rel = 'noopener noreferrer';
      target.setAttribute('aria-label', `Abrir PDF: ${item.title} (nova aba)`);
      target.append(media(item));
      const caption = element('figcaption');
      caption.append(link(item.title, item.url), element('span', item.venue));
      const pdf = link('Ler PDF', item.pdf || item.url);
      pdf.className = 'paper-pdf-link';
      pdf.target = '_blank';
      pdf.rel = 'noopener noreferrer';
      pdf.setAttribute('aria-label', `Ler PDF: ${item.title} (nova aba)`);
      caption.append(pdf);
      figure.append(target, caption);
      return figure;
    }));
  }
  const track = document.getElementById('paper-images');
  const previous = document.getElementById('paper-prev');
  const next = document.getElementById('paper-next');
  const position = document.getElementById('paper-position');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (track && track.children.length) {
    document.getElementById('paper-controls').hidden = false;
    function updateCarousel() {
      const limit = track.scrollWidth - track.clientWidth;
      previous.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= limit - 2;
      const bounds = track.getBoundingClientRect();
      const visible = Array.from(track.children).map((slide, index) => ({ rect: slide.getBoundingClientRect(), index }))
        .filter(({ rect }) => rect.left >= bounds.left - 2 && rect.right <= bounds.right + 2);
      if (visible.length) {
        const first = visible[0].index + 1;
        const last = visible[visible.length - 1].index + 1;
        position.textContent = `${first === last ? first : `${first}–${last}`} de ${track.children.length}`;
      }
    }
    function moveCarousel(direction) {
      const slide = track.firstElementChild;
      const gap = parseFloat(getComputedStyle(track).gap || 0);
      const stride = slide.getBoundingClientRect().width + gap;
      const count = Math.max(1, Math.floor((track.clientWidth + gap + 1) / stride));
      const last = track.scrollWidth - track.clientWidth;
      const target = Math.max(0, Math.min(last, track.scrollLeft + direction * stride * count));
      track.scrollTo({ left: target, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
    }
    previous.addEventListener('click', () => moveCarousel(-1));
    next.addEventListener('click', () => moveCarousel(1));
    track.addEventListener('keydown', event => {
      if (event.target !== track) return;
      if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
        event.preventDefault();
        if (event.key === 'Home' || event.key === 'End') {
          track.scrollTo({ left: event.key === 'Home' ? 0 : track.scrollWidth, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
        } else moveCarousel(event.key === 'ArrowRight' ? 1 : -1);
      }
    });
    let scheduled = false;
    track.addEventListener('scroll', () => {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(() => { updateCarousel(); scheduled = false; });
      }
    }, { passive: true });
    const observer = new ResizeObserver(updateCarousel);
    observer.observe(track);
    updateCarousel();
  }
  function list(id, items, render) {
    if (!items?.length) return;
    const container = document.getElementById(id);
    container.replaceChildren(...items.map(render));
  }
  function publication(item) {
    const article = element('article', '', 'entry publication');
    const heading = element('h3');
    heading.append(item.url ? link(item.title, item.url) : element('span', item.title));
    const venue = [item.venue, item.pages ? `p. ${item.pages}` : '', item.year, item.type].filter(Boolean).join(' · ');
    article.append(heading, element('p', item.authors, 'meta authors'), element('p', venue, 'meta'));
    if (item.abstract) article.append(element('p', item.abstract, 'abstract'));
    if (item.pdf || item.doi) {
      const access = element('div', '', 'publication-links');
      if (item.pdf) access.append(link('PDF', item.pdf));
      if (item.doi) access.append(link('DOI', `https://doi.org/${item.doi}`));
      article.append(access);
    }
    if (item.sourceNote) article.append(element('p', 'Dados bibliográficos parciais.', 'reference-note'));
    return article;
  }
  if (data.publications?.length) {
    const container = document.getElementById('publications');
    container.replaceChildren(...data.publications.slice(0, 4).map(publication));
    if (data.publications.length > 4) {
      const more = element('details', '', 'more-publications');
      more.append(element('summary', `Outras ${data.publications.length - 4} publicações`));
      more.append(...data.publications.slice(4).map(publication));
      container.append(more);
    }
  }
  function careerEntry(item, headingTag = 'h3') {
    const article = element('article', '', 'entry');
    article.append(element(headingTag, item.role), element('p', [item.organization, item.period].filter(Boolean).join(' · '), 'meta'));
    if (item.description) article.append(element('p', item.description));
    return article;
  }
  list('experience-entries', data.experience, item => careerEntry(item));
  list('education-entries', data.education, item => careerEntry(item, 'h4'));
  list('academic-entries', data.academicActivities, item => careerEntry(item, 'h4'));
  function projectEntry(item) {
    const article = element('article', '', 'entry project');
    article.append(element('h3', item.title), element('p', item.meta, 'meta'), element('p', item.description));
    if (item.url) {
      const access = element('div', '', 'publication-links');
      access.append(link('Publicação relacionada', item.url));
      article.append(access);
    }
    return article;
  }
  if (data.projects?.length) {
    const container = document.getElementById('projects');
    container.replaceChildren(...data.projects.slice(0, 3).map(projectEntry));
    if (data.projects.length > 3) {
      const more = element('details', '', 'more-publications');
      more.append(element('summary', `Outros ${data.projects.length - 3} projetos`), ...data.projects.slice(3).map(projectEntry));
      container.append(more);
    }
  }
  list('experiments', data.experiments, item => {
    const article = element('article', '', 'entry');
    const heading = element('h3');
    heading.append(item.url ? link(item.title, item.url) : element('span', item.title));
    article.append(heading, element('p', item.description));
    return article;
  });
  let sample = 0;
  function draw() {
    const points = document.createDocumentFragment();
    const gaussian = () => Math.sqrt(-2 * Math.log(Math.max(Number.EPSILON, Math.random()))) * Math.cos(2 * Math.PI * Math.random());
    for (let group = 0; group < 2; group++) {
      for (let i = 0; i < 85; i++) {
        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        const x = Math.max(46, Math.min(474, (group ? 365 : 150) + gaussian() * 33));
        const y = Math.max(21, Math.min(299, (group ? 88 : 233) + gaussian() * 29));
        dot.setAttribute('cx', x.toFixed(2)); dot.setAttribute('cy', y.toFixed(2));
        dot.setAttribute('r', '2.8'); dot.setAttribute('fill', group ? '#b8765e' : '#637258');
        points.append(dot);
      }
    }
    document.getElementById('points').replaceChildren(points);
    sample++;
    if (sample > 1) text('sample-status', `Amostra ${sample} gerada: 170 pontos sintéticos em dois grupos.`);
  }
  draw();
  document.getElementById('regenerate').addEventListener('click', draw);
})();
