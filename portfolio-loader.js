/* Data stays local: no connection to the original owner's CMS. */
(async function () {
  function isMobileDevice(env = navigator) {
    if (env.userAgentData && typeof env.userAgentData.mobile === 'boolean' && env.userAgentData.mobile) return true;
    return /Android|iPhone|iPad|iPod|Mobile|Tablet|Silk|Kindle/i.test(env.userAgent || '') || (/Macintosh/i.test(env.userAgent || '') && env.maxTouchPoints > 1);
  }
  function resolveWorkLink(work, mobile = isMobileDevice()) {
    return (mobile ? work.wap || work.pc : work.pc || work.wap) || work.url || work.image || '';
  }
  window.PortfolioLinks = { isMobileDevice, resolveWorkLink };
  try {
    const response = await fetch(new URL('data/works.json', document.baseURI));
    if (!response.ok) throw new Error('作品数据暂不可用');
    const groups = await response.json();
    const byId = new Map(groups.flatMap(group => group.items).map(work => [work.id, work]));
    function updateLinks() {
      document.querySelectorAll('a[data-work]').forEach(anchor => {
        const work = byId.get(anchor.dataset.work);
        if (work) anchor.setAttribute('href', resolveWorkLink(work));
      });
    }
    updateLinks();
    window.addEventListener('pageshow', updateLinks);
    document.addEventListener('pointerdown', updateLinks, {passive:true});
  } catch (error) { console.warn(error.message); }
  const dialog = document.getElementById('imageDialog');
  let lastTrigger;
  document.querySelectorAll('[data-image]').forEach(anchor => anchor.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); lastTrigger = anchor; dialog.showModal();
  }));
  dialog.addEventListener('click', event => {if (event.target === dialog) dialog.close();});
  dialog.addEventListener('close', () => lastTrigger?.focus());
  document.querySelectorAll('.card-cover img').forEach(img => {
    function fallback(){const p=img.parentElement;p.classList.add('cover-fallback');p.textContent=img.alt.replace('项目封面','');}
    img.addEventListener('error',fallback,{once:true});
    if(img.complete && !img.naturalWidth) fallback();
  });
  const navLinks = [...document.querySelectorAll('.sidebar .nav-item')];
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(e => e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];
    if(!visible) return;
    navLinks.forEach(a => {const active=a.hash === '#'+visible.target.id;a.classList.toggle('active', active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
  },{rootMargin:'-10% 0px -65% 0px',threshold:0});
  document.querySelectorAll('section[id]').forEach(section=>observer.observe(section));
})();
