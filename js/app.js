function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('_webp');
	} else {
		document.querySelector('body').classList.add('_no-webp');
	}
});
let popup_link = document.querySelectorAll('._popup-link');
let popups = document.querySelectorAll('.popup');
for (let index = 0; index < popup_link.length; index++) {
	const el = popup_link[index];
	el.addEventListener('mousedown', function (e) {
		if (unlock) {
			let item = el.getAttribute('href').replace('#', '');
			let video = el.getAttribute('data-video');
			popup_open(item, video);
		}
		e.preventDefault();
	})
}
for (let index = 0; index < popups.length; index++) {
	const popup = popups[index];
	popup.addEventListener("click", function (e) {
		if (!e.target.closest('.popup__content')) {
			popup_close(e.target.closest('.popup'));
		}
	});
}
function popup_open(item, video = '') {
	let activePopup = document.querySelectorAll('.popup._active');
	if (activePopup.length > 0) {
		popup_close('', false);
	}
	let curent_popup = document.querySelector('.popup_' + item);
	if (curent_popup && unlock) {
		if (video != '' && video != null) {
			let popup_video = document.querySelector('.popup_video');
			popup_video.querySelector('.popup__video').innerHTML = '<iframe src="https://www.youtube.com/embed/' + video + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
		}
		if (!document.querySelector('.menu__body._active')) {
			body_lock_add(500);
		}
		curent_popup.classList.add('_active');
		history.pushState('', '', '#' + item);
	}
}
function popup_close(item, bodyUnlock = true) {
	if (unlock) {
		if (!item) {
			for (let index = 0; index < popups.length; index++) {
				const popup = popups[index];
				let video = popup.querySelector('.popup__video');
				if (video) {
					video.innerHTML = '';
				}
				popup.classList.remove('_active');
			}
		} else {
			let video = item.querySelector('.popup__video');
			if (video) {
				video.innerHTML = '';
			}
			item.classList.remove('_active');
		}
		if (!document.querySelector('.menu__body._active') && bodyUnlock) {
			body_lock_remove(500);
		}
		history.pushState('', '', window.location.href.split('#')[0]);
	}
}
let popup_close_icon = document.querySelectorAll('.popup__close,._popup-close');
if (popup_close_icon) {
	for (let index = 0; index < popup_close_icon.length; index++) {
		const el = popup_close_icon[index];
		el.addEventListener('click', function () {
			popup_close(el.closest('.popup'));
		})
	}
}
document.addEventListener('keydown', function (e) {
	if (e.code === 'Escape') {
		popup_close();
	}
});

let unlock = true;

function body_lock_remove(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove("_lock");
		}, delay);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}

function body_lock_add(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			// el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		// body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("_lock");

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
let inputs = document.querySelectorAll('input[data-value],textarea[data-value]');
inputs_init(inputs);

function inputs_init(inputs) {
    if (inputs.length > 0) {
        for (let index = 0; index < inputs.length; index++) {
            const input = inputs[index];
            const input_g_value = input.getAttribute('data-value');
            input_placeholder_add(input);
            if (input.value != '' && input.value != input_g_value) {
                input_focus_add(input);
            }
            input.addEventListener('focus', function (e) {
                if (input.value == input_g_value) {
                    input_focus_add(input);
                    input.value = '';
                }
            });
            input.addEventListener('blur', function (e) {
                if (input.value == '') {
                    input.value = input_g_value;
                    input_focus_remove(input);
                }
            });
        }
    }
}
function input_placeholder_add(input) {
    const input_g_value = input.getAttribute('data-value');
    if (input.value == '' && input_g_value != '') {
        input.value = input_g_value;
    }
}
function input_focus_add(input) {
    input.classList.add('_focus');
    input.parentElement.classList.add('_focus');
}
function input_focus_remove(input) {
    input.classList.remove('_focus');
    input.parentElement.classList.remove('_focus');
}

let quantityButtons = document.querySelectorAll('.atvs__quantity-button');
if (quantityButtons.length > 0) {
    for (let index = 0; index < quantityButtons.length; index++) {
        const quantityButton = quantityButtons[index];
        quantityButton.addEventListener("click", function (e) {
            let value = parseInt(quantityButton.closest('.atvs__quantity').querySelector('input').value);
            if (quantityButton.classList.contains('atvs__quantity-button--plus')) {
                value++;
            } else {
                value = value - 1;
                if (value < 1) {
                    value = 1
                }
            }
            quantityButton.closest('.atvs__quantity').querySelector('input').value = value;
        });
    }
}
$(document).ready(function () {
    $(".dispatch__popup-close").click(function () {
        $(".dispatch__popup").hide();
        $(".popup").removeClass('show');

    });
    $(".dispatch__show-link").click(function (e) {
        e.preventDefault();
        $(".dispatch__popup").show();
        $(".popup").addClass('');
        $('.popup').animate({ scrollTop: $(document).height() + $(window).height() });
    });
});
jQuery.datetimepicker.setLocale('ru');
$("#datetimepicker1").click(function (e) {
    $(this).datetimepicker({
        format: 'd.m.Y H:i',
    });
})
$("#datetimepicker2").click(function (e) {
    $(this).datetimepicker({
        format: 'd.m.Y H:i',
    });
})
$("#datetimepicker3").click(function (e) {
    $(this).datetimepicker({
        format: 'd.m.Y H:i',
    });
})
$("#datetimepicker4").click(function (e) {
    $(this).datetimepicker({
        format: 'd.m.Y H:i',
    });
})
$("#datetimepicker5").click(function (e) {
    $(this).datetimepicker({
        format: 'd.m.Y H:i',
    });
})

$("#step_two").click(function (e) {

    e.preventDefault();

    $(this).removeClass('active');

    $(this).addClass('unactive');

    $("#step_three").removeClass('unactive');

    $("#step_three").addClass('active');

    $("#block_step-one").removeClass('active');

    $("#block_step-one").addClass('unactive');

    $("#block_step-two").removeClass('unactive');

    $("#step-two").addClass('active');

    $('.popup').animate({ scrollTop: 50 }, '300');
})


$("#step_three").click(function (e) {

    e.preventDefault();

    $(this).removeClass('active');
    $(this).addClass('unactive');


    $("#step_four").removeClass('unactive');

    $("#step_four").addClass('active');

    $("#block_step-two").removeClass('active');
    $("#block_step-two").addClass('unactive');

    $("#block_step-three").removeClass('unactive');
    $("#block_step-three").addClass('active');
})
$("#step_four").click(function (e) {

    e.preventDefault();

    $(".panel").addClass('unactive');


    $("#block_step-three").addClass('unactive');
    $("#block_step-three").removeClass('active');

    $("#block_step-four").removeClass('unactive');
    $("#block_step-four").addClass('active');
})

$("#next").click(function (e) {

    e.preventDefault();

    $("#block_step-five-declined").addClass('active');
    $("#block_step-five-declined").removeClass('unactive');

    $("#block_step-five-accepted").addClass('active');
    $("#block_step-five-accepted").removeClass('unactive');

    $("#block_step-four").removeClass('active');
    $("#block_step-four").addClass('unactive');
})
// ============

$("#back-1").click(function (e) {

    e.preventDefault();

    $("#block_step-two").removeClass('active');

    $("#block_step-two").addClass('unactive');
    $("#block_step-one").removeClass('unactive');
    $("#block_step-one").addClass('active');

    $("#step_three").removeClass('active');

    $("#step_three").addClass('unactive');
    $("#step_two").removeClass('unactive');
    $("#step_two").addClass('active');

})
$("#back-2").click(function (e) {

    e.preventDefault();

    $("#block_step-three").removeClass('active');

    $("#block_step-three").addClass('unactive');
    $("#block_step-two").removeClass('unactive');
    $("#block_step-two").addClass('active');

    $("#step_four").removeClass('active');

    $("#step_four").addClass('unactive');

    $("#step_three").removeClass('unactive');
    $("#step_three").addClass('active');
    $('.popup').animate({ scrollTop: 50 }, '300');
})

// ======================

$('#data-input').datetimepicker({
    format: 'd.m.Y H:i (изменить)',
});

$("#gift-btn_1").click(function (e) {

    e.preventDefault();

    $(this).removeClass('active');

    $(this).addClass('unactive');

    $("#gift-block_1").removeClass('active');

    $("#gift-block_1").addClass('unactive');

    $("#gift-block_2").removeClass('unactive');

    $("#gift-block_2").addClass('active');

    $("#gift-btn_2").removeClass('unactive');

    $("#gift-btn_2").addClass('active');

    $('.popup').animate({ scrollTop: 50 }, '0');
})
$("#gift-btn_2").click(function (e) {

    e.preventDefault();

    $(this).removeClass('active');

    $(this).addClass('unactive');

    $("#gift-block_2").removeClass('active');

    $("#gift-block_2").addClass('unactive');

    $("#gift-block_3").removeClass('unactive');

    $("#gift-block_3").addClass('active');

    $("#gift-btn_3").removeClass('unactive');

    $("#gift-btn_3").addClass('active');

    $('.popup').animate({ scrollTop: 50 }, '0');


})
$("#gift-btn_3").click(function (e) {

    e.preventDefault();

    $(".panel").addClass('unactive');

    $("#gift-block_3").removeClass('active');

    $("#gift-block_3").addClass('unactive');

    $("#gift-block_4").removeClass('unactive');

    $("#gift-block_4").addClass('active');

    $('.popup').animate({ scrollTop: 50 }, '0');


})
$("#gift-back_1").click(function (e) {

    e.preventDefault();

    $("#gift-block_1").removeClass('unactive');

    $("#gift-block_1").addClass('active');

    $("#gift-block_2").removeClass('active');

    $("#gift-block_2").addClass('unactive');

    $("#gift-btn_1").removeClass('unactive');

    $("#gift-btn_1").addClass('active');

    $("#gift-btn_2").removeClass('active');

    $("#gift-btn_2").addClass('unactive');


})
$("#gift-back_2").click(function (e) {

    e.preventDefault();

    $("#gift-block_2").removeClass('unactive');

    $("#gift-block_2").addClass('active');

    $("#gift-block_3").removeClass('active');

    $("#gift-block_3").addClass('unactive');

    $("#gift-btn_3").removeClass('active');

    $("#gift-btn_3").addClass('unactive');

    $("#gift-btn_2").removeClass('unactive');

    $("#gift-btn_2").addClass('active');
})

$("#postcard-checkbox_1").on("change",function(){
    if ($("#postcard-checkbox_1").is(":checked")){
        $("#postcard-checkbox_2").prop("checked", false);
    }
});
$("#postcard-checkbox_2").on("change",function(){
    if ($("#postcard-checkbox_2").is(":checked")){
        $("#postcard-checkbox_1").prop("checked", false);
    }
});
