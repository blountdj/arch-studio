// console.log('barbaInit.js loaded')

import { CONFIG } from "https://cdn.jsdelivr.net/gh/blountdj/arch-studio@v9/min/js/config.min.js";

const { homeInit } = await import(`${CONFIG.path}${CONFIG.folder}js/home${CONFIG.jsEnd}.js`);
const { aboutInit } = await import(`${CONFIG.path}${CONFIG.folder}js/about${CONFIG.jsEnd}.js`);
const { contactFormInit } = await import(`${CONFIG.path}${CONFIG.folder}js/contact${CONFIG.jsEnd}.js`);
const { homeAnimationInit, homeAnimationEnter } = await import(`${CONFIG.path}${CONFIG.folder}js/homeAnimations${CONFIG.jsEnd}.js`);
const { initPortfolio, animatePortfolioEnter } = await import(`${CONFIG.path}${CONFIG.folder}js/portfolio${CONFIG.jsEnd}.js`);
const { aboutAnimationInit, aboutAnimationEnter } = await import(`${CONFIG.path}${CONFIG.folder}js/aboutAnimations${CONFIG.jsEnd}.js`);
const { contactAnimationInit, contactAnimationEnter } = await import(`${CONFIG.path}${CONFIG.folder}js/contactAnimations${CONFIG.jsEnd}.js`);
const {
    textSplit,
    disableScroll,
    enableScroll,
    addFilesCssToBody,
    removeCssFilesFromBody,
} = await import(`${CONFIG.path}${CONFIG.folder}js/utilities${CONFIG.jsEnd}.js`);
const { imgTransitionAnimation, introElementsReset } = await import(`${CONFIG.path}${CONFIG.folder}js/animations${CONFIG.jsEnd}.js`);


const portfolioCssFileUrl = `${CONFIG.path}${CONFIG.folder}css/portfolio${CONFIG.cssEnd}.css`
// const homeCssFileUrl = CONFIG.path + `home.css`


const pageIdentifierTextEnter = async (data) => {
    // console.log('\n\n### pageIdentifierTextEnter')

    let pageIdentifierTextElem = data.next.container.querySelector('.page_identifer_text')
    // console.log('pageIdentifierTextElem - barba.hooks.enter:', pageIdentifierTextElem)

    textSplit(pageIdentifierTextElem)

    return new Promise((resolve) => {
        gsap.set('.page_identifer_text', { opacity: 1 })
        gsap.set('.page_identifer_text > .word >.char', { opacity: 0 })
        gsap.to('.page_identifer_text > .word > .char', {
            opacity: 1,
            duration: 1.575,
            stagger: {
                from: "random",
                each: 0.075,
            },
            ease: "power2.out",
            onComplete: () => {
                resolve()
            }
        })
    })
}

const pageIdentifierTextLeave = (data) => {
    // console.log('pageIdentifierTextLeave')
    // console.log('data.next.namespace:', data.next.namespace)
    let pageIdentifierTextElem = document.querySelector('.page_identifer_text')
    // console.log('pageIdentifierTextElem0:', pageIdentifierTextElem)

    return new Promise((resolve) => {
        // gsap.set(pageIdentifierTextSplit.chars, { opacity: 0 });
        gsap.to('.char', {
            opacity: 0,
            duration: 1.575,
            stagger: {
                from: "random",
                each: 0.075,
            },
            ease: "power2.out",
            onComplete: () => {
                resolve()
                pageIdentifierTextElem.textContent = data.next.namespace;
            }
        })
    })
}

const animationFadeInEnter = ((data) => {
    // console.log('------animationFadeInEnter')
    // gsap.from(container, {
    gsap.to('.barba_main_wrap', {
        duration: 2,
        autoAlpha: 1,
        // scale: 0.5,
        ease: 'power4.out',
        // clearProps: true
        onStart: async () => {
            if (data) {
                await pageIdentifierTextEnter(data)
            }
        }
    })
})

// export const animationFadeOutLeave = (container) => {
const animationFadeOutLeave = (data) => {
    // console.log('------animationFadeOutLeave');
    return new Promise((resolve) => {
        gsap.to('.barba_main_wrap', {
            duration: 1.5,
            autoAlpha: 0,
            ease: 'power4.out',
            // clearProps: true,
            onStart: async () => {
                await pageIdentifierTextLeave(data)
            },
            onComplete: resolve, // Resolve the promise when the animation completes
        });
    });
};


const introAnimation = async (data) => {
    // console.log('introAnimation');
    return new Promise(async (resolve) => {
        await imgTransitionAnimation(data);
        let pageIdentifierTextElem = document.querySelector('.page_identifer_text')
        textSplit(pageIdentifierTextElem)
        gsap.set('.page_identifer_text > .word > .char', { color: 'white' })
        gsap.to('.page_identifer_text > .word > .char', {
            opacity: 1,
            duration: 2.575,
            color: '#c8ccd8',
            stagger: {
                from: "random",
                each: 0.075,
            },
            ease: "power2.out",
            onStart: () => {
                gsap.set(pageIdentifierTextElem, {
                    opacity: 1,
                },
                    animationFadeInEnter(null))
            },
        })
        setTimeout(() => {
            enableScroll()
            resolve()
        }, 100);
    });
};


barba.hooks.beforeEnter((data) => {
    //     // window.scrollTo(0, 0); // Scroll to the top of the page
    // console.log('## BEFORE ENTER')
    setTimeout(() => {
        window.scrollTo(0, 0);
        disableScroll()
        gsap.set('.page_identifer_text > .word > .char', {
            color: 'white',
        })
    }, 100); // Adjust the delay time as needed

    const currentPageId = data.next.namespace;
    currentPageId === 'portfolio' ? addFilesCssToBody([portfolioCssFileUrl]) : removeCssFilesFromBody([portfolioCssFileUrl])
    // currentPageId === 'home' ? addFilesCssToBody([homeCssFileUrl]) : removeCssFilesFromBody([homeCssFileUrl])

    const menuOverlay = document.querySelector('#w-nav-overlay-0')
    menuOverlay.style.display = 'none'


    if (data.next.namespace === 'home') {
        homeAnimationInit(data.next.container)
    } else if (data.next.namespace === 'portfolio') {
        initPortfolio(data.next.container)
    } else if (data.next.namespace === 'about us') {
        aboutAnimationInit(data.next.container)
    } else if (data.next.namespace === 'contact') {
        contactAnimationInit(data.next.container)
    }
});


barba.hooks.once(async (data) => {
    // console.log('barba.hooks.once');
    // introAnimation(data, 3.25)
    await introAnimation(data)

    if (data.next.namespace === 'home') {
        homeInit(data.next.container)
        homeAnimationEnter(data.next.container)
    } else if (data.next.namespace === 'portfolio') {
        animatePortfolioEnter(data.next.container)
    } else if (data.next.namespace === 'about us') {
        aboutAnimationEnter(data.next.container)
    } else if (data.next.namespace === 'contact') {
        contactAnimationEnter(data.next.container)
    }
});


barba.hooks.afterEnter((data) => {
    // console.log('barba.hooks.afterEnter')
    const currentPageId = data.next.namespace; // Assuming your container has an ID that matches the page


    if (currentPageId === 'about us') {
        aboutInit()
    } else if (currentPageId === 'contact') {
        contactFormInit(data.next.container)
    }
});


barba.init({
    debug: CONFIG.barbaDebug,
    sync: false,
    views: [],
    transitions: [
        {
            name: 'page-fade-transition',
            // to: { namespace: ['todo'] },
            once() { },
            async leave(data) {
                // console.log('\n\nLEAVE')
                animationFadeOutLeave(data);
                await introElementsReset()

            },
            async enter(data) {
                // console.log('\n\nENTER')
                // introAnimation(data)
                introAnimation(data);
                await animationFadeInEnter(data);

                if (data.next.namespace === 'home') {
                    homeInit(data.next.container)
                    setTimeout(() => {
                        homeAnimationEnter(data.next.container)
                    }, 3000);
                } else if (data.next.namespace === 'portfolio') {
                    setTimeout(() => {
                        animatePortfolioEnter(data.next.container)
                    }, 3250);
                } else if (data.next.namespace === 'about us') {
                    setTimeout(() => {
                        aboutAnimationEnter(data.next.container)
                    }, 3250);
                } else if (data.next.namespace === 'contact') {
                    setTimeout(() => {
                        contactAnimationEnter(data.next.container)
                    }, 3250);
                }
            },
        },
    ]
});

