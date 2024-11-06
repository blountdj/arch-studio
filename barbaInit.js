console.log('barbaInit.js loaded')

import { CONFIG } from "./config.js";
import { homeInit } from "./home.js";
import { homeAnimationInit, homeAnimationEnter } from "./homeAnimations.js";
import { initPortfolio, animatePortfolioEnter } from "./portfolio.js";
import { aboutAnimationInit, aboutAnimationEnter } from "./aboutAnimations.js";
import { contactAnimationInit, contactAnimationEnter } from "./contactAnimations.js";
import { 
    textSplit,
    removeScriptFromBody,
    addScriptToBody,
    disableScroll,
    enableScroll,
    addFilesCssToBody,
    removeCssFilesFromBody,
} from "./utilities.js";
import { imgTransitionAnimation, introElementsReset } from "./animations.js";

const pageIdentifierTextEnter = async (data) => {
    // console.log('\n\n### pageIdentifierTextEnter')

    let pageIdentifierTextElem = data.next.container.querySelector('.page-identifer-text')
    // console.log('pageIdentifierTextElem - barba.hooks.enter:', pageIdentifierTextElem)

    textSplit(pageIdentifierTextElem)

    return new Promise((resolve) => {
        gsap.set('.page-identifer-text', {opacity: 1})
        gsap.set('.page-identifer-text > .word >.char', {opacity: 0})
        gsap.to('.page-identifer-text > .word > .char', {
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
    let pageIdentifierTextElem = document.querySelector('.page-identifer-text')
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
    gsap.to('.barba-main-container', {
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
    console.log('------animationFadeOutLeave');
    return new Promise((resolve) => {
        // gsap.set('.char', { opacity: 0 });
        // gsap.to(container, {
        gsap.to('.barba-main-container', {
            duration: 1.5,
            // duration: 3,
            autoAlpha: 0,
            // scale: 0.5,
            ease: 'power4.out',
            // clearProps: true,
            onStart: async () => {
                await pageIdentifierTextLeave(data)
            },
            onComplete: resolve, // Resolve the promise when the animation completes
        });
    });
};


const homeJsFileUrl = `http://127.0.0.1:5500/home.js`
const aboutJsFileUrl = `http://127.0.0.1:5500/aboutTester.js`
const contactJsFileUrl = `http://127.0.0.1:5500/contactTester.js`
const portfolioJsFileUrl = `http://127.0.0.1:5500/portfolio.js`
const testerJsFileUrl = `http://127.0.0.1:5500/tester.js`

const portfolioCssFileUrl = `http://127.0.0.1:5500/portfolio.css`

// const pageSpecificScriptUrl = `https://cdn.jsdelivr.net/gh/blountdj/arch-studio@v1/home.js`




const introAnimation = async (data) => {
    console.log('introAnimation');
    return new Promise(async (resolve) => {
        await imgTransitionAnimation(data);
        let pageIdentifierTextElem = document.querySelector('.page-identifer-text')
        textSplit(pageIdentifierTextElem)
        gsap.set('.page-identifer-text > .word > .char', {color: 'white'})
        gsap.to('.page-identifer-text > .word > .char', {
            opacity: 1,
            duration: 2.575,

            color: '#c8ccd8',
            // color: 'green',
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
    console.log('## BEFORE ENTER')
    setTimeout(() => {
        window.scrollTo(0, 0);
        disableScroll()
        gsap.set('.page-identifer-text > .word > .char', {
            color: 'white',
        })
    }, 100); // Adjust the delay time as needed
    
    const currentPageId = data.next.namespace;
    currentPageId === 'portfolio' ? addScriptToBody(portfolioJsFileUrl) : removeScriptFromBody(portfolioJsFileUrl)
    currentPageId === 'portfolio' ? addFilesCssToBody([portfolioCssFileUrl]) : removeCssFilesFromBody([portfolioCssFileUrl] )

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
    console.log('barba.hooks.once');
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
    // console.log('currentPageId:', currentPageId)
        
    currentPageId === 'home' ? addScriptToBody(homeJsFileUrl) : removeScriptFromBody(homeJsFileUrl)
    currentPageId === 'about us' ? addScriptToBody(aboutJsFileUrl) : removeScriptFromBody(aboutJsFileUrl)
    currentPageId === 'contact' ? addScriptToBody(contactJsFileUrl) : removeScriptFromBody(contactJsFileUrl)
    
    // currentPageId === 'portfolio' ? addScriptToBody(portfolioJsFileUrl) : removeScriptFromBody(portfolioJsFileUrl)
    // currentPageId === 'portfolio' ? addFilesCssToBody([portfolioCssFileUrl]) : removeCssFilesFromBody([portfolioCssFileUrl] )
    
});


barba.init({
    debug: CONFIG.barbaDebug,
    sync: false,
    views: [],
    transitions: [
        {
            name: 'page-fade-transition',
            // to: { namespace: ['todo'] },
            once() {},
            async leave(data) {
                console.log('\n\nLEAVE')
                animationFadeOutLeave(data);
                await introElementsReset()

                // if (data.next.namespace === 'home') {
                //     homeInit(data.next.container)
                // } 
                
            },
            async enter(data) {
                console.log('\n\nENTER')
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

                console.log('FINISH ENTER')
            },
        },
    ]
});

