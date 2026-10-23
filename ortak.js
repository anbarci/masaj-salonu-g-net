(() => {
  const NO = '905550000000';
  const SAAT = [[12, 20], [10, 21], [10, 21], [10, 21], [10, 21], [10, 21], [10, 21]];

  document.querySelectorAll('form[data-randevu]').forEach(form => {
    const cikti = form.querySelector('[data-mesaj]') || document.querySelector('[data-mesaj]');
    const gonder = form.querySelector('[data-gonder]') || document.querySelector('[data-gonder]');
    const cumle = form.querySelector('[data-cumle]');
    const yenile = () => {
      if (cumle) {
        const metin = [...cumle.childNodes].map(n => {
          if (n.nodeType === 3) return n.textContent;
          const el = n.matches('select,input') ? n : n.querySelector('select,input');
          return el ? el.value : n.textContent;
        }).join('').replace(/\s+/g, ' ').trim();
        if (cikti) cikti.textContent = metin;
        gonder.href = 'https://wa.me/' + NO + '?text=' + encodeURIComponent(metin);
        return;
      }
      const satir = ['Merhaba, randevu almak istiyorum.'];
      for (const el of form.elements) {
        if (!el.name) continue;
        const deger = String(el.value).trim();
        if (!deger) continue;
        const etiket = el.dataset.etiket || form.querySelector('label[for="' + el.id + '"]').textContent.trim();
        satir.push(etiket + ': ' + deger);
      }
      const metin = satir.join('\n');
      if (cikti) cikti.textContent = metin;
      gonder.href = 'https://wa.me/' + NO + '?text=' + encodeURIComponent(metin);
    };
    form.addEventListener('input', yenile);
    form.addEventListener('submit', e => { e.preventDefault(); location.href = gonder.href; });
    yenile();
  });

  const durum = (gun, dk) => {
    const [ac, kapa] = SAAT[gun];
    if (dk >= ac * 60 && dk < kapa * 60) return 'Şu an açık. Kapanış ' + kapa + '.00.';
    if (dk < ac * 60) return 'Şu an kapalı. Açılış bugün ' + ac + '.00.';
    return 'Şu an kapalı. Açılış yarın ' + SAAT[(gun + 1) % 7][0] + '.00.';
  };
  console.assert(durum(1, 600) === 'Şu an açık. Kapanış 21.00.');
  console.assert(durum(0, 660) === 'Şu an kapalı. Açılış bugün 12.00.');
  console.assert(durum(6, 1300) === 'Şu an kapalı. Açılış yarın 12.00.');

  const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Istanbul', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date()).map(x => [x.type, x.value]));
  const gun = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday);
  if (gun > -1) {
    const metin = durum(gun, +p.hour * 60 + +p.minute);
    document.querySelectorAll('[data-durum]').forEach(el => { el.textContent = metin; el.dataset.acik = metin.startsWith('Şu an açık') ? '1' : '0'; el.hidden = false; });
    document.querySelectorAll('tr[data-gun="' + gun + '"]').forEach(tr => {
      tr.classList.add('bugun');
      tr.querySelector('th').insertAdjacentHTML('beforeend', ' <span>bugün</span>');
    });
  }

  const cubuk = document.querySelector('.cubuk');
  if (cubuk && 'IntersectionObserver' in window) {
    const gorunen = new Set();
    const io = new IntersectionObserver(girdiler => {
      girdiler.forEach(g => g.isIntersecting ? gorunen.add(g.target) : gorunen.delete(g.target));
      cubuk.classList.toggle('gizle', gorunen.size > 0);
    }, { rootMargin: '-1px 0px 0px 0px' });
    document.querySelectorAll('[data-cubuk-gizle]').forEach(el => io.observe(el));
  }
})();
