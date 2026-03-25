with open('index.html', 'r') as f:
    html = f.read()

# CSS do dropdown + espaçamento reduzido
dropdown_css = """
/* --- Nav Dropdown --- */
.nav-dropdown { position: relative; }
.nav-dropdown-trigger { cursor: pointer; }
.nav-dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background: var(--white);
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  padding: 8px 0;
  min-width: 220px;
  z-index: 200;
  margin-top: 8px;
}
.nav-dropdown:hover .nav-dropdown-menu { display: block; }
.nav-dropdown-menu a {
  display: block;
  padding: 8px 20px;
  font-family: var(--font-heading);
  font-size: 0.8125rem;
  font-weight: 400;
  color: var(--onyx-90);
  text-decoration: none;
  transition: background 0.15s, color 0.15s;
}
.nav-dropdown-menu a:hover { background: var(--marfim); color: var(--terracota); }

"""

# 3. ÍCONES SVG nos serviços — substituir emojis por SVG inline
svg_icons = {
    '&#x1F4CB;': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 14h6"/><path d="M9 18h6"/><path d="M9 10h6"/></svg>',
    '&#x1F3AF;': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    '&#x270D;&#xFE0F;': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
    '&#x1F3AC;': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>',
    '&#x1F3A8;': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="12" r="2.5"/><circle cx="8" cy="18" r="2.5"/><circle cx="16" cy="18" r="2.5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10c0-1.5-.3-2.9-.9-4.2"/></svg>',
    '&#x1F4CA;': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>',
}

# Inserir CSS do dropdown antes de </style>
html = html.replace('</style>', dropdown_css + '</style>')

# Substituir emojis por SVGs
for emoji, svg in svg_icons.items():
    html = html.replace(emoji, svg)

# 4. REDUZIR ESPAÇAMENTOS — usuário acha muito espaço
# Trocar section-gap de 120px para 80px
html = html.replace('--space-4xl: 120px;    /* 15 units */', '--space-4xl: 80px;     /* 10 units */')
# Reduzir section-gap
html = html.replace('--section-gap: var(--space-4xl);', '--section-gap: 72px;')

with open('index.html', 'w') as f:
    f.write(html)

print("Dropdown CSS + SVG icons + espaçamento reduzido aplicados")
