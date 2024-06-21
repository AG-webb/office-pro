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

function headerFixed() {
    const scrollTop = document.documentElement.scrollTop;
    const headerWrapperElement = document.querySelector(".header__wrapper");
    const headerHeight = headerWrapperElement.closest(".header").offsetHeight;

    if (scrollTop <= headerHeight) {
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
    let lockBody = (contactBadge.classList.contains("active") && window.innerWidth < 768) || cartBadge.classList.contains("active");

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