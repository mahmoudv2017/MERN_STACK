
import { Container } from 'react-bootstrap';
import {Routes , Route} from 'react-router-dom'
import Home from './pages/home/home';
import PDP from './pages/PDP/PDP';
import Contenxt from './context/context';

function App() {
  return (
    <Container>
      <Contenxt>


        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:id' element={<PDP />} />
        </Routes>


      </Contenxt>
    </Container>
  );
}

export default App;
