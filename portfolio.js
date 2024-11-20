console.log('portfolio.js')

import { textSplit } from './utilities.js';


const defaultItemFlex = "0 1 32px";
const hoverItemFlex = "1 1 600px";


export function initPortfolio(container) {
    // console.log('initPortfolio')
    const portfolioTextHeadings = container.querySelectorAll('.heading-s');
    const portfolioTextDates = container.querySelectorAll('.paragraph');
    const gallery = container.querySelector('.gallery');

    portfolioTextHeadings.forEach(heading => {
        textSplit(heading);
    })

    portfolioTextDates.forEach(date => {
        textSplit(date);
    })

    const galleryContainer = container.querySelector(".gallery");
    const galleryItems = galleryContainer.querySelectorAll(".gallery-item");

    galleryItems[0].isHovered = true;
    updategalleryItems('init', galleryItems);

    galleryItems.forEach((item) => {
        item.addEventListener("mouseenter", () => {
            galleryItems.forEach((otherItem) => {
                otherItem.isHovered = otherItem === item;
            });
            updategalleryItems('mouseenter', galleryItems);
        });
        item.addEventListener("mouseleave", () => {
            galleryItems.forEach((otherItem) => {
                const itemTextWrapper = otherItem.querySelector('.gallery-item-text-wrapper');
                gsap.to(itemTextWrapper, {opacity: 0, duration: 0.15, ease: 'power5.inOut'})
            });
        });
        
    });

    gsap.set(gallery, {
        opacity: 0,
        yPercent: 50,
    })
}


export function animatePortfolioEnter(container) {
    // console.log('animatePortfolioEnter')
    const gallery = container.querySelector('.gallery');
    gsap.to(gallery, {
        opacity: 1,
        yPercent: 0,
        duration: 0.75,
        ease: 'power4.inOut',
    })
}

const staggerFadeLettersIn = (elem) => {
    // console.log('!!!staggerFadeLettersIn!!!')
    gsap.to(elem, {
        color: 'white',
        duration: 0.5,
        ease: 'power2.inOut',
        stagger: {
            from: "random",
            each: 0.02,
        },
        onComplete: () => {
            // Animation completed
        }
    })
}


const updategalleryItems = (type, galleryItems) => {
    console.log('updategalleryItems:', type)

    galleryItems.forEach((item) => {
        const galleryItemTextWrapper = item.querySelector('.gallery-item-text-wrapper');
        const galleryItemChars = item.querySelectorAll('.gallery-item-text-wrapper-wrapper > div > .word > .char ');

        let flex = defaultItemFlex;
        let opacity = 0;
        let delay;
        delay = type === 'mouseenter' ? 750 : 10;

        if (item.isHovered) {

            flex = hoverItemFlex;
            opacity = 1;
            delay = 1000;
            setTimeout(() => {
                staggerFadeLettersIn(galleryItemChars)
            }, delay)

        } else {
            galleryItemChars.forEach(char => {
                char.style.color = 'transparent';
            })
        }

        item.style.flex = flex;
        setTimeout(() => {    
            galleryItemTextWrapper.style.opacity = opacity;
        }, delay)

    });  
};

