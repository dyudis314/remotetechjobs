import React from 'react';
import { Card, Accordion, Button, Badge } from 'react-bootstrap';
import ScrollAnimation from 'react-animate-on-scroll';

const ResultCard = (result) => {
  if (! result.company_name == "") {
  return ( 
<ScrollAnimation
delay={150}
animateIn="fadeIn"
animateOut='fadeOut'>
    <Card 
    href={result.link} 
    target="_blank" className="result-item"
    variant="success"
   >
  <Card.Img variant="top" src={result.company_logo} />

    <Card.Body>
      <Card.Title className="job-title"><i>
      {result.company_name}</i> | {result.position}
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
  </ScrollAnimation> 
    )
  }
}

export default ResultCard;