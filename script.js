// Menu Data
const menuItems = [
  {
    id: '1',
    name: 'Cosmic Latte',
    description: 'Swirled with stardust and dreams',
    price: 5.50,
    category: 'drinks',
    image: 'cosmic-latte.jpg',
    vegan: false,
    dairyFree: false
  },
  {
    id: '2',
    name: 'Nebula Matcha',
    description: 'Green tea with a cosmic twist',
    price: 6.00,
    category: 'drinks',
    image: 'nebula-matcha.jpg',
    vegan: true,
    dairyFree: false
  },
  {
    id: '3',
    name: 'Stellar Croissant',
    description: 'Flaky perfection with caramel glaze',
    price: 4.50,
    category: 'pastries',
    image: 'stellar-croissant.jpg',
    vegan: false,
    dairyFree: false
  },
  {
    id: '4',
    name: 'Galaxy Cupcake',
    description: 'Chocolate bliss with cosmic frosting',
    price: 5.00,
    category: 'pastries',
    image: 'galaxy-cupcake.jpg',
    vegan: false,
    dairyFree: false
  },
  {
    id: '5',
    name: 'Orbit Espresso',
    description: 'Double shot of pure energy',
    price: 4.00,
    category: 'drinks',
    image: 'cosmic-latte.jpg',
    vegan: true,
    dairyFree: true
  },
  {
    id: '6',
    name: 'Moonbeam Muffin',
    description: 'Blueberry with a hint of lemon',
    price: 3.50,
    category: 'pastries',
    image: 'stellar-croissant.jpg',
    vegan: false,
    dairyFree: false
  }
];

// Gallery Data
const galleryImages = [
  { src: 'cafe-interior-1.jpg', alt: 'Cozy cafe interior with warm lighting' },
  { src: 'cosmic-latte.jpg', alt: 'Cosmic Latte with galaxy foam art' },
  { src: 'nebula-matcha.jpg', alt: 'Nebula Matcha iced drink' },
  { src: 'stellar-croissant.jpg', alt: 'Golden croissant with caramel glaze' },
  { src: 'galaxy-cupcake.jpg', alt: 'Galaxy cupcake with cosmic frosting' },
  { src: 'cafe-interior-1.jpg', alt: 'Comfortable seating area' }
];

// State
let cart = JSON.parse(localStorage.getItem('cosmicCart')) || [];
let currentCategory = 'all';

// Utility Functions
function saveCart() {
  localStorage.setItem('cosmicCart', JSON.stringify(cart));
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3000);
}

function smoothScroll(target) {
  const element = document.querySelector(target);
  if (element) {
    const offset = 80; // navbar height
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

// Navigation
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  menuIcon.classList.toggle('hidden');
  closeIcon.classList.toggle('hidden');
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = this.getAttribute('href');
    smoothScroll(target);
    
    // Close mobile menu if open
    if (!mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }
  });
});

// Logo button scroll to top
document.querySelector('.logo-btn').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Hero Section - Generate floating stars
const starsContainer = document.querySelector('.stars');
for (let i = 0; i < 20; i++) {
  const star = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  star.setAttribute('viewBox', '0 0 24 24');
  star.setAttribute('fill', 'none');
  star.setAttribute('stroke', 'currentColor');
  star.setAttribute('stroke-width', '2');
  star.style.position = 'absolute';
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.width = `${Math.random() * 8 + 4}px`;
  star.style.height = `${Math.random() * 8 + 4}px`;
  star.style.color = 'var(--cosmic-star)';
  star.classList.add('animate-twinkle');
  star.style.animationDelay = `${Math.random() * 3}s`;
  star.style.animationDuration = `${Math.random() * 2 + 2}s`;
  
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z');
  star.appendChild(path);
  starsContainer.appendChild(star);
}

// Menu Section
const menuGrid = document.getElementById('menuGrid');
const filterButtons = document.querySelectorAll('.filter-btn');

function renderMenu(category = 'all') {
  const filteredItems = category === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === category);
  
  menuGrid.innerHTML = filteredItems.map(item => `
    <div class="card glass-card menu-card">
      <div class="menu-image-wrapper">
        <img src="${item.image}" alt="${item.name}" class="menu-image" loading="lazy" />
        <div class="menu-badges">
          ${item.vegan ? `
            <div class="badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
              Vegan
            </div>
          ` : ''}
          ${item.dairyFree ? `
            <div class="badge" style="background: var(--accent);">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
              DF
            </div>
          ` : ''}
        </div>
      </div>
      <div class="menu-content">
        <div class="menu-header">
          <h3 class="menu-name">${item.name}</h3>
          <span class="menu-price">$${item.price.toFixed(2)}</span>
        </div>
        <p class="menu-description">${item.description}</p>
      </div>
    </div>
  `).join('');
}

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const category = btn.dataset.category;
    currentCategory = category;
    renderMenu(category);
  });
});

// Initial menu render
renderMenu();

// Gallery Section
const galleryGrid = document.getElementById('galleryGrid');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.querySelector('.lightbox-close');

function renderGallery() {
  galleryGrid.innerHTML = galleryImages.map((image, index) => `
    <div class="gallery-item" data-index="${index}">
      <img src="${image.src}" alt="${image.alt}" class="gallery-image" loading="lazy" />
      <div class="gallery-overlay">
        <span class="gallery-view-text">View</span>
      </div>
    </div>
  `).join('');
  
  // Add click handlers
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const index = parseInt(item.dataset.index);
      openLightbox(index);
    });
  });
}

function openLightbox(index) {
  const image = galleryImages[index];
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = image.alt;
  lightbox.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.add('hidden');
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('hidden') && e.key === 'Escape') {
    closeLightbox();
  }
});

renderGallery();

// Contact Form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);
  
  // Validate
  if (!data.name || !data.email || !data.message) {
    showToast('Please fill in all fields');
    return;
  }
  
  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    showToast('Please enter a valid email address');
    return;
  }
  
  console.log('Contact form submitted:', data);
  showToast('Message sent! 🚀 We\'ll get back to you faster than light speed!');
  contactForm.reset();
});

// Newsletter Form
const newsletterForm = document.getElementById('newsletterForm');

newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = new FormData(newsletterForm);
  const email = formData.get('email');
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast('Please enter a valid email address');
    return;
  }
  
  console.log('Newsletter subscription:', email);
  showToast('Welcome aboard! 🌟 You\'re now part of our cosmic community!');
  newsletterForm.reset();
});

// Order Modal
const orderModal = document.getElementById('orderModal');
const orderButtons = document.querySelectorAll('.order-btn, .hero-order-btn, .mobile-order-btn');
const modalCloseBtn = document.querySelector('.modal-close');
const closeModalBtns = document.querySelectorAll('.close-modal-btn');
const cartContent = document.getElementById('cartContent');
const cartItems = document.getElementById('cartItems');
const emptyCart = document.getElementById('emptyCart');
const cartSummary = document.getElementById('cartSummary');
const cartSubtotal = document.getElementById('cartSubtotal');
const checkoutBtn = document.getElementById('checkoutBtn');

function openOrderModal() {
  orderModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  renderCart();
}

function closeOrderModal() {
  orderModal.classList.add('hidden');
  document.body.style.overflow = '';
}

orderButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Add default item to cart if empty
    if (cart.length === 0) {
      cart.push({
        id: '1',
        name: 'Cosmic Latte',
        price: 5.50,
        quantity: 1,
        image: '../src/assets/cosmic-latte.jpg'
      });
      saveCart();
    }
    openOrderModal();
  });
});

modalCloseBtn.addEventListener('click', closeOrderModal);
closeModalBtns.forEach(btn => {
  btn.addEventListener('click', closeOrderModal);
});

orderModal.addEventListener('click', (e) => {
  if (e.target === orderModal) {
    closeOrderModal();
  }
});

function updateQuantity(itemId, change) {
  const item = cart.find(i => i.id === itemId);
  if (item) {
    item.quantity = Math.max(0, item.quantity + change);
    if (item.quantity === 0) {
      cart = cart.filter(i => i.id !== itemId);
    }
    saveCart();
    renderCart();
  }
}

function removeItem(itemId) {
  cart = cart.filter(i => i.id !== itemId);
  saveCart();
  renderCart();
}

function renderCart() {
  if (cart.length === 0) {
    emptyCart.classList.remove('hidden');
    cartItems.innerHTML = '';
    cartSummary.classList.add('hidden');
  } else {
    emptyCart.classList.add('hidden');
    cartSummary.classList.remove('hidden');
    
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
        <div class="cart-item-info">
          <h3 class="cart-item-name">${item.name}</h3>
          <p class="cart-item-price">$${item.price.toFixed(2)}</p>
          <div class="cart-item-controls">
            <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </button>
            <span class="quantity-display">${item.quantity}</span>
            <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </button>
            <button class="remove-btn" onclick="removeItem('${item.id}')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="cart-item-total">
          $${(item.price * item.quantity).toFixed(2)}
        </div>
      </div>
    `).join('');
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  }
}

checkoutBtn.addEventListener('click', () => {
  showToast('Order placed! 🚀 Your cosmic treats are on their way!');
  cart = [];
  saveCart();
  closeOrderModal();
});

// Make functions globally available for inline handlers
window.updateQuantity = updateQuantity;
window.removeItem = removeItem;

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (!orderModal.classList.contains('hidden')) {
      closeOrderModal();
    }
  }
});

// Initialize AOS-like animations on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in-up');
    }
  });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('.section').forEach(section => {
  observer.observe(section);
});

// Log initialization
console.log('🌟 Cosmic Cafe initialized successfully!');
