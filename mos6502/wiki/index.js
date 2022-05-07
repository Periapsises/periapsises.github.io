const api = 'https://canary.discord.com/api/guilds/961793513220079686/widget.json';

async function onLoaded() {
    let embed = document.getElementById('discord');

    let response = await fetch(api);
    let data = await response.json();

    let header = document.createElement('h1');
    header.innerHTML = `Online Members (${data['members'].length})`;
    
    embed.appendChild(header);

    let users = document.createElement('div');
    users.className = 'users';

    let userCount = Math.min(data['members'].length, 6);

    for (let i = 0; i < userCount; i++) {
        let user = data['members'][i]

        let div = document.createElement('div');
        div.className = 'discord-user';

        let img = document.createElement('img');
        img.setAttribute('src', user['avatar_url']);

        let name = document.createElement('a');
        name.innerHTML = user['username']

        let game = document.createElement('p');
        game.innerHTML = user['game'] != null ? user['game']['name'] : '';

        div.appendChild(img);
        div.appendChild(name);
        div.appendChild(game);
        users.appendChild(div);
    }

    embed.appendChild(users);

    let button = document.createElement('a');
    button.className = 'join-button';
    button.innerHTML = 'Join';
    button.setAttribute('href', data['instant_invite'])
    button.setAttribute('target', '_blank')

    embed.appendChild(button);
}

window.addEventListener('load', onLoaded)
