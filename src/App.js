import React, { useState } from 'react';
import './App.css';
import { Container, Spinner, Row } from 'react-bootstrap';
import Search from './components/Search';
import FetchJobs from './Jobs';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";


const LoadingSpinner = () => 
<Spinner 
  animation="border" 
  role="status"
  className="spinner">
  <span 
  className="sr-only"
  >
    Loading...
  </span>
</Spinner>;

const App = () => {
  const [jobData, setJobs] = useState(false);

  FetchJobs().then((jobs) => {
      setJobs(jobs);
  })

  return (
   <Container 
    className="container">
    <div>
      {jobData ? <Search jobs={jobData}/> : <LoadingSpinner />}
    </div>
    <MDBFooter color="blue" className="footer font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <p>
              This application is powered by the <a target="_blank" href="https://www.producthunt.com/posts/remote-jobs-api">Remote OK Jobs API.</a>
              <br></br>
            </p>
          </MDBCol>
          <MDBCol md="6">
            <ul>
              <li className="list-unstyled">
                
              </li>
              <li className="list-unstyled">
                <a target="_blank" href="https://twitter.com/home">Twitter</a>
              </li>
              <li className="list-unstyled">
                <a target="_blank" href="https://github.com/dyudis314">Github</a>
              </li>
              <li className="list-unstyled">
                <a target="_blank" href="https://github.com/dyudis314/remoteup">Contribute!</a>
              </li>
                   
              </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://dylanyudis.com/"
          target="_blank"> Dylan Yudis</a> | remoteUp
        </MDBContainer>
      </div>
    </MDBFooter>
    </Container>
  );
}

export default App;