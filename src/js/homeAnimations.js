
import { CONFIG } from "https://cdn.jsdelivr.net/gh/blountdj/arch-studio@v11/min/js/config.min.js";
const { textSplit } = await import(`${CONFIG.path}${CONFIG.folder}js/utilities${CONFIG.jsEnd}.js`);

const createMaskBoxes = (mask) => {
    for (let i = 0; i < 30; i++) {
        const box = document.createElement('div');
        box.classList.add('mask_box');
        mask.append(box);
    }
};

export function homeAnimationInit(container) {
    // console.log('homeAnimationInit')
    // const headingContainer = container.querySelector('.welcome-main')
    // const headingWidth = headingContainer.offsetWidth;  
    // console.log('headingWidth:', headingWidth)
    // gsap.set(headingContainer, { width: headingWidth });


    const heading = container.querySelector('#welcome-h2')
    textSplit(heading)
    gsap.set('#welcome-h2 > .word > .char', { fontWeight: 300 })

    // Hero Image
    const heroImage = container.querySelector('.home_hero_slide_wrap.is-active')
    // console.log('heroImage:', heroImage)
    const mask = document.createElement("div");
    // mask.classList.add("mask", `m-${i}`);
    mask.classList.add("mask");
    heroImage.appendChild(mask);

    setTimeout(() => {
        createMaskBoxes(mask)
        gsap.set('.mask_box', { scaleX: 1 });
    }, 100);

    const heroH1 = container.querySelector('.g_heading_l')
    const heroText = container.querySelector('.home-hero-text')
    const heroBtn = container.querySelector('.g_btn_1_wrap.is-home-hero')
    gsap.set([heroH1, heroText, heroBtn], {
        opacity: 0,
        yPercent: 100,
    })
}

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
            each: 0.055,
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


export function homeAnimationEnter(container) {
    // console.log('homeAnimationEnter')

    const heroH1 = container.querySelector('.g_heading_l')
    const heroText = container.querySelector('.home-hero-text')
    const heroBtn = container.querySelector('.g_btn_1_wrap.is-home-hero')

    gsap.timeline()
        .add(() => imageReveal(), 0.5)
        .add(() => fadeInSlideUp(heroH1), 1.4)
        .add(() => fadeInSlideUp(heroText), 1.6)
        .add(() => fadeInSlideUp(heroBtn), 1.7)
        .add(() => headingFontWeightAnimation('#welcome-h2 > .word > .char'), 2.25)
    // .add(() => introImageScaleUp(), 0)
    // .add(() => introImagesLeave(), 2.175)
    // .add(() => introBgFadeOut(), 2.75)
    // .add(() => resolve(), 3.25)
}

