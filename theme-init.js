/**
 * WebStack - Light Theme Initialization
 * Pure light mode across all pages. Zero dark mode to avoid FOUC.
 */
(function() {
  try {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  } catch (e) {}
})();
