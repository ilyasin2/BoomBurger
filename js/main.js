$(document).ready(() => {

    //плавный скролл до якорных ссылок
    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });

    $('.category').click((e) => {
        let currentElement = $(e.target);
        $('.products-container').hide();
        let id = currentElement.data('id');
        $('#' + id).show();

        $('.category').removeClass('active');
        currentElement.addClass('active');

        $('#' + id + ' .products').slick('refresh');
    });


    $('#chicken-container .products').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        centerMode: false,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    rows: 2,
                }
            },
        ]
    });

    setTimeout(()=> {
        $('#chicken-container .products').slick('refresh');
    }, 100)


    $('#beef-container .products').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        centerMode: false,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    rows: 2,
                }
            },
        ]
    });

    $('#duck-container .products').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        centerMode: false,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    rows: 2,
                }
            },
        ]
    });

    $('#crab-container .products').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        centerMode: false,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    rows: 2,
                }
            },
        ]
    });


    $('.reviews-info').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    infinite: true,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    variableWidth: true,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    variableWidth: true,
                }
            },
        ]
    });

    new WOW({
        animateClass: 'animate__animated',
        offset: 0,
        mobile: true,
        live: true
    }).init();


    function updateTimerDisplay(minutes, seconds) {
        const format = (num) => num.toString().padStart(2, '0').split('');

        const [m1, m2] = format(minutes);
        const [s1, s2] = format(seconds);

        document.querySelectorAll('.time-group:first-child .digit').forEach((el, i) => {
            el.textContent = i === 0 ? m1 : m2;
        });

        document.querySelectorAll('.time-group:last-child .digit').forEach((el, i) => {
            el.textContent = i === 0 ? s1 : s2;
        });
    }

    function startTimer(duration) {
        let timer = duration * 60;
        const interval = setInterval(() => {
            const minutes = Math.floor(timer / 60);
            const seconds = timer % 60;

            updateTimerDisplay(minutes, seconds);

            if (--timer < 0) {
                clearInterval(interval);
                document.querySelector('.timer-block').innerHTML = 'Время вышло!';
            }
        }, 1000);
    }

    startTimer(30);


    $('#phone').mask('+7(000)000-00-00');

    //скрытие попапа после формы
    $('#popup-close, #popup').click((e) => {
        if (e.target.id === 'popup' || e.target.id === 'popup-close') {
            $('#popup').hide();
        }
    });


    //клик по кнопке в форме
    $('#reserve-order-form').submit(function (e) {
        e.preventDefault();
        let isValid = true;

        let name = $('#name').val().trim();
        if (name === '') {
            $('#name').addClass('error');
            $('#nameError').text('Введите имя').show();
            isValid = false;
        } else if (!/^[а-яА-ЯёЁa-zA-Z\s]+$/.test(name)) {
            $('#name').addClass('error');
            $('#nameError').text('Имя содержит недопустимые символы').show();
            isValid = false;
        } else {
            $('#name').removeClass('error');
            $('#nameError').hide();
        }

        let phone = $('#phone').val();
        if (phone === '' || phone.indexOf('_') > -1) {
            $('#phone').addClass('error');
            $('#phoneError').text('Введите корректный телефон').show();
            isValid = false;
        } else {
            $('#phone').removeClass('error');
            $('#phoneError').hide();
        }

        if (isValid) {
            let loader = $('.lds-spinner-wrap');
            loader.css('display', 'flex');

            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({
                    title: $('#name').val(),
                    body: $('#phone').val(),
                    userId: 1,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => {
                    loader.hide();
                    if (response.ok) {
                        $('#popup').css('display', 'flex');
                        return response.json();
                    }
                    throw new Error('Ошибка сервера');
                })
                .catch((error) => {
                    loader.hide();
                    console.log('Ошибка:', error)

                });
        }
    });

    $('#name, #phone').on('input', function () {
        $(this).removeClass('error');
        $(this).next('.reserve-error').hide();
    });

    $('#burger').click(() => {
        $('.header-menu, .header-address').toggleClass('open');
    });

    $('.header-menu a, .header-address, .burger-close').click(() => {
        $('.header-menu, .header-address').removeClass('open');

    });

});