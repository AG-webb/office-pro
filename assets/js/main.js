document.addEventListener("DOMContentLoaded", function () {
    headerFixed();
    tabsInit();

    const mainOverlayElement = document.querySelector(".main-overlay");
    const burgerElement = document.querySelector(".burger");
    const catalogMenuElement = document.querySelector(".catalog-menu");

    const catalogTabElements = document.querySelectorAll(".catalog-menu__tab");
    if (catalogTabElements.length) {
        catalogTabElements.forEach((catalogTabElement) => {
            catalogTabElement.addEventListener("click", function (e) {
                if (document.querySelector(".burger").classList.contains("active")) {
                    e.preventDefault();
                }
            });
        });
    }

    const catalogCloseElement = document.querySelector(".catalog-menu__close");
    if (catalogCloseElement) {
        catalogCloseElement.addEventListener("click", function () {
            catalogCloseElement.closest(".catalog-menu").classList.remove("active");

            if (burgerElement) {
                burgerElement.classList.remove("active");
            }

            scrollNone();
        });
    }

    // MODAL ***************************
    const dataModalElements = document.querySelectorAll("[data-modal]");
    if (dataModalElements.length) {
        dataModalElements.forEach((dataModal) => {
            dataModal.addEventListener("click", function () {
                let targetModal = document.querySelector(`.${dataModal.getAttribute("data-modal")}`);
                targetModal.classList.add("active");

                scrollNone();
            });
        });
    }

    const modalCloseElements = document.querySelectorAll(".modal-close");
    if (modalCloseElements.length) {
        modalCloseElements.forEach((modalClose) => {
            modalClose.addEventListener("click", function () {
                modalClose.closest(".modal").classList.remove("active");

                scrollNone();
            });
        });
    }

    // TOGGLER *************************
    const togglerTriggerElements = document.querySelectorAll(".toggler-trigger");
    if (togglerTriggerElements.length) {
        togglerTriggerElements.forEach((togglerTriggerElement) => {
            togglerTriggerElement.addEventListener("click", function () {
                const toggler = togglerTriggerElement.closest(".toggler");
                toggler.classList.toggle("active");

                if (togglerTriggerElement.getAttribute("id") === "theme-switcher") {
                    document.body.classList.toggle("dark-theme");
                }
                if (togglerTriggerElement.closest(".toggler").getAttribute("id") === "chart-badge" && window.innerWidth < 768) {
                    mainOverlayElement.classList.toggle("active");
                }
                if (togglerTriggerElement.closest(".burger")) {
                    document.querySelector(".catalog-menu").classList.toggle("active");
                }

                scrollNone();
            });
        });
    }

    const togglerCloseElements = document.querySelectorAll(".toggler-close");
    if (togglerCloseElements.length) {
        togglerCloseElements.forEach((togglerClose) => {
            togglerClose.addEventListener("click", function () {
                togglerClose.closest(".toggler").classList.remove("active");

                if (togglerClose.closest("#chart-badge")) {
                    mainOverlayElement.classList.remove("active");
                }

                scrollNone();
            });
        });
    }

    // Form Validation ***************************
    const withValidationForms = document.querySelectorAll(".with-validation");
    if (withValidationForms.length) {
        withValidationForms.forEach((withValidationForm) => {
            withValidationForm.addEventListener("submit", function (e) {
                let isValid = true;
                let emailElements = withValidationForm.querySelectorAll(".email-validation");
                let errorHtml = `<div class="form-field__message error">Wrong email, please set correct email address</div>`;

                // clear All error messages
                const errorMessages = withValidationForm.querySelectorAll(".form-field__message.error");
                if (errorMessages.length) {
                    errorMessages.forEach((errorMessage) => {
                        errorMessage.remove();
                    });
                }
                // clear All invalid classes
                const invalidFields = withValidationForm.querySelectorAll(".form-field.invalid");
                if (invalidFields.length) {
                    invalidFields.forEach((invalidField) => {
                        invalidField.classList.remove("invalid");
                    });
                }

                if (emailElements.length) {
                    emailElements.forEach((emailElement) => {
                        if (!isEmailValid(emailElement.value)) {
                            emailElement.closest(".form-field").classList.add("invalid");
                            emailElement.closest(".form-field").insertAdjacentHTML("beforeend", errorHtml);
                            isValid = false;
                        }
                    });
                }

                if (!isValid) {
                    e.preventDefault();
                }
            });
        });
    }


    // Product Part  ************************
    const productCardElements = document.querySelectorAll(".landscape-product");
    if (productCardElements.length && window.innerWidth < 1024) {
        productCardElements.forEach((productCardElement) => {
            const gradientBadge = productCardElement.querySelector(".badge.badge_gradient");
            const productTop = productCardElement.querySelector(".product__top");
            const productBadges = productCardElement.querySelector(".product__badges");
            const productBadgesLabel = productCardElement.querySelector(".product-info__label_badges");

            if (gradientBadge && productTop) {
                productTop.append(gradientBadge);
            }
            if (productBadges && productBadgesLabel) {
                productBadgesLabel.append(productBadges);
            }
        });
    }

    const counterBtnElements = document.querySelectorAll(".product-counter__btn");
    if (counterBtnElements.length) {
        counterBtnElements.forEach((counterBtn) => {
            counterBtn.addEventListener("click", function (e) {
                e.preventDefault();

                isIncrement = counterBtn.classList.contains("product-counter__btn_increment");
                const counterInput = counterBtn.closest(".product-counter").querySelector(".product-counter__value input");
                const step = +counterInput.getAttribute("step");
                const min = +counterInput.getAttribute("min");
                const counterInputVal = +counterInput.value;
                const counterContainer = counterInput.closest(".product-counter");

                if (isIncrement) {
                    const newSize = parseFloat((counterInputVal + step).toFixed(1));
                    counterContainer.classList.add("filled");

                    counterInput.value = newSize;

                    startAddToChartAnimation(counterBtn);
                    calcProductSale(newSize, counterBtn);
                } else {
                    const newSize = parseFloat((counterInputVal - step).toFixed(1));

                    if (newSize >= min) {
                        counterInput.value = newSize;
                    }

                    if (newSize <= min) {
                        counterContainer.classList.remove("filled");
                    }

                    calcProductSale(newSize, counterBtn);
                }
            });
        });
    }

    const counterInputElements = document.querySelectorAll(".product-counter__value input");
    if (counterInputElements.length) {
        counterInputElements.forEach((counterInput) => {
            counterInput.addEventListener("change", function () {
                const thisVal = +counterInput.value;
                const min = +counterInput.getAttribute('min');
                const counterContainer = counterInput.closest(".product-counter");

                startAddToChartAnimation(counterInput);
                if (thisVal <= min) {
                    counterContainer.classList.remove("filled");
                    counterInput.value = min;

                    calcProductSale(min, counterInput);
                } else {
                    counterContainer.classList.add("filled");
                    let val = thisVal.toFixed(1);

                    if (min % 1 === 0) {
                        val = Math.round(thisVal.toFixed(1));
                    }

                    counterInput.value = val;
                    calcProductSale(val, counterInput);
                }
            });
        });
    }

    function calcProductSale(newSize, target) {
        const productElement = target.closest(".product");
        
        if(productElement) {
            const counterElement = productElement.querySelector(".product-counter");
            const productBody = productElement.querySelector(".product__body");
            const productPreviewElement = productElement.querySelector(".product__preview");
            const productSaleBadgesElement = productElement.querySelector(".product__badges");
            const mainPrice = +counterElement.getAttribute("data-price");
            const productActiveSale = productBody.querySelector(".product-info__row.active");
            const packageSaleElement = productBody.querySelector(".package-sale");
            const defaultSaleElement = productBody.querySelector(".default-sale");
            const boxSaleElement = productBody.querySelector(".box-sale");
            const packageSize = +counterElement.getAttribute("data-package");
            const boxSize = +counterElement.getAttribute("data-box");
            const defaultSale = +counterElement.getAttribute("data-sale");
            const packageSale = +counterElement.getAttribute("data-package-sale");
            const boxSale = +counterElement.getAttribute("data-box-sale");
    
            if (productActiveSale) {
                productActiveSale.classList.remove("active");
            }
    
            // 3. BOX SALES
            if (boxSale && boxSaleElement && newSize >= boxSize) {
                const totalSale = Math.round(((mainPrice * newSize) * boxSale) / 100);
    
                updateSaleBadges(productSaleBadgesElement, boxSale, totalSale);
                return boxSaleElement.classList.add("active");
            }
            // 2. PACKAGE SALES
            if (packageSale && packageSaleElement && newSize >= packageSize) {
                const totalSale = Math.round(((mainPrice * newSize) * packageSale) / 100);
    
                updateSaleBadges(productSaleBadgesElement, packageSale, totalSale);
    
                return packageSaleElement.classList.add("active");
            }
    
            // 1. DEFAULT SALES
            if (defaultSaleElement) {
                defaultSaleElement.classList.add("active");
                hideSaleBadges(productSaleBadgesElement);
            }
        }

    }

    function updateSaleBadges(productBadges, sale, totalSale) {
        if (productBadges) {
            productBadges.classList.remove("hide");
            productBadges.closest(".product").classList.add("product_with-sales");
            const saleElement = productBadges.querySelector(".product-sale");
            const totalSaleElement = productBadges.querySelector(".product-total-sale");

            saleElement.innerHTML = sale;
            totalSaleElement.innerHTML = totalSale;
        }
    }

    function hideSaleBadges(productBadges) {
        if (productBadges) {
            productBadges.classList.add("hide");
            productBadges.closest(".product").classList.remove("product_with-sales");
        }
    }

    function startAddToChartAnimation(target) {
        const productElement = target.closest(".product");
        const chartBadge = document.getElementById("chart-badge");
        const chartBadgeOffset = offset(chartBadge);
        let productImgElement;

        if (productElement) {
            productImgElement = productElement.querySelector(".product__img img");
        }

        if(productImgElement) {
            const imgOffset = offset(productImgElement)
            const chartImg = document.createElement("img");
            chartImg.setAttribute("class", 'product-fake-img');
            chartImg.setAttribute("src", productImgElement.getAttribute("src"));
            chartImg.setAttribute("width", productImgElement.offsetWidth);
            chartImg.setAttribute("height", productImgElement.offsetHeight);
            chartImg.style.top = imgOffset.top + "px";
            chartImg.style.left = imgOffset.left + "px";
            document.body.append(chartImg);
    
            const imgMove = [
                { top: chartImg.style.top, left: chartImg.style.left, width: productImgElement.offsetWidth + "px" },
                { top: (chartBadgeOffset.top + 16) + "px", left: (chartBadgeOffset.left) + "px", width: 0 },
            ];
    
            const imgTiming = {
                duration: 1000,
                iterations: 1,
            };
    
            chartImg.animate(imgMove, imgTiming);
            Promise.all(chartImg.getAnimations().map((animation) => animation.finished)).then(
                () => chartImg.remove(),
            );
        }
    }

    // *******************

    const copyToClipboardElements = document.querySelectorAll("[data-copy]");
    if (copyToClipboardElements.length) {
        copyToClipboardElements.forEach((copyToClipboardElement) => {
            copyToClipboardElement.addEventListener("click", function () {
                let copyText = copyToClipboardElement.getAttribute("data-copy");

                navigator.clipboard.writeText(copyText);
            });
        });
    }

    if (window.innerWidth < 768) {
        const catalogTabContent = document.querySelectorAll(".catalog-menu__content");
        if (catalogTabContent) {
            let catalogMenuSlider = new Splide('.catalog-menu__content', {
                perPage: 1,
                arrows: false,
            });
            catalogMenuSlider.mount();
            catalogMenuSlider.on('move', function (index) {
                const activeCatalogTabTitle = document.querySelector(".catalog-menu__tab.active");
                activeCatalogTabTitle.classList.remove("active");

                const currentTabTitle = document.querySelectorAll(".catalog-menu__tab")[index];
                currentTabTitle.classList.add("active");
            });
        }
    }

    const previewSliderElements = document.querySelectorAll(".preview-slider");
    if (previewSliderElements.length) {
        previewSliderElements.forEach((previewSliderElement) => {
            const splideWrapper = previewSliderElement.querySelector(".splide");
            let splide = new Splide(splideWrapper, {
                perPage: 1,
                arrows: false,
            });
            splide.mount();

            splide.on('moved', function () {
                const playingVideoElement = previewSliderElement.querySelector(".video-player.playing");
                if (playingVideoElement) {
                    const videoElement = playingVideoElement.querySelector("video");
                    videoElement.pause();
                    playingVideoElement.classList.remove("playing");
                }
            });
        });
    }

    const productThumbsSliderElement = document.querySelector(".product-thumbs");
    const productMainSliderElement = document.querySelector(".product-images");
    if (productThumbsSliderElement && productMainSliderElement) {
        const thumbsSplideWrapper = productThumbsSliderElement.querySelector(".splide");
        let thumbsSlider = new Splide(thumbsSplideWrapper, {
            direction: 'ttb',
            perPage: 5,
            perMove: 1,
            type: 'loop',
            height: '24.6875rem',
        });
        thumbsSlider.mount();

        const mainSplideWrapper = productMainSliderElement.querySelector(".splide");
        let mainSlider = new Splide(mainSplideWrapper, {
            perPage: 1,
            type: 'loop',
        });
        mainSlider.mount();
    
        mainSlider.on('move', function (index) {
            thumbsSlider.go(index);
        });

        thumbsSlider.on('move', function (index) {
            mainSlider.go(index);
        });
        thumbsSlider.on('click', function ({ index }) {
            mainSlider.go(index);
        });
    }

    const videoPlayerElements = document.querySelectorAll(".video-player");
    if (videoPlayerElements.length) {
        videoPlayerElements.forEach((videoPlayerElement) => {
            const videoElement = videoPlayerElement.querySelector("video");

            videoPlayerElement.addEventListener("click", function (e) {
                if (e.target.closest(".video-player__control")) {
                    videoElement.play();
                    videoPlayerElement.classList.add("playing");
                } else if (e.target.closest(".playing")) {
                    videoElement.pause();
                    videoPlayerElement.classList.remove("playing");
                }
            });
        });
    }

    const catalogSubcategoryElements = document.querySelectorAll(".catalog-item__subcategory");
    if (catalogSubcategoryElements.length) {
        catalogSubcategoryElements.forEach((catalogSubcategoryElement) => {
            const imageElement = catalogSubcategoryElement.closest(".catalog-item").querySelector(".catalog-item__image img");
            const defaultImageSrc = imageElement.getAttribute("src");
            const imageSrc = catalogSubcategoryElement.getAttribute("data-image");

            if (imageSrc) {
                catalogSubcategoryElement.addEventListener("mouseover", function () {
                    imageElement.setAttribute("src", imageSrc);
                });
                catalogSubcategoryElement.addEventListener("mouseleave", function () {
                    imageElement.setAttribute("src", defaultImageSrc);
                });
            }
        });
    }

    const productsSliderElements = document.querySelectorAll(".products-slider");
    if (productsSliderElements.length) {
        productsSliderElements.forEach((productsSliderElement) => {
            const splideWrapper = productsSliderElement.querySelector(".splide");
            let productSlider = new Splide(splideWrapper, {
                perPage: 5,
                arrows: true,
                pagination: false,
                // padding: '2rem',
                perMove: 1,
                drag: false,
                breakpoints: {
                    1149: {
                        perPage: 4,
                    },
                    1023: {
                        perPage: 3,
                    },
                    767: {
                        drag: true,
                        // autoWidth: true,
                    },
                    600: {
                        perPage: 2,
                        drag: true,
                        // autoWidth: true,
                    },
                    // 400: {
                    //     perPage: 1,
                    // },
                }
            });
            productSlider.mount();
        });
    }

    const productsSliderLandscapeElements = document.querySelectorAll(".products-slider_landscape");
    if (productsSliderLandscapeElements.length) {
        productsSliderLandscapeElements.forEach((productsSliderElement) => {
            const splideWrapper = productsSliderElement.querySelector(".splide");
            let productSlider = new Splide(splideWrapper, {
                perPage: 5,
                arrows: true,
                pagination: false,
                // padding: '2rem',
                perMove: 1,
                drag: false,
                breakpoints: {
                    1149: {
                        perPage: 4,
                    },
                    1023: {
                        perPage: 3,
                    },
                    767: {
                        perPage: 2,
                        drag: true,
                        // autoWidth: true,
                    },
                    550: {
                        perPage: 1,
                        drag: true,
                        // autoWidth: true,
                    },
                    // 400: {
                    //     perPage: 1,
                    // },
                }
            });
            productSlider.mount();
        });
    }

    // REMOVE ACTIVE CLASSES *******************************
    document.addEventListener('click', function (e) {
        if (!e.target.closest(".lang-switcher")) {
            const langSwitcher = document.querySelector(".lang-switcher");
            if (langSwitcher) {
                langSwitcher.classList.remove("active");

                scrollNone();
            }
        }
        if (!e.target.closest(".modal__wrapper")) {
            const activeModalElements = document.querySelectorAll(".modal.active");
            if (activeModalElements.length) {
                activeModalElements.forEach((activeModalElement) => {
                    activeModalElement.classList.remove("active");
                });

                scrollNone();
            }
        }
        if (!e.target.closest(".toggler_global")) {
            const activeTogglerElements = document.querySelectorAll(".toggler_global.active");

            if (activeTogglerElements.length) {
                activeTogglerElements.forEach((activeTogglerElement) => {
                    activeTogglerElement.classList.remove("active");
                });

                scrollNone();
            }
        }

        if (!e.target.closest("#chart-badge")) {
            mainOverlayElement.classList.remove("active");
        }

        if (!e.target.closest(".catalog-menu__wrap") && !e.target.closest(".burger")) {
            catalogMenuElement.classList.remove("active");
            burgerElement.classList.remove("active");
        }

        e.stopPropagation();
    });
});

// Scroll
document.addEventListener("scroll", function () {
    headerFixed();
});