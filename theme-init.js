/**
 * WebStack - Luxury Theme Initialization
 * Enforces prestigious dark luxury aesthetic with Gold & Red royal accents.
 */
(function() {
  try {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('portfolio_theme', 'dark');
    }
  } catch (e) {}
})();
