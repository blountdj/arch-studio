
function getOverlay(event) {
    const cardElem = event.target.closest('.about_leaders_grid_card');
    const overlay = cardElem.querySelector('.leader_img_overlay');
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
    const card = event.target.closest('.about_leaders_grid_card')
    const overlay = card.querySelector('.leader_img_overlay')
    overlay.classList.toggle('hidden')
}

export function aboutInit() {
    const leaderCards = document.querySelectorAll('.about_leaders_grid_card')

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

