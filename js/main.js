$(document).ready(function(){

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
				$(this).parents('.bottom').find('.price span').text(price_new);
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

	function HeaderScroll(){
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
	HeaderScroll();

	function MenuNavScroll(){
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

	$(window).on('scroll',function(){
		HeaderScroll();
		MenuNavScroll();
		MenuActiveItem();
	});

	$(window).resize(function(){
		HeaderScroll();
		MenuNavScroll();
		MenuActiveItem();
	});

});