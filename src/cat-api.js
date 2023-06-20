import { Notify } from 'notiflix/build/notiflix-notify-aio';
import linksDokQuerySel from './links';

const IPA_KEY = `live_SMtLvF4MNZqRFib6He2a90q3TJAniCZuwUyeLjyBQHRzIdcj8BrTbJxdjwHyeiLT`;
const link = linksDokQuerySel();
const preloaderId = document.getElementById(`preloader_id`)

window.addEventListener(`load`, onLoader);

link.breadSelect.setAttribute(`disabled`, true);
link.catInfo.setAttribute(`disabled`, true);

function onLoader() {
 firstLoaderSelect();
}

function firstLoaderSelect() {
    setTimeout(() => {
      if (!preloaderId.classList.contains(`active_loader`)) {
        preloaderId.classList.add(`active_loader`);
        link.breadSelect.removeAttribute(`disabled`);
      }
    },600)
}
  
function fetchBreeds() {

    fetch(`https://api.thecatapi.com/v1/breeds?api_key=${IPA_KEY}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.status);
        }
            return response.json()
        })
        .then((breed) => {
            for (let i = 0; i < breed.length; i++) {
               const option = document.createElement('option');
               option.value = breed[i].id;
                option.textContent = breed[i].name;
                link.breadSelect.append(option);
                }  
        }).catch(errorFetchBreeds);
}

function fetchCatByBreed(breedId) {
  link.catInfo.innerHTML = ''
  preloaderId.classList.remove(`active_loader`);
  
  fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=${IPA_KEY}`
  )
    .then(response => {
      if (!response.ok) {
            throw new Error(response.status);
        } 
      return response.json(); 
    })
    .then(renderCat)
    .catch(errorFetchBreeds)
    .finally(() => preloaderId.classList.add(`active_loader`));
}
         
function renderCat(cats) {
  const markup = cats
    .map((cat) => {
        return `
      <div class="info">
    <div class="info-img">  
         <img src="${cat.url}" alt="" width = "600px" height="400px">
    </div>
    <div class="info-body">
    <h2 class="info-title">${cat.breeds[0].name}</h2>
        <p class="info-description">${cat.breeds[0].description}</p>
        <p class="info-temperament"><span class="span-temperament">Temperament:</span> ${cat.breeds[0].temperament}</p>
    </div>
</div>`;
    })
    .join(""); 
  link.catInfo.innerHTML = markup;
}

function errorFetchBreeds() {
      Notify.failure (`Oops! Something went wrong! Try reloading the page!`);
}

export default { fetchBreeds, fetchCatByBreed, renderCat, errorFetchBreeds}
    

