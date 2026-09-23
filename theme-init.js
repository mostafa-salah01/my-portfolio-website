/**
 * Mostafa Salah Portfolio - Synchronous Theme Initialization
 * Executed in <head> to prevent Flash of Unstyled Content (FOUC)
 * Strictly conforms to Content Security Policy (no inline script needed)
 */
(function() {
  try {
    var savedTheme = localStorage.getItem('portfolio_theme');
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
