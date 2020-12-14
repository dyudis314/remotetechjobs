export const elements = {
  searchInput: document.querySelector('.search__field'),
  searchForm: document.querySelector('.search'),
  searchResList: document.querySelector('.results__list'),
  SearchRes: document.querySelector('.results'),
  searchResPages: document.querySelector('.results__pages'),
  job: document.querySelector('.job'),
  likesMenu: document.querySelector('.likes__field'),
  likesList: document.querySelector('.likes__list'),
  headerText: document.querySelector('.header_text')
    };

export const elementStrings = {
  loader: 'loader'
    };

export const renderLoader = parent => {
const loader = `
      <div class="loader"></div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
  }; 
  
export const clearLoader = () => {
  const loader = document.querySelector(`.${elementStrings.loader}`);
  if (loader) loader.parentElement.removeChild(loader);
};