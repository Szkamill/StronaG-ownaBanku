 'use strict';

///////////////////////////////////////
// Modal window
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn=>btn.addEventListener('click',openModal));



btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
// //scrolowanie 

btnScrollTo.addEventListener('click',function(e){
  const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);
console.log('currently scroll (xy)', window.pageXOffset, window.pageYOffset);

//   // console.log('height/width viewport',document.documentElement.clientHeight,
//   // document.documentElement.clientWidth);
//   //scrooling
//   //pierwsza opcja

//   // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top+ window.pageYOffset);

//   //druga opcja

  window.scrollTo({ left:s1coords.left + window.pageXOffset,
    top: s1coords.top+ window.pageYOffset,
    behavior:'smooth',
  });
//   //trzecia opcja 
  // section1.scrollIntoView({behavior:'smooth'});


});
//page navigator
// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click',function(e){
//     e.preventDefault();
   
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({
//       behavior:'smooth'
//     });
//   });
// });

//1.add event listener to comon parent elelemnt
//2.detemine wh 
document.querySelector('.nav__links').addEventListener('click',function(e){
  e.preventDefault();
  //matching strategy
  if (e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({behavior:'smooth'});
  }
})
//tabbed component 

tabsContainer.addEventListener('click',function(e){
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  //guard clouse
  if(!clicked)return;

  //remove active classes
  tabsContent.forEach(t=>t.classList.remove('operations__content--active'));
tabs.forEach(t => t.classList.remove('operations__tab--active'));
//active tab

  clicked.classList.add('operations__tab--active');


  //active contant area
  console.log(clicked.dataset.tab);
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
})


//menu fade animation 
const handleHover = function(e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('nav').querySelectorAll('.nav__link');
    const logo =link.closest('nav').querySelector('img');
    siblings.forEach(el =>{
      if(el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', handleHover.bind(0.5));
console.log('widze')
nav.addEventListener('mouseout', handleHover.bind(1));

//sticky navigation 
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);
// window.addEventListener('scroll',function(){
//   if(window.scrollY> initialCoords.top)nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// })

//sposób drugi sticky navigation
// const obsCallback = function(entries, observer){
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold:0.1,
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const stickyNav = function(entries){
  const [entry] = entries;
  console.log(entry);
  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}
const headerObserver = new IntersectionObserver
(stickyNav,{
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//reveal section 

  const allsections = document.querySelectorAll('.section');
  const reveralSection = function(entries, observer){
    const [entry] = entries;
    console.log(entry);
    if(!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  };
  const sectionObservation = new IntersectionObserver(
    reveralSection,{
root: null,
threshold: 0.15,
    }
  );
  allsections.forEach(function(section){
    sectionObservation.observe(section);
    section.classList.add('section--hidden');
  })

  // lazy loading images
  const imgtargets = document.querySelectorAll('img[data-src]');

  const loadImg = function(entries, observer){
    const [entry] = entries;
    console.log(entry);

    if(!entry.isIntersecting) return;
    //replace src with data-src
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener('load', function(){
      entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target)
  }
  const imgObserver = new IntersectionObserver(loadImg, {
    root:null,
    threshold: 0,
    rootMargin: '-200px',
  })
  imgtargets.forEach(img => imgObserver.observe(img));

   //slider
   const slider = function(){
   const slides = document.querySelectorAll('.slide');
   const btnLeft =document.querySelector('.slider__btn--left');
   const btnRigt =document.querySelector('.slider__btn--right');
   const dotCointeiner = document.querySelector('.dots');
   let curSlide = 0;
   const maxSlide = slides.length;

const createDots = function(){
  slides.forEach(function (_,i){
    dotCointeiner.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activeDots = function(slide){
  document
  .querySelectorAll('.dots__dot')
  .forEach(dot => dot.classList.remove('dots__dot--active'));
  
  document
  .querySelector(`.dots__dot[data-slide="${slide}"]`)
  .classList.add('dots__dot--active');

};


   const goToSlide = function(slide){
     slides.forEach((s,i) => (s.style.transform = `translateX(${100 *(i- slide)}%)`)
     )
   }


//next Slide 
const nextSlide = function(){
  if(curSlide === maxSlide-1){
    curSlide = 0;
  } else{
    curSlide++;
  }
  goToSlide(curSlide);
  activeDots(curSlide);
}
const prevSlide = function(){
  if(curSlide ===0){
    curSlide = maxSlide-1;
  }else
  {
    curSlide--;
  }
  goToSlide(curSlide);
  activeDots(curSlide);

}
const init = function(){
  goToSlide(0);
  activeDots(0);
  createDots();
}
init();
btnLeft.addEventListener('click',prevSlide);
btnRigt.addEventListener('click',nextSlide);

document.addEventListener('keydown', function(e){
  if (e.key === 'ArrowLeft') prevSlide();
 if (e.key ==='ArrowRight') nextSlide();
});
dotCointeiner.addEventListener('click', function(e){
  if (e.target.classList.contains('dots__dot')){
    const {slide} = e.target.dataset;
    goToSlide(slide);
  activeDots(slide);

  };
});
};
slider();
///////
///////
// //
// const header = document.querySelector('header')
// const message = document.createElement('div');co
// message.classList.add('cookie-message');

// message.innerHTML = ' we use cookied for improved functuality and analitics. <button class="btn btn--close-cookie"> Got it! </button>';

// //header.prepend(message);
// header.append(message);
// // header.append(message.cloneNode(true));

// // header.before(message);
// // header.after(message);

// //delete elements
// document.querySelector('.btn--close-cookie').addEventListener('click',function(){
//   message.remove();
// })

// //scrolowanie 
// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');
// btnScrollTo.addEventListener('click',function(e){
//   const s1coords = section1.getBoundingClientRect();
//   // console.log(s1coords);
// console.log('currently scroll (xy)', window.pageXOffset, window.pageYOffset);
//   // console.log('height/width viewport',document.documentElement.clientHeight,
//   // document.documentElement.clientWidth);
//   //scrooling
//   //pierwsza opcja

//   // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top+ window.pageYOffset);

//   //druga opcja

//   // window.scrollTo({ left:s1coords.left + window.pageXOffset,
//   //   top: s1coords.top+ window.pageYOffset,
//   //   behavior:'smooth',
//   // });
//   //trzecia opcja 
//   section1.scrollIntoView({behavior:'smooth'});


// });

// //events
// const h1 = document.querySelector('h1');
// const alertH1 = function(e){
//   alert('addEventListener:Great ! you are reading the heading :D');
// };
// h1.addEventListener('mouseenter',alertH1)
// setTimeout(()=>h1.removeEventListener('mouseenter',alertH1),3000);

// //

// message.style.background= '#37383d';
// message.style.width = '120%';
// message.style.height = Number.parseFloat(getComputedStyle(message).height,10)+30 +'px';

// //atributes 
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);

// logo.alt = 'beatiful minimalist logo ';

// // non-standart
// console.log(logo.designer);
// console.log(logo.getAttribute('designer'));
// logo.setAttribute('company','Bankist');

// console.log(logo.src);
// console.log(logo.getAttribute('src'));

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href);
// console.log(link.getAttribute('href'));
// console.log(logo.dataset.versionNumber);

// //clasess
// logo.classList.add('c');
// logo.classList.remove('c');
// logo.classList.toggle('c');
// logo.classList.contains('c');

// //dont use 
// // logo.className ='jonas';

// //191.
// // rgb(255,255,255)
// const randomInt = (min, max)=>Math.floor(Math.random()*(max-min +1)+min);
// const randomColor = ()=>`rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;

// document.querySelector('.nav__link').addEventListener('click',function(e){
//   this.style.backgroundColor = randomColor();
//   console.log('link',e.target, e.currentTarget);
//   console.log(e.currentTarget ===this);
// });
// document.querySelector('.nav__links').addEventListener('click',function(e){
//   this.style.backgroundColor = randomColor();
//   console.log('conteiner',e.target, e.currentTarget);
//   console.log(e.currentTarget ===this);
// });
// document.querySelector('.nav').addEventListener('click',function(e){
//   this.style.backgroundColor = randomColor();
//   console.log('Nav',e.target, e.currentTarget);
//   console.log(e.currentTarget ===this);
// });
// const h1 = document.querySelector('h1');

// //going downwards: child

// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);

// // h1.firstElementChild.style.color = 'white';
// // h1.lastElementChild.style.color='orangered';

// //going upwards:parents

// console.log(h1.parentNode);
// console.log(h1.parentElement);


// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// h1.closest('h1').style.background = 'var(--gradient-primary)';
// // GOING SIDEWAYS: SIBlings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function(el){
//   if(el!==h1) el.style.transform='scale(0.5)';
// })