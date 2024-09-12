const TimeVars = {
    bounceAnim: 600,
    doneDelay: 600,
    flipTime: 600,
    // flipTime: $(':root').css('--flip__delay'),
    // doneDelay: this.flipTime + 200,
    // bounceAnim: $(':root').css('--bounce__delay')
}

const Settings = {
    hintMode: false,
}

CharMap = new Object()

const GameAudio = {
    gameaudio: new Howl({
        src: ['../audio/gamemusic.mp3'],
        loop: true,
        volume: 0.4
    }),
    winaudio: new Howl({ src: '../audio/wineffect.wav' }),
    popaudio: new Howl({ src: '../audio/popeffect.mp3' }),
    flipaudio: new Howl({ src: '../audio/flipeffect.wav' }),
    unfillaudio: null,
}

Howler.volume(0);


let inputEvent = true
let userWord = '';
let guessWord = '';
let $row = null;
let $col = null;

$(document).ready(function () {
    Keyboard.init();
    for (let r = 0; r < 6; r++) {
        const $row = $('<div>', { class: 'rows' }).appendTo('#grid-container');
        for (let c = 0; c < 5; c++) {
            element = $('<div>', { class: 'columns' }).appendTo($row)
        }
    }
    $.ajax({
        url: 'https://words.dev-apis.com/word-of-the-day',
        beforeSend: loadingGame,
        success: startGame,
        error: APIError,
        dataType: 'json',
        type: 'GET'
    })
})

$()



function loadingGame() {
    displayMessage('loading...')
}

function APIError(error) {
    console.log('Seer tn3ess', error);
}

function isLetter(c) {
    return /^[a-zA-Z]$/.test(c)
}