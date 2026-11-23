# Portfólio · Murilo Costa Salem

Portfólio acadêmico estático em português, com apresentação, produção científica, projetos, experimentos, experiência e formação. HTML, CSS e JavaScript; sem dependências ou build para publicar.

## Visualizar

Execute `python3 -m http.server 8000` e abra http://localhost:8000.

## Atualizar conteúdo

Edite `assets/content.js`. As propriedades incluem `publications`, `projects`, `experience`, `education`, `academicActivities`, `links` e `experiments` (para futuras demonstrações próprias).

Após editar, execute `python3 scripts/sync-content.py` para atualizar também o HTML estático usado por mecanismos de busca e visitantes sem JavaScript. O script usa somente a biblioteca padrão do Python. O JavaScript lê o mesmo conteúdo e mantém os controles interativos; nenhuma informação depende exclusivamente dele para ser lida.

A produção científica mostra quatro registros inicialmente e os demais em um controle expansível nativo. Os projetos mostram três inicialmente, com os demais em uma lista expansível. A demonstração de representações é identificada como sintética e fica em um controle separado dos projetos reais.

## Fontes e critérios

O conteúdo foi preenchido com as transcrições do Google Scholar, LinkedIn e Lattes fornecidas pelo autor. O Lattes público correto é https://lattes.cnpq.br/9766331030709079; os links não contêm tokens de sessão ou CAPTCHA.

Foram reunidos 27 registros distintos de produção: os 20 registros enviados do Scholar, dois trabalhos adicionais do Lattes (ACS Omega e WebMedia), um trabalho apresentado no DPVSA e quatro trabalhos adicionais confirmados a partir do CMT e dos programas oficiais. Os registros distinguem aceite, apresentação e artigo em congresso. O resumo/apresentação do trabalho sobre tumores hepáticos no SIIEPE aparece nas atividades acadêmicas, sem duplicar o artigo da ERAMIA-RS na produção científica.

Os autores, links e DOI do arXiv e dos três artigos no Computer on the Beach foram complementados a partir das páginas editoriais. Nos demais registros, os metadados fornecidos foram preservados. Quando faltam autores ou o nome completo do evento, a interface informa que os dados bibliográficos são parciais. Não foram inventados links, resumos ou resultados experimentais.

O Lattes registra graduação em andamento, portanto o portfólio não presume conclusão em 2026. As datas pessoais de vínculo vêm do LinkedIn; datas de início de projetos não são tratadas como datas individuais de ingresso. A situação dos projetos reflete os textos fornecidos pelo autor.

A propriedade `sources` registra procedência e pendências. Ainda faltam o link direto do Google Scholar, os links de código/demonstrações e os metadados completos de alguns trabalhos. As métricas de citação enviadas ficam apenas como snapshot nos dados, sem serem apresentadas como contagem atual.

Fontes editoriais conferidas:

- https://arxiv.org/abs/2607.24562
- https://periodicos.univali.br/index.php/acotb/article/view/22186
- https://periodicos.univali.br/index.php/acotb/article/view/22184
- https://periodicos.univali.br/index.php/acotb/article/view/22188

## Publicação no GitHub Pages

Este portfólio está publicado em https://murilo-salem.github.io/murilosalem/. O GitHub Pages entrega o conteúdo da branch `main`, na raiz do repositório. O arquivo `.nojekyll` permite servir os arquivos diretamente.

Para publicar alterações, sincronize o HTML após editar `assets/content.js`, faça commit e envie para `main`. O GitHub Pages atualiza o site automaticamente. Os caminhos relativos dos assets preservam o funcionamento no endereço de projeto.

Documentação oficial: https://docs.github.com/en/pages/quickstart

## SEO e indexação

`index.html` inclui título e descrição, URL canônica, cartões Open Graph/Twitter e dados estruturados `ProfilePage`/`Person` com os perfis públicos confirmados. `robots.txt` permite rastreamento e aponta para `sitemap.xml`, que lista a página inicial. A imagem de compartilhamento está em `assets/og-card.svg` (fonte vetorial); `assets/og-card.png` é a versão usada por plataformas sociais.

Essas configurações ajudam mecanismos de busca a entender e apresentar o perfil, mas não garantem posição nos resultados nem indexação imediata. Para acompanhar e solicitar a indexação no Google, adicione a propriedade `https://murilo-salem.github.io/` no Search Console, confirme que é o proprietário e envie `https://murilo-salem.github.io/murilosalem/sitemap.xml`. A verificação depende da conta Google do autor.

Documentação oficial: https://developers.google.com/search/docs/fundamentals/seo-starter-guide · https://developers.google.com/search/docs/appearance/structured-data/profile-page

## Identidade visual

Newsreader nos títulos e Manrope no texto, hospedadas localmente em `assets/fonts/`, com licenças OFL. Paleta branca com verde oliva e terracota. O site respeita movimento reduzido, navegação por teclado e mantém o conteúdo legível sem JavaScript.

A ilustração decorativa `assets/manifold-transparent.webp` foi produzida com Image Gen: escultura toroidal tridimensional de fios finos em verde oliva, inspirada em topologia e gravura científica, sem textos ou eixos. O gráfico interativo é SVG nativo com dados sintéticos.

## Fotos, marcas e imagens dos trabalhos

As imagens reais ficam em `assets/images/`, hospedadas junto com o site. A foto de Murilo foi obtida na página oficial de estudantes do GAIA, onde está identificada com seu nome: https://wp.ufpel.edu.br/gaia/estudantes/.

As marcas de CEDRA, GAIA, UFPel e FURG foram obtidas nos respectivos sites institucionais, com cores e proporções preservadas. As variantes claras são exibidas em fundo escuro para manter o contraste. Elas identificam instituições da trajetória do autor.

As oito prévias de trabalhos são renderizações da primeira página dos PDFs originais do arXiv, Computer on the Beach e da Biblioteca Digital da Sociedade Brasileira de Computação (SBC). Não são figuras ou resultados de pesquisa gerados por IA. Os PDFs completos não foram incluídos no repositório; as prévias levam às páginas editoriais. As imagens foram codificadas em WebP e carregam sob demanda.

Os campos `profileImage`, `institutions` e `paperImages` de `assets/content.js` guardam arquivos locais, textos alternativos e URLs originais. Para trocar uma imagem, atualize esses campos e execute `python3 scripts/sync-content.py`.

## Carrossel de papers

A galeria de PDFs usa rolagem horizontal nativa com alinhamento das prévias. Exibe quatro trabalhos no desktop, três em telas intermediárias e uma prévia com parte da próxima no celular. Os botões avançam pelo conjunto visível, e o indicador mostra as posições atuais. O teclado aceita setas, Home e End quando a galeria está focada. Não há avanço automático, e a navegação respeita movimento reduzido.

As capas e os links “Ler PDF” abrem o documento original em nova aba. Sem JavaScript, a faixa continua rolável e todos os links permanecem disponíveis. Para adicionar um paper, acrescente uma entrada em `paperImages`, salve a miniatura local e execute `python3 scripts/sync-content.py`; a quantidade é calculada automaticamente.

Os quatro PDFs adicionais foram confirmados nas páginas editoriais da SBC:

- https://sol.sbc.org.br/index.php/sbccq/article/view/43263
- https://sol.sbc.org.br/index.php/eramiars/article/view/39474
- https://sol.sbc.org.br/index.php/webmedia_estendido/article/view/38211
- https://sol.sbc.org.br/index.php/eradrs/article/view/42713

## Validação dos cinco trabalhos enviados pelo CMT

As listas oficiais de pôsteres confirmam Murilo entre os autores dos cinco títulos enviados. O trabalho de classificação de lesões de pele já estava cadastrado e foi atualizado, sem duplicação. Foram adicionados os trabalhos sobre extratores de pose para Libras, redes quantizadas em microcontroladores, geração de testbenches com LLMs e detecção de hotspots em litografia.

Os dois trabalhos do SForum e o novo trabalho do DPVSA são apresentados como aceitos para sessão de pôsteres. O aceite no CMT e a presença no programa não foram tratados como confirmação de publicação nos anais ou de apresentação efetiva. O trabalho do SBCCI tem registro bibliográfico público com DOI 10.1109/SBCCI69725.2026.11706793, além de constar no programa oficial.

Fontes de autoria:

- https://wp.ufpel.edu.br/dpvsa2026/poster-session-ii/
- https://www.psi.poli.usp.br/chipinsampa/wp-content/uploads/SFORUM_2026_V12_Posters_Session-Chairs.pdf (página 2, P1 e P4)
- https://www.psi.poli.usp.br/chipinsampa/wp-content/uploads/SBCCI2026_V6-SessionChairs_Posters.pdf (página 2, P22)

Os nomes dos arquivos camera-ready no CMT não permitem baixar os PDFs. Esses novos registros não receberam miniaturas nem links de download sem arquivos ou URLs públicos confirmados. O carrossel continua com os oito PDFs originais já verificados.

## Reconciliação da lista JEMS

Os 19 registros com aceite explícito (`thumb_up`) na transcrição JEMS enviada pelo autor já estavam cadastrados e foram reconciliados com as respectivas páginas editoriais. Foram atualizados autores, ordem de autoria, páginas, URLs editoriais, PDFs e situação de publicação. Nenhuma referência foi duplicada: o total continua em 27 trabalhos distintos, com oito prévias no carrossel.

As quatro referências da ERAMIA-RS 2026 agora têm evento completo, autores e links editoriais/PDF confirmados. Em particular, o trabalho sobre EEG lista Rafael Filho como primeiro autor e Murilo Salem como segundo na página publicada. Onde a lista JEMS difere da página editorial (inclusive nos trabalhos do COTB), prevalece a referência publicada.

Submissões rejeitadas não foram acrescentadas. As versões aceitas e publicadas no Computer on the Beach 2026 dos trabalhos de U-Net e numeração dentária permanecem válidas, embora submissões de mesmo título tenham sido rejeitadas no WebMedia 2025. Título coincidente não torna os eventos equivalentes.

Registros sem decisão explícita de aceite não foram acrescentados nesta atualização. A propriedade `sources.jemsValidation` documenta o critério; informações de submissões rejeitadas não são incluídas nos dados públicos do portfólio.

Alguns DOI informados nas páginas da ERAMIA-RS 2026 ainda não resolveram durante a consulta. Foram mantidos em `publisherDoi`, sem gerar links quebrados de DOI na interface; as páginas editoriais e seus PDFs continuam vinculados normalmente.

## Explicações dos artigos

Cada um dos 27 trabalhos possui uma explicação original em português, de uma ou duas frases, no campo `abstract`. São apresentações breves do problema e da abordagem, não transcrições integrais dos resumos dos autores.

Os campos `summaryBasis` e `summarySource` registram a base de cada texto: 22 foram redigidos a partir dos resumos científicos consultados, um a partir do relato fornecido pelo autor e quatro somente a partir dos títulos/programas disponíveis. As descrições baseadas em títulos não acrescentam resultados, datasets, métricas ou detalhes metodológicos ausentes nas fontes. Para substituí-las por explicações mais específicas, forneça o resumo ou PDF correspondente.

As páginas editoriais da Spectrum e da ACS Omega também foram localizadas durante essa atualização e vinculadas às respectivas referências. O conjunto de trabalhos e seus estados de aceite/publicação não foi ampliado.
