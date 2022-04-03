class Tab {
    static container = document.getElementById('tab-container');

    constructor(name) {
        this.name = name;

        let tab = document.createElement("span");
        tab.className = 'tab';
        tab.innerHTML = name;

        Tab.container.appendChild(tab);
    }
}

export { Tab }
