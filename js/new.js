$(function(){
	if($('.new--input_phone').length > 0){
		$('.new--input_phone').mask('+7(999)999-99-99');
	}
	
	
	/*Колеровка*/
	$('.new_palette_top--item').click(function(event){
		event.preventDefault();
		$('.new_palette_top--item').removeClass('active');
		$(this).addClass('active');
	});
	/**/
	if($('._new-delivery_carousel').length > 0){
		$('._new-delivery_carouselBot').slick({
			arrows: false,
			dots: true,
			infinite: false,
			speed: 700,
			slidesToShow: 1,
			slidesToScroll: 1,
		});
		
		$('._new-delivery_carouselBot').on('afterChange', function(event, slick, currentSlide, nextSlide){
			$('._new-delivery_carousel ._new-delivery_carouselItem').removeClass('active');
			$('._new-delivery_carousel ._new-delivery_carouselItem[data-slide="'+currentSlide+'"]').addClass('active');
			//
			$('._new-delivery_carousel').css('background-image','url('+$('._new-delivery_carouselItem[data-slide="'+currentSlide+'"]').attr('data-image')+')');
		});
		
		$('._new-delivery_carousel ._new-delivery_carouselItem ._new-delivery_carouselImage').click(function(){
			$(this).parents('._new-delivery_carousel').find('._new-delivery_carouselItem').removeClass('active');
			$(this).parents('._new-delivery_carouselItem').addClass('active');
			//
			var slideCountThis = parseInt($(this).parents('._new-delivery_carouselItem').attr('data-slide'),10);
			$(this).parents('._new-delivery_carousel').find('._new-delivery_carouselBot').slick('slickGoTo',slideCountThis);
			//
			$('._new-delivery_carousel').css('background-image','url('+$(this).parents('._new-delivery_carouselItem').attr('data-image')+')');
		});
	}
	// табы в доставке
	window.onload = function() {
		$('._new_pickup-body ._new_pickup-map').each(function(){
			var map_id = $(this).attr('id');
			var cord1 = $(this).attr('data-cord1');
			var cord2 = $(this).attr('data-cord2');
			
			/*var myMap = new ymaps.Map(map_id, {
				center: [cord1,cord2],
				zoom: 16
			});
			myPlacemark = new ymaps.Placemark([cord1,cord2]);

			myMap.geoObjects.add(myPlacemark);*/
		});
		
		$('._new_pickups').find('._new_pickup-body').addClass('init')
		$('._new_pickups').find('#'+$('._new_pickups-navs').find('li.active').attr('data-action_tab')).addClass('active');
	};
	
	$('._new_pickups-navs').find('li').click(function(){
		$('._new_pickups-navs').find('li').removeClass('active');
		$(this).addClass('active');
		
		$(this).parents('._new_pickups').find('._new_pickup-body').removeClass('active');
		$(this).parents('._new_pickups').find('#'+$(this).attr('data-action_tab')).addClass('active');
		
		setTabIndicatorDelivery();
	});
	function setTabIndicatorDelivery(){
		var active_slide = $('._new_pickups-nav').find('li.active');
		
		$('._new_pickups-nav-indicator').css({
			'transform':'translateX('+active_slide.position().left+'px)',
			'width':active_slide.outerWidth()+'px'
		});
	}
	if($('._new_pickups-nav-indicator').length > 0){
		setTabIndicatorDelivery();
	}
	$('.new--tab-navigation').find('li').click(function(){
		$('._new_pickups-nav').find('li').removeClass('active');
		$(this).addClass('active');
		
		$(this).parents('._new_pickups').find('._new_pickup-body').removeClass('active');
		$(this).parents('._new_pickups').find('#'+$(this).attr('data-action_tab')).addClass('active');
		
		setTabIndicatorDelivery();
	});
	// показать больше
	$('.newScrollHidden-btn').bind('click', function(e) { 
		e.preventDefault();
		$('#'+$(this).attr('data-target_block')).toggleClass('newScrollHidden-open');
		$('#'+$(this).attr('data-target_block')).stop().slideToggle(350);
		if($('#'+$(this).attr('data-target_block')).hasClass('newScrollHidden-open') == true){
			$(this).html('');
			$(this).html('<span>Скрыть</span>');
		} else {
			$(this).html('');
			$(this).html('<span>Узнать больше</span>');
		}
	});
	///
	///Пароль
	///
	function setStatusForInput(self){
		var checkValPassword = self.parents('.new--form_user').find('.new_label--inputs-password').not(self.parents('.new_label--inputs-password'));
		var valuePassword = checkValPassword.find('input[type="password"]').val();
		if(valuePassword != '' || self.val() != ''){
			if(self.val() == valuePassword && self.val() != '' && valuePassword != ''){
				self.parents('.new--form_user').find('.new_label--inputs-password').find('.new--indicator_').addClass('checked');
				self.parents('.new--form_user').find('.new_label--inputs-password').find('.new--indicator_input').removeClass('error');
			} else {
				self.parents('.new--form_user').find('.new_label--inputs-password').find('.new--indicator_').removeClass('checked');
				self.parents('.new--form_user').find('.new_label--inputs-password').find('.new--indicator_input').addClass('error');
			}
		} else {
			self.parents('.new--form_user').find('.new_label--inputs-password').find('.new--indicator_input').removeClass('error');
		}
	}
	$('.new_label--inputs-password input[type="password"]').change(function(){
		setStatusForInput($(this))
	});
	$('.new--indicator_input--del').click(function(event){
		event.preventDefault();
		$(this).parent().find('input[type="password"]').val('');
		setStatusForInput($(this).parent().find('input[type="password"]'));
	});
	///----------------------
	///Табы в личном кабинете
	///----------------------
	///window.location.hash.replace("#","")
	checkOpenTab('users--tabs',window.location.hash.replace("#",""));
	
	$('.new--tabs_btn-- , .new--tabs_btn-mobile').click(function(){
		if(typeof $(this).attr('href') !== typeof undefined && $(this).attr('href') !== false && $(this).attr('href') != ''){
			$('.breadcrumbs.new_show_tablet-block .breadcrumbs__current-page').text('');
			$('.breadcrumbs.new_show_tablet-block .breadcrumbs__current-page').text($(this).text());
			
			$($(this).attr('href')).parents('.new--tabs').find('.new--tab').removeClass('open--tab');
			$($(this).attr('href')).addClass('open--tab');
			

			var offsetTopPlus = $('.header-floating').outerHeight(true);
			
			$([document.documentElement, document.body]).stop().animate({
				scrollTop: $($(this).attr('href')).offset().top-offsetTopPlus
			}, 200);
			
			$(this).parent().find('.new--tabs_btn--').removeClass('active');
			$(this).addClass('active');
		}
	});
	
	function checkOpenTab(parent_tab,tab){
		if(tab != ''){
			$('.new--tabs_btn--').each(function(){
				if(typeof $(this).attr('href') !== typeof undefined && $(this).attr('href') !== false && $(this).attr('href') != ''){
					var links = $(this).attr('href').replace('#', '');
					if(links != tab){
						$(this).removeClass('active');
					} else {
						$(this).addClass('active');
						$('.breadcrumbs.new_show_tablet-block .breadcrumbs__current-page').text('');
						$('.breadcrumbs.new_show_tablet-block .breadcrumbs__current-page').text($(this).text());
					}
				}
			});
			
			$("#"+parent_tab).find('.new--tab').removeClass('open--tab');
			$("#"+parent_tab).find("#"+tab).addClass('open--tab');
			
			var offsetTopPlus = $('.header-floating').outerHeight(true);
			
			$([document.documentElement, document.body]).stop().animate({
				scrollTop: $("#"+parent_tab).find("#"+tab).offset().top-offsetTopPlus
			}, 200);
		} else {
			var firstTab = $("#"+parent_tab).find('.new--tab').first();
			var links = firstTab.attr('id');
			firstTab.addClass('open--tab');
			$('.new--tabs_btn--').each(function(){
				if(typeof $(this).attr('href') !== typeof undefined && $(this).attr('href') !== false && $(this).attr('href') != ''){
					var link_btn = $(this).attr('href').replace('#', '');
					console.log(links);
					if(links != link_btn){
						$(this).removeClass('active');
					} else {
						$(this).addClass('active');
					}
				}
			});
		}
	}
	
	$('.new--user_orders-table_top a').click(function(){
		$('.new--user_orders-table_top a').removeClass('active');
		$(this).addClass('active');
	});
	/*
	//
	//Страница сравнения
	//
	*/
	$('.new--comparison-label_item-title').click(function(){
		$(this).toggleClass('open');
		$(this).parent().find('.new--comparison-label_item-content').stop().slideToggle(350);
	});
	if($('.new--comparison-label_item-content').length > 0){
		//Установка значений
		$('.new--comparison-label_item-content').find('.new--comparison-table_item').each(function(){
			var index = $(this).index();
			if(index != 0){
				if(index == 1){
					$(this).addClass('show');
				}
				$(this).attr('data-index_slider',(index-1));
			}
		});
		
		function _changeDescriptionComparison(_index){
			$('.new--comparison-label_item-content').find('.new--comparison-table_item').removeClass('show');
			$('.new--comparison-label_item-content').find('.new--comparison-table_item[data-index_slider="'+_index+'"]').addClass('show');
		}
		
		var productCardsSlider = new Swiper('.comparison--product-cards', {
			slidesPerView: 3,
			slidesPerGroup: 1,
			spaceBetween: 20,
			navigation: {
				prevEl: '.product-cards__arrow.swiper-button-prev',
				nextEl: '.product-cards__arrow.swiper-button-next',
			},
			pagination: {
				el: '.product-cards__pagination.swiper-pagination',
				clickable: true,
			},
			breakpoints: {
				1190: {
					slidesPerView: 2,
					slidesPerGroup: 3,
					spaceBetween: 20
				},
				991: {
					slidesPerView: 2,
					slidesPerGroup: 2,
					spaceBetween: 20
				},
				670: {
					slidesPerView: 1,
					slidesPerGroup: 1,
				}
			},
			on: {
				slideChangeTransitionEnd: function(){
					var slide_curent = $('.comparison--carousel-right').find('.swiper-slide-active');
					_changeDescriptionComparison(slide_curent.index());
					//console.log(slide_curent.index());
				},
				resize: function(){
					var slide_curent = $('.comparison--carousel-right').find('.swiper-slide-active');
					_changeDescriptionComparison(slide_curent.index());
				}
			}
			/*on: {
				slideChangeTransitionStart: function () {
					var length = $('.product-cards__box').length;
					if ($('.product-cards__box.swiper-slide-active').index() == (length - 4)) {
					$.ajax({
					url: ajaxUrlProducSlider,
					cache: false,
					success: function (data) {
					productCardsSlider.appendSlide(data);
					},
					error: function (data) {
					console.error(data);
					}
					});
					}
				}
			},*/
		});
	}
	/*
	//
	//Страница поиска
	//
	*/
	$('.new--btn-group--shows').click(function(){
		$(this).parent().toggleClass('open');
	});
});