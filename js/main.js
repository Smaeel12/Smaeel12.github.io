let inputEvent = true
let userWord = '';
let guessWord = '';
let $row = null;
let $col = null;

const TimeVars = {
    bounceAnim: 600,
    doneDelay: 600,
    //flipTime: 600,
    flipTime: $(':root').css('--flip__delay'),
    // doneDelay: this.flipTime + 200,
    // bounceAnim: $(':root').css('--bounce__delay')
}

Game = {
    currentGuesses: localStorage.getItem('currentGuesses') ? JSON.parse(localStorage.getItem('currentGuesses')) : [],
    stats: localStorage.getItem('stats') ? JSON.parse(localStorage.getItem('stats')) : { gamePlayed: 0, wins: 0, winspers: 0, currentstreak: 0 },
    createGrid: function (words) {
        for (let r = 0; r < 6; r++) {
            $row = $('<div>', { class: 'rows' }).appendTo('#grid-container');
            for (let c = 0; c < 5; c++) {
                element = $('<div>', { class: 'columns' }).appendTo($row)
                if (words[r]) { $(element).text(words[r][c]) }
            }
            if (words[r]) animateRow(false)
        }
        TimeVars.flipTime = 600
    },
    loadData: function () {
        $('#total-played').text(this.stats.gamePlayed)
        $('#total-wins').text(this.stats.wins)
        $('#win-pct').text(this.stats.winspers)
        $('#current-streak').text('not available')
        this.createGrid(this.currentGuesses)
    },
}

const Settings = {
    hintMode: false,
}

CharMap = new Object()

const GameAudio = {
    gameaudio: new Howl({
        src: ['../audio/gamemusic.mp3'],
        loop: true,
        volume: 1
    }),
    winaudio: new Howl({ src: '../audio/wineffect.wav' }),
    popaudio: new Howl({ src: '../audio/popeffect.mp3' }),
    flipaudio: new Howl({ src: '../audio/flipeffect.wav' }),
    unfillaudio: null,
}



$(document).ready(function () {
    Keyboard.init();
    Game.loadData()
    $.ajax({
        url: 'https://words.dev-apis.com/word-of-the-day',
        beforeSend: loadingGame,
        success: startGame,
        error: APIError,
        dataType: 'json',
        type: 'GET'
    })
})

function loadingGame() {
    displayMessage('loading...')
}

function APIError(error) {
    console.log('Seer tn3ess', error);
}

function isLetter(c) {
    return /^[a-zA-Z]$/.test(c)
}