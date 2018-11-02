$(document).ready(function () {

  // Разные плагины для запуска fancybox - в галереи или просто увеличение.
  // Предполагается возможность разных настроек
  $(".fancybox-zoom").fancybox({
    scrolling: 'no',
    beforeShow: function () {
      $("html").css({
        'overflow-y': 'hidden'
      });
    },
    afterClose: function () {
      $("html").css({
        'overflow-y': 'visible'
      });
    }
  });

  $(".fancybox-gallery").fancybox({
    animationEffect: 'fade',
    scrolling: 'no',
    aspectRatio: true
  });

  // Плавающий блок
  if ($(".fixed-content").length) {
    $(".fixed-content").stick_in_parent({
      'offset_top': 90
    }).on("sticky_kit:stick", function (e) {});
  };
  $(window).resize(function () {
    if ($(".fixed-content").length) {
      if (window.outerWidth > 991) {
        $(".fixed-content").stick_in_parent().on("sticky_kit:stick", function (e) {});
      } else {
        if (('.fixed-content.is_stuck').length) {
          $(".fixed-content").trigger("sticky_kit:detach");
        }
      }
    }
  });

  // Меню категорий для мобильной версии
  if (window.outerWidth < 992) {
    $('.gallery-menu').on('click', function () {
      var galleryMenu = $(this);
      galleryMenu.addClass('active');
      $(this).find('.gallery-menu__item').on('click', function (evt) {
        evt.stopPropagation();
        $('.gallery-menu__item').removeClass('active');
        $(this).addClass('active');
        $(galleryMenu).removeClass('active');
        $('.gallery-menu__item').off('click');
      });
    });
  } else {
    $('.gallery-menu__item').on('click', function (evt) {
      evt.preventDefault();
      $('.gallery-menu__item').removeClass('active');
      $(this).addClass('active');
    });
  };

  //  Методы вызова модального окна

  // Не для боя
  function prevObj() {
    var index = $('.modal-objects:visible').data('index');
    if (index > 1) {
      //console.log('prev');
      $('.modal-objects[data-index="' + index + '"]').hide();
      $('.modal-objects[data-index="' + (index - 1) + '"]').show();
      //    data-index="<?=$i?>"
    }
  }

  function nextObj() {
    var index = $('.modal-objects:visible').data('index');
    if ($('.modal-objects[data-index="' + (index + 1) + '"]').length > 0) {
      //console.log('next');
      $('.modal-objects[data-index="' + index + '"]').hide();
      $('.modal-objects[data-index="' + (index + 1) + '"]').show();
    }
  }

  // END Не для боя

  //  Методы вызова модального окна
  var modalGallery = {
    init: function () {
      MicroModal.init({
        disableScroll: true,
        closeTrigger: 'data-micromodal-close-gallery'
      });
    },
    open: function (obj) {
      var id = obj.data('container');
      MicroModal.show(id, {
        disableScroll: true,
        closeTrigger: 'data-micromodal-close-gallery',
      });
      this.updateSlider(id);


    },
    close: function () {
      //$('.modal-gallery__main-slider').slick('unslick');
      //$('.main-slider--thumbs').slick('unslick');
      MicroModal.close();
    },
    updateSlider: function (id) {
        setTimeout(function () {
            if ($('#' + id).find('.product-cards-gallery--slider').length) {
                var productCardsSlider = new Swiper('.product-cards-gallery--slider', {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 20,
                    navigation: {
                        prevEl: '.product-cards__arrow.swiper-button-prev',
                        nextEl: '.product-cards__arrow.swiper-button-next',
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    on: {
                        slideChangeTransitionStart: function () {
                            // var length = $('.product-cards__box').length;
                            // if ($('.product-cards__box.swiper-slide-active').index() == (length - 4)) {
                            //   $.ajax({
                            //     url: ajaxUrlProducSlider,
                            //     cache: false,
                            //     success: function (data) {
                            //       productCardsSlider.appendSlide(data);
                            //     }
                            //   });
                            // }
                        }
                    },
                    breakpoints: {
                        600: {
                            slidesPerView: 1,
                            slidesPerGroup: 1,
                        }
                    },
                });
            };

            if ($('#' + id).find('.modal-gallery__main-slider').length) {

                $('.modal-gallery__main-slider.slick-initialized').slick('unslick');


                $('.modal-gallery__main-slider:visible').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                    prevArrow: '<div class="main-slider__arrow swiper-button-prev"><svg class="swiper-button-icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-che-l"></use></svg></div>',
                    nextArrow: '<div class="main-slider__arrow swiper-button-next"><svg class="swiper-button-icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-che-r"></use></svg></div>',
                    asNavFor: '.main-slider--thumbs'
                });

                $('.main-slider--thumbs.slick-initialized', $('#' + id)[0]).slick('unslick');

                $('.main-slider--thumbs:visible').slick({
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    asNavFor: '.modal-gallery__main-slider',
                    prevArrow: '<div class="main-slider__arrow swiper-button-prev"><svg class="swiper-button-icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-che-l"></use></svg></div>',
                    nextArrow: '<div class="main-slider__arrow swiper-button-next"><svg class="swiper-button-icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-che-r"></use></svg></div>',
                    focusOnSelect: true,
                    responsive: [{
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 3
                        }
                    }]
                });
            };

            $('.fancybox-gallery').fancybox();
        }, 300);
    }
  };

  modalGallery.init();

  //Обновление слайдеров при переключении объектов в Галереии объектов
    if ($('#modal-gallery').length >0) {
        $(document).on('click', '#modal-gallery .modal-gallery__arrow--prev', function () {
            prevObj();
            var index = $('.modal-objects:visible').data('index');
            modalGallery.updateSlider('modal-gallery [data-index="'+index+'"]');
        });
        $(document).on('click', '#modal-gallery .modal-gallery__arrow--next', function () {
            nextObj();
            var index = $('.modal-objects:visible').data('index');
            modalGallery.updateSlider('modal-gallery [data-index="'+index+'"]');
        });
    }

    //  Слушатель вызова модельного окна

    $('.js-open-modal-2').on('click', function (evt) {
      evt.preventDefault();
      modalGallery.open($(this));
    });

    $('.modal__close.modal__close-gallery').on('click touchstart', function (evt) {
      evt.preventDefault();
      modalGallery.close();
    });

  // Swiper slider для разных блоков

  var brandDocSlider = new Swiper('.brand__doc-slider', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      //dynamicBullets: true
    },
    watchOverflow: true,
    breakpoints: {
      991: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      600: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      }
    },
  });

  var productCardPromoSlider = new Swiper('.product-card__promo-slider', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    navigation: {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next',
    }
  });

  var productCardsSliderSmall = new Swiper('.product-cards--slider-small', {
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 20,
    navigation: {
      prevEl: '.product-cards__arrow.swiper-button-prev',
      nextEl: '.product-cards__arrow.swiper-button-next',
    },
    on: {
      slideChangeTransitionStart: function () {
        var length = $('.product-cards__box').length;
        if ($('.product-cards__box.swiper-slide-active').index() == (length - 3)) {
          $.ajax({
            url: ajaxUrlProducSlider,
            cache: false,
            success: function (data) {
              productCardsSlider.appendSlide(data);
            }
          });
        }
      }
    },
    breakpoints: {
      1199: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      800: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      }
    },
  });

  if ($('.product-card__slider-main').length) {
    $('.product-card__slider-main').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      dots: true,
      dotsClass: 'swiper-pagination swiper-pagination--theme-1',
      prevArrow: '<div class="swiper-button-prev"><svg class="swiper-button-icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-che-l"></use></svg></div>',
      nextArrow: '<div class="swiper-button-next"><svg class="swiper-button-icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-che-r"></use></svg></div>',
      asNavFor: '.product-card__slider-thumbs'
    });

    $('.product-card__slider-thumbs').slick({
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
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3
          }
        }
      ]
    });
  }

  if (window.innerWidth < 768) {

    var personsSliderSwiper = new Swiper('.persons-slider--swiper', {
      breakpoints: {
        1024: {
          slidesPerView: 2
        },
        600: {
          slidesPerView: 1
        }
      },
      pagination: {
        autoHeight: true,
        el: '.swiper-pagination',
        clickable: true
      }
    });
  }

  var pcPhotoGallerySlider = new Swiper('.pc-photo-gallery__slider', {
    slidesPerView: 'auto',
    spaceBetween: 4,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      1024: {
        //  slidesPerView: 2,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      600: {
        slidesPerView: 1,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  });

  var pcProductVideoSlider = new Swiper('.pc-product-video__slider', {
    loop: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  });

  var storeGallerySlider = new Swiper('.store-gallery__slider', {
    loop: false,
    slidesPerView: 3,
    spaceBetween: 4,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      991: {
        slidesPerView: 2
      },
      600: {
        slidesPerView: 1,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  });

  // Аккордеон для модального окна галереи
  $('.modal-gallery__accordion-title').on('click', function () {
    $(this).find('.modal-gallery__accordion-chevrone').toggleClass('opened');
    $(this).next('.modal-gallery__accordion-content').slideToggle();
  });

  $('.toggle-menu').on('click', function () {
    $(this).toggleClass('active');
  });

  // Табы в карточке товара
  $('.product-card__product-options .tab-menu a').on('click', function (evt) {
    evt.preventDefault();
    var id = $(this).attr('href');
    $('.product-card__product-options .tab-menu li').removeClass('active');
    $(this).parent().addClass('active');
    $('.tab-content__tab').removeClass('active');
    $(id).addClass('active');

    if ($(id).find('.product-cards--slider-price-down').length) {
      var productCardsSliderPriceDown = new Swiper('.product-cards--slider-price-down', {
        slidesPerView: 2,
        spaceBetween: 10,
        breakpoints: {
          1430: {
            slidesPerView: 1
          },
          600: {
            slidesPerView: 1
          }
        },
        navigation: {
          prevEl: '.product-cards__arrow.swiper-button-prev',
          nextEl: '.product-cards__arrow.swiper-button-next',
        }
      });
    }
  });

  // Развернуть варианты, спрятаные под спойлер в карточке товара
  $('.product-card .show-more').on('click', function (evt) {
    evt.preventDefault();
    $(this).addClass('show');
    $(this).hide();
  });

  // Развернуть варианты, спрятаные под спойлер в таблице описания товара
  $('.about-table .more-toggle').on('click', function (evt) {
    evt.preventDefault();
    $(this).addClass('show');
    $(this).hide();
  });

  // Кастомизация скролла
  if ($('.js-scrollbar').length) {
    $('.js-scrollbar').jScrollPane({
      horizontalDragMaxWidth: 0
    });
  };

  // Класс для медленного скролллинга по якорю
  $('a.lazy-scroll').on('click', function (evt) {
    evt.preventDefault();
    var id = $(this).attr('href');
    var top;
    if ($(id).length) {
      top = $(id).offset().top - 235;
    } else {
      return false;
    }
    if ($(window).outerWidth() <= 600) {
      top = $(id).offset().top - 20;
    }
    $('body,html').animate({
      scrollTop: top
    }, 600);
  });

  // Фиксация меню в карточке товара при скролле
  if ($('.product-card__menu').length) {
    var productCardMenuTop = $('.product-card__menu').offset().top;
    $(document).on('scroll', function () {
      if ($(document).scrollTop() > productCardMenuTop - 70) {
        $('.product-card__menu').addClass('fixed');
      } else {
        $('.product-card__menu').removeClass('fixed');
      }
    });
  };

  // Стилизация селектов
  $('.select2-style').select2();

  // Функция для стилизации меню в карточке товара
  (function () {

    var tabsButton = $('.tabs-button__flow-item'),
      tabsButtonLine = $('.tabs-button__flow-line');

    var tabs = {
      init: function (obj) {
        if (obj.attr('aria-pressed') === 'true') {
          return
        }
        this.obj = obj;

        this.changeButton();
      },
      lineAnimation: function (obj) {
        var width = obj.width(),
          index = obj.index(),
          modPosition = 27;
        switch (index) {
        case 0:
          modPosition = 0
          break;
        default:
        }
        var position = obj.position().left + modPosition;

        tabsButtonLine.css({
          transform: 'translateX(' + position + 'px)',
          width: width
        })
      },
      changeButton: function () {
        this.obj.attr('aria-pressed', 'true').siblings().attr('aria-pressed', 'false');
        this.lineAnimation(this.obj)
      }
    }

    tabsButton.each(function () {
      if ($(this).attr('aria-pressed') === 'true') {
        tabs.lineAnimation($(this));
      }
    });

    var timeOut = 200;

    tabsButton.on('click', function () {
      var id = $(this).attr('href');
      var top = $(id).offset().top - 180;
      tabs.init($(this));
      $('body,html').animate({
        scrollTop: top
      }, 600);
      timeOut = 1000;
      return false;
    });

    $(document).on('scroll', function () {
      setTimeout(function () {
        tabsButton.each(function () {
          var id = $(this).attr('href');
          var topPosition = $(id).offset().top - 180;
          if ($(document).scrollTop() > topPosition - 180) {
            tabs.init($(this));
            if ($(this).attr('aria-pressed') === 'true') {
              tabs.lineAnimation($(this));
            }
          } else {}
        });
        timeOut = 200;
      }, timeOut);

    });

  }());

  // Простмотр увеличенного видео
  $('.pc-product-video__slider .swiper-slide a').on('click', function (evt) {
    evt.preventDefault();
    $('.pc-product-video__slider .swiper-slide a').removeClass('video-play');
    $(this).addClass('video-play');
    var href = $(this).attr('href');
    var fullVideo = $(this).closest('.pc-video-block').find('.pc-video__full iframe');
    fullVideo.attr('src', href);
  });

  // Стилизация цвета кнопки при добавлении в корзину
  $('.pc-buy-block__actions .product-cards__add-cart').on('click', function () {
    $(this).addClass('product-cards__add-cart--success');
  });

  // Запуск слайдера

  var productCardsSlider = new Swiper('.product-cards--slider', {
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
      900: {
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
    },
  });

  // Обновление слайдеров в табах
  $('.js-load-product-slide-new').on('click', function functionName() {
    var id = $(this).attr('href');
    if (!$(id).length) {
      console.log("Не найден id по href ссылки");
      return
    }
    $('.content__tab').removeClass('active');
    $(id).addClass('active');
    for (var i = 0; i < productCardsSlider.length; i++) {

      if ($(id).find(productCardsSlider[i].$el).length) {
        productCardsSlider[i].update();
      }
    }

  });

  // Появление подсказки
  $('.js-hint').on('click', function (evt) {
    evt.preventDefault();
    var hint = $(this)
    $(hint).addClass('active');
    $(hint).find('.hint-close-btn').on('click', function () {
      $(hint).removeClass('active');
    });
    $(document).on('click', function () {
      $(hint).removeClass('active');
    });
  });

  // Раскрытие меню на мобильной версии
  if (window.outerWidth < 601) {
    $('.pc-mobile-content-tab').removeClass('active');
  }

  $('.pc-mobile-menu__category-link').on('click', function (evt) {
    evt.preventDefault();
    $(this).toggleClass('opened');
    // $('.pc-mobile-content-tab').removeClass('active');
    var id = $(this).attr('href');
    $(id).toggleClass('active');
    if ($(this).hasClass('js-load-product-slide-mobile')) {
      for (var i = 0; i < productCardsSlider.length; i++) {
        if ($(id).find(productCardsSlider[i].$el).length) {
          productCardsSlider[i].update();
        }
      }
    };

    if ($(id).find('.product-cards--slider-small').length) {
      setTimeout(function () {
        for (var i = 0; i < productCardsSliderSmall.length; i++) {
          if ($(id).find(productCardsSliderSmall[i].$el).length) {
            productCardsSliderSmall[i].update();
          }
        };
      }, 500);
    }

    if ($(id).find('.pc-product-video__slider').length) {
      setTimeout(function () {
        pcProductVideoSlider.update();
      }, 500);
    }

  });

  // Маска для номера телефона, где не стоит +7
  $('.form__input--phone-full').mask('+7 (999) 999 - 99 - 99');

  // Показ скрытого контента в калькуляторах
  $('.pc-calcs__item--show-more').on('click', function (evt) {
    evt.preventDefault();
    $(this).nextAll('.pc-calcs__item').show();
    $(this).hide();
  });

  // Оформление заказа - стилизация инпутов
  if (window.outerWidth < 601) {

    $('.order-form__input').on('focus', function () {
      $(this).parent().addClass('_focus');
    });

    $('.order-form__input').on('blur', function () {
      $(this).parent().removeClass('_focus');
      if ($(this).val() !== '') {
        $(this).parent().addClass('_filled');
      }
    });

    $('.order-form__search-group .search__input').on('focus', function () {
      $(this).parent().parent().addClass('_focus');
    });

    $('.order-form__search-group .search__input').on('blur', function () {
      $(this).parent().parent().removeClass('_focus');
      if ($(this).val() !== '') {
        $(this).parent().parent().addClass('_filled');
      };
    });

    $('.order-form__textarea .form__textarea').on('focus', function () {
      $(this).parent().addClass('_focus');
    });

    $('.order-form__textarea .form__textarea').on('blur', function () {
      $(this).parent().removeClass('_focus');
      if ($(this).val() !== '') {
        $(this).parent().addClass('_filled');
      };
    });

  };

  // Tooltip для html контента
  $(document).on('click mouseenter touchstart', '.js-tooltip-html', function (evt) {
    evt.stopPropagation();
    var position = $(this).offset(),
      width = $(this).width(),
      msg = $(this).data('tooltip'),
      color = $(this).data('tooltip-color') || 'black';
    windowWidth = $(window).outerWidth();

    if ((position.left + 160) > windowWidth || (position.left - 160) < 0) {
      var left;
      if ((position.left + 160) > windowWidth) {
        left = windowWidth - 160;
      } else if ((position.left - 160) < 0) {
        left = 160;
      }
      var template = $('<div />', {
        class: 'tooltip tooltip--html tooltip--html-nocursor tooltip--' + color,
        html: msg,
        css: {
          top: position.top,
          left: left
        }
      }).appendTo('body');

      var templateCoursor = $('<div />', {
        class: 'tooltip-coursor',
        css: {
          top: position.top - 2,
          left: position.left + (width / 2)
        }
      }).appendTo('body');
      return false;
    };

    var template = $('<div />', {
      class: 'tooltip tooltip--html tooltip--' + color,
      html: msg,
      css: {
        top: position.top,
        left: position.left + (width / 2)
      }
    }).appendTo('body');
  })

  $(document).on('mouseleave', '.js-tooltip-html', function () {
    $('.tooltip').remove();
    $('.tooltip-coursor').remove();
  });

  $(document).on('click touchstart', function (evt) {
    if ($('.tooltip').length) {
      $('.tooltip').remove();
      $('.tooltip-coursor').remove();
    }
  });

  (function () {
    function toggleTabs(tab) {
      var id = tab;
      $(id).siblings('.content-tab').removeClass('active');
      $(id).addClass('active');
    };
    function setLocation(curLoc){
      try {
        history.pushState(null, null, curLoc);
        return;
      } catch(e) {}
      location.hash = '#' + curLoc;
  };
    if ($('.tabs-button__item.js-show-tab').length && $(window.location.hash).length) {
      var hash = window.location.hash;
      toggleTabs(hash);
    }
    $('.js-show-tab').on('click', function (evt) {
      var id = $(this).attr('href');
      toggleTabs(id);
      setLocation(id);
    });

  }());


  $('.contacts-map__toggle').on('click', function () {
    $(this).parent().toggleClass('opened');
  });

  $('.order-form__fieldset-legend').on('click', function () {
    if (window.outerWidth < 601) {
      $(this).parent().toggleClass('opened');
    }
  });

  function countBrandCat() {
    $('.brand-card').each(function () {
      //      var self = $(this);
      //      var height = $(self).height()
      //                    - parseFloat($(self).find('.brand-card__box').css('padding-top'))
      //                    - parseFloat($(self).find('.brand-card__box').css('padding-bottom'))
      //                    - $(self).find('.brand-card__image').outerHeight(true)
      //                    - $(self).find('.brand-card__title').outerHeight(true)
      //                    - $(self).find('.brand-card__subtitle').outerHeight(true);
      //      var count = 0;
      //      if (height > 61) {
      //        var brandsCat = $(self).find('.brand-card__list-item');
      //        height -= 37;
      //        brandsCat.each(function () {
      //          if (height > $(this).height()) {
      //            $(this).attr('aria-hidden', 'false');
      //            count++;
      //            height -= $(this).height();
      //          }
      //        });
      //        $(self).find('.brand-card__link--more').attr('aria-hidden', 'false');
      //      }
      var itemsNumber = $(this).find('.brand-card__list-item').length;
      $(this).find('.brand-card__link--more').text('Показать еще ' + (itemsNumber - 4));
    });
  }
  countBrandCat();

  $('.brand-card__link--more').on('click', function (evt) {
    evt.preventDefault();
    var box = $(this).parents('.brand-card__box');
    var list = $(this).prev('.brand-card__list');
    var itemsNumber = $(list).find('.brand-card__list-item').length;
    if (box.hasClass('opened')) {
      $(list).find('.brand-card__list-item:not(:nth-child(-n + 4))').attr('aria-hidden', 'true');
      $(this).text('Показать еще ' + itemsNumber);
      box.removeClass('opened');
    } else {
      $(list).find('.brand-card__list-item').attr('aria-hidden', 'false');
      $(this).text('Скрыть');
      box.addClass('opened');
    }
  });

  $('.subbrends-btn--show-more').on('click', function (evt) {
    evt.preventDefault();
    if ($(this).prev('.subbrends__wrapper').hasClass('opened')) {
      $(this).prev('.subbrends__wrapper').removeClass('opened');
      $(this).text('Показать все');
    } else {
      $(this).prev('.subbrends__wrapper').addClass('opened');
      $(this).text('Скрыть');
    }
  });

  if (window.outerWidth < 601) {
    $('.brand-mobile-menu__title').on('click', function () {
      var content = $(this).nextAll('.brand-mobile-menu__content');
      $(this).toggleClass('opened');
      content.toggleClass('opened');
      if (content.find('.brand__doc-slider').length) {
        brandDocSlider.update();
      }
    });
  }

  $('.file-btn--show-more').on('click', function (evt) {
    evt.preventDefault();

    if ($(this).prev('.file__wrapper').hasClass('opened')) {
      $(this).prev('.file__wrapper').removeClass('opened');
      $(this).text('Показать все');
    } else {
      $(this).prev('.file__wrapper').addClass('opened');
      $(this).text('Скрыть');
    }
  });

  $('.order-form__radio-group input').change(function () {
    var name = $(this).attr('name');
    if ($(this).attr('data-subform')) {
      var id = '#' + $(this).attr('data-subform');
      $(id).slideDown();
    } else {
      $(this).parent().parent().nextAll('.order-form__hidden-content').slideUp();
      return false;
    }
  });

  $('.form__flag-wrap input').on('change', function () {
    var top = $(this).parent().position().top + ($(this).parent().height() / 2);
    var time = 5000;
    $('.cs-filter__count-wrapper').show().css('top', top);

    setTimeout(function () {
      $('.cs-filter__count-wrapper').hide();
    }, time);
  });

  $('.add-catalog__link').on('click', function (evt) {
    evt.preventDefault();
    var id = $(this).attr('href');
    $('.add-catalog__link').removeClass('_current');
    $(this).addClass('_current');
    $('.add-catalog__tab').removeClass('active');
    $(id).addClass('active');
    for (var i = 0; i < productCardsSliderSmall.length; i++) {
      if ($(id).find(productCardsSliderSmall[i].$el).length) {
        productCardsSliderSmall[i].update();
      }
    };
  });

  $('.alphabet-list__toggle').on('click', function () {
    if ($(this).attr('aria-pressed') != 'true') {
      $(this).parent().attr('aria-pressed', 'true');
      $(this).attr('aria-pressed', 'true');
      return
    }
    $(this).parent().attr('aria-pressed', 'false');
    $(this).attr('aria-pressed', 'false');
  });

  // Ссылка в каталоге на детальной странице брендов (нужен аякс)

  if ($(window).innerWidth() < 768) {
    $('.brands__catalog .cs-nav__section-link._current').removeClass('_current');
  }

  $(function () {
    var position;
    $('.brands__catalog .cs-nav__section-link').on('click', function (evt) {
      evt.preventDefault();
      position = $(window).scrollTop();
      var text = $(this).text();
      console.log('нужно запрограммировать ajax-запрос на показ товаров определенного бренда');
      $('.brands__catalog .cs-nav__section-link._current').removeClass('_current');
      $(this).addClass('_current');
      if ($(window).innerWidth() < 992) {
        var timeout = 10;
        if ($(window).innerWidth() < 768) {

          //  var template = '<span class="breadcrumbs__current-page breadcrumbs__current-page--added">' + text + '</span>';
          //  $('.breadcrumbs .breadcrumbs__current-page').addClass('breadcrumbs__link');
          //  $('.breadcrumbs').append(template);

          $('.brands__catalog').find('.title-page').text(text);
          $('.brands__catalog .catalog__content').css({
            'transform': 'translateX(0)'
          });

          var height = $('.brands__catalog .catalog__content').height();
          $('.catalog-sidebar-modal-page').css({
            'height': height,
            'overflow': 'hidden',
            'margin-bottom': '25px'
          });
          timeout = 300;
          $('.catalog-content__prev-link').on('click', function (evt) {
            evt.preventDefault();
            var scrollPosition = position;
            $('.catalog-sidebar-modal-page').css({
              'height': '',
              'overflow': '',
              'margin-bottom': ''
            });
            $('.brands__catalog .catalog__content').css({
              'transform': ''
            });

            //    $('.breadcrumbs .breadcrumbs__current-page').removeClass('breadcrumbs__link');
            //    $('.breadcrumbs__current-page--added').remove();
            setTimeout(function () {
              $('body,html').animate({
                scrollTop: scrollPosition
              }, 300);
            }, 300);
          });
        }

        var top = $('.brands__catalog .catalog__content').offset().top - 90;
        setTimeout(function () {
          $('body,html').animate({
            scrollTop: top
          }, 300);
        }, timeout);
      }
    });
  }());

  if ($('input[data-id]:checked')) {
    var id = '#' + $('input[data-id]:checked').attr('data-id');
    $(id).slideDown();
  }

  $('input[data-id]').on('change', function () {
    if ($(this).prop('checked')) {
      $('.radio-button-tab:visible').hide();
      var id = '#' + $('input[data-id]:checked').attr('data-id');
      $(id).slideDown();
    }
  });

  $('.person__box-wrapper .bottom-link a').on('click', function (evt) {
    evt.preventDefault();
    var parent = $(this).parents('.person__box');
    $(parent).siblings().each(function () {
      if ($(this).hasClass('opened')) {
        $(this).removeClass('opened');
        $(this).find('.person__contact-info').hide();
      }
    });
    $(parent).toggleClass('opened');
    $(parent).find('.person__contact-info').toggle();
  });

  (function () {
    if ($('.list-catalog__wrapper').length) {
      function autoHideLink(el) {
          var newHeight = 0;
          var link = el.find('.list-catalog-drop__item');

          link.each(function(i) {
              var linkHeight = $(this).height();
              if (newHeight+linkHeight > linksHeight) {
                  $(this).attr('aria-hidden', 'true');
              } else {
                  newHeight += linkHeight;
                  $(this).attr('aria-hidden', 'false');
              }

          });
          if ((newHeight + 40) < linksHeight) {
            el.find('.list-catalog-drop__more-link').attr('aria-hidden', 'true');
          }
      };
      $('.list-catalog__wrapper .list-catalog-drop__column').each(function () {
        var links = $(this),
            moreLinkHeight = $(this).find('.list-catalog-drop__more-link').height();
            linksHeight = 400 - moreLinkHeight - 20;
        autoHideLink($(this));
      });
    }

    $('.list-catalog-drop__more-link').on('click', function(evt) {
      evt.preventDefault();
        if ($(this).attr('aria-pressed') == 'true') {
            $(this).attr('aria-pressed', 'false').text('Показать еще');
            $(this).parents('.list-catalog-drop__column').attr('aria-hidden', 'true');
            return
        }
        $(this).attr('aria-pressed', 'true').text('Скрыть');
        $(this).parents('.list-catalog-drop__column').attr('aria-hidden', 'false');
    });
    $('.list-catalog__toggle-btn').on('click', function(evt) {
      evt.preventDefault();
        if ($(this).attr('aria-pressed') == 'true') {
            $(this).attr('aria-pressed', 'false').find('span').text('Раскрыть все');
            $(this).prev().toggleClass('opened');
            $(this).parent().find('.list-catalog-drop__column').attr('aria-hidden', 'true');
            return
        }
        $(this).attr('aria-pressed', 'true').find('span').text('Свернуть все');
        $(this).parent().find('.list-catalog-drop__column').attr('aria-hidden', 'false');
        $(this).prev().toggleClass('opened');
    });
  }());

  $('.form-upload__input').on('change', function () {
    var filename = 'Прикрепленный файл: ' + $(this).val().replace(/.*\\/, "");
    $(this).parent().addClass('file-uploaded');
    $(this).next('.form-upload__browse').hide();
    $(this).parent().find('.form-upload__file-name').text(filename);
  });

});
