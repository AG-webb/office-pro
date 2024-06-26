document.addEventListener("DOMContentLoaded", function () {
    headerFixed();
    tabsInit();

    const mainOverlayElement = document.querySelector(".main-overlay");
    const burgerElement = document.querySelector(".burger");

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
                if (togglerTriggerElement.closest(".toggler").getAttribute("id") === "chart-badge") {
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
                } else {
                    const newSize = parseFloat((counterInputVal - step).toFixed(1));

                    if (newSize >= min) {
                        counterInput.value = newSize;
                    }

                    if (newSize <= min) {
                        counterContainer.classList.remove("filled");
                    }
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

                if (thisVal <= min) {
                    counterContainer.classList.remove("filled");
                    counterInput.value = min;
                } else {
                    counterContainer.classList.add("filled");
                    let val = thisVal.toFixed(1);

                    if (min % 1 === 0) {
                        val = Math.round(thisVal.toFixed(1));
                    }

                    counterInput.value = val;
                }
            });
        });
    }

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
                breakpoints: {
                    1023: {
                        perPage: 3,
                    },
                    767: {
                        perPage: 2,
                        autoWidth: true,
                    },
                    // 400: {
                    //     perPage: 1,
                    // },
                }
            });
            productSlider.mount();
        });
    }

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

        e.stopPropagation();
    });
});

// Scroll
document.addEventListener("scroll", function () {
    headerFixed();
});