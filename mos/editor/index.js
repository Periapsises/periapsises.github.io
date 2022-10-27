class Tab {
    constructor(name) {
        this.tab = document.createElement('div');
        this.tab.className = 'tab';

        this.tab.addEventListener('click', () => {
            if (this.editor === null) return;
            this.editor.selectTab(this);
        });

        this.tab.addEventListener('dblclick', (e) => {
            e.stopImmediatePropagation();
        });

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

        this.close.addEventListener('click', (e) => {
            e.stopImmediatePropagation();
            this.tab.remove();
            delete this;
        });

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
        this.tabContainer.addEventListener('dblclick', () => {
            this.createTab();
        });

        this.container = document.createElement('div')
        this.container.className = 'container';

        this.editor.appendChild(this.tabContainer);
        this.editor.appendChild(this.container);
        document.body.appendChild(this.editor);
        
        $(this.tabContainer).sortable({
            animation: 350
        });

        this.createTab();
    }

    createTab() {
        let tab = new Tab();
        this.addTab(tab);
        this.selectTab(tab);

        return tab;
    }

    addTab(tab) {
        if (this.tabs.includes(tab)) return;

        tab.editor = this;
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
