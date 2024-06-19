$(document).ready(function () {
    headerFixed();
    tabsInit();
    dynamicAppendInit();

    // MODAL ***************************
    $("[data-modal]").on("click", function () {
        let targetModal = $(`.${$(this).attr("data-modal")}`);
        targetModal.addClass("active");

        scrollNone();
    });

    $(".modal-close").on("click", function () {
        $(this).closest(".modal").removeClass("active");

        scrollNone();
    });

    // TOAST ****************************
    $(".toast-trigger").on("click", function () {
        toastMessage("Toast Message", "default");
    });

    // DATEPICKER ************************
    $(".single-datepicker input").datepicker({
        dateFormat: "dd/mm/yy",
        onSelect: (date, inst) => {
            console.log("Single date Selected:", date);
        }
    });

    $('.range-datepicker input').daterangepicker({
        autoApply: true,
        autoUpdateInput: false,
        parentEl: ".range-datepicker",
    });

    $('.range-datepicker input').on('apply.daterangepicker', function(ev, picker) {
        let startDate = picker.startDate.format('DD/MM/YYYY');
        let endDate = picker.endDate.format('DD/MM/YYYY');
        
        $(this).val(startDate + ' - ' + endDate);
    });

    // SWITCHER *************************
    $(".switcher__item").on("click", function () {
        if (!$(this).closest(".switcher").hasClass("switcher_multiple")) {
            $(this).closest(".switcher").find(".switcher__item").removeClass("active");
            $(this).addClass("active");
        } else {
            $(this).toggleClass("active");
        }
    });

    // TOGGLER *************************
    $(".toggler-trigger").on("click", function() {
        const toggler =  $(this).closest(".toggler");
        toggler.toggleClass("active");

        scrollNone();
    });
    $(".toggler-close").on("click", function() {
        $(this).closest(".toggler").removeClass("active");

        scrollNone();
    });

    // ACCORDION ************************
    $(".accordion__header").on("click", function (e) {
        let accordion = $(this).closest(".accordion");
        let thisItem = $(this).closest(".accordion__item");
        let openItem = accordion.find(".accordion__item.open");
        let thisBody = thisItem.find(".accordion__body");
        let openBody = openItem.find(".accordion__body");

        if (thisItem.hasClass("open")) {
            thisItem.removeClass("open");
            thisBody.slideUp(300);
        } else {
            openItem.removeClass("open");
            openBody.slideUp(300);
            thisItem.addClass("open");
            thisBody.slideDown(300);
        }
    });

    // POPOVER **************************
    if ($(".popover").length) {
        if ($(window).width() <= 1024) {
            $(".popover").each(function () {
                popoverSlideInit($(this));
            });
        }
    }

    $(".popover-trigger").on("click", function () {
        if ($(this).closest(".popover-container").hasClass("active")) {
            $(this).closest(".popover-container").removeClass("active");
        } else {
            $(".popover-container").removeClass("active");
            $(this).closest(".popover-container").addClass("active");
        }

        if ($(window).width() < 1024) {
            scrollNone();
        }
    });

    // FORM ITEMS *********************
    $(".form-field__input").on("keyup", function () {
        let val = $(this).val().trim();

        if (val.length) {
            $(this).closest(".form-field").addClass("filled");
        } else {
            $(this).closest(".form-field").removeClass("filled");
        }
    });

    $(".form-field__input").on("focus", function () {
        $(this).closest(".form-field").addClass("focused");
    });
    $(".form-field__input").on("focusout", function () {
        $(this).closest(".form-field").removeClass("focused");
    });

    $("select").on("change", function () {
        console.log($(this).val());
    });

    $(".append-select").on("click", function() {
        if(!$(this).parent().find(".custom-select").length) {
            $(this).parent().append(`
                <div class="custom-select dynamic-select">
                    <div class="combo-box multiple searchable" data-combo-name="dynamicSelect[]">
                        <div class="combo-box-selected">
                            <div class="combo-box-selected-wrap">
                                <span class="combo-box-placeholder">Dynamic appended Select Placeholder</span>
                            </div>
                        </div>
                        <div class="combo-box-dropdown">
                            <div class="combo-box-options">
                                <div class="combo-option selected" data-option-value="1">Option 1</div>
                                <div class="combo-option" data-option-value="2">Option 2</div>
                                <div class="combo-option" data-option-value="3">Option 3</div>
                                <div class="combo-option" data-option-value="4">Option 4</div>
                            </div>
                        </div>
                    </div>
                </div>    
            `);
    
            _initComboBox($(".dynamic-select .combo-box").get(0));
        }
    });

    const customSelect = new CustomSelect();

    $(".append-options").on("click", function() {
        const options = [
            {
                value: 5,
                name: 'Option 5',
                attributes: {
                    test: 'test attr 5',
                }
            },
            {
                value: 6,
                name: 'Option 6',
                attributes: {
                    test: 'test attr 6',
                    hello: 'world',
                }
            },
        ]
        _addDynamicOptions($(".ajax-select .combo-box").get(0), options);
        $(this).remove();
    });

    $(".custom-selects-form").on("submit", function(e) {
        e.preventDefault();
        let data = $(this).serialize();
        data = data.split("&");

        console.log(data);
    });

    // Form Validation ***************************
    $(".with-validation").on("submit", function (e) {
        let isValid = true;
        let email = $(this).find(".email-validation");
        let errorHtml = `<div class="form-field__message error">Wrong email, please set correct email address</div>`;

        $(this).find(".form-field__message.error").remove();
        $(this).find(".form-field.invalid").removeClass("invalid");

        if (email.length) {
            if (!isEmailValid(email.val())) {
                $(".email-validation").closest(".form-field").addClass("invalid").append(errorHtml);
                isValid = false;
            }
        }

        if (!isValid) {
            e.preventDefault();
        }
    });

    $(".input-number").on("keyup", function(e) {
        let val = $(this).val();
        let onlyNum = getOnlyNumbers(val);

        if (onlyNum) {
            $(this).val(onlyNum)
        } else {
            $(this).val("");
        }

        // Separator
        if($(this).attr("data-input-separator") !== undefined) {
            let separator = $(this).attr("data-input-separator");
            let valWithSeparator = numberWithSeparator($(this).val(), separator);

            $(this).val(valWithSeparator);
        }

        // Phone Formatter
        if($(this).hasClass("formatted-phone")) {
            let formattedPhoneNumber = formatPhoneNumber($(this).val());
            
            if(formattedPhoneNumber) {
                $(this).val(formattedPhoneNumber);
            }
        }
    });

    // File Upload *******************************
    let uploadedFiles = [];
    $(".file-upload-input").on("change", function () {
        const input = this;
        let files = this.files;
        const mainBlock = $(input).closest(".file-upload");
        const previewBlock = mainBlock.find(".file-upload-preview");

        
        mainBlock.removeClass("preview-mode");
        uploadedFiles = [];

        if(previewBlock.length) {
            previewBlock.html("");
        }

        if (files.length) {
            mainBlock.addClass("preview-mode");
            
            if(mainBlock.hasClass("avatar-upload")) {
                let { name, size, type } = files[0];
                uploadedFiles = [...uploadedFiles, files[0]];
                let reader = new FileReader();

                reader.onload = function () {
                    let img = document.createElement('img');
                    img.src = reader.result;
    
                    mainBlock.find(".avatar-upload__body img").remove();
                    mainBlock.find(".avatar-upload__body").prepend(img);
                }
                reader.readAsDataURL(files[0]);

                console.log("UPLOADED DOCUMENTS LIST ----------- ", uploadedFiles);
            }

            if(mainBlock.hasClass("doc-upload")) {
                for(let i = 0; i < files.length; i++) {
                    let { name, size, type } = files[i];
                    // add item to list
                    uploadedFiles = [...uploadedFiles, files[i]];

                    let previewItemHtml = `
                        <div class="file-upload-item doc-upload-item">
                            <span class="file-upload-item__name doc-upload-item__name">${name}</span>
                            <div class="file-upload-item__remove doc-upload-item__remove">x</div>
                        </div>
                    `
                    previewBlock.append(previewItemHtml);
                }

                console.log("UPLOADED DOCUMENTS LIST ----------- ", uploadedFiles);
            }
        }
    });

    $(".file-upload").on("click", ".file-upload-item__remove", function() {
        let itemBlock = $(this).closest(".file-upload-item");
        let itemName = itemBlock.find(".file-upload-item__name").text();

        if(uploadedFiles.length) {
            // remove item from list
            uploadedFiles = [...uploadedFiles.filter(file => {
                return file.name !== itemName
            })];

            if(!uploadedFiles.length) {
                mainBlock.removeClass("preview-mode");
            }

            console.log("UPLOADED DOCUMENTS LIST ----------- ", uploadedFiles);
        }

        itemBlock.remove();
    });

    // REMOVE ACTIVE CLASSES *******************************
    $(document).on('click', function (e) {
        // if (!$(e.target).closest(".lang-switcher, [data-modal], .modal__wrapper, .toggler_global").length) {
        if (!$(e.target).closest("[data-modal], .modal__wrapper, .popover-trigger, .popover, .toggler_global").length) {
            // $(".lang-switcher").removeClass("active");
            $(".modal").removeClass("active");
            $(".popover-container").removeClass("active");
            $(".toggler_global").removeClass("active");

            scrollNone();
        }

        if ($(e.target).closest(".toast-close").length) {
            removeToast($(e.target));
        }

        e.stopPropagation();
    });
});

// Scroll
$(window).scroll(function () {
    headerFixed();
});
