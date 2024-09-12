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
        "A", "S", "D", "F", "G", "H", "J", "K", "L", "BACKSPACE",
        "Z", "X", "C", "V", "B", "N", "M", "ENTER"
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

        this.elements.openKeyboard.addEventListener('click', () => {
            Keyboard.count++;
            if (Keyboard.count === 1) {
                Keyboard.open();
            } else {
                Keyboard.close();
                Keyboard.count = 0;
            }
        })
    },


    _createKeyBtn(iconName) {
        this.keyElement =
            document.createElement("button");

        this.keyElement
            .setAttribute("type", "button");

        this.keyElement
            .classList.add("keyboard__key");

        if (iconName === "BACKSPACE") {
            this.keyElement
                .classList.add("backspace__icon");
            this.keyElement.addEventListener('click', () => {
                if (inputEvent) {
                    deleteData()
                }
            })
        } else if (iconName === "ENTER") {
            this.keyElement
                .classList.add("enter__icon");
            this.keyElement.addEventListener('click', () => {
                if (inputEvent) {
                    validateRow()
                }
            })
        } else {
            this.keyElement.addEventListener('click', () => {
                if (inputEvent) {
                    addData(iconName)
                }
            })
        }
        if (iconName === "BACKSPACE" || iconName === "ENTER")
            this.keyElement.classList.add('keyboard__key--wide')

        this.keyElement.textContent = iconName;

    },

    _createKeys() {
        const fragment =
            document.createDocumentFragment();

        this.keyLayout.forEach((key) => {
            const insertLineBreak =
                ["P", "L", "ENTER"].indexOf(key) !== -1;

            this._createKeyBtn(key)
            if (key === "BACKSPACE") {
                this.keyElement.classList.add('backspace__icon');
                this.keyElement.textContent = '';
            }

            fragment.appendChild(this.keyElement);

            if (insertLineBreak) {
                fragment
                    .appendChild(document.createElement("br"));
            }
        });
        return fragment;
    },

    open() {
        this.elements.main
            .classList
            .remove("keyboard--hidden");
    },

    close() {
        this.elements.main
            .classList.add("keyboard--hidden");
    },
};