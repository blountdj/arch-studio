
import { CONFIG } from "https://cdn.jsdelivr.net/gh/blountdj/arch-studio@v8/min/js/config.min.js";
const { textSplit } = await import(`${CONFIG.path}${CONFIG.folder}js/utilities${CONFIG.jsEnd}.js`);

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
        fontWeight: 700,
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

export function aboutAnimationInit(container) {
    // console.log('aboutAnimationInit')

    const heading = container.querySelector('.heading-xl--about')
    textSplit(heading)
    gsap.set('.heading-xl--about > .word > .char', { fontWeight: 300 })

    // Hero Image
    const heroImage = container.querySelector('.about-img-wrapper')
    // console.log('heroImage:', heroImage)
    const mask = document.createElement("div");
    // mask.classList.add("mask", `m-${i}`);
    mask.classList.add("mask");
    heroImage.appendChild(mask);

    setTimeout(() => {
        createMaskBoxes(mask)
        gsap.set('.mask_box', { scaleX: 1 });
    }, 100);

    const heroHeadingM = container.querySelector('.heading-m')
    const heroParagraph = container.querySelector('.paragraph')
    gsap.set([heroHeadingM, heroParagraph], {
        opacity: 0,
        yPercent: 100,
    })
}

export function aboutAnimationEnter(container) {
    // console.log('aboutAnimationEnter')

    const heroHeadingM = container.querySelector('.heading-m')
    const heroParagraph = container.querySelector('.paragraph')

    gsap.timeline()
        .add(() => imageReveal(), 0)
        .add(() => headingFontWeightAnimation('.heading-xl--about > .word > .char'), 0.3)
        .add(() => fadeInSlideUp(heroHeadingM), 0.6)
        .add(() => fadeInSlideUp(heroParagraph), 0.8)
}

