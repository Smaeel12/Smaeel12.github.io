$(document).ready(() => {
    $('#header__buttons').children().click(function () {
        $('.modals').css('display', 'block')
        console.log(`modal__${$(this).attr('id')}`)
        $(`#modal__${$(this).attr('id')}`).css('display', 'block')
    })
})

$('.modals').click(() => {
    $('.modals').css('display', 'none')
})

$('.close').click(() => {
    $("section [id^='modal__']").css('display', 'none')
    $('.modals').css('display', 'none')
})

$('.animation__speed').click(() => {
    console.dir(TimeVars)
    switch ($('.animation__speed').text()) {
        case 'x4':
            $('.animation__speed').text('off');
            TimeVars.bounceAnim = 0
            TimeVars.doneDelay = 0
            TimeVars.flipTime = 0
            break;
        case 'x2':
            $('.animation__speed').text('x4');
            TimeVars.bounceAnim -= 200
            TimeVars.doneDelay -= 200
            TimeVars.flipTime -= 200
            break;
        default:
            $('.animation__speed').text('x2');
            TimeVars.bounceAnim = 600
            TimeVars.doneDelay = 600
            TimeVars.flipTime = 600
            break;
    }
})

$('#volume').click(function () {
    if ($(this).hasClass('volume-off')) {
        $(this).removeClass('volume-off')
        Howler.volume(1);
        GameAudio.gameaudio.play()
    }
    else {
        GameAudio.gameaudio.pause()
        Howler.volume(0);
        $(this).addClass('volume-off')
    }
})

$('.hint__mode').click(function () {
    if (Settings.hintMode) {
        Settings.hintMode = false
    } else {
        Settings.hintMode = true
    }
    $('#num').toggle()
    $('.hint__mode').text(String(Settings.hintMode))
})


$('#dlmode').click(function () {
    if ($(':root').hasClass('darkmode')) {
        $(':root').removeClass('darkmode')
    }
    else {
        $(':root').addClass('darkmode')
    }
})