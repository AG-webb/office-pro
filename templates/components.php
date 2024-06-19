<!-- Page Css -->
<link rel="stylesheet" href="assets/css/pages/components.css">
<!-- ========================== -->


<div class="row">
    <div class="column sm-12">
        <div class="components">

            <!-- Switcher -->
            <div class="component">
                <h1 class="h1-font">"Active" Class Toggle Component</h1>
                <div class="component__wrap">
                    <h2 class="h2-font">Default</h2>
                    <div class="switcher">
                        <button class="btn btn_lg btn_test switcher__item active">
                            <span>Switcher 1</span>
                        </button>
                        <button class="btn btn_lg btn_test switcher__item">
                            <span>Switcher 2</span>
                        </button>
                        <button class="btn btn_lg btn_test switcher__item">
                            <span>Switcher 3</span>
                        </button>
                        <button class="btn btn_lg btn_test switcher__item">
                            <span>Switcher 4</span>
                        </button>
                    </div>
                </div>
                <div class="component__wrap">
                    <h2 class="h2-font">Multiple</h2>
                    <div class="switcher switcher_multiple">
                        <button class="btn btn_lg btn_test switcher__item">
                            <span>Switcher 1</span>
                        </button>
                        <button class="btn btn_lg btn_test switcher__item">
                            <span>Switcher 2</span>
                        </button>
                        <button class="btn btn_lg btn_test switcher__item">
                            <span>Switcher 3</span>
                        </button>
                        <button class="btn btn_lg btn_test switcher__item">
                            <span>Switcher 4</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Buttons -->
            <div class="component">
                <h1 class="h1-font">Button Sizes</h1>
                <div class="btns">
                    <button class="btn btn_test btn_sm">
                        <span>Button Sm</span>
                    </button>
                    <button class="btn btn_test btn_md">
                        <span>Button Md</span>
                    </button>
                    <button class="btn btn_test btn_lg">
                        <span>Button Lg</span>
                    </button>
                    <button class="btn btn_test btn_xl">
                        <span>Button Xl</span>
                    </button>
                </div>
            </div>

            <!-- Form Items -->
            <div class="component">
                <h1 class="h1-font">Form Items</h1>
                <form action="#" class="with-validation">
                    <div class="form-fields">
                        <div class="form-fields__item">
                            <div class="form-field form-field_sm">
                                <div class="form-field__label">Field Sm</div>
                                <div class="form-field__target form-field__target_prefix">
                                    <div class="form-field__icon">
                                        <i class="icon icon-arrow-left"></i>
                                    </div>
                                    <input type="text" name="firstName" class="form-field__input">
                                </div>
                            </div>
                        </div>
                        <div class="form-fields__item">
                            <div class="form-field form-field_md form-field_underline">
                                <div class="form-field__label">Field Md</div>
                                <div class="form-field__target">
                                    <input type="text" name="lastName" class="form-field__input">
                                </div>
                            </div>
                        </div>
                        <div class="form-fields__item">
                            <div class="form-field form-field_md form-field_legend">
                                <div class="form-field__label">Field Md Phone</div>
                                <div class="form-field__target form-field__target_prefix">
                                    <div class="form-field__icon">
                                        <i class="icon icon-arrow-left"></i>
                                    </div>
                                    <input type="text" name="phone" class="input-number formatted-phone form-field__input">
                                </div>
                            </div>
                        </div>
                        <div class="form-fields__item">
                            <div class="form-field form-field_md form-field_legend">
                                <div class="form-field__label">Field Md number with Comma</div>
                                <div class="form-field__target form-field__target_prefix">
                                    <div class="form-field__icon">
                                        <i class="icon icon-arrow-left"></i>
                                    </div>
                                    <input type="text" name="number_with_comma" class="input-number form-field__input" data-input-separator=",">
                                </div>
                            </div>
                        </div>
                        <div class="form-fields__item">
                            <div class="form-field form-field_round form-field_lg">
                                <div class="form-field__label">Field Lg Email*</div>
                                <div class="form-field__target form-field__target_suffix">
                                    <div class="form-field__icon">
                                        <i class="icon icon-arrow-right"></i>
                                    </div>
                                    <input type="text" name="email" class="email-validation form-field__input">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-fields__item">
                        <div class="form-field form-field_textarea">
                            <div class="form-field__label">Textarea</div>
                            <div class="form-field__target">
                                <textarea name="message" class="form-field__input"></textarea>
                            </div>
                        </div>
                    </div>

                    <button type="submit" class="btn btn_md btn_test">
                        <span>submit</span>
                    </button>
                </form>
            </div>

            <!-- Shadows -->
            <div class="component">
                <h1 class="h1-font">Shadows List</h1>

                <div class="shadow-item shadow-xs h2-font">
                    Shadow Xs
                </div>
                <div class="shadow-item shadow-sm h2-font">
                    Shadow Sm
                </div>
                <div class="shadow-item shadow-md h2-font">
                    Shadow Md
                </div>
            </div>

            <!-- CSS only carousel -->
            <div class="component">
                <h1 class="h1-font">Css Only Carousel</h1>

                <div class="carousel">
                    <div class="carousel__slide">
                        <a href="#">
                            <figure>
                                <img src="assets/img/logo-1.svg" alt="logo">
                                <figcaption>
                                    Image Caption
                                </figcaption>
                            </figure>
                        </a>
                    </div>
                    <div class="carousel__slide">
                        <a href="#">
                            <figure>
                                <img src="assets/img/logo-2.svg" alt="logo">
                                <figcaption>
                                    Image Caption
                                </figcaption>
                            </figure>
                        </a>
                    </div>
                    <div class="carousel__slide">
                        <a href="#">
                            <figure>
                                <img src="assets/img/logo-3.svg" alt="logo">
                                <figcaption>
                                    Image Caption
                                </figcaption>
                            </figure>
                        </a>
                    </div>
                    <div class="carousel__slide">
                        <a href="#">
                            <figure>
                                <img src="assets/img/logo-3.svg" alt="logo">
                                <figcaption>
                                    Image Caption
                                </figcaption>
                            </figure>
                        </a>
                    </div>
                    <div class="carousel__slide">
                        <a href="#">
                            <figure>
                                <img src="assets/img/logo-3.svg" alt="logo">
                                <figcaption>
                                    Image Caption
                                </figcaption>
                            </figure>
                        </a>
                    </div>
                    <div class="carousel__slide">
                        <a href="#">
                            <figure>
                                <img src="assets/img/logo-3.svg" alt="logo">
                                <figcaption>
                                    Image Caption
                                </figcaption>
                            </figure>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Toast -->
            <div class="component">
                <h1 class="h1-font">Display Toast Messages</h1>
                <button class="btn btn_lg btn_test toast-trigger">
                    <span>Display Toast</span>
                </button>
            </div>

            <!-- Select -->
            <form action="#" method="post" class="component custom-selects-form">
                <h1 class="h1-font">Custom Select</h1>
                <h2 class="h2-font">
                    Classnames for custom select config
                </h2>
                <ul>
                    <li><strong>"multiple"</strong> - to be able to select more that 1 option</li>
                    <li><strong>"searchable"</strong> - for search functionality</li>
                    <li><strong>"allow-custom-options"</strong> - for user created options(<strong>"searchable"</strong> class is required)</li>
                    <li><strong>"tag-mode"</strong> - for tags template</li>
                </ul>
                <!-- Single -->
                <div class="component__wrap">
                    <h2 class="h2-font">Single</h2>
                    <div class="custom-select">
                        <div class="combo-box" data-combo-name="single" data-combo-value="all">
                            <div class="combo-box-selected">
                                <div class="combo-box-selected-wrap">
                                    <span class="combo-box-placeholder">Select Placeholder</span>
                                </div>
                            </div>
                            <div class="combo-box-dropdown">
                                <div class="combo-box-options">
                                    <div class="combo-option selected" data-option-value="all" data-test="Data 1">
                                        <span>all</span>
                                    </div>
                                    <div class="combo-option" data-option-value="1" data-test="Data 2">
                                        <span>Paris</span>
                                    </div>
                                    <div class="combo-option" data-option-value="2" data-test="Data 3">
                                        <span>Rome</span>
                                    </div>
                                    <div class="combo-option" data-option-value="3" data-test="Data 4">
                                        <span>Moscow</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Multiple -->
                <div class="component__wrap">
                    <h2 class="h2-font">Multiple</h2>
                    <div class="custom-select">
                        <div class="combo-box multiple" data-combo-name="multiselect[]">
                            <div class="combo-box-selected">
                                <div class="combo-box-selected-wrap">
                                    <span class="combo-box-placeholder">Multiple Select Placeholder</span>
                                </div>
                            </div>
                            <div class="combo-box-dropdown">
                                <div class="combo-box-options">
                                    <div class="combo-option selected" data-option-value="1">Item 1</div>
                                    <div class="combo-option selected" data-option-value="2">Item 2</div>
                                    <div class="combo-option" data-option-value="3">Item 3</div>
                                    <div class="combo-option" data-option-value="4">Item 4</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Multiple With Search -->
                <div class="component__wrap">
                    <h2 class="h2-font">Multiple With Search</h2>
                    <div class="custom-select">
                        <div class="combo-box multiple searchable allow-custom-options" data-combo-name="multiselectSearch[]">
                            <div class="combo-box-selected">
                                <div class="combo-box-selected-wrap">
                                    <span class="combo-box-placeholder">Multiple Select Placeholder</span>
                                </div>
                            </div>
                            <div class="combo-box-dropdown">
                                <div class="combo-box-options">
                                    <div class="combo-option selected" data-option-value="1">Bmw</div>
                                    <div class="combo-option selected" data-option-value="2">Mercedes</div>
                                    <div class="combo-option" data-option-value="3">Volvo</div>
                                    <div class="combo-option" data-option-value="4">Volkswagen</div>
                                    <div class="combo-option" data-option-value="5">Opel</div>
                                    <div class="combo-option" data-option-value="6">Nissan</div>
                                    <div class="combo-option" data-option-value="7">Toyota</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Tags -->
                <div class="component__wrap">
                    <h2 class="h2-font">Tags</h2>
                    <div class="custom-select">
                        <div class="combo-box searchable multiple tag-mode" data-combo-name="tagsSelect[]">
                            <div class="combo-box-selected">
                                <div class="combo-box-selected-wrap">
                                    <span class="combo-box-placeholder">Tags Select Placeholder</span>
                                </div>
                            </div>
                            <div class="combo-box-dropdown">
                                <div class="combo-box-options">
                                    <div class="combo-option selected" data-option-value="1">Tag 1</div>
                                    <div class="combo-option selected" data-option-value="2">Tag 2</div>
                                    <div class="combo-option" data-option-value="3">Tag 3</div>
                                    <div class="combo-option" data-option-value="4">Tag 4</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Dynamic append select -->
                <div class="component__wrap">
                    <h2 class="h2-font">Dynamic appended select</h2>
                    <div class="btn btn_test btn_lg append-select">
                        <span>Append Select</span>
                    </div>
                    <br /><br />
                </div>
                <!-- Dynamic appended options -->
                <div class="component__wrap">
                    <h2 class="h2-font">Dynamic appended options</h2>
                    <div class="btn btn_test btn_lg append-options">
                        <span>Append Options 5 & 6</span>
                    </div>
                    <br /><br />
                    <div class="custom-select ajax-select">
                        <div class="combo-box multiple" data-combo-name="dynamicOptions[]">
                            <div class="combo-box-selected">
                                <div class="combo-box-selected-wrap">
                                    <span class="combo-box-placeholder">Dynamic options Placeholder</span>
                                </div>
                            </div>
                            <div class="combo-box-dropdown">
                                <div class="combo-box-options">
                                    <div class="combo-option selected" data-option-value="1">option 1</div>
                                    <div class="combo-option selected" data-option-value="2">option 2</div>
                                    <div class="combo-option" data-option-value="3">option 3</div>
                                    <div class="combo-option" data-option-value="4">option 4</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="component__wrap">
                    <button type="submit" class="btn btn_test btn_lg">
                        <span>Submit</span>
                    </button>
                </div>
            </form>

            <!-- Accordion -->
            <div class="component">
                <h1 class="h1-font">Accordion</h1>
                <div class="accordion">
                    <div class="accordion__item">
                        <div class="accordion__header">
                            <div class="accordion__title">
                                Accordion Item 1
                            </div>
                            <div class="accordion__arrow">
                                <i class="icon icon-chevron-down"></i>
                            </div>
                        </div>
                        <div class="accordion__body" style="display: none;">
                            <div>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
                                quidem quos culpa nulla consequatur doloremque! Animi labore ullam
                                sequi ipsam error, soluta nam unde voluptate ex, vero architecto ipsa quisquam.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
                                quidem quos culpa nulla consequatur doloremque! Animi labore ullam
                                sequi ipsam error, soluta nam unde voluptate ex, vero architecto ipsa quisquam.
                            </div>
                        </div>
                    </div>
                    <div class="accordion__item">
                        <div class="accordion__header">
                            <div class="accordion__title">
                                Accordion Item 2
                            </div>
                            <div class="accordion__arrow">
                                <i class="icon icon-chevron-down"></i>
                            </div>
                        </div>
                        <div class="accordion__body" style="display: none;">
                            <div>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
                                quidem quos culpa nulla consequatur doloremque! Animi labore ullam
                                sequi ipsam error, soluta nam unde voluptate ex, vero architecto ipsa quisquam.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
                                quidem quos culpa nulla consequatur doloremque! Animi labore ullam
                                sequi ipsam error, soluta nam unde voluptate ex, vero architecto ipsa quisquam.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal -->
            <div class="component">
                <h1 class="h1-font">Modal. Possible classes - "from-left", "from-right", "center-modal", "error", "success"</h1>
                <button class="btn btn_lg btn_test modal-trigger" data-modal="main-modal">
                    <span>Open Modal</span>
                </button>
            </div>

            <!-- Tabs -->
            <div class="component">
                <h1 class="h1-font">Tabs</h1>
                <div class="tabs">
                    <div class="tabs__control">
                        <button class="tab btn btn_sm btn_test active" data-tab="tab-1">
                            <span>Tab 1</span>
                        </button>
                        <button class="tab btn btn_sm btn_test" data-tab="tab-2">
                            <span>Tab 2</span>
                        </button>
                        <button class="tab btn btn_sm btn_test" data-tab="tab-3">
                            <span>Tab 3</span>
                        </button>
                    </div>
                    <div class="tabs__content">
                        <div id="tab-1" class="tab-content active">
                            1. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi laboriosam perferendis minima? Nihil optio tenetur quidem quibusdam amet est corporis, voluptatum saepe laudantium harum, explicabo in sit quam delectus placeat?
                        </div>
                        <div id="tab-2" class="tab-content">
                            2. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi laboriosam perferendis minima? Nihil optio tenetur quidem quibusdam amet est corporis, voluptatum saepe laudantium harum, explicabo in sit quam delectus placeat?
                        </div>
                        <div id="tab-3" class="tab-content">
                            3. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi laboriosam perferendis minima? Nihil optio tenetur quidem quibusdam amet est corporis, voluptatum saepe laudantium harum, explicabo in sit quam delectus placeat?
                        </div>
                    </div>
                </div>
            </div>

            <!-- Dinamic Append -->
            <div class="component">
                <h1 class="h1-font">Dinamic Append (resize window less than 1280px and reload page for result)</h1>
                <div class="desktop-append-container">
                    <span>When window width >= 1280px</span>
                    <button class="append-button btn btn_sm btn_test" data-append="1280, .tablet-append-container">
                        <span>Append Element</span>
                    </button>
                </div>
                <div class="tablet-append-container">
                    <span>When window width < 1280px</span>
                </div>
            </div>

            <!-- Skeleton -->
            <div class="component">
                <h1 class="h1-font">Skeleton</h1>
                <div class="skeleton">
                    <div class="skeleton__element skeleton__element_image"></div>
                    <div class="skeleton__element skeleton__element_avatar"></div>
                    <div class="skeleton__element skeleton__element_title"></div>
                    <div class="skeleton__element skeleton__element_text"></div>
                    <div class="skeleton__element skeleton__element_text"></div>
                    <div class="skeleton__element skeleton__element_text"></div>
                    <div class="skeleton__element skeleton__element_text"></div>
                </div>
            </div>

            <!-- File Upload -->
            <div class="component">
                <h1 class="h1-font">File Upload</h1>
                <div class="component__wrap">
                    <h2 class="h2-font">Single Upload Avatar</h2>
                    <div class="file-upload avatar-upload">
                        <div class="file-upload__wrap">
                            <div class="avatar-upload__body">
                                <div class="avatar-upload__content">upload</div>
                            </div>
                            <input type="file" class="file-upload-input">
                        </div>
                    </div>
                </div>
                <div class="component__wrap">
                    <h2 class="h2-font">Multiple Upload Document</h2>
                    <div class="file-upload doc-upload">
                        <div class="file-upload__wrap">
                            <div class="doc-upload__body">
                                <div class="doc-upload__btn btn btn_lg btn_test">
                                    <span>upload Document(s)</span>
                                </div>
                            </div>
                            <input type="file" class="file-upload-input" multiple="multiple">
                        </div>
                        <div class="file-upload-preview doc-upload__preview"></div>
                    </div>
                </div>
            </div>

            <!-- Checkbox and radio -->
            <div class="component">
                <h1 class="h1-font">Custom Checkbox and radio button</h1>
                <div class="component__wrap">
                    <h2 class="h2-font">Checkbox</h2>
                    <label class="custom-check custom-check_checkbox">
                        <input type="checkbox" value="1" name="checkbox">
                        <span class="custom-check__checkmark"></span>
                        <span class="payment-info__label">Check 1</span>
                    </label>
                    <label class="custom-check custom-check_checkbox">
                        <input type="checkbox" value="2" name="checkbox">
                        <span class="custom-check__checkmark"></span>
                        <span class="payment-info__label">Check 2</span>
                    </label>
                </div>
                <div class="component__wrap">
                    <h2 class="h2-font">Radio</h2>
                    <label class="custom-check custom-check_radio" for="radio_button_1">
                        <input type="radio" name="radio_button" id="radio_button_1" value="1">
                        <span class="custom-check__checkmark"></span>
                        <div class="custom-check__label">Radio 1</div>
                    </label>
                    <label class="custom-check custom-check_radio" for="radio_button_2">
                        <input type="radio" name="radio_button" id="radio_button_2" value="2">
                        <span class="custom-check__checkmark"></span>
                        <div class="custom-check__label">Radio 2</div>
                    </label>
                </div>
            </div>

            <!-- Jquery Datepicker -->
            <div class="component">
                <h1 class="h1-font">Custom Datepicker</h1>
                <div class="component__wrap">
                    <h2 class="h2-font">Single</h2>
                    <div class="single-datepicker custom-datepicker">
                        <div class="form-field form-field_md">
                            <div class="form-field__target">
                                <input type="text" name="lastName" class="form-field__input" placeholder="Choose date" autocomplete="off">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="component__wrap">
                    <h2 class="h2-font">Range picker</h2>
                    <div class="range-datepicker custom-datepicker">
                        <div class="form-field form-field_md">
                            <div class="form-field__target">
                                <input type="text" name="lastName" class="form-field__input" placeholder="Choose date" autocomplete="off">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Popover Component -->
            <div class="component">
                <h1 class="h1-font">Popover Component</h1>
                <div class="component__wrap">
                    <div class="lang-switcher popover-container">
                        <div class="lang-switcher__current popover-trigger">
                            <span>En</span>
                            <i class="icon icon-chevron-down"></i>
                        </div>
                        <div class="lang-switcher__dropdown popover-wrap">
                            <div class="lang-switcher__dropdown-body popover">
                                <div class="lang-switcher__dropdown-items">
                                    <div class="lang-switcher__item active"><a href="#">En</a></div>
                                    <div class="lang-switcher__item"><a href="#">Ru</a></div>
                                    <div class="lang-switcher__item"><a href="#">Am</a></div>
                                    <div class="lang-switcher__item"><a href="#">Fr</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Image Aspect Ratio -->
            <div class="component">
                <h1 class="h1-font">Image Aspect Ratio</h1>
                <div class="component__wrap">
                    <div class="aspect-ratio flex align-between">
                        <img src="assets/img/logo-1.svg" alt="logo">
                        <img src="assets/img/logo-2.svg" alt="logo">
                        <img src="assets/img/logo-3.svg" alt="logo">
                        <img src="assets/img/logo-4.png" alt="logo">
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>


<!-- Modal -->
<div class="modal main-modal modal_md from-left">
    <div class="modal__wrapper">
        <div class="modal__body">
            <div class="modal__close modal-close">
                <img src="assets/img/icons/close.svg" alt="close">
            </div>
            <!-- Content -->
            <div class="modal__content">
                <div class="row expanded">
                    <div class="column sm-12">
                        <div class="modal__title h1-font">Modal test</div>
                        <span>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                            At voluptates ut enim est ipsum eum iure fugiat nostrum quo
                            eveniet itaque tenetur cum, hic atque consectetur? Officia
                            ipsa doloribus dolor?
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                            At voluptates ut enim est ipsum eum iure fugiat nostrum quo
                            eveniet itaque tenetur cum, hic atque consectetur? Officia
                            ipsa doloribus dolor?
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                            At voluptates ut enim est ipsum eum iure fugiat nostrum quo
                            eveniet itaque tenetur cum, hic atque consectetur? Officia
                            ipsa doloribus dolor?
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                            At voluptates ut enim est ipsum eum iure fugiat nostrum quo
                            eveniet itaque tenetur cum, hic atque consectetur? Officia
                            ipsa doloribus dolor?
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                            At voluptates ut enim est ipsum eum iure fugiat nostrum quo
                            eveniet itaque tenetur cum, hic atque consectetur? Officia
                            ipsa doloribus dolor?
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                            At voluptates ut enim est ipsum eum iure fugiat nostrum quo
                            eveniet itaque tenetur cum, hic atque consectetur? Officia
                            ipsa doloribus dolor?
                        </span>
                    </div>
                </div>
            </div>

            <!-- Success Message -->
            <div class="modal__success success-message">
                <div class="row expanded">
                    <div class="column sm-12">
                        Success Message
                    </div>
                </div>
            </div>
            <!-- Error Message -->
            <div class="modal__error error-message">
                <div class="row expanded">
                    <div class="column sm-12">
                        Error Message
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>