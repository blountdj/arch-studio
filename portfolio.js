console.log('portfolio-copy.js')

import { textSplit } from './utilities.js';

const galleryContainer = document.querySelector(".gallery");
const galleryItems = galleryContainer.querySelectorAll(".gallery-item");

const defaultItemFlex = "0 1 32px";
const hoverItemFlex = "1 1 600px";



export function initPortfolio() {
    const portfolioTextHeadings = document.querySelectorAll('.heading-s');
    const portfolioTextDates = document.querySelectorAll('.paragraph');

    portfolioTextHeadings.forEach(heading => {
        textSplit(heading);
    })

    portfolioTextDates.forEach(date => {
        textSplit(date);
    })
}

initPortfolio()

const updategalleryItems = () => {
  galleryItems.forEach((item) => {
    const galleryItemTextWrapper = item.querySelector('.gallery-item-text-wrapper');
    const galleryItemChars = item.querySelectorAll('.gallery-item-text-wrapper-wrapper > div > .word > .char ');

    let flex = defaultItemFlex;
    let opacity = 0;
    let color = 'transparent';

    if (item.isHovered) {
      flex = hoverItemFlex;
      opacity = 1;
      color = 'white';
      gsap.to(galleryItemChars, {
        color: 'white',
        duration: 0.6,
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
    else {
        galleryItemChars.forEach(char => {
            char.style.color = 'transparent';
        })
    }

    item.style.flex = flex;
    galleryItemTextWrapper.style.opacity = opacity;
  });
};

galleryItems[0].isHovered = true;
updategalleryItems();

galleryItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    galleryItems.forEach((otherItem) => {
      otherItem.isHovered = otherItem === item;
    });
    updategalleryItems();
  });
});


