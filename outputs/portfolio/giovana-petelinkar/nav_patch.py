import re

with open('index.html', 'r') as f:
    html = f.read()

# Substituir link simples Cases por dropdown
old_nav = '''<a href="#cases">Cases</a>
        <a href="#competencias">Serviços</a>'''

new_nav = '''<div class="nav-dropdown">
          <a href="#cases" class="nav-dropdown-trigger">Cases</a>
          <div class="nav-dropdown-menu">
            <a href="#case-renata-dias">Renata Dias Atelier</a>
            <a href="#case-lumos">Lumos Decor</a>
            <a href="#case-pipa">Reserva da Pipa</a>
            <a href="#case-bauten">Bauten</a>
            <a href="#case-mentora">Direcionamento de Conteúdo</a>
          </div>
        </div>
        <a href="#competencias">Serviços</a>'''

html = html.replace(old_nav, new_nav)

# Adicionar IDs nos articles dos cases
html = html.replace('<!-- CASE 1: Renata Dias Atelier — STAR MOMENT -->\n    <article class="case-study star-moment">', '<!-- CASE 1: Renata Dias Atelier — STAR MOMENT -->\n    <article class="case-study star-moment" id="case-renata-dias">')
html = html.replace('<!-- CASE 2: Lumos Decor -->\n    <article class="case-study">', '<!-- CASE 2: Lumos Decor -->\n    <article class="case-study" id="case-lumos">')
html = html.replace('<!-- CASE 3: Reserva da Pipa -->\n    <article class="case-study">', '<!-- CASE 3: Reserva da Pipa -->\n    <article class="case-study" id="case-pipa">')
html = html.replace('<!-- CASE 4: Bauten -->\n    <article class="case-study">', '<!-- CASE 4: Bauten -->\n    <article class="case-study" id="case-bauten">')
html = html.replace('<!-- CASE 5: Mentoria + Coach -->\n    <article class="case-study">', '<!-- CASE 5: Mentoria + Coach -->\n    <article class="case-study" id="case-mentora">')

with open('index.html', 'w') as f:
    f.write(html)

print("Nav submenu + case IDs aplicados")
