
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

function getScreenWidth() {
    return window.innerWidth;
}

function toggleOverlay(event) {
    const card = event.target.closest('.leaders-grid-card')
    const overlay = card.querySelector('.leader-img-overlay')
    overlay.classList.toggle('hidden')
}

export function aboutInit() {
    const leaderCards = document.querySelectorAll('.leaders-grid-card')

    const screenWidth = getScreenWidth();

    if (screenWidth > 991) {
        leaderCards.forEach(card => {
            // card.addEventListener('mouseover', mouseOver)
            // card.addEventListener('mouseout', mouseOut)
            card.addEventListener('mouseover', (e) => toggleOverlay(e))
            card.addEventListener('mouseout', (e) => toggleOverlay(e))
        })
    } else {
        leaderCards.forEach(card => {
            card.addEventListener('click', (e) => toggleOverlay(e))
            
        })
    }
}

