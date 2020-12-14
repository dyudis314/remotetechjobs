import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = "";
}

export const clearResults = () => {
    elements.searchResList.innerHTML = "";
    elements.searchResPages.innerHTML = "";
};

export const limitJobDesAndUrl = (des, limit = 25) => {
    const newDes = [];
        if (des.length > limit) {
        des.split(' ').reduce((acc, curr) => {
            if (acc + curr.length <= limit) {
                newDes.push(curr);
            };
                return acc + curr.length;
                }, 0);

                // return result
                return `${newDes.join(' ')} ...`;
            };
        return title;
};
 
const renderJob = job => {
const markup = `

        <li>
            <a class="results__link" href="#${job.id}">
            
            <div class="accordion">
                <div class="label"
                    <h1 class="job_role">${job.title}</h2> 
                    <h2 class="company_name">${job.company}</h2>
                    <h3 class=""><i>${job.location}</i></h3>
                </div>

                     <div class="contentBox">
                            <div class="content">
                                <p class="job_description"><span class="visible-xs-inline"><br></span>${job.description}</p>
                                <br>
                                <a href="${job.redirectURL}" target="_blank" class="link">${job.redirectURL}</a>
                                <br><br>
                                <p class="job_createdAt">Posted on: ${job.createdAt}</p>
                        
                    </div>
                </div>
            </div>
                
         </li>

         <br> <br>
`;
elements.searchResList.insertAdjacentHTML('beforeend', markup);
// The above will be executed 25 times for all jobs generated from a query search (via forEach method below).

};

 /* Accordion Collapsible
document.querySelectorAll('.accordion__button').forEach(button => {
    button.addEventListener('click', () => {
    const accordionContent = button.nextElementSibling;

    button.classList.toggle('accordion__button--active');

    if (button.classList.contains       ('accordion__button--active')) {
            accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
        } else {
            accordionContent.style.maxHeight = 0;
        }
    });
});*/

const createButton = (page, type) => 
`
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

const renderButtons = (page, numResults, jobsPerPage) => {
const pages = Math.ceil(numResults / jobsPerPage);
let button;
if (page === 1 && pages > 1) {
    // Only button to go to next page
    button = createButton(page, 'next');
} else if (page < pages) {
    // Both buttons
    button = `
        ${createButton(page, 'prev')}
        ${createButton(page, 'next')}
    `;
} else if (page === pages && pages > 1) {
    // Only button to go to prev page
    button = createButton(page, 'prev');
} else
// If 'undefined'
    return '';

elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (jobs, page = 1, jobsPerPage = 10) => {
    const start = (page -1) * jobsPerPage;
    const end = page * jobsPerPage;

  jobs.slice(start, end).forEach(renderJob);
  // Loops through the 25 results and calls the above function

renderButtons(page, jobs.length, jobsPerPage);
};


/*   <div class="accordion">
                <button type="button" class="accordion__button">Expand Content</button>
                 <div class="accordion__content">
                
                </div>    
            </div> 
                 */