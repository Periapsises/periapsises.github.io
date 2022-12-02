String.prototype.getHash = function () {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

export default class Editor {
    constructor() {
        this.#createEditorHTML();
        this.input.addEventListener('input', (e) => this.#onTextChanged(e));
        this.input.addEventListener('keydown', (e) => this.#onKeyBind(e));
    }

    setCode(code) {
        this.input.value = code;
        this.hash = code.getHash();
    }

    setHash(hash) {
        this.hash = hash;
    }

    /**
     * Generates the required HTML elements to display the editor
     */
    #createEditorHTML() {
        let editor = document.createElement('div');
        editor.classList.add('editor');

        let container = document.createElement('div');
        container.classList.add('container');

        let gutter = document.createElement('div');
        gutter.classList.add('gutter');

        let input = document.createElement('textarea');
        input.classList.add('input');
        input.placeholder = 'Enter your code here.';
        input.spellcheck = false;

        let overlay = document.createElement('div');
        overlay.classList.add('overlay');

        container.appendChild(input);
        container.appendChild(overlay);
        editor.appendChild(gutter);
        editor.appendChild(container);
        document.body.appendChild(editor);

        this.editor = editor;
        this.container = container;
        this.gutter = gutter;
        this.input = input;
        this.overlay = overlay;
    }

    /**
     * Called when the contents of the textarea changes
     * @param {KeyboardEvent} e The event that was fired
     */
    #onTextChanged(e) {
        let text = this.input.value;
        let isOriginal = this.hash == text.getHash();

        let textChangedEvent = new Event('editortextchanged');
        textChangedEvent.editor = this;
        textChangedEvent.text = text;
        textChangedEvent.isOriginal = isOriginal
        document.dispatchEvent(textChangedEvent);
    }

    /**
     * Runs when a key is pressed on the input of the editor
     * @param {KeyboardEvent} e The event that was fired
     */
    #onKeyBind(e) {
        let ctrl = e.ctrlKey;
        let key = e.key;

        // Ctrl+S
        if (ctrl && key === 's') {
            let saveEvent = new Event('editorsave');
            saveEvent.editor = this;
            document.dispatchEvent(saveEvent);

            e.preventDefault();
        }

        // Tab
        if (!ctrl && key === 'Tab') {
            document.execCommand('insertText', false, '    ');
            let changeEvent = new Event('input');
            this.input.dispatchEvent(changeEvent);

            e.preventDefault();
        }
    }
}