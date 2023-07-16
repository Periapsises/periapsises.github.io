function GameDetails(servername, serverurl, mapname, maxplayers, steamid, gamemode) {
    document.getElementById("mapname").innerHTML = "Currently playing on " + mapname;
}

function SetStatusChanged(status) {
}

function SetFilesTotal(total) {
}

function SetFilesNeeded(needed) {
}

window.onload = function () {
    Particles.init({
        selector: '.background',
        maxParticles: 250,
        color: ['#ffffff', '#29adf0', '#6ba8c7']
    });
};