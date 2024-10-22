import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateGame from './views/CreateGame';
import Lobby from './views/Lobby';
import Game from './views/Game';
import Home from './views/Home';

function App() {
  return (
    <div className="p-4 h-full bg-gradient-to-b from-[#0B0A4C] to-[#4B169D] mx-auto flex flex-col ">
      <div className="w-full max-w-[450px] max-h-[700px] mx-auto h-full">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createGame" element={<CreateGame />} />
            <Route path="/lobby/:roomID" element={<Lobby />} />
            <Route path="/game/:gameID" element={<Game />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
