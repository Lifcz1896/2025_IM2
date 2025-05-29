const commonName = sessionStorage.getItem('right-name');
let htmlName = document.getElementById('commonName');
htmlName.textContent = commonName;

const url = sessionStorage.getItem('right-image');
let image = document.getElementById('right-image');
image.src = url;

const extinct = sessionStorage.getItem('right-record');
let extinctYear = document.getElementById('right-record');
extinctYear.textContent = `Diese Tier wurde ${extinct} ausgelöscht.`;