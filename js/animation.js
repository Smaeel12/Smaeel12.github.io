// animate the whole row
function animateKeyboard(char, cls1, cls2) {
    if (!$(`.keyboard__key:contains(${char})`).hasClass(cls1) || cls2 === 'green') {
        $(`.keyboard__key:contains(${char})`).first().addClass(cls1 + ' ' + cls2)
    }
}
async function animateRow(ignore) {
    let index = 0;

    for (const element of $row.children()) {
        await new Promise((resolve) => {
            setTimeout(() => {
                console.log(TimeVars.flipTime)
                if ($(element).text() === guessWord.charAt(index++)) {
                    animateKeyboard($(element).text(), 'scale__animation', 'green')
                    if (!ignore) $('<span>', { class: 'num' }).appendTo(element).text(CharMap[$(element).text()])
                    $(element).addClass('flip__animation green')
                }
                else if (guessWord.includes($(element).text())) {
                    animateKeyboard($(element).text(), 'scale__animation', 'yellow')
                    if (!ignore) $('<span>', { class: 'num' }).appendTo(element).text(CharMap[String($(element).text())])
                    $(element).addClass('flip__animation yellow')
                }
                else {
                    animateKeyboard($(element).text(), 'scale__animation', 'gray')
                    $(element).addClass('flip__animation gray');
                }
                if (Settings.hintMode) $('.num').css('display', 'block')
                GameAudio.flipaudio.play()
                resolve();
            }, TimeVars.flipTime)
        })

    }
}
