$(document).ready(function(){

	/* Локализация datepicker */
	$.datepicker.regional['ru'] = {
		closeText: 'Закрыть',
		prevText: 'Предыдущий',
		nextText: 'Следующий',
		currentText: 'Сегодня',
		monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
		monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
		dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
		dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
		dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
		weekHeader: 'Не',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''
	};
	$.datepicker.setDefaults($.datepicker.regional['ru']);

	$(document).on('click','.radio-btn',function(){
		if ( $(this).hasClass('active') ) {
			$(this).removeClass('active');
		} else {
			$(this).removeClass('error');
			$(this).addClass('active');
		}
	});

	$(document).on('click','.mobile-btn',function(){
		if ( $(this).hasClass('active') ){
			$(this).removeClass('active');
			$('.mobile-menu').removeClass('active');
			$('body').removeClass('no-scroll');
		} else {
			$(this).addClass('active');
			$('.mobile-menu').addClass('active');
			$('body').addClass('no-scroll');
		}
	});

	$('.fancybox-gal').fancybox({loop: true});
	$('.fancybox').fancybox({touch: false});
	$('input[type="tel"]').inputmask('+7 (999) 999-99-99');

	$(document).on('click','.close-btn',function(){
		$('.mobile-btn').removeClass('active');
		$('.mobile-menu').removeClass('active');
		$('body').removeClass('no-scroll');
		$('.mobile-menu .nav li.li-drop').removeClass('active');
	});

	$('input').on('input',function(){
		$(this).removeClass('error');
	});
	$('textarea').on('input',function(){
		$(this).removeClass('error');
	});

	$('form').on('submit',function(){
		var valid = true;

		if ( $(this).find('.policy-text .radio-btn').length ){
			if ( $(this).find('.policy-text .radio-btn').hasClass('active') ){
				$(this).find('input').each(function(){
					if(!$(this).val().length) { 
						event.preventDefault();
						valid = false;
						$(this).addClass("error"); 
					} else { 
						$(this).removeClass("error"); 
					}
				});
				$(this).find('textarea').each(function(){
					if(!$(this).val().length) { 
						event.preventDefault();
						valid = false;
						$(this).addClass("error"); 
					} else { 
						$(this).removeClass("error"); 
					}
				});
			} else {
				$(this).find('.policy-text .radio-btn').addClass('error');
				event.preventDefault();
				return false;
			}
		} else {
			$(this).find('input').each(function(){
				if(!$(this).val().length) { 
					event.preventDefault();
					valid = false;
					$(this).addClass("error"); 
				} else { 
					$(this).removeClass("error"); 
				}
			});
			$(this).find('textarea').each(function(){
				if(!$(this).val().length) { 
					event.preventDefault();
					valid = false;
					$(this).addClass("error"); 
				} else { 
					$(this).removeClass("error"); 
				}
			});
		}

		if (!valid) {
			event.preventDefault();
			return false;
		}
	});

	function footerYear(){
		var date = new Date();
		var year = date.getFullYear();
		$('#footer-year').text(year);
	}
	footerYear();

	$('.b-select select').chosen({
		disable_search: true
	});

	$('.b-face-slider').slick({
		responsive: [
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					dots: true
				}
			}
		]
	});

	$('.b-new-products .slider').slick({
		slidesToShow: 3,
		responsive: [
			{
				breakpoint: 1230,
				settings: {
					slidesToShow: 2
				}
			}
		]
	});

	$('.b-cart-recomended .slider').slick({
		slidesToShow: 2
	});

	$('.about-slider').slick();

	$(document).on('click',function(e){
		/*Скрипт для отображения информации в карточке товара каталога*/
		if ( $(e.target).closest('.info-btn').length ){
			if ( !$(e.target).closest('.info').hasClass('active') ){
				$('.info').removeClass('active');
				$(e.target).closest('.info').addClass('active');
			} else {
				$(e.target).closest('.info').removeClass('active');
			}
		} else {
			if ( !$(e.target).closest('.info-wrap').length ){
				$('.info').removeClass('active');
			}
		}

		/*Скрипт для закрытия селекта при клике за его пределами*/
		if ( !$(e.target).closest('.select-param').length ){
			$('.select-param').removeClass('active');
		}
	});

	$(document).on('click','.params > ul > li',function(){
		if ( !$(this).hasClass('active') ){
			$(this).parent('ul').find('li').removeClass('active');
			$(this).addClass('active');

			if ( $(this).attr('data-cart') ){
				var price_new = $(this).attr('data-cart');
				var price_old = $(this).attr('data-cart-old');
				$(this).parents('.bottom').find('.price').find('.price-new span').text(price_new);
				$(this).parents('.bottom').find('.price').find('.price-old span').text(price_old);
			}
		}
	});

	$(document).on('click','.select-param-text',function(){
		if ( !$(this).parents('.select-param').hasClass('active') ){
			$('.select-param').removeClass('active');
		}
		$(this).parents('.select-param').toggleClass('active');
	});

	$(document).on('click','.select-param > ul > li',function(){
		var src = $(this).find('img').attr('src');
		var text = $(this).find('span').text();

		if ( !$(this).hasClass('active') ){
			$(this).parent('ul').find('li').removeClass('active');
			$(this).addClass('active');
			$(this).parents('.select-param').find('.select-param-text span').text(text);
			$(this).parents('.select-param').find('.select-param-text .img img').attr('src',src);
		}
		$(this).parents('.select-param').removeClass('active');
	});

	$(document).on('click','.menu-list li a',function(){
		var block_id = $(this).attr('href');
		var des = $(block_id).offset().top - 25;

		$('body,html').animate({scrollTop: des}, 800);
		return false;
	});

	$(document).on('click','.b-delivery-types-list > li',function(){
		var el = $(this).attr('data-type');

		if ( !$(this).hasClass('active') ){
			$(this).parents('.b-delivery-types-list').find('li').removeClass('active');
			$(this).parents('.b-delivery-types').find('.b-delivery-type').removeClass('active');
			$(this).parents('.b-delivery-types').find('.b-delivery-type').find('input, select, textarea').prop('disabled', true);
			$(this).addClass('active');
			$(el).addClass('active');
			$(el).find('input, select, textarea').prop('disabled', false);
		}
	});

	$(document).on('click','.b-order-comment .text', function(){
		$(this).parent().toggleClass('active');
	});

	$('input[name="payment-type"]').on('change',function(){
		var el = $('input[name="payment-type"]:checked').attr('data-description');

		$('input[name="payment-type"]:checked').parents('.b-form-wrap').find('.b-payment-descr').find('.item').removeClass('active');
		$('input[name="payment-type"]:checked').parents('.b-form-wrap').find('.b-payment-descr').find('.item[data-description="'+el+'"]').addClass('active');
	});

	$('.date-inp input').datepicker({
		autoSize: false
	});

	function HeaderScroll(){
		if ( $('.body-wrap').hasClass('main-page') ){
			var ww = $(window).width();
			var st = $(window).scrollTop();
			var gs = $('.header-top').outerHeight() + 20;
			var hp = $('.header-bottom').outerHeight() + 20;

			if ( ww > 1023 ){
				if (st > gs){
					$('.header').addClass('scroll');
					$('.header').css('padding-bottom',hp);
				} else {
					$('.header').removeClass('scroll');
					$('.header').removeAttr('style');
				}
			} else {
				$('.header').removeClass('scroll');
				$('.header').removeAttr('style');
			}
		}
	}
	HeaderScroll();

	function MenuNavScroll(){
		if ( $('.body-wrap').hasClass('main-page') ){
			var ww = $(window).width();
			var st = $(window).scrollTop();
			var gs = $('.b-menu-nav').offset().top;
			var mp = $('.b-menu-nav').find('.wrap').outerHeight();

			if (ww > 1024){
				$('.b-menu-nav').removeClass('scroll');
				$('.b-menu-nav').removeAttr('style');
			} else {
				if (st > gs){
					$('.b-menu-nav').addClass('scroll');
					$('.b-menu-nav').css('height',mp);
				} else {
					$('.b-menu-nav').removeClass('scroll');
					$('.b-menu-nav').removeAttr('style');
				}
			}
		}
	}
	MenuNavScroll();

	function MenuActiveItem(){
		var st = $(window).scrollTop();

		$('.menu-list').find('li').each(function(){
			var block_id = $(this).find('a').attr('href');
			if ( $(block_id).length ){
				var vg = $(block_id).offset().top - $(window).height()/2;
				var ng = vg + $(block_id).outerHeight();

				if (st > vg){
					if (st < ng){
						if ( !$(this).hasClass('active') ){
							$(this).addClass('active');
							if ( $(this).closest('.b-menu-nav').length ){
								$('.b-menu-nav .nav').animate({scrollLeft: $(this).offset().left - $(this).closest('.b-menu-nav .nav').offset().left + $('.b-menu-nav .nav').scrollLeft() - $(this).closest('.b-menu-nav .nav').width()/2 + $(this).width()/2},300);
							}
						}
					} else {
						$(this).removeClass('active');
					}
				} else {
					$(this).removeClass('active');
				}
			}
		});
	}
	MenuActiveItem();

	function ScrollEl(){
		if ( $('.b-scroll-block').length ){
			var ww = $(window).width();
			if (ww > 1024){
				var st = $(window).scrollTop();
				$('.b-scroll-block').each(function(){
					var $banner = $(this).find('.b-scroll-el');
					var vg = $(this).offset().top - 30;
					var ng = vg + $(this).outerHeight() - $banner.outerHeight();
					$(this).css('min-height',$banner.outerHeight());
					if ( st > vg ){
						if ( st > ng ){
							$banner.removeClass('scroll').addClass('bottom');
						} else {
							$banner.addClass('scroll').removeClass('bottom');
						}
					} else {
						$banner.removeClass('scroll').removeClass('bottom');
					}
				});
			} else {
				$('.b-scroll-el').removeClass('scroll');
				$('.b-scroll-el').removeClass('bottom');
				$('.b-scroll-block').removeAttr('style');
			}
		}
	}
	ScrollEl();

	$(window).on('scroll',function(){
		HeaderScroll();
		MenuNavScroll();
		MenuActiveItem();
		ScrollEl();
	});

	$(window).resize(function(){
		HeaderScroll();
		MenuNavScroll();
		MenuActiveItem();
		ScrollEl();
	});

});