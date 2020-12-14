import axios from 'axios';
import { proxy } from '../config';

/*** Query search function ***/

  export default class Search {
    constructor(query) {
    this.query = query;
    }
    

  async getResults() {
    try {
      const res = await axios(`${proxy}https://jobs.github.com/positions.json?description=${this.query}&location=remote`);
      this.result = res.data;
      console.log(res);
      } catch (error) {
      alert(error);
             }
          }
        }