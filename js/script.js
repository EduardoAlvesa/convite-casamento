document.addEventListener('DOMContentLoaded', () => {
  carregarDados();
  animarIntro();
  initParticles();
  setTimeout(() => criarPetalas(), 3000);

  if (convite.musicaHabilitada) {
    const audio = document.createElement('audio');
    audio.src = convite.musica;
    audio.loop = true;
    audio.volume = 0.3;
    audio.id = 'musicaFundo';

    const btnAbrir = document.getElementById('btnAbrir');
    btnAbrir.addEventListener('click', () => {
      audio.play().catch(() => {});
    }, { once: true });
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const isMobile = window.innerWidth < 768;
      document.querySelectorAll('.petal').forEach(p => {
        p.style.animationDuration = `${10 + Math.random() * (isMobile ? 10 : 15)}s`;
      });
    }, 500);
  });
});

function carregarDados() {
  const c = convite;

  document.getElementById('nome1').textContent = c.noivos.nome1;
  document.getElementById('nome2').textContent = c.noivos.nome2;

  const inicial1 = c.noivos.nome1.charAt(0).toUpperCase();
  const inicial2 = c.noivos.nome2.charAt(0).toUpperCase();
  const iniciais = `${inicial1} & ${inicial2}`;
  document.getElementById('envelopeInitials').textContent = iniciais;
  document.getElementById('casalPhotoPlaceholder').textContent = iniciais;

  const photoWrapper = document.getElementById('casalPhotoWrapper');
  const placeholder = document.getElementById('casalPhotoPlaceholder');

  const img = new Image();
  img.className = 'casal-photo';
  img.alt = `${c.noivos.nome1} & ${c.noivos.nome2}`;
  img.onload = () => {
    placeholder.style.display = 'none';
    photoWrapper.insertBefore(img, placeholder);
    if (c.fotoFiltro && c.fotoFiltro !== 'none') {
      photoWrapper.style.filter = c.fotoFiltro;
    }
  };
  img.onerror = () => {
    photoWrapper.style.filter = 'none';
  };
  img.src = c.fotoPrincipal;

  document.getElementById('casalPhrase').textContent = c.frasePrincipal;
  document.getElementById('casalDate').textContent = c.data;

  document.getElementById('convNome1').textContent = c.noivos.nome1;
  document.getElementById('convNome2').textContent = c.noivos.nome2;
  document.getElementById('convData').textContent = c.data;
  document.getElementById('convHorario').textContent = c.horario;
  document.getElementById('convLocal').textContent = c.local;

  document.getElementById('localName').textContent = c.local;
  document.getElementById('localAddress').textContent = c.endereco;
  document.getElementById('localDatetime').textContent = `${c.data} às ${c.horario}`;

  const iframe = document.createElement('iframe');
  iframe.src = `https://maps.google.com/maps?q=${encodeURIComponent(c.endereco)}&output=embed`;
  iframe.loading = 'lazy';
  iframe.title = 'Mapa do local';
  document.getElementById('localMap').appendChild(iframe);

  document.getElementById('btnMapa').href = c.googleMaps;
  document.getElementById('btnWhatsApp').href =
    `https://wa.me/${c.whatsapp}?text=${encodeURIComponent(c.mensagemWhatsApp)}`;

  const historiaContainer = document.getElementById('timeline');
  c.historia.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'timeline-item';
    div.innerHTML = `
      <span class="timeline-year">${item.ano}</span>
      <div class="timeline-dot"></div>
      <p class="timeline-text">"${item.texto}"</p>
    `;
    historiaContainer.appendChild(div);
  });
}

function initParticles() {
  if (typeof particlesJS === 'undefined') {
    setTimeout(initParticles, 500);
    return;
  }
  const isMobile = window.innerWidth < 768;

  particlesJS('particles-bg', {
    particles: {
      number: { value: isMobile ? 25 : 60, density: { enable: true } },
      color: { value: '#d4af37' },
      shape: { type: 'circle' },
      opacity: { value: 0.3, random: true },
      size: { value: isMobile ? 1.5 : 2, random: true },
      move: {
        enable: true,
        speed: isMobile ? 0.3 : 0.5,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out'
      },
      line_linked: {
        enable: !isMobile,
        distance: 150,
        color: '#d4af37',
        opacity: 0.1,
        width: 1
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: !isMobile, mode: 'repulse' },
        onclick: { enable: false }
      }
    },
    retina_detect: true
  });
}

function animarIntro() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.fromTo('#introLogo', { y: -20, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, duration: 1 })
    .fromTo('#introLabel', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, '-=0.4')
    .fromTo('#introDivider', { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'power2.inOut' }, '-=0.6')
    .fromTo('#introTitle', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, '-=0.6')
    .fromTo('#btnAbrir', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=0.4');

  document.getElementById('btnAbrir').addEventListener('click', abrirCarta);
}

function abrirCarta() {
  const intro = document.getElementById('intro');
  const envelope = document.getElementById('envelope-section');

  gsap.to(intro, {
    opacity: 0,
    duration: 0.8,
    ease: 'power2.inOut',
    onComplete: () => {
      intro.style.display = 'none';
      envelope.classList.add('active');
      envelope.style.display = 'flex';
      gsap.fromTo(envelope, { opacity: 0 }, { opacity: 1, duration: 0.6 });

      const hint = document.getElementById('envelopeHint');
      gsap.to(hint, { opacity: 1, duration: 0.8, delay: 0.4 });

      const envContainer = document.getElementById('envelopeContainer');
      envContainer.addEventListener('click', animarEnvelope, { once: true });
    }
  });
}

function animarEnvelope() {
  const seal = document.getElementById('waxSeal');
  const flap = document.getElementById('envelopeFlap');
  const envelope = document.getElementById('envelope');
  const preview = document.getElementById('letterPreview');
  const hint = document.getElementById('envelopeHint');
  const container = document.getElementById('envelopeContainer');

  const tl = gsap.timeline();

  tl.to(seal, {
    scale: 1.3,
    rotation: 15,
    duration: 0.3,
    ease: 'power2.out'
  })
  .to(seal, {
    scale: 0,
    rotation: 180,
    opacity: 0,
    duration: 0.4,
    ease: 'back.in(2)'
  })
  .to(flap, {
    rotationX: -180,
    duration: 0.6,
    ease: 'power2.inOut'
  }, '-=0.2')
  .to(preview, {
    y: 0,
    opacity: 1,
    duration: 0.6,
    ease: 'power3.out'
  }, '-=0.3')
  .to(hint, {
    opacity: 0,
    duration: 0.3
  }, '-=0.5')
  .to(container, {
    scale: 1.05,
    duration: 0.3
  })
  .to(container, {
    scale: 1,
    duration: 0.3
  }, '+=0.1')
  .to({}, {
    duration: 1.2,
    onComplete: mostrarConvite
  });
}

function mostrarConvite() {
  const envelope = document.getElementById('envelope-section');
  const revelacao = document.getElementById('revelacao');

  envelope.classList.remove('active');
  envelope.style.display = 'none';

  revelacao.classList.add('active');
  revelacao.style.display = 'flex';

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.fromTo('#revelacao', { opacity: 0 }, { opacity: 1, duration: 0.6 })
    .fromTo('#casalPhotoWrapper', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2 }, '-=0.3')
    .fromTo('.casal-names', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.4')
    .fromTo('#casalPhrase', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.3')
    .fromTo('#casalDate', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.2');

  tl.to({}, { duration: 1.5, onComplete: animarElementos });
}

function animarElementos() {
  const sections = [
    { id: 'convite-principal', type: 'convite' },
    { id: 'historia', type: 'historia' },
    { id: 'contagem', type: 'contagem' },
    { id: 'local', type: 'local' },
    { id: 'confirmacao', type: 'confirmacao' },
    { id: 'despedida', type: 'despedida' }
  ];

  let delay = 0;

  sections.forEach((sec, index) => {
    setTimeout(() => {
      const el = document.getElementById(sec.id);
      el.classList.add('active');
      el.style.display = 'flex';
      gsap.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });

      if (sec.type === 'convite') animarConviteInfo();
      if (sec.type === 'historia') animarTimeline();
      if (sec.type === 'contagem') { iniciarContagem(); animarContagem(); }
      if (sec.type === 'despedida') animarDespedida();
    }, delay);

    delay += 1200;
  });
}

function animarConviteInfo() {
  gsap.fromTo('.convite-info-item', { y: 20, opacity: 0 }, {
    y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: 'power3.out', delay: 0.3
  });
}

function animarTimeline() {
  const items = document.querySelectorAll('.timeline-item');
  gsap.fromTo(items, { y: 30, opacity: 0 }, {
    y: 0, opacity: 1, duration: 0.8, stagger: 0.3, ease: 'power3.out', delay: 0.3
  });
}

function animarContagem() {
  const items = document.querySelectorAll('.countdown-item');
  gsap.fromTo(items, { y: 30, opacity: 0 }, {
    y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out', delay: 0.3
  });
}

function animarDespedida() {
  gsap.fromTo('#despedidaText', { y: 30, opacity: 0 }, {
    y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.3
  });
  gsap.fromTo('.despedida-sub', { y: 20, opacity: 0 }, {
    y: 0, opacity: 1, duration: 0.8, delay: 0.8, ease: 'power3.out'
  });
}

function iniciarContagem() {
  const dataAlvo = new Date(convite.dataISO).getTime();

  function atualizar() {
    const agora = new Date().getTime();
    const diff = dataAlvo - agora;

    if (diff <= 0) {
      document.getElementById('days').textContent = '00';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      return;
    }

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(dias).padStart(2, '0');
    document.getElementById('hours').textContent = String(horas).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutos).padStart(2, '0');
    document.getElementById('seconds').textContent = String(segundos).padStart(2, '0');
  }

  atualizar();
  setInterval(atualizar, 1000);
}

function criarPetalas() {
  const container = document.getElementById('petalsContainer');
  const cores = ['#D4AF37', '#F0DFA0', '#C4956A', '#F5F0E8'];
  const isMobile = window.innerWidth < 768;
  const count = isMobile ? 12 : 25;

  for (let i = 0; i < count; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.background = cores[Math.floor(Math.random() * cores.length)];
    petal.style.animationDuration = `${10 + Math.random() * 15}s`;
    petal.style.animationDelay = `${Math.random() * 20}s`;
    petal.style.width = `${8 + Math.random() * 8}px`;
    petal.style.height = `${12 + Math.random() * 8}px`;
    petal.style.opacity = `${0.15 + Math.random() * 0.25}`;
    container.appendChild(petal);
  }
}
