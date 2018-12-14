$(function(){
	/*Карта в схеме проезда*/
	if($('#passage--map').length > 0){
		ymaps.ready(function () {
			var cord1 = $('#passage--map').attr('data-cord1');
			var cord2 = $('#passage--map').attr('data-cord2');
			
			var myMap = new ymaps.Map('passage--map', {
				center: [cord1,cord2],
				zoom: 16
			});
			myPlacemark = new ymaps.Placemark([cord1,cord2],{
				hideIcon: false
			},{
				iconLayout: 'default#image',
				iconImageHref: 'img/new/dealers/logo.svg',
				iconImageSize: [41, 46],
				iconImageOffset: [-20.5, -46]
			});

			myMap.geoObjects.add(myPlacemark);
		});
		
		$('.passage--save').click(function(){
			
			$('.new--map_print').attr('style','display: block!important');
			
			$('.passage--map').hide();
			
			
			var doc = new jsPDF();
			
			var canvas = document.getElementById("passage--row");
			html2canvas(canvas).then(function(canvas) {
				var width = $(canvas).width();
				var coef = width/210;
				var height = $(canvas).height()/coef;
				
				window.canvas1_height = height;
				window.canvas1 = canvas;
				
				$('.new--map_print').attr('style','');
				$('.passage--map').show();
			});
			
			doc.addImage(window.canvas1, 'JPEG', 0, 20, 210, window.canvas1_height);
			doc.save('sample-file.pdf');
			
		});
	}
	/**/
	
	
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
			/*$('._new-delivery_carousel').css('background-image','url('+$('._new-delivery_carouselItem[data-slide="'+currentSlide+'"]').attr('data-image')+')');*/
		});
		
		$('._new-delivery_carousel ._new-delivery_carouselItem ._new-delivery_carouselImage').click(function(){
			$(this).parents('._new-delivery_carousel').find('._new-delivery_carouselItem').removeClass('active');
			$(this).parents('._new-delivery_carouselItem').addClass('active');
			//
			var slideCountThis = parseInt($(this).parents('._new-delivery_carouselItem').attr('data-slide'),10);
			$(this).parents('._new-delivery_carousel').find('._new-delivery_carouselBot').slick('slickGoTo',slideCountThis);
			//
			/*$('._new-delivery_carousel').css('background-image','url('+$(this).parents('._new-delivery_carouselItem').attr('data-image')+')');*/
		});
	}
	// табы в доставке
	if($('._new_pickup-body ._new_pickup-map').length > 0){
		ymaps.ready(function () {
			$('._new_pickup-body ._new_pickup-map').each(function(){
				var map_id = $(this).attr('id');
				var cord1 = $(this).attr('data-cord1');
				var cord2 = $(this).attr('data-cord2');
				
				var myMap = new ymaps.Map(map_id, {
					center: [cord1,cord2],
					zoom: 16
				});
				myPlacemark = new ymaps.Placemark([cord1,cord2],{
					hideIcon: false
				},{
					iconLayout: 'default#image',
					iconImageHref: 'img/new/dealers/logo.svg',
					iconImageSize: [41, 46],
					iconImageOffset: [-20.5, -46]
				});

				myMap.geoObjects.add(myPlacemark);
			});
			
			$('._new_pickups').find('._new_pickup-body').addClass('init')
			$('._new_pickups').find('#'+$('._new_pickups-navs').find('li.active').attr('data-action_tab')).addClass('active');
		});
	}
	
	$('._new_pickups-navs').find('li').click(function(){
		$('._new_pickups-navs').find('li').removeClass('active');
		$(this).addClass('active');
		
		$(this).parents('._new_pickups').find('._new_pickup-body').removeClass('active');
		$(this).parents('._new_pickups').find('#'+$(this).attr('data-action_tab')).addClass('active');
		
		setTabIndicatorDelivery();
	});
	function setTabIndicatorDelivery(){
		var active_slide = $('._new_pickups-nav').find('li.active');
		var margin = parseInt(active_slide.css('margin-left'),10);
		
		$('._new_pickups-nav-indicator').css({
			'transform':'translateX('+(active_slide.position().left+margin)+'px)',
			'width':active_slide.outerWidth()+'px'
		});
	}
	if($('._new_pickups-nav-indicator').length > 0){
		setTabIndicatorDelivery();
	}
	/*$('.new--tab-navigation').find('li').click(function(){
		$('._new_pickups-nav').find('li').removeClass('active');
		$(this).addClass('active');
		
		$(this).parents('._new_pickups').find('._new_pickup-body').removeClass('active');
		$(this).parents('._new_pickups').find('#'+$(this).attr('data-action_tab')).addClass('active');
		
		setTabIndicatorDelivery();
	});*/
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
			$(this).html('<span>Подробнее</span>');
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
	$('.new_label--inputs-password input[type="password"]').keyup(function(){
		setStatusForInput($(this))
	});
	$('.new--indicator_input--del').click(function(event){
		event.preventDefault();
		$(this).parent().find('input[type="password"]').val('');
		setStatusForInput($(this).parent().find('input[type="password"]'));
	});
	
		//not__empty
	
	///----------------------
	///Табы в личном кабинете
	///----------------------
	///window.location.hash.replace("#","")
	/*checkOpenTab('users--tabs',window.location.hash.replace("#",""));
	
	$('.new--tabs_btn-- , .new--tabs_btn-mobile').click(function(event){
		if(typeof $(this).attr('href') !== typeof undefined && $(this).attr('href') !== false && $(this).attr('href') != ''){
			event.preventDefault();
			history.pushState({}, "", this.href);
			
			$($(this).attr('href')).parents('.new--tabs').find('.new--tab').removeClass('open--tab');
			$($(this).attr('href')).addClass('open--tab');
			
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
						if($('.breadcrumbs.new_show_tablet-block .breadcrumbs__current-page').length > 0){
						}
					}
				}
			});
			
			$("#"+parent_tab).find('.new--tab').removeClass('open--tab');
			$("#"+parent_tab).find("#"+tab).addClass('open--tab');
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
	});*/
	/*
	//
	//Страница сравнения
	//
	*/
	if($('.comparison--carousel').length == 0){
		$('.new--comparison-label_item-title').click(function(){
			$(this).toggleClass('open');
			$(this).parent().find('.new--comparison-label_item-content').stop().slideToggle(350);
		});
	}
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
					/*slidesPerView: 1,
					slidesPerGroup: 1,*/
					slidesPerView: 2,
					slidesPerGroup: 2,
					spaceBetween: 5,
				}
			},
			on: {
				slideChangeTransitionEnd: function(){
					var slide_curent = $('.comparison--carousel-right').find('.swiper-slide-active');
					_changeDescriptionComparison(slide_curent.index());
				},
				slideChangeTransitionStart: function(){
					var self = $(productCardsSlider.$el[0]);
					
					//self.parents('.wrapper').find('.new--comparison-bottom .new--comparison-label_item-content').stop().slideUp(350);
					
					//self.parents('.wrapper').find('.new--comparison-label_item-title').removeClass('open');
				},
				resize: function(){
					var slide_curent = $('.comparison--carousel-right').find('.swiper-slide-active');
					_changeDescriptionComparison(slide_curent.index());
				}
			}
		});
	}
	//
	//Страница детальной новости
	//
	if($('.news--detail--carousel').length > 0){
		var productCardsSlider = new Swiper('.news--detail--carousel', {
			slidesPerView: 1,
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
		});
	}
	//
	//Страница вакансий
	//
	if($('.jobs-feedback-row').length > 0){
		var productCardsSlider = new Swiper('.jobs-feedback-row', {
			slidesPerView: 1,
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
		});
	}
	//
	//Страница преимущества
	//
	if($('.advantages--product').length > 0){
		var productCardsSlider = new Swiper('.advantages--product', {
			slidesPerView: 4,
			slidesPerGroup: 4,
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
					slidesPerView: 3,
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
		});
	}
	//
	//Страница сертификатов ( о компании )
	//
	$('.certificates--tabs-top a').click(function(){
		$(this).toggleClass('active');
	});
	if($('.certificates--carousel').length > 0){
		var productCardsSlider = new Swiper('.certificates--carousel', {
			slidesPerView: 4,
			slidesPerGroup: 4,
			spaceBetween: 85,
			navigation: {
				prevEl: '.product-cards__arrow.swiper-button-prev',
				nextEl: '.product-cards__arrow.swiper-button-next',
			},
			breakpoints: {
				1190: {
					slidesPerView: 3,
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
					slidesPerGroup: 1
				}
			},
			on: {
				transitionEnd: function(){
					var self = productCardsSlider.$el[0];
					var index_slide = productCardsSlider.snapIndex+1;
					$(self).find('.certificates--carousel-now').text(index_slide);

				}
			}
		});
		function changeNumberSlider(){
			$('.certificates--tabs .new--comparison-label_item-content').each(function(){
				$(this).addClass('init');
				if($(this).find('.certificates--carousel').length > 0){
					if($(window).width() > 1190){
						var deliter = 4;
					}
					if($(window).width() < 1190 && $(window).width() > 991){
						var deliter = 3;
					}
					if($(window).width() < 991 && $(window).width() > 670){
						var deliter = 2;
					}
					if($(window).width() < 670){
						var deliter = 1;
					}
					//
					var length_slide = $(this).find('.certificates--carousel').find('.swiper-slide').length;
					var number = Math.ceil(length_slide/deliter);
					//
					$(this).find('.certificates--carousel').find('.certificates--carousel-all').text(number);
					$(this).find('.certificates--carousel').find('.certificates--carousel-now').text('1');
				}
			});
		}
		changeNumberSlider();
		$(window).resize(function(){
			changeNumberSlider();
		});
	}
	//
	//Поля для данных в модальном окне
	//
	$('.form__field--textarea textarea').keyup(function(){
		if($(this).val() != ''){
			$(this).parent().addClass('val');
		} else {
			$(this).parent().removeClass('val');
		}
	});
	$('.form__field--textarea textarea').change(function(){
		if($(this).val() != ''){
			$(this).parent().addClass('val');
		} else {
			$(this).parent().removeClass('val');
		}
	});
	if($('.form__field--textarea textarea').length > 0){
		$('.form__field--textarea textarea').each(function(){
			if($(this).val() != ''){
				$(this).parent().addClass('val');
			} else {
				$(this).parent().removeClass('val');
			}
		});
	}
	
	$('.form__field--file input[type="file"]').change(function(event){
		console.log(this.files.length);
		if(this.files.length > 0){
			if(this.files[0].size > 10){
				if(this.files[0].name != ''){
					$(this).parent().find('.form__field--file--name').text(this.files[0].name);
				}
			}
		} else {
			$(this).parent().find('.form__field--file--name').text($(this).parent().find('.form__field--file--name').attr('data-def_name'));
		}
	});
	
	//
	//Детальная страница конкурсника
	//
	if($('.contest_participants--carousel').length > 0){
		var productCardsSlider = new Swiper('.contest_participants--carousel', {
			slidesPerView: 4,
			slidesPerGroup: 4,
			spaceBetween: 20,
			navigation: {
				prevEl: '.product-cards__arrow.swiper-button-prev',
				nextEl: '.product-cards__arrow.swiper-button-next',
			},
			breakpoints: {
				1190: {
					slidesPerView: 3,
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
					slidesPerGroup: 1
				}
			},
		});
	}
	if($('.new--product-card__slider-thumbs').length) {
		//new--product-card__slider-thumbs
		$('.product-card__slider-thumbs').slick('unslick');
		$('.new--product-card__slider-thumbs').slick({
		  slidesToShow: 8,
		  slidesToScroll: 1,
		  asNavFor: '.product-card__slider-main',
		  prevArrow: '<div class="swiper-button-prev"><svg class="swiper-button-icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-che-l"></use></svg></div>',
		  nextArrow: '<div class="swiper-button-next"><svg class="swiper-button-icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-che-r"></use></svg></div>',
		  focusOnSelect: true,
		  responsive: [{
			  breakpoint: 1024,
			  settings: {
				slidesToShow: 5
			  }
			},
		  ]
		});
	}
	//
	//Страницы покупателям
	//
	if($('.dealers--people-departament').length > 0){
		function reInitClickOnCard(){
			$('.person__box-wrapper .bottom-link a').off();
			$('.person__box-wrapper .bottom-link a').on("click", function(evt) {
				evt.preventDefault();
				var parent = $(this).parents('.person__box');
				$(parent).siblings().each(function(){
					if($(this).hasClass('opened')){
						$(this).removeClass('opened');
						$(this).find('.person__contact-info').hide();
					}
				});
				$(parent).toggleClass('opened');
				$(parent).find('.person__contact-info').toggle();
			});
		}
		
		function setSlider(){
			$window_size = $(window).width();
			$block = $('.dealers--people-departament').parent().find('.department__wrapper');
			if($window_size <= 600){
				if($block.hasClass('slick-initialized') == false){
					$block.slick({
						dots: false,
						slidesToShow: 1,
						slidesToScroll: 1,
						prevArrow: '<div class="swiper-button-prev"><svg class="swiper-button-icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-che-l"></use></svg></div>',
						nextArrow: '<div class="swiper-button-next"><svg class="swiper-button-icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-che-r"></use></svg></div>',
						focusOnSelect: false,
					});
					reInitClickOnCard();
					$block.on('beforeChange',function(slick){
						var $block = $(slick['currentTarget']);
						$block.find('.person__box').removeClass('opened');
						$block.find('.person__box').find('.person__contact-info').hide();
					});
				}
			} else {
				if($block.hasClass('slick-initialized') == true){
					$block.slick('unslick');
					reInitClickOnCard();
				}
			}
		}
		setSlider();
		$(window).resize(function(){
			setSlider();
		});
	}
	//
	//Страницы каталогов pdf
	//
	$('.instruction--label-top-filter a').click(function(event){
		event.preventDefault();
		$(this).toggleClass('active');
	});
	//
	//Страница 404
	//
	if($('.product-cards-404').length > 0){
		var productCardsSlider = new Swiper('.product-cards-404', {
			slidesPerView: 4,
			slidesPerGroup: 4,
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
					slidesPerView: 3,
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
					slidesPerGroup: 1
				}
			},
		});
	}
	//
	//Страница регистрации
	//
	$('.user_reg--type input').change(function(){
		var block = $("#"+$(this).val());
		
		$('.user_reg_tab').removeClass('open');
		block.addClass('open');
	});
	
	function checkForValue(block){
		var input_length = block.find('input:not([type="checkbox"])').length;
		var check_input = 0;
		block.find('input:not([type="checkbox"])').each(function(){
			if($(this).val() != ''){
				if($(this).hasClass('form__input--phone-full') == true){
					console.log($(this).val().indexOf('_'))
					if($(this).val().indexOf('_') == -1){
						check_input++;
					}
				} else {
					check_input++;
				}
			}
		});
		
		if(input_length == check_input){
			block.find('.form__send-button').removeClass('button--disabled button--border').addClass('button--fill button--acc').removeAttr('disabled');
		}
	}
	
	$('.user_reg_tab input').keyup(function(){
		var parent_ = $(this).parents('.user_reg_tab');
		checkForValue(parent_);
	});
	/*
	//
	//Страница поиска
	//
	*/
	$('.new--btn-group--shows').click(function(){
		$(this).parent().toggleClass('open');
	});
});