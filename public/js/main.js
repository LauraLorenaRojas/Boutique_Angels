(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Date and time picker
    $('#date').datetimepicker({
        format: 'L'
    });
    $('#time').datetimepicker({
        format: 'LT'
    });


    // Service carousel
    $(".service-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        loop: true,
        dots: false,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            },
            1200:{
                items:5
            }
        }
    });


    // Pricing carousel
    $(".pricing-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        margin: 30,
        loop: true,
        dots: false,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        margin: 30,
        dots: true,
        loop: true,
        items: 1
    });
    
})(jQuery);
$('a[href*="#"]').on('click', function(event) {
    // Asegúrate de que el href tenga un hash y que el ID existe
    if (this.hash !== "" && $(this.hash).length > 0) {
        event.preventDefault(); // Evita el comportamiento predeterminado del enlace

        // Desplazamiento suave hacia el ID
        $('html, body').animate({
            scrollTop: $(this.hash).offset().top
        }, 1000, 'easeInOutExpo'); // Ajusta la velocidad y el efecto del desplazamiento

        return false; // Para algunos navegadores antiguos
    }
});

$('a[href*="#"]').on('click', function(event) {
    console.log('Enlace clickeado:', this.href);
});


document.addEventListener('DOMContentLoaded', function() {
    fetch('/session-info')
        .then(response => response.json())
        .then(data => {
            if (data.nombres) {
                // Ocultar el botón "Iniciar Sesión" y mostrar el nombre del usuario
                document.getElementById('login-btn').style.display = 'none';
                document.getElementById('user-names').textContent = `Hola, ${data.nombres}`;
                // Mostrar el botón "Cerrar Sesión"
                document.getElementById('cerrar-sesion-link').style.display = 'inline';
            } else {
                // Mostrar el botón "Iniciar Sesión" si no hay usuario autenticado
                document.getElementById('login-btn').style.display = 'inline';
                // Ocultar el botón "Cerrar Sesión"
                document.getElementById('cerrar-sesion-link').style.display = 'none';
            }
        })
        .catch(error => console.error('Error al obtener la información de la sesión:', error));
});

function cerrarSesion(event) {
    event.preventDefault(); // Evitar la acción predeterminada del enlace
    fetch('/logout') // Ruta para cerrar sesión
        .then(response => {
            if (response.ok) {
                // Redirigir a la página principal después de cerrar sesión
                window.location.href = '/';
            } else {
                console.error('Error al cerrar sesión');
            }
        })
        .catch(error => console.error('Error al cerrar sesión:', error));
}