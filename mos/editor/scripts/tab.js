export class Tab {
    name;
    editor;
    tab;
    span;
    button;

    constructor(name, editor) {
        this.name = name;
        this.editor = editor;

        this.button = document.createElement('a');
        this.button.style = 'width: 16px; height 16px; padding-left: 4px;';

        this.span = document.createElement('span');
        this.span.innerHTML = name;
        this.span.appendChild(this.button);
        
        this.tab = document.createElement('a');
        this.tab.appendChild(this.span);

        document.getElementById('tabs').appendChild(this.tab);
    }

    setActive(active) {
        this.tab.className = active ? 'active' : '';
    }
}
