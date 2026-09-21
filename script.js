// CONFIGURATION: Replace with your Google Apps Script Web App URL after deploying
const GOOGLE_SHEET_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxEPZrQ6fe9F1rFNcJheu3q5xjUc6KnctAp_lB33ImWxnYmGIY3TYlWPba-ag9z6mLNgg/exec';

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
    if (!btnMonthly || !btnAnnual) return;
    if (interval === 'monthly') {
      btnMonthly.classList.add('bg-primary', 'text-primary-foreground');
      btnMonthly.classList.remove('text-muted-foreground');
      btnAnnual.classList.remove('bg-primary', 'text-primary-foreground');
      btnAnnual.classList.add('text-muted-foreground');

      if (priceBasic) priceBasic.textContent = '₹1,199';
      if (priceStandard) priceStandard.textContent = '₹2,999';
      if (pricePro) pricePro.textContent = '₹5,999';

      if (periodBasic) periodBasic.textContent = '/month';
      if (periodStandard) periodStandard.textContent = '/month';
      if (periodPro) periodPro.textContent = '/month';

      if (strikeBasic) strikeBasic.classList.remove('hidden');
      if (strikeStandard) strikeStandard.classList.remove('hidden');
      if (strikePro) strikePro.classList.remove('hidden');
    } else {
      btnAnnual.classList.add('bg-primary', 'text-primary-foreground');
      btnAnnual.classList.remove('text-muted-foreground');
      btnMonthly.classList.remove('bg-primary', 'text-primary-foreground');
      btnMonthly.classList.add('text-muted-foreground');

      if (priceBasic) priceBasic.textContent = '₹9,592';
      if (priceStandard) priceStandard.textContent = '₹23,992';
      if (pricePro) pricePro.textContent = '₹47,992';

      if (periodBasic) periodBasic.textContent = '/year';
      if (periodStandard) periodStandard.textContent = '/year';
      if (periodPro) periodPro.textContent = '/year';

      if (strikeBasic) strikeBasic.classList.add('hidden');
      if (strikeStandard) strikeStandard.classList.add('hidden');
      if (strikePro) strikePro.classList.add('hidden');
    }
  };

  // Waitlist Modal Handlers
  const waitlistModal = document.getElementById('waitlist-modal');
  const comparisonModal = document.getElementById('comparison-modal');
  const modalFeatureLabel = document.getElementById('modal-feature-label');
  const waitlistForm = document.getElementById('waitlist-form');
  const waitlistSuccess = document.getElementById('waitlist-success');

  window.openWaitlist = function (featureName) {
    if (modalFeatureLabel) {
      modalFeatureLabel.textContent = featureName ? ` (${featureName})` : '';
    }
    if (waitlistForm && waitlistSuccess) {
      waitlistForm.classList.remove('hidden');
      waitlistSuccess.classList.add('hidden');
    }
    if (waitlistModal) {
      waitlistModal.classList.add('active');
    }
  };

  window.closeWaitlist = function () {
    if (waitlistModal) {
      waitlistModal.classList.remove('active');
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

  // Waitlist Form Submit Handler
  if (waitlistForm) {
    waitlistForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('waitlist-name')?.value || '';
      const email = document.getElementById('waitlist-email')?.value || '';
      const biz = document.getElementById('waitlist-biz')?.value || '';
      const feature = modalFeatureLabel ? modalFeatureLabel.textContent.replace(/^ \((.*)\)$/, '$1') : '';

      const submitBtn = document.getElementById('waitlist-submit-btn');
      const originalBtnText = submitBtn ? submitBtn.textContent : 'Submit Early Access';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
      }

      const entry = {
        name,
        email,
        biz,
        feature: feature || 'General Waitlist',
        date: new Date().toISOString()
      };

      // 1. Save submission locally in browser as a backup
      try {
        const existing = JSON.parse(localStorage.getItem('avanlira_waitlist') || '[]');
        existing.push(entry);
        localStorage.setItem('avanlira_waitlist', JSON.stringify(existing));
      } catch (err) {
        console.warn('LocalStorage backup error:', err);
      }

      // 2. Send submission to Google Sheets API endpoint if configured
      if (GOOGLE_SHEET_WEB_APP_URL && GOOGLE_SHEET_WEB_APP_URL.trim() !== '') {
        try {
          await fetch(GOOGLE_SHEET_WEB_APP_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'text/plain'
            },
            body: JSON.stringify(entry)
          });
        } catch (error) {
          console.error('Error submitting waitlist to Google Sheet:', error);
        }
      }

      // Reset button state
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }

      // Reset input fields
      waitlistForm.reset();

      // 3. Show success screen
      if (waitlistForm && waitlistSuccess) {
        waitlistForm.classList.add('hidden');
        waitlistSuccess.classList.remove('hidden');
      }
    });
  }

  // Close modals on overlay click
  [waitlistModal, comparisonModal].forEach((modal) => {
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
      closeWaitlist();
      closeComparison();
    }
  });
});
