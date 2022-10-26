export class Tab {
    tab;
    icon;
    label;

    constructor(name, editor) {
        this.tab = document.createElement('div');
        this.tab.className = 'tab';
        this.tab.addEventListener('click', () => {
            editor.selectTab(this);
        });

        this.icon = document.createElement('div');
        this.icon.className = 'icon';
        this.label = document.createElement('div');
        this.label.innerHTML = name;

        let close = document.createElement('div');
        close.className = 'close-action';
        close.innerHTML = `
            <svg width="18px" height="18px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <use xlink:href="/fonts/VSCode-Codicons/codicon.svg#close"></use>
            </svg>
        `;

        close.addEventListener('click', () => {
            this.tab.remove();
        });

        this.tab.appendChild(this.icon);
        this.tab.appendChild(this.label);
        this.tab.appendChild(close);

        document.getElementsByClassName('tabs')[0].appendChild(this.tab);
    }

    setActive(active) {
        if (active)
            this.tab.classList.add('active');
        else
            this.tab.classList.remove('active');
    }
}
