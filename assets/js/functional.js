document.addEventListener("DOMContentLoaded", function () {
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

    // Products Functional  ************************
    const productFavourites = document.querySelectorAll(".product__favourite");
    if(productFavourites.length) {
        productFavourites.forEach((productFavourite) => {
            productFavourite.addEventListener("click", function(e) {
                e.preventDefault();

                if(productFavourite.classList.contains("active")) {
                    productFavourite.classList.remove("active");
                } else {
                    productFavourite.classList.add("active");
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
                // sale = sale.toFixed(2);
                sale = Math.round(sale);
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

    // No Functional below, need only in Front-end
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
    // ==================
});