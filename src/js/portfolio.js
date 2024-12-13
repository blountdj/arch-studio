// console.log('portfolio.js')

import { CONFIG } from "https://cdn.jsdelivr.net/gh/blountdj/arch-studio@v11/min/js/config.min.js";
const { textSplit } = await import(`${CONFIG.path}${CONFIG.folder}js/utilities${CONFIG.jsEnd}.js`);

const defaultItemFlex = "0 1 32px";
const hoverItemFlex = "1 1 600px";


export const getPortfolioElement = (container) => {
    return {
        portfolioTextHeadings: container.querySelectorAll('.heading-s'),
        portfolioTextDates: container.querySelectorAll('.paragraph'),
        gallery: container.querySelector('.gallery'),
        galleryContainer: container.querySelector(".gallery")
    }
}

function getScreenWidth() {
    return window.innerWidth;
}

export function initPortfolio(container) {
    // console.log('initPortfolio')

    const portfolio = getPortfolioElement(container);

    portfolio.portfolioTextHeadings.forEach(heading => {
        textSplit(heading);
    })

    portfolio.portfolioTextDates.forEach(date => {
        textSplit(date);
    })

    const galleryItems = portfolio.galleryContainer.querySelectorAll(".gallery-item");

    // galleryItems[0].isHovered = true;

    updategalleryItems('init', galleryItems);

    const screenWidth = getScreenWidth();

    galleryItems.forEach((item) => {
        item.addEventListener("mouseenter", () => {
            // console.log('mouseenter')
            if (screenWidth > 767) {
                galleryItems.forEach((otherItem) => {
                    otherItem.isHovered = otherItem === item;
                });
                updategalleryItems('mouseenter', galleryItems);
            } else {
                // console.log('mouseenter else')
                const galleryItemTextWrapper = item.querySelector('.gallery-item-text-wrapper');
                const galleryItemChars = item.querySelectorAll('.gallery-item-text-wrapper-wrapper > div > .word > .char ');
                gsap.to(galleryItemTextWrapper, { opacity: 1, duration: 0.15, ease: 'power5.inOut' })
                setTimeout(() => {
                    staggerFadeLettersIn(galleryItemChars)
                }, 10)
            }
        });
        item.addEventListener("mouseleave", () => {
            // console.log('mouseleave')
            if (screenWidth > 767) {
                galleryItems.forEach((otherItem) => {
                    const itemTextWrapper = otherItem.querySelector('.gallery-item-text-wrapper');
                    gsap.to(itemTextWrapper, { opacity: 0, duration: 0.15, ease: 'power5.inOut' })
                });
            } else {
                // console.log('mouseleave else')
                const galleryItemTextWrapper = item.querySelector('.gallery-item-text-wrapper');
                const galleryItemChars = item.querySelectorAll('.gallery-item-text-wrapper-wrapper > div > .word > .char ');
                gsap.to(galleryItemTextWrapper, { opacity: 0, duration: 0.15, ease: 'power5.inOut' })
                gsap.to(galleryItemChars, { color: 'transparent', duration: 0.15, ease: 'power5.inOut' })
            }
        });
    });

    gsap.set(portfolio.gallery, {
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
    // console.log('updategalleryItems:', type)

    galleryItems.forEach((item) => {
        const galleryItemTextWrapper = item.querySelector('.gallery-item-text-wrapper');
        const galleryItemChars = item.querySelectorAll('.gallery-item-text-wrapper-wrapper > div > .word > .char ');

        let flex = defaultItemFlex;
        let opacity = 0;
        let delay = 500;
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

