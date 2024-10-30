import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateGame from './views/CreateGame';
import Lobby from './views/Lobby';
import Game from './views/Game';
import Home from './views/Home';
import FindRoom from './views/FindRoom';

function App() {
  return (
    <div className="h-full bg-gradient-to-br from-[#56A1FC] to-[#6E41DA] mx-auto flex flex-col">
      {/*<div className="w-full max-w-[750px] max-h-[1000px] mx-auto h-full border ">*/}
      {/*<div className="w-full max-w-[320px] max-h-[550px] mx-auto h-full border ">*/}
      <div className="w-full max-w-[660px] max-h-[1150px] mx-auto h-full border overflow-hidden">
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
