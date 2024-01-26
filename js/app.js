const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const app = {
    eventsHandler () {

        // scrolling header
        const heroSection = $('.hero__section');
        const headers = $$('.header');
        const headerHeight = headers[0].getBoundingClientRect().height;
        
        const stickyHeader = function (entries) {
            const [entry] = entries;

            if (!entry.isIntersecting) {
                headers.forEach(header => {
                    header.classList.add('sticky');
                });
            } else {
                headers.forEach(header => {
                    header.classList.remove('sticky');
                });
            }
        }
        
        const headerObserver = new IntersectionObserver(stickyHeader, {
            root: null,
            threshold: 0,
            rootMargin: `${headerHeight}px`
        });

        headerObserver.observe(heroSection);
        
        // search input 
        const searchInputs = $$('.form--search .form__input');
        const searchBtns = $$('.form--search .form__button');

        if (searchBtns && searchInputs) {
            searchInputs.forEach(input => {
                input.addEventListener('focus', () => {
                    input.parentElement.querySelector('.form__button').classList.add('active');
                });
                input.addEventListener('blur', () => {
                    input.parentElement.querySelector('.form__button').classList.remove('active');
                });
            });
        }
        
        // dropdown menu
        const dropdownBtns = $$('.btn--dropdown');        
        const overlay = $('.hidden-overlay');

        overlay.addEventListener('click', () => {
            const dropdownList = $('.dropdown__list.show');
            this.closeModal(dropdownList, overlay);
        })
        
        dropdownBtns.forEach(btn => {
            btn.addEventListener('click', e => {
                const dropdownList = btn.parentElement.querySelector('.dropdown__list');
                if (dropdownList.classList.contains('show')) {
                    this.closeModal(dropdownList, overlay);
                } else {
                    const showingModals = document.querySelectorAll('.dropdown__list.show');
                    showingModals.forEach(m => {
                        m.classList.remove('show'); 
                    });
                    this.openModal(e, dropdownList, overlay);
                }
            })
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                const modal = $('.dropdown__list.show');
                this.closeModal(modal, overlay);
            }
        });


        // sidebar 
        const openBtn = $('.btn--open');
        const closeBtn = $('.btn--close');
        const sidebar = $('.sidebar');
        const sidebarOverlay = $('.sidebar__overlay');

        if (openBtn && sidebar && closeBtn && sidebarOverlay) {
            openBtn.addEventListener('click', e => {
                this.openModal(e, sidebar, sidebarOverlay);
            })

            closeBtn.addEventListener('click', e => {
                this.closeModal(sidebar, sidebarOverlay);
            })

            sidebarOverlay.addEventListener('click', e => {
                this.closeModal(sidebar, sidebarOverlay);
            })
        }

        // number counting
        const digits = document.querySelectorAll('.counter__digit--notranslate');

        function updateNumbers() {
            digits.forEach(digit => {
                const dataNum = parseInt(digit.dataset.number);
                const digitList = digit.querySelector('.counter__digit__inner');
                digitList.animate(
                    [
                        {
                            transform: `translateY(-10%)`,
                        }, 
                        { 
                            
                            transform: `translateY("-90%")`,
                            offset: 0.7 
                        }, 
                        { 
                            transform: `translateY(-${dataNum * 10}%)`,
                        }
                    ],
                    {
                        duration: 2000,
                        fill: "forwards"
                    }
                );
            });
        }

        updateNumbers();

        // lazy loaded 
        const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
            // const [entry] = entries;

            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const img = entry.target.querySelector('img');

                if (img) {
                    img.src = img.dataset.src;

                    img.addEventListener('load', () => {
                        entry.target.classList.remove('lazy-load');
                    });
                }

                const bg = entry.target.querySelectorAll('.banner');
                if (bg) {
                    bg.forEach(bg => {
                        bg.style.backgroundImage = `url(${bg.dataset.src})`;

                        entry.target.classList.remove('lazy-load');
                    });
                }

                observer.unobserve(entry.target);
            });
        }, {
            root: null,
            threshold: 0,
            rootMargin: '0px'
        });
        const lazyLoadImages = document.querySelectorAll('.lazy-load');
        lazyLoadImages.forEach(img => lazyLoadObserver.observe(img));

        // slider 
        const slider = $('.slider__wrapper');
        const sliderImgs = $$('.slider__img__holder');
        const sliderTexts = $$('.slider__text');
        const indicators = $$('.indicator__item');
        const prevBtn = $('.btn--prev');
        const nextBtn = $('.btn--next');
        const imgTrack = $('.slider__imgs__inner');
        const textTrack = $('.slider__text__holder');

        if (slider) {
            prevBtn.addEventListener('click', () => {
                const currentSlide = $('.slider__img__holder.active');
                const currentText = $('.slider__text.active');
                const currentIndicator = $('.indicator__item.active');
                
                const currentIndex = +currentSlide.dataset.index;
                const nextIndex = +currentIndex - 1 < 0 ? sliderImgs.length - 1 : +currentIndex - 1;
                const nextSlide = $(`.slider__img__holder[data-index="${nextIndex}"]`);
                const nextText = $(`.slider__text[data-index="${nextIndex}"]`);
                const nextIndicator = $(`.indicator__item[data-index="${nextIndex}"]`);

                currentSlide.classList.remove('active');
                currentText.classList.remove('active');
                currentIndicator.classList.remove('active');
                
                
                nextSlide.classList.add('active');
                nextText.classList.add('active');
                nextIndicator.classList.add('active');
                
                const currentPosition = 100 * nextIndex / sliderImgs.length;
                
                imgTrack.style.transform = `translateX(-${currentPosition}%)`;
                textTrack.style.transform = `translateX(-${nextIndex * 100}%)`;
            })

            nextBtn.addEventListener('click', () => {
                const currentSlide = $('.slider__img__holder.active');
                const currentText = $('.slider__text.active');
                const currentIndicator = $('.indicator__item.active');

                const currentIndex = +currentSlide.dataset.index;
                const nextIndex = +currentIndex + 1 >= sliderImgs.length ? 0 : +currentIndex + 1;
                const nextSlide = $(`.slider__img__holder[data-index="${nextIndex}"]`);
                const nextText = $(`.slider__text[data-index="${nextIndex}"]`);
                const nextIndicator = $(`.indicator__item[data-index="${nextIndex}"]`);

                currentSlide.classList.remove('active');
                currentText.classList.remove('active');
                currentIndicator.classList.remove('active');

                nextSlide.classList.add('active');
                nextText.classList.add('active');
                nextIndicator.classList.add('active');

                const currentPosition = 100 * nextIndex / sliderImgs.length;

                imgTrack.style.transform = `translateX(-${currentPosition}%)`;
                textTrack.style.transform = `translateX(-${nextIndex * 100}%)`;
            });

            // Assuming indicatorButtons is a NodeList or an array of indicator buttons
            indicators.forEach((button) => {
                button.addEventListener('click', () => {
                    const clickedIndex = +button.dataset.index;
                    const currentSlide = $('.slider__img__holder.active');
                    const currentText = $('.slider__text.active');
                    const currentIndicator = $('.indicator__item.active');

                    const currentIndex = +currentSlide.dataset.index;
                    const nextSlide = $(`.slider__img__holder[data-index="${clickedIndex}"]`);
                    const nextText = $(`.slider__text[data-index="${clickedIndex}"]`);
                    const nextIndicator = $(`.indicator__item[data-index="${clickedIndex}"]`);

                    currentSlide.classList.remove('active');
                    currentText.classList.remove('active');
                    currentIndicator.classList.remove('active');

                    nextSlide.classList.add('active');
                    nextText.classList.add('active');
                    nextIndicator.classList.add('active');

                    const currentPosition = 100 * clickedIndex / sliderImgs.length;

                    imgTrack.style.transform = `translateX(-${currentPosition}%)`;
                    textTrack.style.transform = `translateX(-${clickedIndex * 100}%)`;
                });
            });

            setInterval(() => {
                prevBtn.click();
            }, 10000)
        }


        // section revealing
        const allSections = document.querySelectorAll('.section');

        const revealSection = function (entries, observer) {
            const [entry] = entries;

            if (!entry.isIntersecting) return;

            entry.target.classList.remove('section__hidden');
            updateNumbers();

            observer.unobserve(entry.target);
        };

        const sectionObserver = new IntersectionObserver(revealSection, {
            root: null,
            threshold: 0.5,
        });

        if (allSections) {
            allSections.forEach(function (section) {
                sectionObserver.observe(section);
                section.classList.add('section--hidden');
            });
        }
    },
    openModal (e, modal, overlay) {
        e.preventDefault();

        if (modal && overlay) {
            modal.classList.add('show');
            overlay.classList.add('show');
        }
    },
    closeModal (modal, overlay) {
        if (modal, overlay) {
            modal.classList.remove('show');
            overlay.classList.remove('show');
        }
    },
    toggleModal (modal, overlay) {
        if (modal, overlay) {
            modal.classList.add('show');
            overlay.classList.add('show');
        }
    }
    ,
    start () {
        this.eventsHandler();
    }
}
app.start();