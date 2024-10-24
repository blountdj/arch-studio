console.log('barbaInit.js loaded')

import { textSplit } from "./utilities.js";


const pageIdentifierTextEnter = async (data) => {
    console.log('\n\n### pageIdentifierTextEnter')

    let pageIdentifierTextElem = data.next.container.querySelector('.page-identifer-text')
    // console.log('pageIdentifierTextElem - barba.hooks.enter:', pageIdentifierTextElem)

    textSplit(pageIdentifierTextElem)

    return new Promise((resolve) => {
        gsap.set('.page-identifer-text', {opacity: 1})
        gsap.set('.char', {opacity: 0})
        gsap.to('.char', {
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
    console.log('pageIdentifierTextLeave')
    console.log('data.next.namespace:', data.next.namespace)
    let pageIdentifierTextElem = document.querySelector('.page-identifer-text')
    console.log('pageIdentifierTextElem0:', pageIdentifierTextElem)

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
    console.log('------animationFadeInEnter')
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


barba.hooks.beforeEnter(() => {
    // window.scrollTo(0, 0); // Scroll to the top of the page
});

barba.hooks.once(() => {
    console.log('barba.hooks.once')
    let pageIdentifierTextElem = document.querySelector('.page-identifer-text')
    console.log(pageIdentifierTextElem)

    let pageIdentifierTextSplit = textSplit(pageIdentifierTextElem)
    console.log('pageIdentifierTextSplit - testText:', pageIdentifierTextSplit)

    gsap.set(pageIdentifierTextSplit.chars, {
        opacity: 0,
    })
    gsap.to(pageIdentifierTextSplit.chars, {
        opacity: 1,
        duration: 2.575,
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
        }
    })
});


barba.hooks.enter((data) => {
    // console.log('\n\n### barba.hooks.afterEnter')

    // let pageIdentifierTextElem = data.next.container.querySelector('.page-identifer-text')
    // console.log('pageIdentifierTextElem - barba.hooks.enter:', pageIdentifierTextElem)

    // let pageIdentifierTextSplit = textSplit(pageIdentifierTextElem)
    // console.log('pageIdentifierTextSplit - barba.hooks.enter:', pageIdentifierTextSplit)
    // return new Promise((resolve) => {
    //     gsap.set('.page-identifer-text', {opacity: 1})
    //     gsap.to('.char', {
    //     // gsap.to(pageIdentifierTextSplit.chars, {
    //         opacity: 1,
    //         duration: 5.575,
    //         stagger: {
    //             from: "random",
    //             each: 0.075,
    //         },
    //         ease: "power2.out",
    //         // onStart: () => {
    //         //     // pageIdentifierTextElem.append = pageIdentifierTextSplit.chars
    //         //     // animationFadeInEnter();
    //         // },
    //         onComplete: () => {
    //             resolve()
    //         }
    //     })
    // })
})

barba.hooks.afterEnter((data) => {
    console.log('barba.hooks.afterEnter')
    const currentPageId = data.next.namespace; // Assuming your container has an ID that matches the page
    console.log('currentPageId:', currentPageId)
    // const pageSpecificScriptUrl = `scripts/${currentPageId}.js`; // Adjust the URL as needed
    // const pageSpecificScriptUrl = `https://cdn.jsdelivr.net/gh/blountdj/arch-studio@v1/home.js`
    
    if (currentPageId === 'home') {
        const pageSpecificScriptUrl = `http://127.0.0.1:5500/homeTester.js`
        const script = document.createElement('script');
        script.src = pageSpecificScriptUrl;
        document.body.appendChild(script);
    }
    
        const pageSpecificScriptUrl = `http://127.0.0.1:5500/tester.js`
    
    


    // const script2 = document.createElement('script');
    // script2.src = pageSpecificScriptUrl2;
    // document.body.appendChild(script2);
  });


barba.init({
    debug: false,
    sync: false,
    views: [],
    transitions: [
        {
            name: 'page-fade-transition',
            // to: { namespace: ['todo'] },
            once() {},
            async leave(data) {
                console.log('\n\nLEAVE')
                await animationFadeOutLeave(data);
            },
            async enter(data) {
                console.log('\n\nENTER')

                await animationFadeInEnter(data);
            },
        },
    ]
});
