import React from 'react'; 
import './Search.css';
import './Header.css'
import './Results.css'
import axios from 'axios';
import { Form, Col, Row, Button, Card, Accordion } from 'react-bootstrap';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
const _ = require("lodash");  




class Search extends React.Component {


  constructor( props ) {
      super( props );
      
      this.state = {
        query: '',
        results: {},
        loading: false,
        message: '',
        currentPage: 1,
        resultsPerPage: 5
      };

      this.cancel = '';
  
      this.remoteJobs = [];     
  
  }

  fetchJobs() { 
   
    return new Promise((resolve, reject) => {
      this.setState({loading: true });
      axios.get('https://remoteok.io/api').then((res) => {
        if (res.status == 200){
          this.remoteJobs = res.data.slice(1);
          this.setState({loading: false });
          resolve();
        } else {
          reject(res.status);
        }
      })
    })
  }

  getOrReturnJobs() {
    return new Promise((resolve,) => {
      if (this.remoteJobs.length > 0) {
        resolve(this.remoteJobs);
      } else {
        this.fetchJobs().then(() => resolve(this.remoteJobs));
        this.setState({
          loading: false,
        });
      }
    })
  }

  findResults(query) {
    this.setState({
      loading: true
    })
    this.getOrReturnJobs().then((jobs) => {
      let queryLowerCase = query.toLowerCase();
      let foundJobs = [];
      jobs.forEach((j) => {
          let validFields = [
            j.description,
            j.location,
            j.position
          ]
          // Add all of the tags individually to validFields,
          // e.g. this way you end up with ["developer", "golang", "js"] instead of ["developer", ["golang", "js"]]
          validFields = validFields.concat(j.tags);
          console.log("searching fields", validFields, "for job", j);
          validFields.forEach((f) => {
              f = f.toLowerCase();
              if (f.includes(queryLowerCase) || queryLowerCase.includes(f)) { 
                foundJobs.push(j);
              }
          });
      });
      let totalResults = foundJobs.length;
      let message = `Found ${totalResults} jobs that match query ${query}`
      console.debug(message);
      this.setState( {
        results: foundJobs,
        message: message,
        totalResults: totalResults,
        loading: false,
    } )
    }).catch((err) => {
      console.error(err);
      this.setState({
        loading: false,
        message: "Error"
      })
    })
  }


  handleOnInputChange = (event) => {
  const query = event.target.value;
  if (! query ) {
    this.setState( {query, results: {}, message: '' });
   } else { 
     this.setState({
        state: query,
        loading: true,
        message: '' },
           () => {
      this.findResults(query);
      });
    }
  };
  
  
  renderSearchResults = () => {
  
    const {results, currentPage, resultsPerPage, loading } = this.state;
  /*
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);
    */

    if (Object.keys(results).length && results.length) {

      return (
        <Row>

       
        <div className="results-container">

          { /* Lodash Library method to filter out duplicate results */}
          { _.uniqBy(results).map((result, index) => {


            return (
              <Card 
              key={index} 
              href={result.url} 
              target="_blank" className="result-item"
              variant="success"
             >
            <Card.Img 
             variant="top"
             src={result.company_logo} 
             alt={result.company} />
              <Card.Body>
                <Card.Title className="job-title"><i>
                {result.company}</i> | {result.position}
                </Card.Title>
                <Card.Text>
                   <p className="posted-on">Posted on {
                     /* Removes Exact Time and reformats Date to look cleaner
                     */  
                    result.date.split('T')[0].slice(5) 
                    + 
                    result.date.slice(0,5).replace("-", "")

                  //.substr(0,3) + '-' (adds a '-')
                }</p>
                </Card.Text>

                <Accordion>
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        Learn More
                          <Button
                          target="_blank" 
                          variant="primary" 
                          size="sm"
                          className="apply-here"
                          href={result.url}>
                            Apply Here
                        </Button>
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>{result.description}</Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
                </Card.Body>
            </Card>
          )
        }) }
      </div>
      </Row>
    )
      
  }
};




  render() {
    const { loading } = this.state;

    //console.log( this.state );
    
    

    console.log(`Rendering, local loading is ${loading}, state loading is ${this.state.loading}`);

// if loading is false render results, ==
// !state.loading then return results else return spinner
  const items = [
    {
      id: 0,
      name: 'Cobol'
    },
    {
      id: 1,
      name: 'JavaScript'
    },
    {
      id: 2,
      name: 'Basic'
    },
    {
      id: 3,
      name: 'PHP'
    },
    {
      id: 4,
      name: 'Java'
    }
  ]

  const handleOnSearch = (string, cached) => {
    // onSearch returns the string searched and if
    // the values are cached. If the values are cached
    // "cached" contains the cached values, if not, returns false
    console.log(string, cached)
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item)
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }


    return (
      <div>
      <Row>
        {/* Heading */}
        <div className="heading">
          <h1>remoteUp</h1>
            <h5>Work In Tech From Anywhere</h5>
        
        {/* Search Input */}
        <Form>
            <Col>
              <Form.Control placeholder="Search over 10,000 jobs..."
              className="searchbox"
              type="text"
              name="query"
              value={this.query}
              id="search-input"
              onChange = {this.handleOnInputChange}/>
              <i className="fas fa-search search-icon"/>
              
              {/* Search Input 
              <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
          />
          */}
            </Col>
        </Form>
        </div>
      </Row>

   

      <Row>

      {/* Results Row */}

        <Row>
     {this.renderSearchResults()}
        </Row> 
      
      </Row>


      </div>
    )
  }
}

export default Search;