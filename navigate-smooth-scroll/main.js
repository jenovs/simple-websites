document.addEventListener('DOMContentLoaded', function() {
  main();
});

function main() {
  const links = document.querySelectorAll('nav > a');
  const linkToTop = document.getElementById('toTop');
  const sections = document.querySelectorAll('section');
  const navbarHeight = 65;
  const sectionPadding = 0;

  links.forEach(link =>
    link.addEventListener('click', e => {
      if (!e.target.getAttribute('href')) return;

      e.preventDefault();
      const attr = e.target.getAttribute('href');
      const stopY =
        [...sections].find(s => `#${s.id}` == attr).offsetTop - navbarHeight;

      return smoothScroll(stopY);
    })
  );

  const rootEl = document.querySelector(':root');
  rootEl.style.setProperty('--navbar-height', `${navbarHeight}px`);
  rootEl.style.setProperty('--section-padding', `${sectionPadding}px`);

  const sectionsArray = [...sections];
  sectionsArray.sort((a, b) => (a.id > b.id ? -1 : 1));

  window.addEventListener('scroll', e => {
    // find section that is currently on the top
    let active = sectionsArray.find(
      (s, i) => s.getBoundingClientRect().top <= navbarHeight
    );

    // footer bottom is at the bottom edge; set last link as active
    if (isScrolledToBottom()) {
      active = sectionsArray[0];
    }

    links.forEach(link => {
      if (link.getAttribute('href') != `#${active.id}`) {
        link.classList.remove('active');
      } else {
        link.classList.add('active');
      }
    });
  });
}

function isScrolledToBottom() {
  return (
    Math.floor(
      document.querySelector('footer').getBoundingClientRect().bottom
    ) <= window.innerHeight
  );
}

// http://web.archive.org/web/20140213105950/http://itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
function smoothScroll(stopY) {
  const startY = self.pageYOffset;
  const distance = stopY > startY ? stopY - startY : startY - stopY;
  if (distance < 100) {
    scrollTo(0, stopY);
    return;
  }
  let speed = Math.round(distance / 100);
  if (speed > 20) {
    speed = 20;
  }

  const step = Math.round(distance / 25);
  let leapY = stopY > startY ? startY + step : startY - step;
  let timer = 0;
  if (stopY > startY) {
    for (let i = startY; i < stopY; i += step) {
      setTimeout(`window.scrollTo(0, ${leapY})`, timer * speed);
      leapY += step;
      if (leapY > stopY) {
        leapY = stopY;
      }
      timer++;
    }
    return;
  }
  for (let i = startY; i > stopY; i -= step) {
    setTimeout(`window.scrollTo(0, ${leapY})`, timer * speed);
    leapY -= step;
    if (leapY < stopY) {
      leapY = stopY;
    }
    timer++;
  }
}
