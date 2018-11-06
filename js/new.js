$(function(){
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
	// показать больше
	$('.newScrollHidden-btn').bind('click', function(e) { 
		e.preventDefault();
		console.log('as');
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
});