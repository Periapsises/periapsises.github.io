const query = window.location.search;
const params = new URLSearchParams(query);

window.location.replace(`https://raw.githubusercontent.com/Periapsises/StarfallLibs/main/${params.get('p')}.txt`);
