#!/usr/bin/env python3
"""Refresh static portfolio content from assets/content.js (standard library only)."""
import json
import re
from html import escape
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
raw = (ROOT / 'assets/content.js').read_text()
data = json.loads(raw.split('window.portfolio = ', 1)[1].strip().removesuffix(';'))
page = (ROOT / 'index.html').read_text()

def e(value):
    return escape(str(value), quote=True)

def link(label, url):
    if urlsplit(url).scheme not in ('https', 'http'):
        return e(label)
    return f'<a href="{e(url)}">{e(label)}</a>'

def paragraph(value, cls=''):
    return f'<p class="{cls}">{e(value)}</p>'

def publication(item):
    title = link(item['title'], item['url']) if item.get('url') else e(item['title'])
    venue = ' · '.join(str(x) for x in [item['venue'], 'p. '+item['pages'] if item.get('pages') else '', item['year'], item.get('type', '')] if x)
    text = f'<article class="entry publication"><h3>{title}</h3>'
    text += paragraph(item['authors'], 'meta authors') + paragraph(venue, 'meta')
    if item.get('abstract'):
        text += paragraph(item['abstract'], 'abstract')
    access = []
    if item.get('pdf'):
        access.append(link('PDF', item['pdf']))
    if item.get('doi'):
        access.append(link('DOI', 'https://doi.org/'+item['doi']))
    if access:
        text += '<div class="publication-links">'+''.join(access)+'</div>'
    if item.get('sourceNote'):
        text += paragraph('Dados bibliográficos parciais.', 'reference-note')
    return text+'</article>'

def project(item):
    text = f'<article class="entry project"><h3>{e(item["title"])}</h3>'
    text += paragraph(item['meta'], 'meta') + paragraph(item['description'])
    if item.get('url'):
        text += '<div class="publication-links">'+link('Publicação relacionada', item['url'])+'</div>'
    return text+'</article>'

def career(item, heading='h3'):
    text = f'<article class="entry"><{heading}>{e(item["role"])}</{heading}>'
    text += paragraph(' · '.join(x for x in [item['organization'], item.get('period')] if x), 'meta')
    return text + paragraph(item.get('description', ''))+'</article>'

def grouped(items, count, render, label):
    text = ''.join(render(item) for item in items[:count])
    if len(items) > count:
        text += '<details class="more-publications"><summary>'+label.format(len(items)-count)+'</summary>'
        text += ''.join(render(item) for item in items[count:])+'</details>'
    return text

def block(name, value):
    global page
    start, end = f'<!-- {name}:start -->', f'<!-- {name}:end -->'
    pattern = re.escape(start)+r'.*?'+re.escape(end)
    if len(re.findall(pattern, page, flags=re.S)) != 1:
        raise ValueError('Missing or duplicated static content marker: '+name)
    page = re.sub(pattern, lambda _: start+value+end, page, flags=re.S)

def image(item):
    size = ''.join(f' {key}="{int(item[key])}"' for key in ['width', 'height'] if item.get(key))
    return f'<img src="{e(item["src"])}" alt="{e(item["alt"])}"{size} loading="lazy" decoding="async">'

portraits = data.get('profileImages')
if portraits:
    figures = ''.join('<figure class="portrait">'+image(item)+'<figcaption>'+e(item.get('caption', ''))+'</figcaption></figure>' for item in portraits)
    block('portrait', '<div class="portrait-gallery">'+figures+'</div>')
else:
    portrait = data.get('profileImage')
    if portrait:
        block('portrait', '<figure class="portrait">'+image(portrait)+'<figcaption>'+link(portrait['credit'], portrait['source'])+'</figcaption></figure>')
institutions = ''
for index, item in enumerate(data.get('institutions', [])):
    institutions += f'<figure class="institution institution-{index}"><a href="{e(item["url"])}"><span class="institution-frame">'+image(item)+'</span><span class="institution-name">'+e(item['name'])+'</span></a></figure>'
block('institutions', institutions)
previews = ''
for item in data.get('paperImages', []):
    pdf = e(item.get('pdf') or item['url'])
    label = e(item['title'])
    previews += f'<figure class="paper-preview"><a class="paper-preview-link" href="{pdf}" target="_blank" rel="noopener noreferrer" aria-label="Abrir PDF: {label} (nova aba)">'+image(item)+'</a><figcaption>'+link(item['title'], item['url'])+'<span>'+e(item['venue'])+f'</span><a class="paper-pdf-link" href="{pdf}" target="_blank" rel="noopener noreferrer" aria-label="Ler PDF: {label} (nova aba)">Ler PDF</a></figcaption></figure>'
block('paper-images', previews)

block('publications', grouped(data['publications'], 4, publication, 'Outras {} publicações'))
block('projects', grouped(data['projects'], 3, project, 'Outros {} projetos'))
block('experience', ''.join(career(x) for x in data['experience']))
block('education', ''.join(career(x, 'h4') for x in data['education']))
block('academic', ''.join(career(x, 'h4') for x in data['academicActivities']))
block('social', ''.join(link(x['label'], x['url']) for x in data['links']))
for name, value in [('role', e(data['role']).replace('&amp;', '&amp;<br>')), ('introduction', e(data['introduction'])), ('about-details', e(data['aboutDetails']))]:
    pattern = r'(<p\b[^>]*\bid="'+name+r'"[^>]*>).*?(</p>)'
    page = re.sub(pattern, lambda m: m[1]+value+m[2], page, flags=re.S)
about = e(data['about'])
about = re.sub(r'(inteligência artificial\.?)', r'<em>\1</em>', about, flags=re.I)
page = re.sub(r'(<p id="about">).*?(</p>)', lambda m: m[1]+about+m[2], page, flags=re.S)
(ROOT / 'index.html').write_text(page)
print(f'Synchronized {len(data["publications"])} publications, {len(data["projects"])} projects and profile sections.')
