// Алекс Ворон — портфолио. Минимальный JS: подсветка активного раздела в шапке.
(function () {
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  var sections = navLinks
    .map(function (a) {
      var id = a.getAttribute('href').slice(1);
      var el = document.getElementById(id);
      return el ? { link: a, el: el } : null;
    })
    .filter(Boolean);

  if (!sections.length || !('IntersectionObserver' in window)) return;

  var visible = new Set();

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) visible.add(entry.target);
      else visible.delete(entry.target);
    });

    var current = null;
    sections.forEach(function (s) {
      if (visible.has(s.el)) current = s;
    });

    navLinks.forEach(function (a) { a.removeAttribute('aria-current'); });
    if (current) current.link.setAttribute('aria-current', 'true');
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(function (s) { io.observe(s.el); });
})();
