import React, { useState } from 'react';
import './App.css';
import { Container, Spinner } from 'react-bootstrap';
import Search from './components/Search';
import FetchJobs from './Jobs';
import Footer from './components/Footer'
import './Header.css'


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
    {Footer()}
    </Container>
  );
}

export default App;