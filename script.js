document.getElementById('yr').textContent = new Date().getFullYear();

// Highlight the nav link for the section currently in view
const links = document.querySelectorAll('.bar nav a');
const spots = [
  ['#top', document.querySelector('.hero')],
  ['#research', document.getElementById('research')],
  ['#publications', document.getElementById('publications')],
  ['#contact', document.getElementById('contact')]
];

function highlight() {
  const line = window.innerHeight * 0.4;
  let current = spots[0][0];
  spots.forEach(([href, el]) => {
    if (el && el.getBoundingClientRect().top <= line) current = href;
  });
  // at the very bottom of the page, the last section wins
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = '#contact';
  links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === current));
}

window.addEventListener('scroll', highlight, { passive: true });
window.addEventListener('resize', highlight);
highlight();

// Climate (warming) stripes: one stripe per year, 1850-2024.
// NOTE: values are a stylised approximation of the global-mean warming trend,
// not official data. Swap in real anomalies (e.g. from showyourstripes.info) if needed.
(function () {
  const anchors = [[1850,0],[1880,-0.05],[1910,-0.2],[1940,0.1],[1950,-0.05],[1975,0],[2000,0.55],[2010,0.85],[2016,1.2],[2020,1.25],[2024,1.55]];
  const palette = ['#08306b','#2171b5','#6baed6','#deebf7','#fcbba1','#fb6a4a','#cb181d','#67000d'];
  const hex = h => [1,3,5].map(i => parseInt(h.slice(i, i + 2), 16));
  const colour = v => {
    const t = Math.min(1, Math.max(0, (v + 0.4) / 2.1)) * (palette.length - 1);
    const i = Math.min(palette.length - 2, Math.floor(t)), f = t - i;
    const a = hex(palette[i]), b = hex(palette[i + 1]);
    return 'rgb(' + a.map((x, k) => Math.round(x + (b[k] - x) * f)).join(',') + ')';
  };
  const value = y => {
    let k = 0; while (k < anchors.length - 2 && y > anchors[k + 1][0]) k++;
    const [y0, v0] = anchors[k], [y1, v1] = anchors[k + 1];
    return v0 + (v1 - v0) * (y - y0) / (y1 - y0) + Math.sin(y * 12.9898) * 0.09;
  };
  document.querySelectorAll('.stripes').forEach(el => {
    for (let y = 1850; y <= 2024; y++) {
      const s = document.createElement('span');
      s.style.background = colour(value(y));
      el.appendChild(s);
    }
  });
})();
