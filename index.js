function processItem(item) {
    let iconPath;

    if (item == item.parentElement.firstChild) {
        iconPath = 'assets/folder_icon.png';
    } else if (item.nextElementSibling == null) {
        iconPath = 'assets/file_link_bottom.png'
    } else {
        iconPath = 'assets/file_link.png'
    }

    let icon = document.createElement('img');
    icon.setAttribute('src', iconPath)

    let name = document.createElement('a');
    name.innerHTML = item.getAttribute('name');

    if (item.getAttribute('link') != null) {
        name.setAttribute('href', item.getAttribute('link'));
        name.className = 'link';
    }

    item.appendChild(icon);
    item.appendChild(name);
}

function makeSubfolder(folder) {
    let subfolder = document.createElement('div');
    subfolder.className = 'subfolder';
    folder.parentElement.insertBefore(subfolder, folder);

    let links = document.createElement('div');
    links.className = 'subfolder-links';

    let topIcon = document.createElement('img');
    topIcon.setAttribute('src', 'assets/file_link.png');
    topIcon.className = 'subfolder-top-link';
    
    let bottomIcon = document.createElement('img');
    bottomIcon.setAttribute('src', 'assets/file_link_straight.png')
    bottomIcon.className = 'subfolder-bottom-link';

    links.appendChild(topIcon);
    links.appendChild(bottomIcon);

    subfolder.appendChild(links);
    subfolder.appendChild(folder);
}

function addHeader(folder) {
    let header = document.createElement('div');
    header.className = 'item';
    header.setAttribute('name', folder.getAttribute('name'));

    folder.insertBefore(header, folder.firstChild);
}

function processFolder(folder) {
    addHeader(folder);
    let children = folder.children

    for (let child of children) {
        if (child.className === 'folder') {
            makeSubfolder(child);
            processFolder(child);
        } else if (child.className === 'item') {
            processItem(child);
        }
    }
}

function processFileBrowsers() {
    let browsers = document.getElementsByClassName('file-browser');

    for (let browser of browsers) {
        for (let folder of browser.children) {
            processFolder(folder);
        }
    }
}

function onLoad() {
    processFileBrowsers();
}

window.addEventListener('load', onLoad);
