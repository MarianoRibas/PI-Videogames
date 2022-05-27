import './App.css';
import {BrowserRouter, Route, Switch, Routes} from 'react-router-dom'
import Home from "./components/Home.jsx";
import LandingPage from "./components/LandingPage";
import Game from './components/Game';

function App() {
  return (
    <BrowserRouter >
    <div className="App">
      <Routes>
      <Route exact path = "/" element={<LandingPage />}/>
      <Route path = "/home" element={<Home />}/>
      <Route path = "/home" element={<Game />}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
