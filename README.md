# Convite Digital de Casamento

Convite digital premium, responsivo e totalmente personalizável via arquivo de configuração.

## Como Personalizar

### 1. Trocar nomes dos noivos
Edite `js/config.js`:
```js
noivos: {
  nome1: "Nome do Noivo",
  nome2: "Nome da Noiva"
}
```

### 2. Trocar data, horário e local
```js
data: "15 de Dezembro de 2026",
dataISO: "2026-12-15T16:00:00",
horario: "16:00",
local: "Espaço Villa di Fiori",
endereco: "Rua das Flores, 123 - São Paulo"
```

### 3. Trocar a foto do casal
1. Coloque a foto em `assets/images/`
2. Em `js/config.js`, altere:
```js
fotoPrincipal: "assets/images/sua-foto.jpg"
```
> Se a imagem não existir, será exibido um placeholder com as iniciais.

### 4. Aplicar filtro na foto
Você pode deixar a foto em preto e branco, sépia ou outro estilo:
```js
fotoFiltro: "grayscale(100%)",     // preto e branco
fotoFiltro: "sepia(60%)",          // tom sépia
fotoFiltro: "grayscale(50%) sepia(30%)",  // misturado
fotoFiltro: "none",                 // sem filtro (padrão)
```

### 5. Trocar a música
1. Coloque o arquivo em `assets/music/`
2. Em `js/config.js`:
```js
musica: "assets/music/sua-musica.mp3",
musicaHabilitada: true
```

### 6. Alterar cores
Edite a paleta em `js/config.js`:
```js
paleta: {
  primary: "#D4AF37",
  primaryLight: "#F0DFA0",
  secondary: "#F5F0E8",
  background: "#FAF8F5",
  text: "#2C2C2C",
  accent: "#C4956A"
}
```

### 7. História do casal
```js
historia: [
  { ano: "2019", texto: "Nos conhecemos" },
  { ano: "2026", texto: "O sim" }
]
```

### 8. WhatsApp e confirmação
```js
whatsapp: "5567999999999",
mensagemWhatsApp: "Olá! Confirmo minha presença..."
```

### 9. Lista de presentes
```js
pix: "chavepix@email.com",
listaPresentes: "https://www.exemplo.com/lista",
mensagemPresentes: "Sua presença é o melhor presente..."
```

## Publicar no Vercel

1. Crie uma conta em [vercel.com](https://vercel.com)
2. Instale a CLI: `npm i -g vercel`
3. No diretório do projeto:
```bash
vercel
```
4. Siga as instruções (pode manter as configurações padrão)

O Vercel detecta automaticamente que é um projeto estático.

## Estrutura

```
convite/
├── index.html
├── css/
│   ├── style.css
│   └── animations.css
├── js/
│   ├── config.js
│   └── script.js
├── assets/
│   ├── images/
│   ├── music/
│   └── icons/
└── README.md
```

## Tecnologias

- HTML5 / CSS3 / JavaScript ES6+
- GSAP (animações)
- Particles.js (partículas)
- Fontes: Cormorant Garamond + Montserrat

Feito com dedicação para momentos especiais.
