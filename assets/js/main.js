document.addEventListener("DOMContentLoaded", function () {
    headerFixed();
    tabsInit();
    dynamicAppendInit();

    const mainOverlayElement = document.querySelector(".main-overlay");
    const burgerElement = document.querySelector(".burger");
    const catalogMenuElement = document.querySelector(".catalog-menu");
    const currentTheme = localStorage.getItem("theme");

    if(currentTheme && currentTheme === 'dark') {
        document.body.classList.add("dark-theme");
        document.getElementById("theme-switcher").classList.add("active");
    }

    const catalogTabElements = document.querySelectorAll(".catalog-menu__tab");
    if (catalogTabElements.length) {
        catalogTabElements.forEach((catalogTabElement) => {
            catalogTabElement.addEventListener("click", function (e) {
                if (document.querySelector(".burger").classList.contains("active") && window.innerWidth >= 768) {
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
                if(targetModal) {
                    targetModal.classList.add("active");

                    scrollNone();
                }

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
            togglerTriggerElement.addEventListener("click", function (e) {
                const toggler = togglerTriggerElement.closest(".toggler");
                toggler.classList.toggle("active");

                if (togglerTriggerElement.getAttribute("id") === "theme-switcher") {
                    document.body.classList.toggle("dark-theme");
                    if(document.body.classList.contains("dark-theme")) {
                        localStorage.setItem("theme", "dark");
                    } else {
                        localStorage.setItem("theme", "light");
                    }
                }
                if (togglerTriggerElement.closest(".toggler").getAttribute("id") === "chart-badge" && window.innerWidth < 768) {
                    mainOverlayElement.classList.toggle("active");
                }
                if (togglerTriggerElement.closest(".burger")) {
                    document.querySelector(".catalog-menu").classList.toggle("active");
                }
                if(togglerTriggerElement.closest(".form-field_password")) {
                    const formField = togglerTriggerElement.closest(".form-field_password");
                    const formFieldInput = formField.querySelector(".form-field__input");

                    if(formField.classList.contains("active")) {
                        formFieldInput.setAttribute("type", "text");
                    } else {
                        formFieldInput.setAttribute("type", "password");
                    }
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

    // Form Fields **************************

    const formFieldInputElements = document.querySelectorAll(".form-field__input");
    if(formFieldInputElements.length) {
        formFieldInputElements.forEach((formFieldInputElement) => {
            let startVal = formFieldInputElement.value;

            if (startVal && startVal.trim().length) {
                formFieldInputElement.closest(".form-field").classList.add("filled");
            } else {
                formFieldInputElement.closest(".form-field").classList.remove("filled");
            }

            formFieldInputElement.addEventListener("keyup", function () {
                let val = formFieldInputElement.value.trim();
                
                if (val.length) {
                    formFieldInputElement.closest(".form-field").classList.add("filled");
                } else {
                    formFieldInputElement.closest(".form-field").classList.remove("filled");
                }
            });
        
            formFieldInputElement.addEventListener("focus", function () {
                formFieldInputElement.closest(".form-field").classList.add("focused");
            });
            formFieldInputElement.addEventListener("focusout", function () {
                formFieldInputElement.closest(".form-field").classList.remove("focused");
            });
        });
    }

    const formFieldEditBtn = document.querySelector(".form-fields__edit .btn");
    if(formFieldEditBtn) {
        formFieldEditBtn.addEventListener("click", function(e) {
            const dataSuccessMessage = formFieldEditBtn.getAttribute("data-success");
            const formFields = formFieldEditBtn.closest(".form-fields");
            const formFieldInputs = formFields.querySelectorAll("input, textarea");

            let isValid = true;

            if(formFields.classList.contains("active")) {
                isValid = validateFields(e, formFields);

                if(isValid) {
                    formFields.classList.remove("active");

                    if(dataSuccessMessage) {
                        const successMessage = document.createElement("div");
                        successMessage.classList.add("form-fields__edit-message");
                        successMessage.innerHTML = dataSuccessMessage;

                        formFieldEditBtn.closest(".form-fields__edit").append(successMessage);

                        setTimeout(() => {
                            successMessage.remove();
                        }, 3000);
                    }
                }
            } else {
                formFields.classList.add("active");
            }
            
            
            if(formFieldInputs.length && isValid) {
                formFieldInputs.forEach((formFieldInput) => {
                    if(formFields.classList.contains("active")) {
                        formFieldInput.removeAttribute("disabled");
                    } else {
                        formFieldInput.setAttribute("disabled", "disabled");
                    }
                });
            }
        });
    }

    // Form Validation ***************************
    const withValidationForms = document.querySelectorAll(".with-validation");
    if (withValidationForms.length) {
        withValidationForms.forEach((withValidationForm) => {
            withValidationForm.addEventListener("submit", function (e) {
                validateFields(e, withValidationForm);
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

    const productThumbsSliderElement = document.querySelector(".product-thumbs");
    const productMainSliderElement = document.querySelector(".product-images");
    if (productThumbsSliderElement && productMainSliderElement) {
        const thumbsSplideWrapper = productThumbsSliderElement.querySelector(".splide");
        let type = "slide";
        if(productMainSliderElement.querySelectorAll(".product-images__slide").length > 5) {
            type = "loop";
        }

        let thumbsSlider = new Splide(thumbsSplideWrapper, {
            direction: 'ttb',
            perPage: 5,
            perMove: 1,
            arrows: false,
            type,
            height: '24.6875rem',
            arrowPath: 'M12.5858 7.58579C13.3668 6.80474 14.6332 6.80474 15.4142 7.58579L26.9142 19.0858C27.6953 19.8668 27.6953 21.1332 26.9142 21.9142L15.4142 33.4142C14.6332 34.1953 13.3668 34.1953 12.5858 33.4142C11.8047 32.6332 11.8047 31.3668 12.5858 30.5858L22.6716 20.5L12.5858 10.4142C11.8047 9.63317 11.8047 8.36684 12.5858 7.58579Z',
            // breakpoints: {
            //     1024: {
            //         height: '21.875rem',
            //     },
            // }
        });
        thumbsSlider.mount();

        const mainSplideWrapper = productMainSliderElement.querySelector(".splide");
        let mainSlider = new Splide(mainSplideWrapper, {
            perPage: 1,
            type: 'loop',
            arrowPath: 'M12.5858 7.58579C13.3668 6.80474 14.6332 6.80474 15.4142 7.58579L26.9142 19.0858C27.6953 19.8668 27.6953 21.1332 26.9142 21.9142L15.4142 33.4142C14.6332 34.1953 13.3668 34.1953 12.5858 33.4142C11.8047 32.6332 11.8047 31.3668 12.5858 30.5858L22.6716 20.5L12.5858 10.4142C11.8047 9.63317 11.8047 8.36684 12.5858 7.58579Z',
            breakpoints: {
                1024: {
                    arrows: false,
                    pagination: true,
                },
            }
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
                perMove: 1,
                drag: false,
                breakpoints: {
                    1149: {
                        perPage: 4,
                    },
                    840: {
                        perPage: 3,
                    },
                    767: {
                        drag: true,
                    },
                    600: {
                        perPage: 2,
                        drag: true,
                    },
                }
            });
            productSlider.mount();
        });
    }

    const paymentTypeInputs = document.querySelectorAll(".payment-type-input");
    const organizationFields = document.querySelectorAll(".organization-field");
    if(paymentTypeInputs.length && organizationFields.length) {
        paymentTypeInputs.forEach((paymentTypeInput) => {
            paymentTypeInput.addEventListener('change', function() {
                if(paymentTypeInput.classList.contains("organization-type")) {
                    organizationFields.forEach((organizationField) => {
                        organizationField.classList.remove("dn");
                    });
                } else {
                    organizationFields.forEach((organizationField) => {
                        organizationField.classList.add("dn");
                    });
                }
            });
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
        if (!e.target.closest(".modal__wrapper") && !e.target.closest("[data-modal]")) {
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