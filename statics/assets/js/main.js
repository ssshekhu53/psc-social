$(document).ready(function() {
    let typewriter = new Typewriter('.hero-text', {
        loop: true,
        strings: ['<h1 class="fw-bold">Welcome to PSC Social</h1>'],
        autoStart: true,
        cursor: ""
    });

    typewriter.start();
    navbarTransition();
});

function navbarTransition() {
    if($(this).scrollTop()>100)
        $('.navbar').addClass('bg-blue').removeClass('bg-none');
    else
        $('.navbar').removeClass('bg-blue').addClass('bg-none');
}

$(document).on('click', '.navbar-toggler', function () {
    $('.ui.sidebar').sidebar('toggle');
})

$(window).scroll(function() {
    navbarTransition();
});