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

// function headerFixed() {
//     let st = $(this).scrollTop();

//     if (st <= 5) {
//         $(".header__wrapper").removeClass("fixed");
//     } else {
//         $(".header__wrapper").addClass("fixed");
//     }
// }

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
    const header = document.querySelector(".header");
    let lockBody = false;

    modals.forEach((modal) => {
        if(modal.classList.contains("active") || header.classList.contains("active")) {
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