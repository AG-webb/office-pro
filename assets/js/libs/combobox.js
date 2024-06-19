function initComboBox() {
	// constants
	const selectbox = ".combo-box";
	const selectboxSelected = ".combo-box-selected";
	const selectboxSelectedWrap = ".combo-box-selected-wrap";
	const selectboxPlaceholder = ".combo-box-placeholder";
	const selectboxDropdown = ".combo-box-dropdown";
	const selectboxOptions = ".combo-box-options";
	const selectboxOption = ".combo-option";
	const selectboxOptionHidden = "combo-option_hidden";
	const selectboxOptionFocused = ".combo-option_focused";
	const selectboxSearch = ".combo-box-search";
	const tagModeClass = "tag-mode";
	const tagWrapperClass = "combo-box-tags";
	const tagElementClass = "combo-box-tag";
	const userAddedOptionClass = "user-added-option";
	const attrName = "data-combo-name";
	const attrValue = "data-combo-value";
	const optionAttrValue = "data-option-value";
	const tagAttrValue = "data-tag-value";
	const maxItemsShow = 3;
	const maxOptionsShow = 5;

	$('html').on("click", function (e) {
		closeDropdown();
	});

	$(selectboxDropdown).on("click", function (e) {
		e.stopPropagation();
	});

	$(selectbox).each(function () {
		const selectDiv = $(this);
		const selectDivSelected = selectDiv.children(selectboxSelected);
		const selectboxName = $(this).attr(attrName);
		const selectOption = $(this).find(selectboxOption);
		const placeholderElement = $(this).find(selectboxPlaceholder);
		let currentTabIndex = -1;
		let multiData = [];

		createSelectElement($(this), selectboxName, selectOption);

		// Keyboard Control
		$(selectDiv).on('keydown', function (e) {
			let keyCode = e.keyCode || e.which;
			const arrow = { tab: 9, enter: 13, up: 38, down: 40, esc: 27, backspace: 8 };

			if (keyCode === arrow.up && selectDiv.children(selectboxSelected).hasClass("active")) {
				// Arrow Up
				decreaseTabIndex();
			} else if (keyCode === arrow.down && selectDiv.children(selectboxSelected).hasClass("active")) {
				// Arrow Down
				increaseTabIndex();
			} else if (keyCode === arrow.enter && selectDiv.children(selectboxSelected).hasClass("active")) {
				// Enter
				if ($(selectboxOptionFocused).length) {
					$(selectboxOptionFocused).click();
				} else {
					if($(this).hasClass("allow-custom-options")) {
						addUserOption();
					}
				}

				resetSearchInput();
			} else if (keyCode === arrow.esc && selectDiv.children(selectboxSelected).hasClass("active")) {
				// Escape
				closeDropdown();
			} else if (keyCode === arrow.backspace && selectDiv.children(selectboxSelected).hasClass("active") && selectDiv.hasClass("multiple")) {
				// Backspace
				if (selectDiv.find(selectboxSearch).val() === "" && selectDiv.attr(attrValue)) {
					let lastSelectedValue = getLastSelectedValue(selectDiv.attr(attrValue));

					removeMultiOption($(this), lastSelectedValue);
				}
			}

			moveFocus();
		});
		
		// Dropdown function
		selectDivSelected.on("click", function (e) {
			e.stopPropagation();
			currentTabIndex = -1;

			if (!e.target.closest("." + tagElementClass) && !e.target.closest(selectboxSearch)) {
				toggleDropdown($(this));
			}

			// Remove tag
			if (e.target.closest("." + tagElementClass + "__remove")) {
				let value = $(e.target).closest("." + tagElementClass).attr(tagAttrValue);

				removeMultiOption($(this), value);
			}
		});

		// Single
		if (!selectDiv.hasClass("multiple")) {
			selectDiv.find(selectboxOption).on("click", function () {
				if ($(this).siblings(selectboxOption).hasClass("selected")) {
					$(this).siblings(selectboxOption).removeClass("selected");
					$(this).addClass("selected");
				} else {
					$(this).addClass("selected");
				}

				closeDropdown();
				$(this).closest(selectbox).attr(attrValue, $(this).attr(optionAttrValue));
				$(this).closest(selectbox).find("select").val($(this).attr(optionAttrValue)).change();
				$(this).closest(selectbox).find(selectboxSelectedWrap).html($(this).html());
			});
		}

		// Multiple
		if (selectDiv.hasClass("multiple")) {
			// Sync multiData array with default selected options
			if(selectDiv.attr(attrValue)) {
				selectDiv.find(selectboxOption + ".selected").each(function() {
					let text = $(this).text();
					let value = $(this).attr(optionAttrValue);
					
					multiData = [...multiData, {value, text}];
				});
			}

			selectDiv.find(selectOption).on("click", function (event) {
				// VALUE UNSELECTING
				if ($(this).hasClass('selected')) {
					$(this).removeClass('selected');
					let value = $(this).attr(optionAttrValue);

					removeMultiOption($(this), value);
				}
				// VALUE SELECTING
				else {
					$(this).addClass('selected');
					let value = $(this).attr(optionAttrValue);
					let text = $(this).text();

					addMultiOption($(this), { value, text });
				}
			});
		}

		// Search Functionality
		if (selectDiv.hasClass("searchable")) {
			selectDiv.on("input", selectboxSearch, function (e) {
				let val = $(this).val();

				if (val.trim().length) {
					val = val.toUpperCase();

					selectDiv.find(selectOption).each(function () {
						let optionVal = $(this).text();

						if (optionVal.toUpperCase().indexOf(val) > -1) {
							$(this).removeClass(selectboxOptionHidden);
						} else {
							$(this).addClass(selectboxOptionHidden);
						}
					});
				} else {
					selectDiv.find(selectOption).removeClass(selectboxOptionHidden);
				}
			});
		}

		const addMultiOption = (target, newOption) => {
			multiData = [...multiData, newOption];
			let [multiValues, multiValuesArray, multiTexts] = getMultiVars(multiData);
			
			target.closest(selectbox).find("select").val(multiValuesArray).change();
			target.closest(selectbox).attr(attrValue, multiValues);
			
			if (target.closest(selectbox).hasClass(tagModeClass)) {
				let tagsTemplate = getTagsTemplate(multiData, tagElementClass);
				target.closest(selectbox).find(selectboxSelectedWrap).html(tagsTemplate);
			} else {
				target.closest(selectbox).find(selectboxSelectedWrap).text(multiTexts);
				
				if (multiData.length > maxItemsShow) {
					const maxItemsShowText = getMaxItemsShowText(multiTexts);
					const restOptionsCount = multiData.length - maxItemsShow;
					target.closest(selectbox).find(selectboxSelectedWrap).text(maxItemsShowText + ` +${restOptionsCount}`);
				}
			}
	
			// if(multiData.length == selectDiv.find(selectOption).length){
			// 	$(this).closest(selectbox).find(selectboxSelectedWrap).text("All selected!");
			// }
		}
	
		const removeMultiOption = (target, value) => {
			multiData = [...multiData.filter(data => data.value !== value)];
			let [multiValues, multiValuesArray, multiTexts] = getMultiVars(multiData);
	
			target.closest(selectbox).find("select").val(multiValuesArray).change();
			target.closest(selectbox).attr(attrValue, multiValues);
			target.closest(selectbox).find(selectboxOption + `[${optionAttrValue}="${value}"]`).removeClass('selected');
	
			if (multiData.length) {
				if (multiData.length > maxItemsShow && !target.closest(selectbox).hasClass(tagModeClass)) {
					const maxItemsShowText = getMaxItemsShowText(multiTexts);
					const restOptionsCount = multiData.length - maxItemsShow;
					target.closest(selectbox).find(selectboxSelectedWrap).text(maxItemsShowText + ` +${restOptionsCount}`);
				} else {
					if (target.closest(selectbox).hasClass(tagModeClass)) {
						let tagsTemplate = getTagsTemplate(multiData, tagElementClass);
						target.closest(selectbox).find(selectboxSelectedWrap).html(tagsTemplate);
						target.closest(selectbox).find(selectboxOption + `[${optionAttrValue}="${value}"]`).removeClass('selected');
					} else {
						target.closest(selectbox).find(selectboxSelectedWrap).text(multiTexts);
					}
				}
			} else {
				target.closest(selectbox).find(selectboxSelectedWrap).html(placeholderElement);
				target.closest(selectbox).removeAttr(attrValue);
				target.closest(selectbox).find(selectboxSearch).focus();
			}
	
			let selectOption = target.closest(selectbox).find(`option[value="${value}"]`);
			if (selectOption.hasClass(userAddedOptionClass)) {
				selectOption.remove();
			}
		}

		const addUserOption = () => {
			let value = $(selectboxSearch).val();
			let containsValue = false;
			multiData.map(data => data.text === value ? containsValue = true : null);

			if (!containsValue) {
				selectDiv.find("select").append(`<option class="${userAddedOptionClass}" value="${value}">${value}</option>`);
				addMultiOption(selectDiv, { value, text: value });
			}
		}

		const decreaseTabIndex = () => {
			if (currentTabIndex > 0) {
				currentTabIndex--;
			}

			let optionTop = selectOption.not('.hide').eq(currentTabIndex).position().top;
			let optionsPaddingTop = parseInt($(selectboxOptions).css('padding-top'));

			if (optionTop < optionsPaddingTop) {
				scrollToFocusedOption(selectDiv, "up");
			}
		}

		const increaseTabIndex = () => {
			if (currentTabIndex < selectOption.not('.hide').length - 1) {
				currentTabIndex++;
			}

			if (currentTabIndex >= maxOptionsShow) {
				scrollToFocusedOption(selectDiv, "down");
			}
		}

		const resetSearchInput = () => {
			$(selectboxSearch).val("");
			$(selectOption).removeClass(selectboxOptionHidden);
		}

		const moveFocus = () => {
			selectOption.removeClass(selectboxOptionFocused.replace(".", ""));
			if (currentTabIndex !== -1 || selectOption.not('.' + selectboxOptionHidden).length === 1) {
				selectOption.not('.' + selectboxOptionHidden).eq(currentTabIndex).addClass(selectboxOptionFocused.replace(".", ""));
			}
		}
	});

	function scrollToFocusedOption(target, position) {
		let thisOptionsWrapper = target.closest(selectbox).find(selectboxOptions);

		if (position === "down") {
			thisOptionsWrapper.scrollTop(thisOptionsWrapper.scrollTop() + target.find(selectboxOption).eq(0).innerHeight());
		} else {
			thisOptionsWrapper.scrollTop(thisOptionsWrapper.scrollTop() - target.find(selectboxOption).eq(0).innerHeight());
		}
	}

	function closeDropdown() {
		$(selectboxSelected).removeClass("active");
		$(selectboxDropdown).removeClass('opened');
		$(selectboxOption).removeClass(selectboxOptionFocused.replace(".", ""));
		if ($(selectbox).hasClass("searchable")) {
			$(selectbox).find(selectboxSearch).remove();
		}
	}

	function toggleDropdown(target) {
		$(selectboxDropdown).removeClass('opened');
		$(selectbox).find(selectboxSearch).remove();

		if (target.hasClass("active")) {
			$(selectboxSelected).removeClass("active");
			target.closest(selectbox).find(selectboxDropdown).removeClass('opened');
		} else {
			$(selectboxSelected).removeClass("active");
			target.addClass("active");
			target.closest(selectbox).find(selectboxDropdown).addClass('opened');

			if (target.closest(selectbox).hasClass("searchable")) {
				target.append(`<input type="text" class="${selectboxSearch.replace(".", "")}" />`).find(selectboxSearch).focus();
			}
		}
	}

	function createSelectElement(target, name, options) {
		let multiple = false;
		let multiData = [];
		if(target.hasClass("multiple")) {
			multiple = true;
		}

		target.append(`<select name="${name}" style='display:none' ${multiple ? "multiple='multiple'" : ''}></select>`);

		options.each(function () {
			let selectCurrent = $(this),
				text = $(this).text(),
				value = $(this).attr(optionAttrValue);
				let dataAttrs = '';
				
				$.each($(this).get(0).attributes, (index, attr) => {
					if(attr.name.startsWith("data") && attr.name !== optionAttrValue) {
						dataAttrs += `${attr.name}='${attr.value}' `;
					}
				});

			$(this).closest(selectbox).children('select').append(`<option value="${value}" ${dataAttrs}>${text}</option>`);

			// Disabled,selected options
			$(this).closest(selectbox).find("option").each(function () {
				let optionCurrent = $(this);

				if (selectCurrent.hasClass("disabled") && optionCurrent.attr("value") === selectCurrent.attr(optionAttrValue)) {
					optionCurrent.attr("disabled", true);
				}

				if (selectCurrent.hasClass("selected") && optionCurrent.attr("value") === selectCurrent.attr(optionAttrValue)) {
					optionCurrent.attr("selected", true);
					
					if(target.hasClass("multiple")) {
						// DUPLICATED CODE NEED TO REFACTOR THIS!!!!!!!!!! ***************************************
						multiData = [...multiData, {value, text}];
						let [multiValues, multiValuesArray, multiTexts] = getMultiVars(multiData);
				
						target.closest(selectbox).attr(attrValue, multiValues);
				
						if (target.closest(selectbox).hasClass(tagModeClass)) {
							let tagsTemplate = getTagsTemplate(multiData, tagElementClass);
							target.closest(selectbox).find(selectboxSelectedWrap).html(tagsTemplate);
						} else {
							target.closest(selectbox).find(selectboxSelectedWrap).text(multiTexts);
				
							if (multiData.length > maxItemsShow) {
								const maxItemsShowText = getMaxItemsShowText(multiTexts);
								const restOptionsCount = multiData.length - maxItemsShow;
								target.closest(selectbox).find(selectboxSelectedWrap).text(maxItemsShowText + ` +${restOptionsCount}`);
							}
						}
						// **************************************************************************************************
					} else {
						$(this).closest(selectbox).find('select').val(optionCurrent.val()).change();
						$(this).closest(selectbox).find(selectboxSelectedWrap).html(selectCurrent.html());
					}
				}
			});
		});
	}

	function getLastSelectedValue(values) {
		let selectedValues = values.split(", ");
		let lastSelectedValue = selectedValues[selectedValues.length - 1];
		return lastSelectedValue;
	}

	function getMultiVars(array) {
		let multiValues = "";
		let multiValuesArray = [];
		let multiTexts = "";

		array.map((data, index) => {
			if (index === array.length - 1) {
				multiValues += data.value;
				multiTexts += data.text;
			} else {
				multiValues += data.value + ", ";
				multiTexts += data.text + ", ";
			}
			multiValuesArray = [...multiValuesArray, data.value];
		});

		return [multiValues, multiValuesArray, multiTexts];
	}

	function getTagsTemplate(array, elementClass = tagElementClass) {
		let selectedTags = `<div class="${tagWrapperClass}">`;

		array.map(({ value, text }) => {
			selectedTags = selectedTags +
				`<div class="${elementClass}" ${tagAttrValue}="${value}">
					<div class="${elementClass}__value">
						${text}
					</div>
					<div class="${elementClass}__remove">
						<img src="assets/img/icons/close-white.svg" alt="close">
					</div>
				</div>`
		});
		selectedTags += "</div>";

		return selectedTags;
	}

	function getMaxItemsShowText(text) {
		return text.split(", ").slice(0, maxItemsShow).join(", ");
	}
}

document.addEventListener("DOMContentLoaded", function () {
	initComboBox();
});