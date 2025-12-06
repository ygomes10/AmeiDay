// ===== MENU MOBILE =====
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open', navMenu.classList.contains('active'));
});

// Fechar menu ao clicar em um link
document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// ===== FILTRO PORTFOLIO =====
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class de todos os botões
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Adiciona active class no botão clicado
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
let currentLightboxIndex = 0;
let lightboxItems = [];

// Abrir lightbox
portfolioItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').getAttribute('src');
        const imgAlt = item.querySelector('img').getAttribute('alt');

        lightboxImg.setAttribute('src', imgSrc);
        lightboxImg.setAttribute('alt', imgAlt);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Atualizar array de imagens para navegação
        lightboxItems = Array.from(portfolioItems).map(item => ({
            src: item.querySelector('img').getAttribute('src'),
            alt: item.querySelector('img').getAttribute('alt')
        }));

        currentLightboxIndex = index;
    });
});

// Fechar lightbox
lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Navegação lightbox
function showLightboxImage(index) {
    if (index >= 0 && index < lightboxItems.length) {
        currentLightboxIndex = index;
        lightboxImg.setAttribute('src', lightboxItems[index].src);
        lightboxImg.setAttribute('alt', lightboxItems[index].alt);
    }
}

lightboxPrev.addEventListener('click', () => {
    showLightboxImage(currentLightboxIndex - 1);
});

lightboxNext.addEventListener('click', () => {
    showLightboxImage(currentLightboxIndex + 1);
});

// Navegação por teclado
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    if (e.key === 'ArrowLeft') {
        showLightboxImage(currentLightboxIndex - 1);
    }

    if (e.key === 'ArrowRight') {
        showLightboxImage(currentLightboxIndex + 1);
    }
});

// ===== FORMULÁRIO DE CONTATO =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Coletar dados do formulário
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };

    // Criar mensagem para WhatsApp
    const whatsappMessage = `Olá Day! Gostaria de solicitar um orçamento:
            
Nome: ${formData.name}
E-mail: ${formData.email}
Telefone: ${formData.phone}
Serviço: ${document.getElementById('service').options[document.getElementById('service').selectedIndex].text}
Mensagem: ${formData.message}`;

    // Codificar mensagem para URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Redirecionar para WhatsApp
    window.open(`https://wa.me/558296122426?text=${encodedMessage}`, '_blank');

    // Resetar formulário
    contactForm.reset();

    // Mostrar mensagem de sucesso
    alert('Obrigada pelo contato! Você será redirecionado(a) para o WhatsApp para finalizar sua solicitação.');
});

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== ANIMAÇÃO AO ROLAR =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card').forEach(el => {
    observer.observe(el);
});

// ===== MASCARAS DE INPUT =====
const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 11) {
        value = value.substring(0, 11);
    }

    if (value.length > 10) {
        value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (value.length > 6) {
        value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
    } else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
    } else if (value.length > 0) {
        value = value.replace(/^(\d*)$/, '($1');
    }

    e.target.value = value;
});

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    // Adicionar classe inicial para animações
    document.body.classList.add('loaded');

    // Log inicial
    console.log('Site Amei Day carregado com sucesso!');
});