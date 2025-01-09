

const introImagesEnter = () => {
    gsap.to('.g_intro_wrap > img', {
        clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
        // clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        duration: 1,
        ease: "power4.inOut",
        stagger: 0.25,
        // delay: 2,
      });
}

const introImagesLeave = () => {
    gsap.to(".g_intro_wrap > img", {
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        // autoAlpha: 0,
        duration: 0.5,
        ease: "power3.inOut",
    })
}

const introImageScaleUp = () => {
    gsap.to(".g_intro_wrap", {
        scale: 1.3,
        duration: 3,
        ease: "power3.inOut",
      });
}

const introBgFadeOut = () => {
    gsap.to(".g_intro_wrap", {
        autoAlpha: 0,
        scale: 1,
        duration: 0.5,
        ease: "power3.inOut",
    })
}

export const imgTransitionAnimation = (data) => {
    // console.log('imgTransitionAnimation')
    return new Promise((resolve) => {
        gsap.timeline()
            .add(() => introImagesEnter())
            .add(() => introImageScaleUp(), 0)
            .add(() => introImagesLeave(), 2.115)
            .add(() => introBgFadeOut(), 2.75)
            .add(() => resolve(), 3.25)
    })
}

export const introElementsReset = () => {
    return new Promise((resolve) => {
        gsap.set(".g_intro_wrap > img", {clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"})
        gsap.to(".g_intro_wrap", {
            autoAlpha: 1,
            // scale: 1,
            duration: 0.5,
            ease: "power3.inOut",
            onComplete: resolve,
        })
    })
}