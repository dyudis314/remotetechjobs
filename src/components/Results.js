import React from 'react';
import Search from './Search';
import { Row, Button, Card, Accordion } from 'react-bootstrap';
/*
class Results extends React.Component {


  constructor( props ) {
    super( props );
      
    this.state = {
      results: {},
      loading: false,
    };

    renderSearchResults = () =>  {
      const {results} = this.state;
 
      if (Object.keys(results).length && results.length) {

  render() {

    return (
      <Row>
     
      <div className="results-container">
        { results.map(result => {
           
          return (
            <Card 
            key={result.id} 
            href={result.url} 
            target="_blank" className="result-item"
            variant="success"
           >
          <Card.Img 
           variant="top"
           src={result.company_logo} 
           alt={result.company} />
            <Card.Body>
              <Card.Title className="job-title"> <i>{result.company}</i> |   {result.position}
              </Card.Title>
              <Card.Text>
                 <p className="posted-on">Posted on {
                 
                    result.date.split('T')[0].slice(5) 
                    + 
                    result.date.slice(0,5).replace("-", "")

                  //.substr(0,3) + '-' (adds a '-')
                }</p>
             
                <Button 
                  variant="primary" 
                  size="lg"
                  className="apply-here"
                  href={result.url}>
                    Apply Here
                </Button>
                </Card.Text>
                <Accordion>
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                        Learn More
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
    }
  }
}

  

 export default Results; 
 */
 