
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const searchBar = $('.bar')
const searchIcon = $('.magni-icon')
const sliderRightBtn = $('.right-icon')
const sliderLeftBtn = $('.left-icon')
const slider = $('.slider')
const tabItems = $$('.tab__item')
const tabLine = $('.tab__line')
const activeTab = $('.tab__item.active')
const panelItem = $$('.panel__item')
const moreBtn = $$('.more-btn')
const moreProductsSection = $$('.more-products')

tabLine.style.width = `${activeTab.offsetWidth}px`
tabLine.style.left = `${activeTab.offsetLeft}px`
tabLine.style.top = `${activeTab.offsetTop + activeTab.offsetHeight}px`


const app = {
    sliderIndex : 1,
    eventHandler () {
        // expand search bar
        searchIcon.addEventListener('click' , () => {
            searchIcon.parentElement.classList.toggle('active')
        })
        // slider

        // product tabs
        tabItems.forEach((tab , index) => {
            tab.onclick = () => {
                $('.tab__item.active').classList.remove('active')
                $('.panel__item.active').classList.remove('active')

                tab.classList.add('active')
                panelItem[index].classList.add('active')
                tabLine.style.width = `${tab.offsetWidth}px`
                tabLine.style.left = `${tab.offsetLeft}px`
                tabLine.style.top = `${ tab.offsetTop + tab.offsetHeight}px`
            }
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
    },
    // show (index) {
    //     moreProductsSection[index].style.display = 'block'
    //     moreBtn[index].innerText = 'Hide away'
    // },
    // hide (index) {
    //     moreProductsSection[index].style.display = 'none'
    //     moreBtn[index].innerText = 'See more'
    // },
    start () {
        this.eventHandler()
    }
}
app.start()