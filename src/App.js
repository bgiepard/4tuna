import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateGame from './views/CreateGame';
import Lobby from './views/Lobby';
import Game from './views/Game';
import Home from './views/Home';
import FindRoom from './views/FindRoom';
import SoloGame from './views/SoloGame';

function App() {
  return (
    <div className="h-full bg-gradient-to-bl from-[#EC7C94] to-[#E3744B] mx-auto flex flex-col">
      <div className="w-full max-w-[660px] max-h-[1150px] mx-auto h-full  overflow-hidden">
        <Router>
          <Routes>
            {/*<Route path="/" element={<Game />} />*/}
            <Route path="/" element={<Home />} />
            <Route path="/createGame" element={<CreateGame />} />
            <Route path="/lobby/:roomID" element={<Lobby />} />
            <Route path="/game/:gameID" element={<Game />} />
            <Route path="/findRoom" element={<FindRoom />} />
            <Route path="/soloGame" element={<SoloGame />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
