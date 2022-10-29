export class Renderer {
    /**
     * @param {Editor} editor
     * @param {HTMLDivElement} container
     */
    constructor(editor, container) {
        this.lines = [];

        this.editor = editor;
        this.container = container;

        this.gutter = document.createElement('div');
        this.gutter.className = 'gutter';

        this.entry = document.createElement('textarea');
        this.entry.className = 'input';
        this.entry.placeholder = 'Enter your code here.';
        this.entry.spellcheck = false;

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

        container.appendChild(this.gutter);
        container.appendChild(this.entry);

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
