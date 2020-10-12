import { elements } from './base';
import { limitJobDesAndUrl } from './searchview';

export const toggleLikeBtn = isLiked => {
  const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
  document.querySelector('.job__like use').setAttribute('href', `img/icons.svg#${iconString}`);
};

export const toggleLikeMenu = numLikes => {
  elements.likesMenu.style.visiblity = numLikes > 0 ? 'visible' : 'hidden';
};

export const renderLike = like => {
  const markup = `
  <li>
        <a class="likes__link" href="#${like.id}">
               <figure class="likes__fig">
                  <img src="${like.logo}">
                   </figure>
                  <div class="likes__data">
                  <h4 class="likes__name">${like.title}</h4>
                          <h4 class="likes__company">${like.company}</h4>
                          <br>
              </div>
         </a>
  </li>
  `;
  elements.likesList.insertAdjacentHTML('beforeend', markup);
};

export const deleteLike = id => {
  const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
  if(el) el.parentElement.removeChild(el);
};