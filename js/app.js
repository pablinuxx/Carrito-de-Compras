//TimerCountDown
$('#example').countdown({
    date: '12/25/2021 00:00:00',
    offset: -3,
    day: 'Day',
    days: 'Dias',
    hour: 'Hora',
    hours: 'Horas',
    minute: 'Minuto',
    minutes: 'Minutos',
    second: 'Segundo',
    seconds: 'Segundos'
});

//PreLoader
function counter() {
    var count = setInterval(function() {
        var c = parseInt($('.counter').text());
        $('.counter').text((++c).toString());
        if (c == 100) {
            clearInterval(count);
            $('.counter').addClass('hide')
            $('.preloader').addClass('active')
        }
    }, 60)

}

counter()