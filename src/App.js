import React from 'react';
import './App.css';
import { Container, Spinner } from 'react-bootstrap';
import Search from './components/Search';



const App = () => {
  return (
   <Container className="container">
    <div>
      <Search/>
        <Spinner 
          animation="border" 
          role="status"
          className="spinner">
          <span 
          className="sr-only"
          >
            Loading...
          </span>
        </Spinner>
    </div>
    <div>
    {/* <Results/> */}
    </div>
    </Container>
  );
}

export default App;