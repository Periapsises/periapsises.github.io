export class Renderer {
    /**
     * @param {HTMLDivElement} editor
     */
    constructor(editor) {
        this.lines = [];

        this.editor = editor;

        let container = document.createElement('div');
        container.className = 'container';

        this.gutter = document.createElement('div');
        this.gutter.className = 'gutter';

        this.entry = document.createElement('textarea');
        this.entry.className = 'input';
        this.entry.placeholder = 'Enter your code here.';
        this.entry.spellcheck = false;

        this.overlay = document.createElement('pre');
        this.overlay.className = 'overlay';

        let onInput = () => {
            let lines = this.entry.value.split('\n');
            let newCount = lines.length;
            let oldCount = this.lines.length;
            this.lines = lines;
            
            this.onTextInput(this.entry.value);

            if (newCount != oldCount) {
                this.onRenderLines(newCount, oldCount);
            }
        }

        this.entry.addEventListener('input', onInput);

        editor.appendChild(this.gutter);
        editor.appendChild(container)
        container.appendChild(this.entry);
        container.appendChild(this.overlay);

        onInput();
    }

    /**
     * @param {string} text
     */
    onTextInput(text) { }

    /**
     * @param {number} newCount
     * @param {number} oldCount
     */
    onRenderLines(newCount, oldCount) { }
}
