document.addEventListener('DOMContentLoaded', function() {
    
    const heroSlide01 = document.querySelector('[data-slide="01"]');
    const heroSlide02 = document.querySelector('[data-slide="02"]');
    const heroSlide03 = document.querySelector('[data-slide="03"]');
    const heroSlide04 = document.querySelector('[data-slide="04"]');
    const heroSlides = [heroSlide01, heroSlide02, heroSlide03, heroSlide04];

    let heroBtn01 = document.querySelector('[data-id="01"]');
    let heroBtn02 = document.querySelector('[data-id="02"]');
    let heroBtn03 = document.querySelector('[data-id="03"]');
    let heroBtn04 = document.querySelector('[data-id="04"]');
    let heroButtons = [heroBtn01, heroBtn02, heroBtn03, heroBtn04];

    const heroWrapper = document.querySelector('.home-hero')

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


    function getPreviousId() {
        let previousId;

        heroButtons.forEach(btn => {
            if (btn.classList.contains('is-active')) {
                previousId = btn.dataset.id
            }
        })

        return previousId;
    }
    

    function heroBtnClick(event) {
        const prevId = getPreviousId()
        const newId = event.target.closest('.btn-4-light').dataset.id

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

    function init() {

        heroSlide01.style.display = 'flex';
        heroSlide02.style.display = 'none';
        heroSlide03.style.display = 'none';
        heroSlide04.style.display = 'none';

        heroBtn01.addEventListener('click', heroBtnClick )
        heroBtn02.addEventListener('click', heroBtnClick )
        heroBtn03.addEventListener('click', heroBtnClick )
        heroBtn04.addEventListener('click', heroBtnClick )
    }


    init()
})