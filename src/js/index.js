import Search from './models/search';
import axios from 'axios';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchview';
import * as jobView from './views/jobview';
import Job from './models/job';
import Likes from './models/likes';
import * as likesView from './views/likesview';

      /**       Global State of App 
   
               - Job Search object
               - Current Job object
               - Saved Jobs
                                         **/
                                        

const state = {};

/*** Search Controller ***/

const controlSearch = async () => {
   // 1) Get query from view
   const query = searchView.getInput();

   if (query) {
   // 2) New search object and add to state
   state.search = new Search(query);

   // 3) Prepare UI for results
   searchView.clearInput();
   searchView.clearResults();
   renderLoader(elements.SearchRes);

   try { 
   // 4) Search for jobs
   await state.search.getResults();

   // 5) Render results on UI
      clearLoader();
      searchView.renderResults(state.search.result);
   } catch(error) {
      alert('Something went wrong with the search!');
      clearLoader();
       }
     }
   };

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
   const btn = e.target.closest('.btn-inline');
   if (btn) {
      const goToPage = parseInt(btn.dataset.goto, 10);
      searchView.clearResults();
      searchView.renderResults(state.search.result, goToPage);
   };
});


/*** Job Controller ***/

const controlJob = async () => {
   // Get ID
   const id = window.location.hash.replace('#', '');

if (id) {
   // Prepare UI for changes
   jobView.clearJob();

   // Create a new Job object
   state.job = new Job(id);

   try {
   // Get job data
   await state.job.getJob();

   // Render job
  
   jobView.renderJob(
      state.job,
      state.likes.isLiked(id)
      );

   } catch(err) {
         alert('Error processing request!');
       }
   }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlJob));

/*** Likes Controller ***/

const controlLike = () => {
   if (!state.likes) state.likes = new Likes();
      const currentID = state.job.id;

// User has not yet liked current job
   if (!state.likes.isLiked(currentID)) {
// Add like to the state
   const newLike = state.likes.addLike(
      currentID,
      state.job.title,
      state.job.company,
      state.job.logo
   );
// Toggle the like button
   likesView.toggleLikeBtn(true);

// Add like to UI
   likesView.renderLike(newLike);

// Use has liked current job
   } else {
// Remove like from state
   state.likes.deleteLike(currentID);
// Toggle like button
   likesView.toggleLikeBtn(false);
// Remove like from UI
   likesView.deleteLike(currentID);
   }
   likesView.toggleLikeMenu(state.likes.getNumLikes());
};

// Restore liked jobs on page load
   window.addEventListener('load', () => {
   state.likes = new Likes();
   state.likes.readStorage();
   // Toggle like menu
   likesView.toggleLikeMenu(state.likes.getNumLikes());

   // Render existing likes
   state.likes.likes.forEach(like => likesView.renderLike(like));
})

 elements.job.addEventListener('click', e => {
    if (e.target.matches('.job__like, .job__like *'))
     {
        controlLike();
     }
 });

 // ** Header title refresh ** // 

 const titleClickRefresh = () => {
   elements.headerTitle.addEventListener('click', e => {
      location.reload();
       });
 }

 titleClickRefresh();
 