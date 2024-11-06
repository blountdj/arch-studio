import { textSplit } from "./utilities.js";

const createMaskBoxes = (mask) => {
    for (let i = 0; i < 30; i++) {
        const box = document.createElement('div');
        box.classList.add('mask_box');
        mask.append(box);
    }
};

function fadeInSlideUp(elem) {
    gsap.to(elem, {
        opacity: 1,
        yPercent: 0,
        duration: 0.5,
        ease: 'power4.inout',
    })
}

function headingFontWeightAnimation(elem) {
    gsap.to(elem, {
        fontWeight: 600,
        duration: 0.8,
        stagger: {
            each: 0.05,
        },
        ease: 'power2.out',
    })
}

function imageReveal() {
    gsap.to('.mask_box', {
        // transformOrigin: 'bottom right',
        transformOrigin: 'left center',
        scaleX: 0,
        duration: 0.25,
        stagger: {
            // grid: [1, 30],
            from: 'random',
            each: 0.02,
        },
        ease: 'power2.out',
    })
}

export function contactAnimationInit(container) {
    console.log('contactAnimationInit')
    const headingContainer = container.querySelector('.contact-hero')
    const headingWidth = headingContainer.offsetWidth;  
    gsap.set(headingContainer, { width: headingWidth });

    const heading = container.querySelector('.heading-xl--contact')
    textSplit(heading)
    gsap.set('.heading-xl--contact > .word > .char', {fontWeight: 300})

    // Hero Image
    const heroImage = container.querySelector('.contact-img-wrapper')
    // console.log('heroImage:', heroImage)
    const mask = document.createElement("div");
    // mask.classList.add("mask", `m-${i}`);
    mask.classList.add("mask");
    heroImage.appendChild(mask);

    setTimeout(() => {
        createMaskBoxes(mask)
        gsap.set('.mask_box', {scaleX: 1});
    }, 100);

    const heroHeadingM = container.querySelector('.heading-m')
    const heroParagraph = container.querySelector('.paragraph')
    gsap.set([heroHeadingM, heroParagraph], {
        opacity: 0,
        yPercent: 100,
    })
}

export function contactAnimationEnter(container) {
    console.log('contactAnimationEnter')
    
    // const heroH1 = container.querySelector('#home-h1')
    const heroHeadingM = container.querySelector('.heading-m')
    const heroParagraph = container.querySelector('.paragraph')

    gsap.timeline()
    .add(() => imageReveal(), 0)
    .add(() => headingFontWeightAnimation('.heading-xl--contact > .word > .char'), 0.3)
    .add(() => fadeInSlideUp(heroHeadingM), 0.7)
    .add(() => fadeInSlideUp(heroParagraph), 0.9)
    // .add(() => introImageScaleUp(), 0)
    // .add(() => introImagesLeave(), 2.175)
    // .add(() => introBgFadeOut(), 2.75)
    // .add(() => resolve(), 3.25)
}

