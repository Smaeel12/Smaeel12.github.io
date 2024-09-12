// start the game
function startGame(apiword) {
    $('.text__messagebox').remove() // remove the loading game message

    // get the word
    guessWord = apiword.word.toUpperCase()

    guessWord.split('').forEach(function (c) {
        Object.defineProperty(CharMap, c, { value: guessWord.split('').filter(x => x === c).length })
    })

    console.log(guessWord)

    $(document).ready(function () {
        $row = $('#grid-container').children().first();
        $col = $row.children().first(); // Start with the first row and its columns

        $(document).keyup(function (event) {
            if (inputEvent) {
                if (event.key === 'Enter') {
                    validateRow()
                } else if (event.key === 'Backspace') {
                    deleteData()
                } else {
                    addData(event.key.toUpperCase())
                }
            }
        });
    });
}


// display a message over the grid
function displayMessage(text, delay) {
    $('<div>', { class: 'text__messagebox', style: 'display: none' }).prependTo('#game')
    $('.text__messagebox').text(text).fadeIn('slow', 'swing')
    if (delay)
        $('.text__messagebox').delay(delay).fadeOut('slow', 'swing')
}

function validateWord() {
    displayMessage('Validate the Word', 0)
    return $.ajax({
        url: 'https://words.dev-apis.com/validate-word',
        data: `{ "word": "${userWord.trim()}" }`,
        contentType: 'application/json',
        dataType: 'json',
        type: 'POST'
    })
}

// process the row
async function validateRow() {
    inputEvent = false;
    if (userWord.length === 5) {
        try {
            const res = await validateWord()
            $('.text__messagebox').remove()
            if (res.validWord) {
                if (userWord !== guessWord) {
                    await animateRow(false)
                } else {
                    await animateRow(true)
                    return endGame(userWord, guessWord);
                }

                // // Move to the next row if it exists
                if ($row.next().length) {
                    $row = $row.next();
                    $col = $row.children().first(); // Update $col to the new row's children
                } else {
                    return endGame(userWord, guessWord);
                }
                userWord = ''
            } else {
                displayMessage('NOT A VALID WORD', 100)
            }
        } catch (err) {
            console.log(err)
        }
    } else {
        displayMessage('TOO SHORT', 100)
    }
    inputEvent = true
}


// add character to the Row
function addData(key) {

    if (isLetter(key)) {
        userWord.length < 5 ? userWord += key : userWord = userWord.slice(0, -1) + key

        const $currentCol = $col
        $currentCol.text(key)

        GameAudio.popaudio.play()
        $currentCol.addClass('scale__animation').delay(TimeVars.bounceAnim).queue((next) => {
            $currentCol.removeClass('scale__animation')
            next();
        })

        if ($col.next().length) {
            $col = $col.next()
        }
    }
}

// delete current character from the Row
function deleteData() {
    userWord = userWord.slice(0, -1)
    if ($col.text() !== '') {
        $col.text('')
    }
    else {
        if ($col.prev().length)
            $col = $col.prev()
        $col.text('')
    }
}

// end the Game
function endGame(userWord, guessWord) {
    if (userWord === guessWord) {
        GameAudio.winaudio.play()
        setTimeout(displayMessage('YOU WON', 1000), TimeVars.doneDelay)
    } else {
        setTimeout(displayMessage('GAME OVER', 1000), TimeVars.doneDelay)
    }
}