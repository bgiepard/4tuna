import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateGame from './views/CreateGame';
import Lobby from './views/Lobby';
import Game from './views/Game';
import Home from './views/Home';

function App() {
  return (
    <div className="p-4 h-full bg-[#1E1E1E] mx-auto flex flex-col">
      {/*<div className="w-full max-w-[320px] max-h-[550px] mx-auto h-full border">*/}
      <div className="w-full max-w-[500px] max-h-[800px] mx-auto h-full ">
        <Router>
          <Routes>
            <Route path="/" element={<Game />} />
            {/*<Route path="/" element={<Home />} />*/}
            {/*<Route path="/createGame" element={<CreateGame />} />*/}
            {/*<Route path="/lobby/:roomID" element={<Lobby />} />*/}
            {/*<Route path="/game/:gameID" element={<Game />} />*/}
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
