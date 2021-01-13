import React from 'react'; 
import './Search.css';
import './Header.css'
import './Results.css'
import { Form, Col, Row, Button, Card, Accordion, Badge } from 'react-bootstrap';
import Pagination from "react-pagination-bootstrap";


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
            className="pagination"
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
             src = {result.company_logo}
             onError={this.src= defaultImg}             
             />

              <Card.Body>
                <Card.Title className="job-title"><i>
                {
                result.company_name !==
                 ""
                 ?
                 result.company_name
                 :
                 "Company Name Not Found"
                }</i> | {result.position}
                <h5>
                  <Badge 
                  className="location"
                  variant="secondary">{result.location}                
                </Badge>
                </h5>
                </Card.Title>
                <Card.Text>
                  <p className="tags">
                    <i>
                  #{result.tags[0]} #{result.tags[1]} #{result.tags[2]}
                  </i>
                  </p>
                  <div className="date">
                    <i class="far fa-clock"></i><p className="posted-on">Posted on {result.posted_on}
                    </p>
                  </div>                                  
                </Card.Text>

                <Accordion>
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        Learn More                         
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>{result.description}
                      <br></br><br></br>
                        <Button 
                        variant="primary" 
                        size="sm"
                        href={result.link}
                        target="_blank">
                        Apply
                        </Button>                                              
                      </Card.Body> 
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
    
    return (
      <div>
      <Row>
        {/* Heading */}
        <div className="heading">
            <div className="heading-text">
          <h1>remoteUp</h1>
          <h5>Work In Tech From Anywhere</h5>
            </div>
        {/* Search Input */}
        <Form>
            <Col>
              <Form.Control 
              placeholder={`Search ${this.props.jobs.length} jobs...`}
              className="searchbox"
              type="text"
              name="query"
              value={this.query}
              id="search-input"
              onChange = {_.debounce(this.handleOnInputChange, 150)}/>
              <i className="fas fa-search search-icon"/>                            
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