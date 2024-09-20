$(document).ready(() => {
    $('#header__buttons').children().click(function () {
        $('.modals').css('display', 'block')
        $(`#modal__${$(this).attr('id')}`).css('display', 'block')
    })
})

$('.modals').click(function (e) {
    $("section [id^='modal__']").css('display', 'none')
    if (e.target == $("#modal__settings")[0]) {
        $('.modals').css('display', 'none')
    }
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

$('#volume .material-symbols-outlined').click(function () {
    if ($(this).text() == 'music_off') {
        $(this).text('music_note')
        GameAudio.gameaudio.play()
    }
    else {
        $(this).text('music_off')
        GameAudio.gameaudio.pause()
    }
})

$('#openKeyboard .material-symbols-outlined').click(function () {
    if ($(this).text() == 'keyboard') {
        $(this).text('keyboard_off')
        $('.keyboard').css('display', 'none')
    }
    else {
        $(this).text('keyboard')
        $('.keyboard').css('display', 'block')
    }
})

$('.hint__mode').click(function () {
    if (Settings.hintMode) {
        Settings.hintMode = false
        $('.num').css('display', 'none')
    } else {
        Settings.hintMode = true
        $('.num').css('display', 'block')
    }
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