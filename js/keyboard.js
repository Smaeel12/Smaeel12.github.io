// script.js
const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: [],
        count: 0,
        openKeyboard: document.querySelector('#openKeyboard'),
    },

    keyLayout: [
        "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
        "A", "S", "D", "F", "G", "H", "J", "K", "L", "backspace",
        "Z", "X", "C", "V", "B", "N", "M", "keyboard_return"
    ],

    init() {
        // create and setup main element
        this.elements.main = document.querySelector('.keyboard')

        // create and setup child container component
        this.elements.keysContainer =
            document.createElement("div");
        this.elements.keysContainer
            .classList.add("keyboard__keys");
        this.elements.main
            .appendChild(this.elements.keysContainer);

        // create and setup key elements
        this.elements.keysContainer
            .appendChild(this._createKeys());
        this.elements.keys =
            this.elements.keysContainer
        this.elements.keysContainer.addEventListener('click', function (event) {
            if (inputEvent) {
                if (event.target.textContent == 'backspace') {
                    deleteData()
                } else if (event.target.textContent == 'keyboard_return') {
                    validateRow()
                } else {
                    addData(event.target.textContent)
                }
            }
        })
    },


    _createKeySpan(iconName) {
        this.keyElement = document.createElement("span"); // create a key span

        this.keyElement.classList.add("keyboard__key"); // add key style class

        if (iconName == 'keyboard_return' || iconName == 'backspace') {
            this.keyElement.classList.add('material-symbols-outlined') // add corespendent icon
        }

        this.keyElement.textContent = iconName; // add key text
    },

    _createKeys() {
        const fragment =
            document.createDocumentFragment(); // new document fragment 

        this.keyLayout.forEach((key) => {
            const insertNewRow = ["Q", "A", "backspace"].indexOf(key); // split the keys into rows

            if (insertNewRow !== -1) {
                this.row = document.createElement('div') // create each row
                this.row.classList.add('row-' + insertNewRow) // add row class
                fragment.appendChild(this.row); // append the row to the fragment
            }

            this._createKeySpan(key); // create the key

            this.row.appendChild(this.keyElement); // add the key to the row
        });
        return fragment;
    },
};