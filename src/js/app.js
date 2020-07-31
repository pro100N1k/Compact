import { detectBrowser } from './_helpers';

import 'slick-carousel';
import '@fancyapps/fancybox';
import 'jquery-validation';
import '../../node_modules/selectric/public/jquery.selectric.min';

class Application {
    constructor() {
        Application.init();
    }

    static initializePlugins() {
        // INIT YOUR PLUGINS
    };

    static initializeModules() {
        $(document).ready(function() {

            $("form").each(function() { //Change
                var th = $(this);
                th.validate({
                    rules: {
                        phone: {
                            required: true
                        }
                    },
                    messages: {},
                    errorPlacement: function(error, element) {},
                    submitHandler: function(form) {
                        var thisForm = $(form);
                        console.log(thisForm.serialize());
                        $.ajax({
                            type: "POST",
                            url: thisForm.attr('action'),
                            data: th.serialize()
                        }).done(function() {
                            // Done Functions
                            $.fancybox.close();
                            $.fancybox.open({
                                src: '#modal-thanks',
                            });

                            setTimeout(function() {
                                //submitForm = false
                                $.fancybox.close();
                            }, 3000);

                            th.trigger("reset");
                        });
                        return false;
                    },

                    success: function(element) {
                        $(element).parent().addClass('happy');
                    },
                    highlight: function(element, errorClass) {
                        $(element).parent().addClass('error');
                    },
                    unhighlight: function(element, errorClass, validClass) {
                        $(element).parent().removeClass('error');
                    }
                })
            });

            $('.fancybox').fancybox({
                touch: false
            });

            $('.search__submit').on('click', function(e) {
                e.preventDefault();

                const _this = $(this);
                const wrapper = _this.closest('.search');
                const inpt = wrapper.find('.search__input');
                const incClose = wrapper.find('.search__close');

                if(!wrapper.hasClass('.search--open')) {
                    wrapper.addClass('search--open');
                } else {
                    wrapper.removeClass('search--open');
                }

                incClose.on('click', function() {
                    wrapper.removeClass('search--open');
                })

            })

            $('.js-select').selectric();

            $(document).on('click', '.js-btn-calc', function (event) {
                event.preventDefault();

                let _this = $(this),

                    wrapper = _this.closest('.order-form'),

                    output = wrapper.find('.js-field'),

                    startVal = output.text() ? Number(output.text()) : 0,

                    btn = wrapper.find('.js-btn-order ');


                if (_this.hasClass('js-btnDec')) {

                    startVal = (startVal === 0) ? 0 : startVal - 1;

                } else {
                    startVal = startVal + 1;
                }

                if(startVal === 0) {
                    btn.attr("disabled", "disabled");
                } else {
                    btn.removeAttr("disabled");
                }

                output.text(startVal);

            });

            $('.hamburger').on('touch click', function() {
                const _this = $(this);
                const menu = $('.header').find('.menu-wrapper');

                if(!(_this.hasClass('open'))) {
                    _this.addClass('open')
                } else {
                    _this.removeClass('open');
                }

                menu.toggleClass('active');

                if(menu.hasClass('active')) {
                    menu.slideDown(500);
                } else {
                    menu.slideUp(500);
                }

            });

            $(window).on('load resize', function() {
                if($(window).innerWidth() < 1024) {
                    $('.menu__item').on('click', function() {
                        const _this = $(this);
                        const dropdown = _this.find('.submenu-wrapper');

                        dropdown.slideToggle(500);

                        if (dropdown.hasClass('open')) {
                            dropdown.removeClass('open');
                        } else {
                            dropdown.addClass('open');
                        }
                    });
                } else {

                }
            })

            $(document).on('click','.js-btn-order',function(e) {
                e.preventDefault();

                let _this = $(this);
                let wrapper = _this.closest('.products-item');
                let count = wrapper.find('.js-field').text();
                let title = wrapper.find('.products__title').text();

                let modal = $('#modal-order');
                modal.find('.js-modal-title').text(title);
                modal.find('.js-modal-count').text(count);

                $.fancybox.open($('#modal-order'));
            });

            const btn = $('.btn-scroll-top');

            $(window).scroll(function() {
                if ($(window).scrollTop() > 300) {
                    btn.addClass('btn-show');
                } else {
                    btn.removeClass('btn-show');
                }
            });

            btn.on('click', function(e) {
                e.preventDefault();
                $('html, body').animate({scrollTop:0}, '100');
            });

            const $status = $('.home-slides-count');
            const $slickElement = $('.js-home-main');

            $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
                const i = (currentSlide ? currentSlide : 0) + 1;
                $status.html(`<span class="home-slides__current"">${ i < 10 ? '0'+ i : i}</span>` + `<span class="home-slides__all">${ slick.slideCount < 10 ? '0'+ slick.slideCount : slick.slideCount}</span>`);
            });

            $slickElement.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: true,
                speed: 300,
                dotsClass: 'custom-dots',
                appendArrows: $('.home-main-arrows'),
                prevArrow: $('.home-main__prev'),
                nextArrow: $(' .home-main__next'),
            });

            $('.js-home-offers').slick({
                slidesToShow: 2,
                slidesToScroll: 1,
                // dots: true,
                infinite: true,
                speed: 300,
                // dotsClass: 'custom-dots',
                appendArrows: $('.home-offers-arrows'),
                prevArrow: $('.home-offers__prev'),
                nextArrow: $(' .home-offers__next'),
                responsive: [
                    {
                        breakpoint: 1025,
                        settings: {
                            arrows: false,
                            slidesToShow: 1
                        }
                    }
                    // {
                    //     breakpoint: 480,
                    //     settings: "unslick"
                    // }
                ]

            });

            $('.js-products-discount').slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                // dots: true,
                infinite: true,
                speed: 300,
                // draggable: false,
                // dotsClass: 'custom-dots',
                appendArrows: $('.products-discount-arrows'),
                prevArrow: $('.products-discount__prev'),
                nextArrow: $(' .products-discount__next'),
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            arrows: false,
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 1024,
                        settings: {
                            arrows: false,
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 575,
                        settings: {
                            arrows: false,
                            slidesToShow: 1
                        }
                    }
                ]
            });

            $('.js-products-new').slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                // dots: true,
                infinite: true,
                speed: 300,
                // dotsClass: 'custom-dots',
                appendArrows: $('.products-new-arrows'),
                prevArrow: $('.products-new__prev'),
                nextArrow: $(' .products-new__next'),
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            arrows: false,
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 1024,
                        settings: {
                            arrows: false,
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 575,
                        settings: {
                            arrows: false,
                            slidesToShow: 1
                        }
                    }
                ]
            });

            $('.js-products-popular').slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                // dots: true,
                infinite: true,
                speed: 300,
                // dotsClass: 'custom-dots',
                appendArrows: $('.products-popular-arrows'),
                prevArrow: $('.products-popular__prev'),
                nextArrow: $(' .products-popular__next'),
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            arrows: false,
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 1024,
                        settings: {
                            arrows: false,
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 575,
                        settings: {
                            arrows: false,
                            slidesToShow: 1
                        }
                    }
                ]
            });


        });
    };

    static detectBrowser() {
        document.body.setAttribute('data-browser', detectBrowser());
    }

    static init() {
        this.detectBrowser();
        this.initializePlugins();
        this.initializeModules();
    }
};

const App = new Application();