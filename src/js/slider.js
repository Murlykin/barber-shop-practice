// action for '[data-slider-line]'
let lines = document.querySelectorAll('[data-slider-line]');
lines.forEach((line, index) =>
  line.addEventListener('click', () => {
    // console.log(index + 1);
    currentSlide(index + 1);
  }),
);

let slideIndex = 1;
//action for '[data-slider-prev]'
const sliderBtnPrev = document.querySelector('[data-slider-prev]');
sliderBtnPrev.addEventListener('click', () => plusSlides(-1));
//action for '[data-slider-next]'
const sliderBtnNext = document.querySelector('[data-slider-next]');
sliderBtnNext.addEventListener('click', () => plusSlides(1));
//

showSlides(slideIndex);

function plusSlides(n) {
  console.log(n);
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName('mySlides');
  let lines = document.getElementsByClassName('line');
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  for (i = 0; i < lines.length; i++) {
    lines[i].className = lines[i].className.replace(' active', '');
  }
  slides[slideIndex - 1].style.display = 'block';
  lines[slideIndex - 1].className += ' active';
}
