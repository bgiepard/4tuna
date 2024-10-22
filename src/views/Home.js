import { useNavigate } from 'react-router-dom';

import logo from '../assets/logo.svg';

const Home = () => {
  const navigate = useNavigate();

  const navigateToRoom = (room) => {
    if (room.length === 6) {
      const roomName = room.toUpperCase();
      navigate(`/lobby/${roomName}`);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-[500px] h-full mx-auto">
      <div className="flex justify-center items-center gap-2">
        <img src={logo} alt="" />
        <h1 className="text-white text-[30px] text-center font-extrabold">
          4TUNA.PL
        </h1>
      </div>

      <div className="flex gap-4 justify-center mt-2">
        <span className="text-blue-200 text-[13px]">Bez rejestracji</span>
        <span className="text-blue-200 text-[13px]">Bez pobierania</span>
        <span className="text-blue-200 text-[13px]">Całkowicie za darmo</span>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow">
        <span className="mb-2 text-blue-200 text-[20px] mt-1">
          Dołącz do znajomych
        </span>

        <input
          type="text"
          onChange={(e) => navigateToRoom(e.target.value)}
          className="w-4/5 mb-8 px-4 py-3 text-center bg-black bg-opacity-10 rounded-lg bg-transparent border-2 border-blue-300 text-white uppercase placeholder:text-blue-400 placeholder:capitalize"
          placeholder="Wpisz kod pokoju"
        />

        <span className="mb-8 text-blue-400 text-[14px] mt-1">lub</span>

        <button className="opacity-50 w-4/5 bg-gradient-to-b from-blue-400 to-blue-600 border-b-4 border-blue-700 text-blue-100 rounded-[8px] text-[18px] hover:from-blue-300 hover:to-blue-500">
          Zagraj solo
        </button>
        <span className="mb-6 text-blue-200 text-[14px] mt-1">
          Ćwicz samemu odgadywanie haseł!
        </span>

        <button className="opacity-50 w-4/5 bg-gradient-to-b from-blue-400 to-blue-600 border-b-4 border-blue-700 text-blue-100 rounded-[8px] text-[18px] hover:from-blue-300 hover:to-blue-500">
          Wylosuj przeciwników
        </button>
        <span className="mb-6 text-blue-200 text-[14px] mt-1">
          Dołącz do gry online z innymi
        </span>

        <button
          onClick={() => navigate(`/createGame`)}
          className="w-4/5 bg-gradient-to-b from-cyan-500 to-cyan-700 border-b-4 border-cyan-900 text-blue-100 rounded-[8px] text-[18px] hover:from-cyan-400 hover:to-cyan-600"
        >
          Stwórz pokój
        </button>
        <span className="text-blue-200 text-[14px] mt-1">
          Stwórz własną gre i zaproś znajomych
        </span>
      </div>

      <div className="w-full">
        <span className="text-blue-400 text-center block">
          &copy; 4tuna.pl 2024
        </span>
      </div>
    </div>
  );
};

export default Home;
