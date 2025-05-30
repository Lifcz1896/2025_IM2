const apiURL = 'https://extinct-api.herokuapp.com/api/v1/animal/';
const leftCard = document.querySelector('.card-left');
const leftImageElement = document.getElementById('left-image');
let score = document.getElementById('score');
let scoreNumber = 0;

console.log('fetchRandomAnimal function called');

async function fetchRandomAnimal(side) {
  try {
      const response = await fetch(apiURL);
      const contentType = response.headers.get('Content-Type');

      console.log('API Response Headers:', response.headers);

      if (!contentType?.includes('application/json')) {
          throw new Error(`Invalid content type: ${contentType}`);
      }

      const data = await response.json();
      console.log('API Response (JSON):', data);

      const randomAnimal = data?.data?.[0];

      if (!randomAnimal) {
          throw new Error('No valid animal data found.');
      }


      if(parseOwnInt(randomAnimal.lastRecord)) {
        fetchRandomAnimal(side);
      }
      updateUIWithAnimal(side, randomAnimal);
  } catch (error) {
      console.error('Fetch error:', error.message);
      showErrorUI(`${side}`, error.message);
  }
}

function updateUIWithAnimal(side, animal) {
  document.getElementById(`${side}-image`).src = animal.imageSrc;
  document.getElementById(`${side}-image`).alt = animal.commonName || animal.binomialName || 'Animal Image';
  document.getElementById(`${side}-title`).textContent = animal.commonName || 'Unknown Common Name';
  document.getElementById(`${side}-subtitle`).textContent = animal.binomialName || 'Unknown Binomial Name';
  document.getElementById(`${side}-number`).textContent = animal.lastRecord || '?';
  sessionStorage.setItem(`${side}-record`, animal.lastRecord);
  sessionStorage.setItem(`${side}-image`, animal.imageSrc);
  sessionStorage.setItem(`${side}-name`, animal.commonName);
  document.getElementById(`${side}-record`).textContent = 'Last record:';
}

function showErrorUI(side, message) {
  document.getElementById(`${side}-image`).src = '';
  document.getElementById(`${side}-image`).alt = 'Error';
  document.getElementById(`${side}-title`).textContent = message || 'Error loading data';
  document.getElementById(`${side}-subtitle`).textContent = '';
  document.getElementById(`${side}-number`).textContent = '';
  document.getElementById(`${side}-record`).textContent = '';
}


function compare(extinct) {

let left = parseInt(sessionStorage.getItem('left-record'));
let right = parseInt(sessionStorage.getItem('right-record'));
  if (extinct == 'before') {
    if (left > right) {
      scoreNumber ++;
      score.textContent = scoreNumber;
      fetchRandomAnimal('left');
      fetchRandomAnimal('right');
    } else {
      console.log('wrong game over');
      window.location.href = 'errorPage.html';
    }
  } else {
    if (left < right) {
      scoreNumber ++;
      score.textContent = scoreNumber;
      fetchRandomAnimal('left');
      fetchRandomAnimal('right');
    } else {
      console.log('wrong game over');
      window.location.href = 'errorPage.html';
    }
  }

}

window.onload = fetchRandomAnimal('left');
window.onload = fetchRandomAnimal('right');

function parseOwnInt(string) {
  if(string.includes('After') || string.includes('?') || string.includes('-') || string.includes('BC')) {
    return true;
  }
  return false;
}