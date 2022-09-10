
import { Container } from 'react-bootstrap';
import {Routes , Route} from 'react-router-dom'
import Home from './pages/home/home';
import PDP from './pages/PDP/PDP';

function App() {
  return (
    <Container>
      
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/:id' element={<PDP />} />
      </Routes>


      {/* <Home /> */}
      
      {/* <PDP /> */}
    </Container>
  );
}

export default App;
