import catApi from './cat-api';
import linksDokQuerySel from './links';

const link = linksDokQuerySel();
link.breadSelect.addEventListener(`change`, onChangeSelectOption);

catApi.fetchBreeds();
 
function onChangeSelectOption() {
    const selectedOptionValue = link.breadSelect.value;
       catApi.fetchCatByBreed(selectedOptionValue); 
}   

// jhjkjlkl;k