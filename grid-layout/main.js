const sideNavbar = document.querySelector('.side-navbar');
const container = document.querySelector('.container');
const overlay = document.querySelector('.overlay');
const headerNavItems = document.querySelectorAll('.header__nav-item');
const headerSubMenus = document.querySelectorAll('.header__sub-nav');

headerNavItems.forEach(item => {
  item.addEventListener('mouseenter', e => {
    const id = e.target.dataset.submenu;
    headerSubMenus.forEach((sub, i) => {
      if (sub.dataset.submenu == id) {
        headerSubMenus[i].classList.add('show');
      } else if (id === undefined) {
        headerSubMenus[i].classList.remove('show');
      }
    });
  });

  item.addEventListener('mouseleave', e => {
    if (e.target.dataset.submenu) {
      headerSubMenus[e.target.dataset.submenu].classList.remove('show');
    }
  });
});

document.querySelector('.hamburger').addEventListener('click', handleSidebar);

overlay.onclick = () => {
  handleSidebar();
};

function handleSidebar() {
  if (sideNavbar.classList.contains('showing')) {
    console.log('if');
    sideNavbar.classList.remove('showing');
    overlay.classList.remove('active');
  } else {
    console.log('else');
    sideNavbar.classList.add('showing');
    overlay.classList.add('active');
  }
}
