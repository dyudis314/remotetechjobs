import axios from 'axios';

class Job {
  constructor(company_name, company_logo, position, description, location, posted_on, link, tags, source) {
      this.company_name = company_name;
      this.company_logo = company_logo;
      this.position = position;
      this.description = description;
      this.location = location;
      this.posted_on = posted_on;
      this.link = link;
      this.source = source;
      this.tags = tags;
  }
}

const jobSources = {
  'Remote Ok': [
    () => {
      return new Promise((resolve, reject) => {
        axios.get('https://remoteok.io/api', {mode: 'no-cors'}).then((res) => {
          if (res.status === 200){
           resolve(res.data.slice(1));
          } else {
            reject(res.status);
          }
        })
      })
    },
    (j) => {
      // Transform a remoteok job into a Job object
      let job_date =  j.date.split('T')[0].slice(5) + j.date.slice(0,5).replace("-", "");
      return new Job(j.company, j.company_logo, j.position, j.description, j.location, job_date, j.url, j.tags, 'Remote Ok')
    }
  ]
}

const cachedJobs = {};

const FetchJobs = () => { 
  return new Promise((resolve, reject) => {
    Object.entries(jobSources).forEach(([sourceName, sourceUtils]) => {
     
      if (sourceName in cachedJobs) {
        console.log(`Found cached jobs from ${sourceName}`);
        resolve(cachedJobs[sourceName]);
      } else {
          console.log(`Fetching jobs from ${sourceName}...`);
        sourceUtils[0]().then((jobData) => {
          const sourceJobs = jobData.map(sourceUtils[1]);
          cachedJobs[sourceName] = sourceJobs;
          resolve(sourceJobs);
        }).catch((err) => {
          console.error(`Error retrieving jobs from ${sourceName}`);
          reject(err);
        })
      }
    });
  });
}

export default FetchJobs;