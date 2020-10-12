import axios from 'axios';
import { proxy } from '../config';


/*** Creates a new job ***/

export default class Job {
  constructor(id) {
    this.id = id;
  }

  async getJob() {
    try {
      const res = await axios(`${proxy}https://jobs.github.com/positions/${this.id}.json`);
      this.title = res.data.title;
      this.company = res.data.company;
      this.location = res.data.location;
      this.logo = res.data.company_logo;
      this.description = res.data.description;
      this.redirectURL = res.data.company_url;
      this.createdAt = res.data.created_at;
    } catch(error) {
      alert('Something went wrong!');
    }
  }
}