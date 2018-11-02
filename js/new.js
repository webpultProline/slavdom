$(function(){
	if($('._new-delivery_carousel').length > 0){
		$('._new-delivery_carouselBot').slick({
			arrows: false,
			dots: true,
			infinite: false,
			speed: 300,
			slidesToShow: 1,
			slidesToScroll: 1,
		});
		
		$('._new-delivery_carouselBot').on('afterChange', function(event, slick, currentSlide, nextSlide){
			$('._new-delivery_carousel ._new-delivery_carouselItem').removeClass('active');
			$('._new-delivery_carousel ._new-delivery_carouselItem[data-slide="'+currentSlide+'"]').addClass('active');
		});
		
		$('._new-delivery_carousel ._new-delivery_carouselItem ._new-delivery_carouselImage').click(function(){
			$(this).parents('._new-delivery_carousel').find('._new-delivery_carouselItem').removeClass('active');
			$(this).parents('._new-delivery_carouselItem').addClass('active');
			//
			var slideCountThis = parseInt($(this).parents('._new-delivery_carouselItem').attr('data-slide'),10);
			$(this).parents('._new-delivery_carousel').find('._new-delivery_carouselBot').slick('slickGoTo',slideCountThis);
		});
	}
});