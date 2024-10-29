import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateGame from './views/CreateGame';
import Lobby from './views/Lobby';
import Game from './views/Game';
import Home from './views/Home';
import FindRoom from './views/FindRoom';

function App() {
  return (
    <div className="h-full bg-gradient-to-b from-[#56A1FC] to-[#6E41DA] mx-auto flex flex-col">
      <div className="w-full max-w-[500px] max-h-[1000px] mx-auto h-full ">
        <Router>
          <Routes>
            {/*<Route path="/" element={<Game />} />*/}
            <Route path="/" element={<Home />} />
            <Route path="/createGame" element={<CreateGame />} />
            <Route path="/lobby/:roomID" element={<Lobby />} />
            <Route path="/game/:gameID" element={<Game />} />
            <Route path="/findRoom" element={<FindRoom />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
