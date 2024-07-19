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

    const mainSearchInputElement = document.querySelector(".main-search input");
    if(mainSearchInputElement) {
        mainSearchInputElement.addEventListener("keyup", function() {
            if(mainSearchInputElement.value.trim() !== '') {
                mainSearchInputElement.closest(".main-search").classList.add("filled");
            } else {
                mainSearchInputElement.closest(".main-search").classList.remove("filled");
            }
        });
        mainSearchInputElement.addEventListener("focus", function() {
            mainSearchInputElement.closest(".main-search").classList.add("active");
        });
        mainSearchInputElement.addEventListener("blur", function() {
            mainSearchInputElement.closest(".main-search").classList.remove("active");
        });
    }

    const mainSearchIcon = document.querySelector(".main-search .form-field__icon");
    if(mainSearchIcon) {
        mainSearchIcon.addEventListener("click", function(e) {
            if(mainSearchInputElement.closest(".main-search").classList.contains("filled")){
                mainSearchInputElement.value = '';
                mainSearchInputElement.closest(".main-search").classList.remove("filled");
            }
        });
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

    // Products Functional  ************************
    const productFavourites = document.querySelectorAll(".product__favourite");
    if(productFavourites.length) {
        productFavourites.forEach((productFavourite) => {
            productFavourite.addEventListener("click", function(e) {
                e.preventDefault();
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

                    startAddToChartAnimation(counterBtn);
                    calcProductSale(newSize, counterBtn);
                } else {
                    const newSize = parseFloat((counterInputVal - step).toFixed(1));

                    if (newSize >= min) {
                        counterInput.value = newSize;
                        calcProductSale(newSize, counterBtn);
                    }
                    
                    if(newSize <= min) {
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

    function calcProductSale(quantity, target) {
        const productCounterWrap = target.closest(".with-counter");
        const chartProduct = target.closest(".chart-product");
        const chartCard = target.closest(".chart-card");
        
        if(productCounterWrap) {
            const counterElement = productCounterWrap.querySelector(".product-counter");
            const productSaleBadgesElement = productCounterWrap.querySelector(".sale-badges");
            let mainPrice = +counterElement.getAttribute("data-price");
            let currentPrice = 0;
            const oldPrice = +counterElement.getAttribute("data-old-price");
            const packagePrice = +counterElement.getAttribute("data-package-price");
            const boxPrice = +counterElement.getAttribute("data-box-price");
            const productActiveSale = productCounterWrap.querySelector(".product-info__row.active");
            const packageSaleElement = productCounterWrap.querySelector(".package-sale");
            const defaultSaleElement = productCounterWrap.querySelector(".default-sale");
            const boxSaleElement = productCounterWrap.querySelector(".box-sale");
            const packageSize = +counterElement.getAttribute("data-package");
            const boxSize = +counterElement.getAttribute("data-box");
            const productPrice = productCounterWrap.querySelector(".product-price");
            const productTotalPrice = productCounterWrap.querySelector(".product-total-price");
            
            if (productActiveSale) {
                productActiveSale.classList.remove("active");
            }
    
            // 3. BOX SALES
            if (boxSize && quantity >= boxSize) {
                if(boxSaleElement) {
                    boxSaleElement.classList.add("active");
                }

                if(boxPrice) {
                    currentPrice = boxPrice;
                }
            }
            // 2. PACKAGE SALES
            if (packageSize && quantity >= packageSize && quantity < boxSize) {
                if(packageSaleElement) {
                    packageSaleElement.classList.add("active");
                }

                if(packagePrice) {
                    currentPrice = packagePrice;
                }
            }
    
            // 1. DEFAULT SALES
            if (currentPrice === 0) {
                if(defaultSaleElement) {
                    defaultSaleElement.classList.add("active");
                }

                if(oldPrice && quantity) {
                    currentPrice = mainPrice;
                    mainPrice = oldPrice;
                }
            }

            if((quantity < packageSize && !oldPrice) || !quantity || currentPrice === 0) {
                hideSaleBadges(productSaleBadgesElement);
            } else {
                const totalSale = (mainPrice - currentPrice) * quantity;
                const currentSale = ((mainPrice - currentPrice) / mainPrice) * 100;
                
                updateSaleBadges(productSaleBadgesElement, currentSale, totalSale);
            }

            if(productPrice && productTotalPrice) {
                if(currentPrice === 0) {
                    currentPrice = mainPrice;
                }
                
                productPrice.innerHTML = numberWithSeparator(currentPrice);
                productTotalPrice.innerHTML = numberWithSeparator(currentPrice * quantity);
            }
        }

        if(chartProduct) {
            const chartProductElements = document.querySelectorAll(".chart-product");
            const totalPercentElement = document.getElementById("chart-total-percent");
            const totalSaleElement = document.getElementById("chart-total-sale");
            const chartSummaryElement = document.querySelector(".chart-summary");
            
            updateProductsTotals(chartProductElements, chartSummaryElement);
        }

        if(chartCard) {
            const chartCardElements = document.querySelectorAll(".chart-card");
            const totalProductsPrice = document.getElementById("products-total-price");
            
            updateProductsTotals(chartCardElements, totalProductsPrice);
        }

    }

    function updateSaleBadges(productBadges, sale, totalSale) {
        if (productBadges) {
            productBadges.classList.remove("hide");
            productBadges.closest(".with-counter").classList.add("sales-active");
            const saleElement = productBadges.querySelector(".product-sale");
            const totalSaleElement = productBadges.querySelector(".product-total-sale");

            if(sale % 1 !== 0) {
                sale = sale.toFixed(2);
            }

            saleElement.innerHTML = sale;
            totalSaleElement.innerHTML = numberWithSeparator(totalSale);
        }
    }

    function hideSaleBadges(productBadges) {
        if (productBadges) {
            productBadges.classList.add("hide");
            productBadges.closest(".with-counter").classList.remove("sales-active");
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

    function updateProductsTotals(products, summaryElement) {
        let productsSummaryPrice = 0;
        let summaryAmount = 0;
        let totalProductsSale = 0;

        products.forEach((product) => {
            const productTotalPrice = product.querySelector(".product-total-price");
            const productTotalSale = product.querySelector(".product-total-sale");

            if(productTotalPrice) {
                productsSummaryPrice += (+productTotalPrice.innerHTML.replace(" ", ""));
                summaryAmount += (+productTotalPrice.innerHTML.replace(" ", ""));
            }

            if(productTotalSale && !productTotalSale.closest(".sale-badges").classList.contains("hide")) {
                totalProductsSale += (+productTotalSale.innerHTML.replace(" ", ""))
            }
        });

        if(products[0].classList.contains("chart-card")) {
            const deliveryPriceRow = document.getElementById("delivery-price");
            const deliveryPrice = +deliveryPriceRow.getAttribute("data-price");
            const paidDeliveryLimit = +deliveryPriceRow.getAttribute("data-paid-limit");
            const summaryAmountElements = document.querySelectorAll(".summary-value");
            const totalProductsSaleElement = document.getElementById("total-products-sale");
            const totalProductsSaleRow = document.getElementById("total-products-sale-row");
            const promoCodeSales = document.querySelectorAll(".promocode-sale");

            if(productsSummaryPrice >= paidDeliveryLimit) {
                deliveryPriceRow.classList.add("hide");
            } else {
                summaryAmount += deliveryPrice;
                deliveryPriceRow.classList.remove("hide");
            }

            if(totalProductsSale) {
                totalProductsSaleElement.innerHTML = numberWithSeparator(totalProductsSale);
                totalProductsSaleRow.classList.remove("hide");
            } else {
                totalProductsSaleRow.classList.add("hide");
            }

            if(promoCodeSales.length) {
                promoCodeSales.forEach((promoCodeSale) => {
                    summaryAmount -= (+promoCodeSale.innerHTML.replace(" ", ""));
                });
            }

            summaryAmountElements.forEach((summaryAmountElement) => {
                summaryAmountElement.innerHTML = numberWithSeparator(summaryAmount);
            });
        }

        summaryElement.innerHTML = numberWithSeparator(productsSummaryPrice);
    }

    // *************************************

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
            arrows: false,
            type: 'loop',
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