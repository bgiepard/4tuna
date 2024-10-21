import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateGame from './views/CreateGame';
import Lobby from './views/Lobby';
import Game from './views/Game';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateGame />} />
        <Route path="/lobby/:roomID" element={<Lobby />} />
        <Route path="/game/:gameID" element={<Game />} />
        {/*<Route path="/" element={<Game />} />*/}
      </Routes>
    </Router>
  );
}

export default App;
