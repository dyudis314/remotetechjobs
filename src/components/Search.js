import React from 'react'; 
import './Search.css';
import './Header.css'
import './Results.css'
import { Form, Col, Row, Button, Card, Accordion } from 'react-bootstrap';
import Pagination from "react-pagination-bootstrap";

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
        activePage: 1
      };
      
      this.remoteJobs = this.props.jobs;
  }


  findResults(query) {
    this.setState({
      loading: true
    })
    let queryLowerCase = query.toLowerCase();
    let foundJobs = [];
    this.props.jobs.forEach((j) => {
        let validFields = [
          j.position
        ]
        // Add all of the tags individually to validFields,
        // e.g. this way you end up with ["developer", "golang", "js"] instead of ["developer", ["golang", "js"]]
       // validFields = validFields.concat(j.tags);
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
}

  handleOnInputChange = (event) => {
  const query = event.target.value;
  if (! query ) {
    this.setState( {query, results: {}, message: '' });
   } else { 
      this.findResults(query);
    }
  };
  

  /* Pagination */
  handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    this.setState( {
      activePage: pageNumber      
    } );
  }
  
  renderSearchResults = () => {
    const {results } = this.state;
    const defaultImg = "../img/default.jpg"

    if (Object.keys(results).length && results.length) {
     
        for (let number = 1; number <= 5;  number ++) {
          
        console.log("First result", results[0]);
      return (
        
        
        <div className="results-container">

            <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={10}
            totalItemsCount={results.length}
            pageRangeDisplayed={ Math.ceil(results.length/10) }
            onChange={this.handlePageChange}
            />
            

          { /* Lodash Library method to filter out duplicate results */}
         
            { _.uniqBy(results).map((result, index) => {
            return (
              
               
              
              <Card 
              key={index} 
              href={result.link} 
              target="_blank" className="result-item"
              variant="success"
             >
            <Card.Img 
             variant="top"
             src = {
              result.company_logo
             ?
              result.company_logo
             : 
              result.company_logo == 
             "../img/default.jpg"}
             alt = {
               result.company_name
              }                         
             />

              <Card.Body>
                <Card.Title className="job-title"><i>
                {result.company_name}</i> | {result.position}
                </Card.Title>
                <Card.Text>
                   <p className="posted-on">Posted on {result.posted_on}</p>
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
                          href={result.link}>
                            Apply Here
                        </Button>
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>{result.description}</Card.Body>
                    </Accordion.Collapse>
                    <Card.Footer>
                      <small>Source: <i>{result.source}</i>
                      </small>
                    </Card.Footer>
                  </Card>
                </Accordion>
                </Card.Body>
            </Card>     
          )
        }) }
      </div>
      
      )
    } 
  }
};


  render() {
    const { loading } = this.state;
    
    console.log(`Rendering, local loading is ${loading}, state loading is ${this.state.loading}`);

  const items = [
    {
      id: 0,
      name: 'Developer'
    },
    {
      id: 1,
      name: 'JavaScript'
    },
    {
      id: 2,
      name: 'Frontend Engineer'
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
              <Form.Control placeholder={`Search ${this.props.jobs.length} jobs...`}
              className="searchbox"
              type="text"
              name="query"
              value={this.query}
              id="search-input"
              onChange = {_.debounce(this.handleOnInputChange, 150)}/>
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

      {/* Results Row */}
        <Row>
     {this.renderSearchResults()}
        </Row> 

      </div>
    )
  }
}

export default Search;