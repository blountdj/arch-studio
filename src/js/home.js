    
export function homeInit(container) {
    const heroSlide01 = container.querySelector('[data-slide="01"]');
    const heroSlide02 = container.querySelector('[data-slide="02"]');
    const heroSlide03 = container.querySelector('[data-slide="03"]');
    const heroSlide04 = container.querySelector('[data-slide="04"]');
    // const heroSlides = [heroSlide01, heroSlide02, heroSlide03, heroSlide04];

    let heroBtn01 = container.querySelector('[data-id="01"]');
    let heroBtn02 = container.querySelector('[data-id="02"]');
    let heroBtn03 = container.querySelector('[data-id="03"]');
    let heroBtn04 = container.querySelector('[data-id="04"]');
    let heroButtons = [heroBtn01, heroBtn02, heroBtn03, heroBtn04];

    const heroWrapper = container.querySelector('.home-hero')

    const heroIdsToSlides = {
        '01': heroSlide01,
        '02': heroSlide02,
        '03': heroSlide03,
        '04': heroSlide04
    }

    const heroIdsToButtons = {
        '01': heroBtn01,
        '02': heroBtn02,
        '03': heroBtn03,
        '04': heroBtn04
    }

    heroSlide01.style.display = 'flex';
    heroSlide02.style.display = 'none';
    heroSlide03.style.display = 'none';
    heroSlide04.style.display = 'none';

    heroBtn01.addEventListener('click', (e) => heroBtnClick(e, heroIdsToButtons, heroIdsToSlides, heroWrapper, heroButtons))
    heroBtn02.addEventListener('click', (e) => heroBtnClick(e, heroIdsToButtons, heroIdsToSlides, heroWrapper, heroButtons))
    heroBtn03.addEventListener('click', (e) => heroBtnClick(e, heroIdsToButtons, heroIdsToSlides, heroWrapper, heroButtons))
    heroBtn04.addEventListener('click', (e) => heroBtnClick(e, heroIdsToButtons, heroIdsToSlides, heroWrapper, heroButtons))
}
  
function getPreviousId(heroButtons) {
    let previousId;

    heroButtons.forEach(btn => {
        if (btn.classList.contains('is-active')) {
            previousId = btn.dataset.id
        }
    })
    return previousId;
}

function heroBtnClick(event, heroIdsToButtons, heroIdsToSlides, heroWrapper, heroButtons) {
    console.log('Event:', event)
    const prevId = getPreviousId(heroButtons)
    const newId = event.target.closest('.g_btn_4_light').dataset.id

    if (prevId === newId) { return }

    const newBtn = heroIdsToButtons[newId];
    const prevBtn = heroIdsToButtons[prevId];
    const newSlide = heroIdsToSlides[newId];
    const prevSlide = heroIdsToSlides[prevId];

    // Update Buttons
    newBtn.classList.add('is-active');
    prevBtn.classList.remove('is-active');

    // Update Slides
    heroWrapper.style.backgroundImage = 'none';

    prevSlide.classList.remove('is-active');
    setTimeout(() => {
        prevSlide.style.display = 'none';
    }, 200)
    newSlide.style.display = 'flex';
    setTimeout(() => {
        newSlide.classList.add('is-active');
    }, 200)

    setTimeout(() => {
        heroWrapper.style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, .25), rgba(0, 0, 0, .25))';
    }, 350)
        
}
