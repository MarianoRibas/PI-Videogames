import './App.css';
import {BrowserRouter, Route, Switch, Routes} from 'react-router-dom'
import Home from "./components/Home.jsx";
import LandingPage from "./components/LandingPage";
import Game from './components/Game';
import GameDetail from './components/GameDetail';
import CreateGame from './components/CreateGame'

function App() {
  return (
    <BrowserRouter >
    <div className="App">
      <Routes>
      <Route exact path = "/" element={<LandingPage />}/>
      <Route path = "/home" element={<Home />}/>
      <Route path = "/home" element={<Game />}/>
      <Route exact path='/videogame/:id' element={<GameDetail/>}/>
      <Route exact path='/videogame' element={<CreateGame />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
