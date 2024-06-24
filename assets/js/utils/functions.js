function isEmailValid(email) {
    var emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return emailRegex.test(email);
}

function formatPhoneNumber(number) {
    let match = number.match(/^(\d{3})(\d{2})(\d{2})(\d{2})(\d{2})$/);

    if (match) {
        return "(+" + match[1] + ") " + match[2] + " " + match[3] + " " + match[4] + " " + match[5];
    };

    return null
}

function numberWithSeparator(value, separator) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

function getOnlyNumbers(str) {
    return str.replace(/[^\d]/g, '');
}

function tabsInit() {
    const tabElements = document.querySelectorAll(".tab");

    if(tabElements.length) {
        tabElements.forEach((tabElement) => {
            tabElement.addEventListener("click", function () {
                let contentId = tabElement.getAttribute("data-tab");
        
                const thisSiblingTabs = tabElement.closest(".tabs__control").querySelectorAll(".tab");
                if(thisSiblingTabs.length) {
                    thisSiblingTabs.forEach((thisSiblingTab) => {
                        thisSiblingTab.classList.remove("active");
                    });
                }
                tabElement.classList.add("active");
        
                const thisTabContents = tabElement.closest(".tabs").querySelectorAll(".tab-content");
                if(thisTabContents.length) {
                    thisTabContents.forEach((thisTabContent) => {
                        thisTabContent.classList.remove("active");
                    });
                }

                const thisContentElement = document.getElementById(contentId);
                if(thisContentElement) {
                    thisContentElement.classList.add("active");
                }
            });
        });
    }
}

function dynamicAppendInit() {
    const dataAppendElements = document.querySelectorAll("[data-append]");
    if(dataAppendElements.length) {
        dataAppendElements.forEach((dataAppendElement) => {
            let [mediaSize, appendBlockClass] = dataAppendElement.getAttribute("data-append").split(", ");

            if (window.innerWidth < mediaSize) {
                const appendBlockElement = document.querySelector(appendBlockClass);
                const isElementAppended = !!appendBlockElement.querySelector(dataAppendElement.getAttribute("class"));
                if(appendBlockElement && isElementAppended) {
                    dataAppendElement.append(appendBlockClass);
                }
            }
        });
    }
}

function headerFixed() {
    const scrollTop = document.documentElement.scrollTop;
    const headerWrapperElement = document.querySelector(".header__wrapper");
    const headerTopElement = document.querySelector(".header__top");
    const headerTopHeight = headerTopElement.offsetHeight;

    if (scrollTop <= headerTopHeight) {
        headerWrapperElement.classList.remove("fixed");
    } else {
        headerWrapperElement.classList.add("fixed");
    }
}

function getDocumentVisibleWidth() {
    return Math.max(
        document.body.scrollWidth, document.documentElement.scrollWidth,
        document.body.offsetWidth, document.documentElement.offsetWidth,
        document.body.clientWidth, document.documentElement.clientWidth
    );
}

function scrollNone() {
    const body = document.querySelector("body");
    const modals = document.querySelectorAll(".modal");
    const contactBadge = document.querySelector(".contact-badge");
    const cartBadge = document.querySelector("#chart-badge");
    const catalogMenu = document.querySelector(".catalog-menu");
    let lockBody =
        (contactBadge.classList.contains("active") && window.innerWidth < 768)
        || cartBadge.classList.contains("active") ||
        (catalogMenu.classList.contains("active") && window.innerWidth < 768);

    modals.forEach((modal) => {
        if(modal.classList.contains("active")) {
            lockBody = true;
        }
    });

    let scrollWidthBeforeFreeze = getDocumentVisibleWidth();

    if (lockBody) {
        body.classList.add("locked");

        let scrollWidthAfterFreeze = getDocumentVisibleWidth();
        
        if(scrollWidthBeforeFreeze < scrollWidthAfterFreeze) {
            let scrollSpace = scrollWidthAfterFreeze - scrollWidthBeforeFreeze;

            body.paddingRight = scrollSpace + "px";
        }
    } else {
        body.classList.remove("locked");
        body.paddingRight =  '';

        if(body.getAttribute("style") === "") {
            body.removeAttribute("style");
        }
        if(body.getAttribute("class") === "") {
            body.removeAttribute("class");
        }
    }
}