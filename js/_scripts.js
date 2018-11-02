$(function () {


    // onLoad

    // Name function
    (function() {
        var links = $('.catalog-tags__links'),
            link = $('.catalog-tags__link');
        $(window).on('resize', function() {
            autoHideTags()
        })
        function autoHideTags() {
            var linksWidth = links.width();
            link.each(function(i) {
                var linkWidth = $(this).width(),
                position = $(this).position().left;
                if (position+linkWidth > linksWidth) {
                    $(this).attr('aria-hidden', 'true');
                } else {
                    $(this).attr('aria-hidden', 'false');
                }
            })
        }autoHideTags()

        $('.catalog-tags__more-toggle').on('click', function() {
            if ($(this).attr('aria-pressed') == 'true') {
                $(this).attr('aria-pressed', 'false').text('Показать еще');
                $('.catalog-tags').attr('aria-hidden', 'true');
                return
            }
            $(this).attr('aria-pressed', 'true').text('Скрыть');
            $('.catalog-tags').attr('aria-hidden', 'false');
        })
    }());

        function floatingHeader() {
        if (window.pageYOffset > 200) {
            $('.header-floating').attr('aria-hidden', 'false')
            return
        }
        $('.header-floating').attr('aria-hidden', 'true')
    }floatingHeader()

        // Прижать подвал к низу экрана
    function adaptFooter() {
        var heightFootter = $('.footer').outerHeight();
        $('.footer').css('margin-top', heightFootter * -1);
        $('.wrapper').css('padding-bottom', heightFootter);
    }adaptFooter()

        function modalContentSlider(num) {
        var modalContentSlider = new Swiper ('.modal-content-slider', {
            slidesPerView: 1,
            spaceBetween: 0,
            initialSlide: num,
            navigation: {
                prevEl: '.modal-content-slider__arrow.swiper-button-prev',
                nextEl: '.modal-content-slider__arrow.swiper-button-next',
            },
        });
    }

    $('.js-modal-content-slider').on('click', function() {
        modal.open($(this));
        var index = $(this).index();
        setTimeout(function () {
            modalContentSlider(index)
        }, 10);
    });


    // onEvent
    var globalWindowWidth,
        globalScrollPoint;



    // Слушатели событий window
    $(window)
        .on('resize', function() {
            globalWindowWidth = $(window).width();
            adaptFooter();
        })
        .on('load', function() {
            globalWindowWidth = $(window).width();
        });

    window.addEventListener('scroll', function() {
        floatingHeader();
        globalScrollPoint = $(window).scrollTop();
    });

    (function() {
        $(document).on('click', '.js-add-product', function() {
            addProduct.switch($(this))
        });

        var addProduct = {
            switch : function(obj) {
                var method = obj.data('tracking');
                this.id = obj.parents('[data-product-id]').data('product-id');
                this.obj = obj;
                obj.attr('aria-pressed') == 'true'? this.obj.attr('aria-pressed', 'false') : this.obj.attr('aria-pressed', 'true');

                switch (method) {
                    case 'favorites': this.favorites
                        break;
                    case 'comparsion': this.favorites
                        break;
                }
            },
            favorites : function() {
            }
        }

    }());

        (function() {
        var includeCatalogMenuOnPage = true,
            menuVisibleStatus = false;


        $('.catalog-button').on('click', function() {
            checkCatalogMenu.switch($(this));
        });

        var checkCatalogMenu = {
            switch : function(obj) {
              if ($(obj).hasClass('catalog-button--home-page') && window.outerWidth > 1024) {
                return false;
              }
              if (includeCatalogMenuOnPage) {
                  this.toggle()
                  return
              }
              this.obj = obj;
            },
            toggle : function() {
                if (menuVisibleStatus) {
                  $('.list-catalog-ajax').attr('aria-hidden', 'true');
                  menuVisibleStatus = false;
                  return;
                }
                $('.list-catalog-ajax').attr('aria-hidden', 'false');
                menuVisibleStatus = true;
            }
        };

        $(document).on('click', function(e) {
            if ($(e.target).closest('.column-one-base, .catalog-button').length == 0) {
                menuVisibleStatus = true;
                checkCatalogMenu.toggle();
            };
        });
    }());

        (function() {

        // var includeCatalogTileMore = false;


        $('.c-level-zero-more').on('click', function() {
            checkCatalogMenu.switch($(this));
        });

        var checkCatalogMenu = {
            switch : function(obj) {
                // if (includeCatalogTileMore) {
                //     this.toggle()
                //     return
                // }
                this.obj = obj;
                this.ajax();
            },
            ajax : function() {
                var url = this.obj.data('url');

                $.ajax({
                    url: url,
                    success : function(data){
                        var catalogTile = $(data);
                        $('.c-level-zero').append(catalogTile);
                        $('.c-level-zero-more').remove()
                    },
                    error : function(data) {
                        console.error(data);
                    }
                });

                return
            },
            // toggle : function() {
            //     if (menuVisibleStatus) {
            //         $('.list-catalog-ajax').attr('aria-hidden', 'true');
            //         menuVisibleStatus = false;
            //         return;
            //     }
            //     $('.list-catalog-ajax').attr('aria-hidden', 'false');
            //     menuVisibleStatus = true;
            // }
        };

    }());

        (function () {
        $('.cs-filter__toggle-filter').on('click', function() {
            if ($(this).attr('aria-pressed') == 'true') {
                $(this).attr('aria-pressed', 'false');
                $(this).next().attr('aria-hidden', 'true');
                return
            }
            $(this).attr('aria-pressed', 'true');
            $(this).next().attr('aria-hidden', 'false');
        })
    }());


    (function () {
        $(document).on('click', '.cs-filter__more-toggle', function() {
            var _this = $(this);
            if (_this.attr('aria-pressed') == 'true') {
                _this.attr('aria-pressed', 'false').text('Показать все');
                var _thisClone = _this.clone(true);
                _this.prev().before(_thisClone).attr('aria-hidden', 'true');
                _this.remove();
                return
            }
            _this.attr('aria-pressed', 'true').text('Скрыть');
            var _thisClone = _this.clone(true);
            _this.next().after(_thisClone).attr('aria-hidden', 'false');
            _this.remove();

        })
    }());

        (function() {
        $('.cs-nav__toggle-list').on('click', function() {
            var parents = $(this).parents('.cs-nav__item');
            if (parents.attr('aria-hidden') == 'true') {
                // parents.find('.cs-nav__list-box').stop().slideDown();
                // setTimeout(function () {
                    parents.attr('aria-hidden', 'false');
                // }, 300);
                parents.siblings().attr('aria-hidden', 'true')
                // .find('.cs-nav__list-box').stop().slideUp();
                return
            }
            // parents.find('.cs-nav__list-box').stop().slideUp();
            // setTimeout(function () {
                parents.attr('aria-hidden', 'true');
            // }, 300);
        })
    }());

        (function() {
        $('.header-mobile__search-toggle').on('click', function() {
            console.log(456);
            if ($('.search--mobile').attr('aria-hidden') != 'true') {
                $('.search--mobile').attr('aria-hidden', 'true');
                return
            }
            $('.search--mobile').attr('aria-hidden', 'false');
        })
    }());

        $(function () {
        // Слушатель matchMedia с функцией вызова методов реакции на контрольную точку ширины окна браузера в 1001px
        var mq767 = window.matchMedia("(max-width: 767px)");
        mq767.addListener(addListenerWidth767);
        addListenerWidth767(mq767);
        function addListenerWidth767(mq) {
            if (mq.matches) {
                //$('.list-catalog').off('click')
            } else {
                $('.list-catalog').on('click', function() {
                  //  return false;
                });
            }
        }
    })

        $(document).on('click', '.list-catalog__category-link', function() {
        if (globalWindowWidth > 767) {
            return false
        }
    })

        ;(function() {
        $('.ms-menu__link-drop').on('click', function() {
            if ($(this).attr('aria-pressed') != 'true') {
                $(this).attr('aria-pressed', 'true');
                return
            }
            $(this).attr('aria-pressed', 'false');
        });
    }());

        // Слушатель вызова модельного окна
    $('.js-close-modal').on('click', function() {
        modal.close();
    });

    $('.js-open-modal').on('click', function() {
        modal.open($(this))
    });

    // Методы вызова модельного окна
    var modal = {
        init : function() {
            MicroModal.init({
                disableScroll: true
            });
        },
        open : function(obj) {
            // MicroModal.close();
            // var id = '#'+obj.data('container');
            var id = obj.data('container');
            // var obj = $(id).clone(true);
            // $('.modal__container').append(obj);
            // $('.form__input--phone').mask('(999) 999 - 99 - 99');
            // selectLoadData()
            // $('body').attr('mobile-sidebar', 'close');
            // $('mobile-sidebar').attr('aria-hidden', 'true');
            MicroModal.show(id, {
              disableScroll: true
            });
        },
        close : function() {
            MicroModal.close();
        }
    };
    modal.init();

    $('.cs-filter-toggle').on('click', function() {
      var txt = $('.cs-filter').is(':visible') ? 'Открыть фильтры' : 'Скрыть фильтры';
      $(this).find('span').text(txt);
      $('.cs-filter').toggleClass('_open');
    });

        (function() {
        var status = true;
        $('.hamburger').on('click', function() {
            if (status) {
                $(this).attr('aria-pressed', 'true');
                $('body').attr('mobile-sidebar', 'open');
                $('.mobile-sidebar').attr('aria-hidden', 'false');
                status = false;
                return
            }
            $(this).attr('aria-pressed', 'false');
            $('body').attr('mobile-sidebar', 'closed');
            $('.mobile-sidebar').attr('aria-hidden', 'true');
            status = true;
        })
    }());

        $('.form__pass-visible').on('click', function() {
        if ($(this).prev().attr('type') == 'text') {
            $(this).prev().attr('type', 'password')
        } else {
            $(this).prev().attr('type', 'text');
        }
    })

        // Слушатель скролла к верху страницы
    $('.scroll-up').on('click', function() {
        $('html, body').stop().animate({
            scrollTop: 0
        }, 600, 'swing');
    })

        // Слушатель кнопки выбора таба
    $('.tabs-button__select').on('click', function() {
        var _this = $(this);
        onTabs.init(_this)
    });

    var onTabs = {
        init : function(obj) {
            var objectPlace = obj.data('object'),
                animation = obj.data('animation'),
                index = obj.index();

            this.changeActiveButton(obj);

            switch (objectPlace) {
                case 'next': this.fadeAnimation(obj.parent().next().find('.tabs__container'), animation, index)
                    break;
                default:
            }
        },
        fadeAnimation : function(obj, animation, index) {
            obj.eq(index).attr('aria-hidden', 'false').siblings().attr('aria-hidden', 'true');
        },
        changeActiveButton : function(obj) {
            obj.attr('tabs-button', 'active').siblings().attr('tabs-button', 'not-active')
        }
    };

        (function() {
        var trigger = true;
        $('.toggle-text__link').on('click', function() {
            $('.toggle-text__more').slideToggle();
            if (trigger) {
                $(this).text('Скрыть').appendTo('.toggle-text');
                trigger = false;
            } else {
                $(this).text('Подробнее').appendTo('.toggle-text__first').eq(0);
                trigger = true;
            }
        })
    }());

        $(document).on('click mouseenter touchstart', '.js-tooltip', function(evt) {
          evt.stopPropagation();
        var position = $(this).offset(),
            msg = $(this).data('tooltip'),
            color = $(this).data('tooltip-color');
        var template = $('<div />', {
            class : 'tooltip tooltip--'+color ,
            text : msg,
            css : {
                top : position.top,
                left : position.left-10
            }
        }).appendTo('body');
    })

    $(document).on('mouseleave', '.js-tooltip', function() {
        $('.tooltip').remove()
    })

        var globalWindowWidth = $(window).width();
        var globalScrollPoint;



    // Слушатели событий window
    $(window)
        .on('resize', function() {
            globalWindowWidth = $(window).width();
            adaptFooter();
        })
        .on('load', function() {
            globalWindowWidth = $(window).width();
        });

    window.addEventListener('scroll', function() {
        floatingHeader();
        globalScrollPoint = $(window).scrollTop();
    });


    // Init function
    ;(function(){if(jQuery&&jQuery.fn&&jQuery.fn.select2&&jQuery.fn.select2.amd)var e=jQuery.fn.select2.amd;return e.define("select2/i18n/ru",[],function(){function e(e,t,n,r){return e%10<5&&e%10>0&&e%100<5||e%100>20?e%10>1?n:t:r}return{errorLoading:function(){return"Невозможно загрузить результаты"},inputTooLong:function(t){var n=t.input.length-t.maximum,r="Пожалуйста, введите на "+n+" символ";return r+=e(n,"","a","ов"),r+=" меньше",r},inputTooShort:function(t){var n=t.minimum-t.input.length,r="Пожалуйста, введите еще хотя бы "+n+" символ";return r+=e(n,"","a","ов"),r},loadingMore:function(){return"Загрузка данных…"},maximumSelected:function(t){var n="Вы можете выбрать не более "+t.maximum+" элемент";return n+=e(t.maximum,"","a","ов"),n},noResults:function(){return"Совпадений не найдено"},searching:function(){return"Поиск…"}}}),{define:e.define,require:e.require}})();
    ;(function() {
        // $.get('/json/select-group-options2.json', function (data) {
        //
        //     $('.js-select-load-city').select2({
        //          data: data
        //     });
        // })

        var options = {
            url: '/json/select-group-options2.json',
            getValue: 'text',
            list: {
                match: {
                    enabled: true
                }
            },
            theme: 'square'
        };

        $('.js-select-load-city').easyAutocomplete(options);



        function addUserPic (opt) {
        	if (!opt.id) {
        		return opt.text;
        	}
        	var optimage = $(opt.element).data('image');
            // console.log(optimage);
        	if(!optimage){
        		return opt.text;
        	} else {
        		var $opt = $(
                     '<span>' + opt.text + '<svg class="img-flag"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-' + optimage + '"></use></svg></span>'
        		);


        		return $opt;
        	}
        };
        $('.js-base-select').select2({
            minimumResultsForSearch: -1,
            templateResult: addUserPic,
            templateSelection: addUserPic
        });

    }());




    // Isolate function
    ;(function() {
        $('.js-range').ionRangeSlider({
            type: 'double'
        });
        var rangeSliderObj = $('.js-range').data('ionRangeSlider');
        $('.js-range').on('change', function() {
            var val = $(this).val().split(';');
            $('[name="price-from"]').val(val[0]);
            $('[name="price-to"]').val(val[1]);
        });
        $('.js-price-filter').on('input', function() {
            // var data = {
            //     from : $('[name="price-from"]').val(),
            //     to : $('[name="price-to"]').val()
            // }
            rangeSliderObj.update({
                from: $('[name="price-from"]').val(),
                to: $('[name="price-to"]').val(),
            })
        })
    }());

        // Инициация слайдера с функциональными навесами
    (function() {
        if (!$('.swiper-container').length) {
            return
        }

        var insertSlider = new Swiper ('.main-slider', {
            slidesPerView: 1,
            spaceBetween: 0,
            navigation: {
                prevEl: '.main-slider__arrow.swiper-button-prev',
                nextEl: '.main-slider__arrow.swiper-button-next',
            },
            pagination: {
                el: '.main-slider__pagination.swiper-pagination',
                clickable: true
            },
        });

        var insertSlider = new Swiper ('.icon-info--sloider .swiper-container', {
            slidesPerView: 1,
            spaceBetween: 0,
            pagination: {
                el: '.icon-info--sloider .swiper-pagination',
                clickable: true
            },
        });



        var groupNumber = 1,
        ajaxUrlProducSlider = $('.product-cards--slider').data('ajax-content');

        $('.js-load-product-slide').on('click', function functionName() {
            var url = $(this).attr('href');
            $.ajax({
                url: url,
                cache: false,
                success : function(data){
                    $('.product-cards').find('.swiper-wrapper').html('');
                    productCardsSlider.appendSlide(data);
                    productCardsSlider.slideTo(0);
                }
            });
        })
        var productCardsSlider = new Swiper ('.product-cards--slider', {
            slidesPerView: 4,
            slidesPerGroup: 4,
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
                            success : function(data){
                                productCardsSlider.appendSlide(data);
                            },
                            error : function(data) {
                                console.error(data);
                            }
                        });
                    }
                }
            },
        });
    })();

        (function() {

        var tabsButton = $('.tabs-button__item'),
            tabsButtonLine = $('.tabs-button__line');

        var tabs = {
            init : function(obj) {
                if (obj.attr('aria-pressed') === 'true') {
                    return
                }
                this.obj = obj;

                this.changeButton();
            },
            lineAnimation : function(obj) {
                var width = obj.width(),
                    index = obj.index(),
                    modPosition = parseFloat(obj.css('margin-left'));
                switch (index) {
                    case 0: modPosition = 0
                        break;
                    default:
                }
                var position = obj.position().left + modPosition;
                // For more than one tabs
                tabsButtonLine =  obj.siblings('.tabs-button__line');
                tabsButtonLine.css({
                    transform : 'translateX('+position+'px)',
                    width : width
                })
            },
            changeButton : function() {
                this.obj.attr('aria-pressed', 'true').siblings().attr('aria-pressed', 'false');
                this.lineAnimation(this.obj)
            }
        }

        tabsButton.each(function() {
            if ($(this).attr('aria-pressed') === 'true') {
                tabs.lineAnimation($(this));
            }
        });

        tabsButton.on('click', function() {
            tabs.init($(this));
            return false;
        })
    }());

        (function() {
        $('.form__input, .form__textarea').on('input change', function() {
            $(this).val() != ''? $(this).addClass('_no-empty') : $(this).removeClass('_no-empty');
        });

        $('.form__input--phone').mask('(999) 999 - 99 - 99');

        $('[required]').on('change', function() {
            var $this = $(this),
            parent = $this.parent();
            if ($this.val() == '') {
                validError()
            } else {
                validSuccess();
            }
            if ($this.attr('type') == 'email') {
                var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9])+$/;
                if (!filter.test($this.val())) {
                    validError()
                } else {
                    validSuccess();
                }
            }
            function validError() {
                parent.addClass('_error').removeClass('_success');
            }
            function validSuccess() {
                parent.removeClass('_error').addClass('_success');
            }
        });


        $('[required]').on('keyup', function() {
            var $this = $(this),
            parent = $this.parent();
            parent.removeClass('_error');
            var thisForm = $(this).parents('.form'),
                el = thisForm.find('[required]'),
                elLength = el.length;
            var counter = 0;
            el.each(function() {
                if ($(this).val() != '') {
                    counter++;
                }
            });
            var val = $(this).val();
            if (counter == elLength) {
                thisForm.find('.form__send-button').removeClass('button--disabled button--border').addClass('button--fill button--acc').removeAttr('disabled');
            } else {
                thisForm.find('.form__send-button').removeClass('button--fill button--acc').addClass('button--disabled button--border').attr('disabled');
            }
            if (($(this).hasClass('form__input--phone')) && (val.indexOf('_') != -1) ) {
                thisForm.find('.form__send-button').removeClass('button--fill button--acc').addClass('button--disabled button--border').attr('disabled');
            }
        });
        // Проверка при отправке
        var $obj = $('.form').find('.button');
        $obj.on("click", function () {
            var valid = true;
            var $targetForm = $(this).parents('.form');
            $targetForm.find('[required]').map(function () {
                var $this = $(this),
                parent = $this.parent();
                var placeholder = $(this).attr('placeholder');
                if ($this.val() == '') {
                    parent.addClass('_error');
                    valid = false;
                } else {
                    parent.removeClass('_error');
                }

                if ($this.attr('type') == 'email') {
                    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9])+$/;
                    var $email = $targetForm.find('[type="email"]');

                    if (!filter.test($email.val())) {
                        parent.addClass('_error');
                        valid = false;
                    } else {
                        parent.removeClass('_error');
                    }
                }

                if ($this.attr('type') == 'checkbox') {
                    if (!$this.is(':checked')) {
                        parent.addClass('_error');
                        valid = false;
                    } else {
                        parent.removeClass('_error');
                    }
                }
            });

            if (valid) {

                if ($targetForm.hasClass('js-ajax_form')) {
                    var dataForm = $targetForm.serialize(),
                    callback = $targetForm.data('back'),
                    actionURL = $targetForm.attr('action');

                    $.post(actionURL, dataForm, function (data) {
                        window[callback](data);
                    }, 'json');
                } else {
                    $targetForm.submit();
                }
            }
            return false;
        });
    }());

})
