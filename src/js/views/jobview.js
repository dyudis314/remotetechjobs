import { elements } from './base';

export const clearJob = () => {
  elements.job.innerHTML = '';
};

export const renderJob = (job, isLiked) => {
  const markup = `
  <button class="job__like">
      <svg class="deader__likes">
          <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
      </svg>
      </button>
  </div>

    <figure class="job__fig">
        <h1 class="job_role">${job.title}</h1> 
        <h1 class="company_name">${job.company}</h1>
          <h3 class="job_location">${job.location}</h3>
          <img src="${job.logo}" alt="${job.title}" class="job_img">
          <h2><i>Job Details</i></h2>
            <p class="job_description"><span class="visible-xs-inline"><br></span>${job.description}</p>
            <br>
            <a href="${job.redirectURL}" target="_blank" class="link">${job.redirectURL}</a>
            <br><br>
            <p class="job_createdAt">Posted on: ${job.createdAt}</p>
    </figure> 
  `;
  elements.job.insertAdjacentHTML('afterbegin', markup);
};