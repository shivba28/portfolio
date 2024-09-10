import './App.css';
import { NavBar } from './components/Navbar';
import { Banner } from './components/Banner';
import { About } from './components/About';
import { Cursor } from './components/Cursor';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <About />
      <Cursor />
    </div>
  );
}

export default App;
