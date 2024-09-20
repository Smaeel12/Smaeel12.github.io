// animate the whole row
function animateKeyboard(char, cls1, cls2) {
    if (!$(`.keyboard__key:contains(${char})`).hasClass(cls1) || cls2 === 'green') {
        $(`.keyboard__key:contains(${char})`).first().addClass(cls1 + ' ' + cls2)
    }
}

let find;

const respond = await validateWord()

find = find2Letter(validWord)
async function animateRow(ignore) {
    let index = 0;

    for (const element of $row.children()) {
        await new Promise((resolve) => {
            setTimeout(() => {
                if ($(element).text() === guessWord.charAt(index++)) {
                    animateKeyboard($(element).text(), 'scale__animation', 'green')
                    if (!ignore) $('<span>', { id: 'num' }).appendTo(element).text(CharMap[$(element).text()])
                    $(element).addClass('flip__animation green')
                }
                else if (guessWord.includes($(element).text())) {
                    animateKeyboard($(element).text(), 'scale__animation', 'yellow')
                    console.log(CharMap)
                    if (!ignore) $('<span>', { id: 'num' }).appendTo(element).text(CharMap[String($(element).text())])
                    $(element).addClass('flip__animation yellow')
                }
                else {
                    animateKeyboard($(element).text(), 'scale__animation', 'gray')
                    $(element).addClass('flip__animation gray');
                }
                GameAudio.flipaudio.play()
                resolve();
            }, TimeVars.flipTime)
        })

    }
}

function find2Letter(array) {
    const obj = {};
    for (let i = 0; i < array.length; i++) {
      if (obj[array[i]]) {
        obj[array[i]]++;
      } else {
        obj[array[i]] = 1;
      }
    }
    return obj;
  }