import React from 'react'; 
import './Search.css';
import './Header.css'
import './Results.css'
import { Container, Form, Col, Row, Button, Card, Accordion, Badge, Pagination } from 'react-bootstrap';
import ResultCard from './Card';
import AutoType from './AutoType.Js';
const _ = require("lodash"); 

class Search extends React.Component {


  constructor( props ) {
      super( props );
      
      this.state = {
        query: '',
        results: [],
        loading: false,
        message: '',
        activePage: 1
      };
      
      this.remoteJobs = this.props.jobs;
  }

  // render top 10 jobs on load --> results in state ^^ would be this.props.jobs[10]


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
    console.log("Setting state, this is", this);
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

  mostRecentJobs = () => {
    console.log('it works')
       // return 10 of <h1>"today's jobs"<h1> with "new badge" and clear upon new search                 
    }
    
  renderJobsOnLoad = () => {
    const { results } = this.state;
    document.addEventListener("DOMContentLoaded", (this.mostRecentJobs))
  }
  
  renderSearchResults = () => {
    const { results } = this.state;
    console.log("Rendering search results with results", typeof(results));
    if (results.length == 0) {
      return;
    }
    const defaultImg = "../img/default.jpg"


      return (
        
        
        <div className="results-container">

          
            {/*<Pagination
            className="pagination"
            activePage={this.state.activePage}
            itemsCountPerPage={10}
            totalItemsCount={results.length}
            pageRangeDisplayed={ Math.ceil(results.length/10) }
            onChange={this.handlePageChange}
            >*/}
            <Container>
            <Pagination bsName="test" size="sm">

            {/*_.uniqBy(results).map((result, index) => {
              <Pagination.Item key={index} active={(index+1 === this.state.activePage)}>
                test
              </Pagination.Item>
            })*/}
              {results.map((result, index) => {
                return <Pagination.Item key={index} active={(index+1 === this.state.activePage)}>
                      {ResultCard(result)}
                  </Pagination.Item>
              })}
             
            </Pagination>
            </Container>

      </div>
    
      )
  };
  



  render() {

    const { loading, results } = this.state;
    
    console.log(`Rendering, local loading is ${loading}, state loading is ${this.state.loading}`);
    
    return (
      <div>
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
              placeholder={`Search ${this.props.jobs.length} remote tech jobs...`}
              className="searchbox"
              type="text"
              name="query"
              value={this.query}
              id="search-input"
              onChange = {_.debounce(this.handleOnInputChange, 150)}/>
              <i className="fas fa-search search-icon"/>
            </Col>  
            {/*
              <AutoType  
              strings={[
                'Some <i>strings</i> are slanted',
                'Some <strong>strings</strong> are bold',
                'HTML characters &times; &copy;'
              ]}
            />  */}     
        </Form>
        </div>

      {/* Results Row */}
        <Row>
            {this.renderSearchResults()}
        </Row> 

      </div>
    )
  }
}

export default Search;