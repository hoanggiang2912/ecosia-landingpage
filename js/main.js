
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
// searchbar
const searchBar = $('.bar')
const searchIcon = $('.magni-icon')
// tab
// const tabItems = $$('.tab__item')
const tabLines = $$('.tab__line')
const renderActiveTabs = $$('.tab__item.active')
// const panelItem = $$('.panel__item')
// show more section
const moreBtn = $$('.more-btn')
const moreProductsSection = $$('.more-products')
// respon nav
const responOverlay = $('.respon-overlay')
const responNav = $('.respon-nav')
const openNavBtn = $('.open-btn')
const closeNavBtn = $('.close-btn')
// slider
const prevBtn = $('.prev-btn')
const nextBtn = $('.next-btn')
const sliderItem = $$('.slider__item')
const sliderMain = $('.slider-main')


for (let i = 0; i < renderActiveTabs.length ; i++) {
    tabLines[i].style.width = `${renderActiveTabs[i].offsetWidth}px`
    tabLines[i].style.left = `${renderActiveTabs[i].offsetLeft}px`
    tabLines[i].style.top = `${renderActiveTabs[i].offsetTop + renderActiveTabs[i].offsetHeight}px`
}

const app = {
    eventHandler () {
        // expand search bar
        searchIcon.addEventListener('click' , () => {
            searchIcon.parentElement.classList.toggle('active')
        })
        // product tabs
        const tabContainers = $$('.tab-container')
        tabContainers.forEach(item => {
            item.addEventListener('mouseenter' , () => {
                item.classList.add('active')       
                const activeContainer = $('.tab-container.active')
                if (activeContainer) {
                    const activeTabItems = $$('.tab-container.active > .tabs > .tab__item')
                    const activeTabLine = activeContainer.querySelector('.tab__line')
                    const activePanels = activeContainer.querySelectorAll('.panel__item')
                    activeTabItems.forEach((tab , index) => {
                        tab.onclick = () => {
                            activeContainer.querySelector('.panel__item.active').classList.remove('active')
                            
                            tab.classList.add('active')
                            activePanels[index].classList.add('active')
                            activeTabLine.style.top = `${tab.offsetTop + tab.offsetHeight}px`
                            activeTabLine.style.left = `${tab.offsetLeft}px`
                            activeTabLine.style.width = `${tab.offsetWidth}px`
                        }
                    });
                }         
            })
            item.addEventListener('mouseleave' , () => {
                item.classList.remove('active')
            })
        });
        // show more products
        moreBtn.forEach((btn , index) => {
            btn.onclick = () => {
                btn.classList.toggle('active')
                moreProductsSection[index].classList.toggle('active')
                
                !btn.getAttribute('class').includes('active') ?
                    btn.innerText = 'See more' 
                    :btn.innerText = 'Hide away' 
            }
        });
        // open respon nav
        openNavBtn.onclick = () => {
            responNav.style.transform = 'translateX(0)'
            responOverlay.style.opacity = 1
            responOverlay.style.visibility = 'visible'
        }
        closeNavBtn.onclick = () => {
            this.closeResponThings()
        }
        responOverlay.onclick = () => {
            this.closeResponThings()
        }
        // slider
        let itemWidth = sliderMain.offsetWidth
        var firstItem = sliderMain.firstElementChild.cloneNode(true);
        var lastItem = sliderMain.lastElementChild.cloneNode(true);

        // Append the cloned items to the beginning and end of the carousel
        sliderMain.appendChild(firstItem);
        sliderMain.insertBefore(lastItem, sliderMain.firstElementChild);

        // Initialize the current position of the carousel
        var currentPosition = -itemWidth;
        sliderMain.style.transform = `translateX(${currentPosition}px)`;
        nextBtn.onclick = () => {
            // Move to the next item
            currentPosition -= itemWidth;
            // Restrict the position to prevent scrolling beyond the last item
            currentPosition = Math.max(currentPosition, -itemWidth * (sliderMain.children.length - 1));
            // Apply the new position to the items container
            sliderMain.style.transform = `translateX(${currentPosition}px)`;
            // Check if we've reached the cloned last item
            if (currentPosition === -(itemWidth * (sliderMain.children.length - 1))) {
                // Move to the actual first item
                currentPosition = -itemWidth;
                // Apply the new position instantly without animation
                sliderMain.style.transition = 'none';
                sliderMain.style.transform = `translateX(${currentPosition}px)`;

                // After a short delay, reset the transition to re-enable animation
                setTimeout(function () {
                    sliderMain.style.transition = '';
                }, 10);
            }
        }
        prevBtn.addEventListener('click', () => {
            // Move to the previous item
            currentPosition += itemWidth;
            // Restrict the position to prevent scrolling beyond the first item
            currentPosition = Math.min(currentPosition, 0);
            // Apply the new position to the items container
            sliderMain.style.transform = `translateX(${currentPosition}px)`;

            // Check if we've reached the cloned first item
            if (currentPosition === 0) {
                // Move to the actual last item
                currentPosition = -itemWidth * (sliderMain.children.length - 2);
                // Apply the new position instantly without animation
                sliderMain.style.transition = 'none';
                sliderMain.style.transform = `translateX(${currentPosition}px)`;

                // After a short delay, reset the transition to re-enable animation
                setTimeout(function () {
                    sliderMain.style.transition = '';
                }, 10);
            }
        });
    },
    closeResponThings () {
        responNav.style.transform = 'translateX(100%)'
        this.closeOverlay()
    },
    closeOverlay () {
        responOverlay.style.opacity = 0
        responOverlay.style.visibility = 'hidden'
    },
    start () {
        this.eventHandler()
    }
}
window.onload = () => {
    app.start()
}