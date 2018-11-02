$(function () {


    // onLoad

    // Name function
    (function() {
        var links = $('.cart-also-tags__links'),
            link = $('.cart-also-tags__link');
        $(window).on('resize', function() {
            autoHideTags()
        })
        function autoHideTags() {
            var linksWidth = links.width();
            link.attr('aria-hidden', 'false').each(function(i) {
                var linkWidth = $(this).width(),
                position = $(this).position().left;
                if (position+linkWidth > linksWidth) {
                    $(this).attr('aria-hidden', 'true');
                } else {
                    $(this).attr('aria-hidden', 'false');
                }
            })
        }autoHideTags()

        $('.cart-also-tags__more-toggle').on('click', function() {
            if ($(this).attr('aria-pressed') == 'true') {
                $(this).attr('aria-pressed', 'false').text('Показать еще');
                $(this).closest('.cart-also-tags').attr('aria-hidden', 'true');
                autoHideTags();
                return
            }
            $(this).attr('aria-pressed', 'true').text('Скрыть');
            $(this).closest('.cart-also-tags').attr('aria-hidden', 'false');
        })
    }());


    // onEvent
    // =include onEvent/windowsEvents.js
    (function() {
        $('.toggle-item__handle').on('click', function() {
            var parents = $(this).parents('.toggle-item');
            if (parents.attr('aria-hidden') == 'true') {
                parents.attr('aria-hidden', 'false');
                // parents.find('.toggle-item__box').stop().slideDown();
                $(window).trigger('resize');
            } else {
                parents.attr('aria-hidden', 'true');
                // parents.find('.toggle-item__box').stop().slideUp();
            }
        })
    }());


    // Init function
    // =include init/*.js



    // Isolate function
    (function() {

        $('.alphabet__list a').click(function(evt){
            evt.preventDefault();
            var id = $(this).attr('href');
            var top = $(id).offset().top - 69;  // 69 - header height
            // if ($(window).outerWidth() <= 600) {
            //    top = $(id).offset().top - 20;
            // }
            $('body,html').animate({scrollTop: top}, 600);
        });

        function initAlphabetChar(){
            var ww = $(window).width(),
                columns = 4;
            if( ww <= 479 ) columns = 1
            else if( ww <= 768 ) columns = 2
            else if( ww <= 1024 ) columns = 3;
            $('.alphabet__item').each(function(){
                if( $(this).find('li').length <= 8 ) return;
                if( ! $(this).find('.alphabet__item-toggle').length ) {
                    $(this).attr('area-collapsed', 'true').append('<div class="alphabet__item-toggle"><a href="javascript:{}">Показать все</a></div>');
                }
                if( $(this).find('li').length <= 8*columns ) { // 8 element per N column
                    $(this).find('.alphabet__item-toggle').hide();
                } else {
                    $(this).attr('area-collapsed', 'true');
                    $(this).find('.alphabet__item-toggle').show();
                }
            });
        }

        initAlphabetChar();

        $('body').on('click', '.alphabet__item-toggle a', function() {
            var parent = $(this).closest('.alphabet__item');
            if (parent.attr('area-collapsed') == 'true') {
                parent.attr('area-collapsed', 'false');
                // parent.find('.toggle-item__box').stop().slideDown();
            } else {
                parent.attr('area-collapsed', 'true');
                // parent.find('.toggle-item__box').stop().slideUp();
            }
        });

        $(window).resize(function(){
            initAlphabetChar();
        });


    }());

        // Инициация слайдера с функциональными навесами
    (function() {
        if (!$('.swiper-container').length) {
            return
        }

        var cartAlsoSlider = new Swiper ('.cart-also--slider', {
            slidesPerView: 4,
            slidesPerGroup: 4,
            observer: true,
            observeParents: true,
            navigation: {
                prevEl: '.cart-also__arrow.swiper-button-prev',
                nextEl: '.cart-also__arrow.swiper-button-next',
            },
            pagination: {
                el: '.cart-also__pagination.swiper-pagination',
                // dynamicBullets: true,
                clickable: true,
            },
            breakpoints: {
                1300: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                },
                1000: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                },
                670: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                }
            }
        });


        if ($(window).innerWidth() < 601) {
          if (cartAlsoSlider.length) {
            for (var i = 0; i < cartAlsoSlider.length; i++) {
              cartAlsoSlider[i].destroy();
            }
          }
        }


        var cartGiftSlider = new Swiper ('.cart-gift--slider', {
            slidesPerView: 4,
            slidesPerGroup: 4,
            observer: true,
            observeParents: true,
            navigation: {
                prevEl: '.cart-gift__arrow.swiper-button-prev',
                nextEl: '.cart-gift__arrow.swiper-button-next',
            },
            pagination: {
                el: '.cart-gift__pagination.swiper-pagination',
                // dynamicBullets: true,
                clickable: true,
            },
            breakpoints: {
                1300: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                },
                1000: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                },
                670: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                }
            }
        });

        if ($(window).innerWidth() < 601) {
          if (cartGiftSlider.length) {
            for (var i = 0; i < cartGiftSlider.length; i++) {
              cartGiftSlider[i].destroy();
            }
          }
        }

        var videoDetailSlider = new Swiper ('.video-detail--slider', {
            slidesPerView: 3,
            slidesPerGroup: 3,
            observer: true,
            observeParents: true,
            spaceBetween: 20,
            navigation: {
                prevEl: '.product-cards__arrow.swiper-button-prev',
                nextEl: '.product-cards__arrow.swiper-button-next',
            },
            pagination: {
                el: '.product-cards__pagination.swiper-pagination',
                // dynamicBullets: true,
                clickable: true,
            },
            breakpoints: {
                1300: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                },
                670: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                }
            }
        });
    })();

        (function() {

        var tabsButton = $('.infoblocks__tab');

        var tabs = {
            init : function(obj) {
                if (obj.attr('aria-pressed') === 'true') {
                    return
                }
                this.obj = obj;

                this.changeButton();
            },
            changeButton : function() {
                this.obj.attr('aria-pressed', 'true').siblings().attr('aria-pressed', 'false');
            }
        }

        tabsButton.on('click', function() {
            tabs.init($(this));
            return false;
        })
    }());

        (function() {

        // valueStyle = function(s){
        //     return s.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        // }

        $.fn.mtInputQuantity = function(options){
            options = $.extend({
                beforeValue: '',
                afterValue: '',
                valueStyle: false,
                valueParse: false
            }, options || {});
            this.each(function(){
                var $quantity = $(this).is('input') ? $(this).parent() : $(this);
                var $input = $(this).is('input') ? $(this) : $('input[type="text"]', this);
                var value = strToValue($input.val());
                $input.val(valueToStr(value));
                var minVal = 1;
                var maxVal = null;
                var step = 1
                $quantity.addClass('quantity');
                if( $quantity.data('min') != undefined ) {
                    minVal = parseInt($quantity.data('min'));
                }
                if( $quantity.data('max') != undefined ) {
                    maxVal = parseInt($quantity.data('max'));
                }
                if( $quantity.data('step') != undefined ) {
                    step = parseInt($quantity.data('step'));
                }
                if( $quantity.data('max') != undefined ) {
                    if( minVal != null && maxVal != null && maxVal < minVal ) {
                        minVal = 1;
                        maxVal = null;
                    }
                }
                if( ! $('.minus', $quantity).length ) {
                    $quantity.append('<span class="minus no-select">–</span>');
                }
                if( minVal != null && value <= minVal ) {
                    $('.minus', $quantity).addClass('disabled');
                }
                if( ! $('.plus', $quantity).length ) {
                    $quantity.append('<span class="plus no-select">+</span>');
                }
                if( maxVal != null && value >= maxVal ) {
                    $('.plus', $quantity).addClass('disabled');
                }
                $('.minus,.plus', $quantity).on('click', changeVal);
                $input.on('focus', function(){
                    $input.val(strToValue($input.val()));
                }).on('blur', function(){
                    $input.val(valueToStr($input.val()));
                }).on('change', function(){
                    value = strToValue($input.val());
                    if( isNaN(value) ) {
                        value = 1;
                    }
                    if( minVal != null && value < minVal ) {
                        value = minVal;
                    }
                    if( value == minVal ) {
                        $('.minus', $quantity).addClass('disabled');
                    } else {
                        $('.minus', $quantity).removeClass('disabled');
                    }
                    if( maxVal != null && value > maxVal ) {
                        value = maxVal;
                    }
                    if( value == maxVal ) {
                        $('.plus', $quantity).addClass('disabled');
                    } else {
                        $('.plus', $quantity).removeClass('disabled');
                    }
                    $input.val(valueToStr(value));
                });
                function changeVal(){
                    if( $(this).hasClass('disabled') || $input.is(':disabled') ) {
                        return false;
                    }
                    var type = 'select';
                    if( minVal != null && maxVal != null && minVal == maxVal ) {
                        type = 'skip';
                    }
                    if( $(this).hasClass('minus') ) {
                        type = 'dec';
                    } else if( $(this).hasClass('plus') ) {
                        type = 'inc';
                    }
                    switch( type ) {
                        case 'dec':
                            value -= step;
                            break;
                        case 'inc':
                            value += step;
                            break;
                    }
                    if( minVal != null && value <= minVal ) {
                        value = minVal;
                        $('.minus', $quantity).addClass('disabled');
                    }
                    if( value == minVal ) {
                        $('.minus', $quantity).addClass('disabled');
                    } else {
                        $('.minus', $quantity).removeClass('disabled');
                    }
                    if( maxVal != null && value >= maxVal ) {
                        value = maxVal;
                    }
                    if( value == maxVal ) {
                        $('.plus', $quantity).addClass('disabled');
                    } else {
                        $('.plus', $quantity).removeClass('disabled');
                    }
                    $input.val(valueToStr(value)).trigger('change');
                    return false;
                }
                function valueToStr(value){
                    return options.beforeValue+( options.valueStyle ? options.valueStyle.call(this, value) : value )+options.afterValue;
                }
                function strToValue(str){
                    str = str.replace(options.beforeValue, '').replace(options.afterValue, '');
                    v = options.valueParse ? options.valueParse.call(this, str) : parseInt(str.replace(/\D+/g,''));
                    return v*1;
                }
            });
            return this;
        }

        function inputQuantity() {
            $('div.quantity').mtInputQuantity();
        }inputQuantity()

    }());
        (function() {

        function initNavbarWithSep(){
            var ww = $(window).width(),
                columns = 4;
            if( ww <= 479 ) columns = 1
            else if( ww <= 768 ) columns = 2
            else if( ww <= 1024 ) columns = 3;
            $('.page-nav__with-sep').each(function(){
                var $el = $(this),
                    fw = $(this).width(),
                    c = $(this).find('> li').length,
                    iw = 0,
                    p = 0;
                $el.find('> li').css({
                    padding: p
                }).each(function(){
                    iw += $(this).innerWidth();
                });
                console.log('fw='+fw);
                console.log('iw='+iw);
                console.log('c='+c);
                p = Math.floor((fw - iw)/(c*2));
                console.log('p='+p);
                $el.find('> li').css({
                    paddingLeft: p,
                    paddingRight: p
                })
            });
        }

        initNavbarWithSep();

        $(window).resize(function(){
            initNavbarWithSep();
        })


    }());

    // логика для корзины в мобильной версии, чтобы был "допэкран" (нужен аякс)
  $(function functionName() {
    var prosition;
    $('.cart-also-tags__link').on('click', function (evt) {
      evt.preventDefault();
      prosition = $(window).scrollTop();
      var text = $(this).text();
      console.log('нужно запрограммировать ajax-запрос на показ товаров Добавить к заказу');
      var parent = $(this).parent().parent();
      if($(window).innerWidth() < 768) {
      //  var template = '<span class="breadcrumbs__current-page breadcrumbs__current-page--added">' + text + '</span>';
      //  $('.breadcrumbs .breadcrumbs__current-page').addClass('breadcrumbs__link');
      //  $('.breadcrumbs').append(template);

        var currentSlider = $(parent).next('.cart-also--slider');

        $(currentSlider).find('.title-page').text(text);

        $(currentSlider).css({'transform': 'translateX(0)'});
        var height = $(currentSlider).height();
        $('.catalog-sidebar-modal-page').css({'height': height, 'overflow': 'hidden'});
        $('.cart-also__show-more-btn').on('click', function (evt) {
          evt.preventDefault();
          console.log('Загрузка товаров');
          // Определить и задать новую высоту блока
          height = $(currentSlider).height();
          $('.catalog-sidebar-modal-page').css({'height': height, 'overflow': 'hidden'});
        });
        $('.catalog-content__prev-link').on('click', function (evt) {
          evt.preventDefault();
          $('.catalog-sidebar-modal-page').css({'height': '', 'overflow': ''});
          $(parent).next('.cart-also--slider').css({'transform': ''});

        //  $('.breadcrumbs .breadcrumbs__current-page').removeClass('breadcrumbs__link');
        //  $('.breadcrumbs__current-page--added').remove();
          $('body,html').animate({
            scrollTop: prosition
          }, 300);
        });

        var top = $(parent).next('.cart-also--slider').offset().top - 90;
        setTimeout(function () {
          $('body,html').animate({
            scrollTop: top
          }, 300);
        }, 350);
      }

    });
  }());

})
