(() => {
  const menuBtnRef = document.querySelector('[data-menu-button]');
  const mobileMenuRef = document.querySelector('[data-menu]');

  menuBtnRef.addEventListener('click', () => {
    const expanded =
      menuBtnRef.getAttribute('aria-expanded') === 'true' || false;

    document.body.classList.toggle('menu-is-open');
    menuBtnRef.classList.toggle('is-open');
    menuBtnRef.setAttribute('aria-expanded', !expanded);

    mobileMenuRef.classList.toggle('is-open');
  });

  let links = document.querySelectorAll('[data-site-nav]');
  for (let link of links) {
    link.addEventListener('click', () => {
      document.body.classList.remove('menu-is-open');
      mobileMenuRef.classList.remove('is-open');
      menuBtnRef.classList.remove('is-open');
    });
  }
})();
