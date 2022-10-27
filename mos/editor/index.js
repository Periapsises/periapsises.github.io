class Tab {
    constructor(name) {
        this.tab = document.createElement('div');
        this.tab.className = 'tab';

        this.icon = document.createElement('div');
        this.icon.className = 'icon';
        this.icon.style = 'background-image: url(\'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/83375ae073d0e21849cbc4fa583cb71d5d4358d9/icons/assembly.svg\');';

        this.label = document.createElement('div');
        this.label.className = 'label';
        this.label.innerHTML = name || 'Untitled';

        this.close = document.createElement('div');
        this.close.className = 'close-button';
        this.close.innerHTML = `
            <svg width="18px" height="18px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <use xlink:href="/fonts/VSCode-Codicons/codicon.svg#close"></use>
            </svg>
        `;

        this.tab.appendChild(this.icon);
        this.tab.appendChild(this.label);
        this.tab.appendChild(this.close);
    }

    setActive(active) {
        if (active) {
            this.tab.classList.add('active');
        } else {
            this.tab.classList.remove('active');
        }
    }
}

class Editor {
    tabs = [];

    constructor() {
        this.editor = document.createElement('div');
        this.editor.className = 'editor';

        this.tabContainer = document.createElement('div');
        this.tabContainer.className = 'tabs';

        this.container = document.createElement('div')
        this.container.className = 'container';

        this.editor.appendChild(this.tabContainer);
        this.editor.appendChild(this.container);
        document.body.appendChild(this.editor);

        new Sortable(this.tabContainer, {
            animation: 350
        });

        let tab = this.createTab();
        this.selectTab(tab);
    }

    createTab() {
        let tab = new Tab();
        this.addTab(tab);

        return tab;
    }

    addTab(tab) {
        if (this.tabs.includes(tab)) return;

        this.tabs.push(tab);
        this.tabContainer.appendChild(tab.tab);
    }

    selectTab(tab) {
        if (this.activeTab)
            this.activeTab.setActive(false);

        this.addTab(tab);
        this.activeTab = tab;
        tab.setActive(true);
    }
}

function onDocumentLoaded() {
    new Editor();
}

document.addEventListener('DOMContentLoaded', onDocumentLoaded);
