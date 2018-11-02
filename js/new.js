$(function(){
	$('._new-delivery_carousel ._new-delivery_carouselItem ._new-delivery_carouselImage').click(function(){
		$(this).parents('._new-delivery_carousel').find('._new-delivery_carouselItem').removeClass('active');
		$(this).parents('._new-delivery_carouselItem').addClass('active');
	});
});