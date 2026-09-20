document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Smooth Scroll
  window.scrollToSection = function (id) {
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
    }
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Pricing Interval Toggle
  const btnMonthly = document.getElementById('btn-monthly');
  const btnAnnual = document.getElementById('btn-annual');
  const priceBasic = document.getElementById('price-basic');
  const priceStandard = document.getElementById('price-standard');
  const pricePro = document.getElementById('price-pro');

  const periodBasic = document.getElementById('period-basic');
  const periodStandard = document.getElementById('period-standard');
  const periodPro = document.getElementById('period-pro');

  const strikeBasic = document.getElementById('strike-basic');
  const strikeStandard = document.getElementById('strike-standard');
  const strikePro = document.getElementById('strike-pro');

  window.setBillingInterval = function (interval) {
    if (interval === 'monthly') {
      btnMonthly.classList.add('bg-primary', 'text-primary-foreground');
      btnMonthly.classList.remove('text-muted-foreground');
      btnAnnual.classList.remove('bg-primary', 'text-primary-foreground');
      btnAnnual.classList.add('text-muted-foreground');

      priceBasic.textContent = '₹1,199';
      priceStandard.textContent = '₹2,999';
      pricePro.textContent = '₹5,999';

      periodBasic.textContent = '/month';
      periodStandard.textContent = '/month';
      periodPro.textContent = '/month';

      if (strikeBasic) strikeBasic.classList.remove('hidden');
      if (strikeStandard) strikeStandard.classList.remove('hidden');
      if (strikePro) strikePro.classList.remove('hidden');
    } else {
      btnAnnual.classList.add('bg-primary', 'text-primary-foreground');
      btnAnnual.classList.remove('text-muted-foreground');
      btnMonthly.classList.remove('bg-primary', 'text-primary-foreground');
      btnMonthly.classList.add('text-muted-foreground');

      priceBasic.textContent = '₹9,592';
      priceStandard.textContent = '₹23,992';
      pricePro.textContent = '₹47,992';

      periodBasic.textContent = '/year';
      periodStandard.textContent = '/year';
      periodPro.textContent = '/year';

      if (strikeBasic) strikeBasic.classList.add('hidden');
      if (strikeStandard) strikeStandard.classList.add('hidden');
      if (strikePro) strikePro.classList.add('hidden');
    }
  };

  // Modal Handlers
  const comingSoonModal = document.getElementById('coming-soon-modal');
  const comparisonModal = document.getElementById('comparison-modal');
  const modalServiceName = document.getElementById('modal-service-name');

  window.openComingSoon = function (serviceName) {
    if (modalServiceName) {
      modalServiceName.textContent = serviceName || 'this feature';
    }
    if (comingSoonModal) {
      comingSoonModal.classList.add('active');
    }
  };

  window.closeComingSoon = function () {
    if (comingSoonModal) {
      comingSoonModal.classList.remove('active');
    }
  };

  window.openComparison = function () {
    if (comparisonModal) {
      comparisonModal.classList.add('active');
    }
  };

  window.closeComparison = function () {
    if (comparisonModal) {
      comparisonModal.classList.remove('active');
    }
  };

  // Close modals on overlay click
  [comingSoonModal, comparisonModal].forEach((modal) => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    }
  });

  // Handle ESC key for closing modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeComingSoon();
      closeComparison();
    }
  });
});
