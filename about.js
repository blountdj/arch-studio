
function getOverlay(event) {
    const cardElem = event.target.closest('.leaders-grid-card');
    const overlay = cardElem.querySelector('.leader-img-overlay');
    return overlay
}

function mouseOver(event) {
    let overlay = getOverlay(event)
    overlay.classList.remove('hidden');
}

function mouseOut(event) {
    let overlay = getOverlay(event)
    overlay.classList.add('hidden');
}

export function aboutInit() {
    const leaderCards = document.querySelectorAll('.leaders-grid-card')

    leaderCards.forEach(card => {
        card.addEventListener('mouseover', mouseOver)
        card.addEventListener('mouseout', mouseOut)
    })
}

