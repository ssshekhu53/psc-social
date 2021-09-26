$(document).ready(function() {
    let heroString=$(window).width()>500?'<h1 class="fw-bold">Welcome to PSC Social</h1>':'<h2 class="fw-bold" style="font-size: 3.5rem;">Welcome to PSC Social</h2>';
    let typewriter = new Typewriter('.hero-text', {
        loop: true,
        strings: [heroString],
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