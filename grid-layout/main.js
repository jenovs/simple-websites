const sideNavbar = document.querySelector('.side-navbar');
const container = document.querySelector('.container');
const overlay = document.querySelector('.overlay');

document.querySelector('header').addEventListener('click', handleSidebar);

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
