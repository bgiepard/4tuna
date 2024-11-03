import { useNavigate } from 'react-router-dom';

import CircleLogo from "../assets/circleLogo.png"
import TunaLogo from "../assets/tunaLogo.svg"
import Coins from "../assets/coints.svg"

const Home = () => {
  const navigate = useNavigate();

  const navigateToRoom = (room) => {
    if (room.length === 3) {
      const roomName = room.toUpperCase();
      navigate(`/lobby/${roomName}`);
    }
  };

  return (
      <div
          className="flex flex-col w-full max-w-[550px] overflow-hidden h-full mx-auto bg-[#EC7C94]  -translate-y-12 ">
          {/*className="flex flex-col w-full max-w-[320px] max-h-[650px] overflow-hidden h-full mx-auto bg-[#EC7C94]  -translate-y-12 ">*/}
        <img src={Coins} alt="" className="-bottom-12 left-0 right-0 absolute -z-[1] mx-auto"/>


        <div
            className="shrink-0 flex items-center justify-center w-[220px] h-[220px] rounded-full mx-auto mt-[20px] bg-[#EDAAB8] border-[25px] border-[#F19BAC] ring-[25px] ring-[#EF90A4]">
          <img src={CircleLogo} alt="" className="w-full mt-4"/>
          <img src={TunaLogo} alt="" className="mt-4 absolute "/>
        </div>

        <div className="flex flex-col items-center  text-white ">
          <span className="font-[800] text-[28px] uppercase">Zakręć kołem</span>
          <span className="opacity-80 font-[800] text-[24px] uppercase -mt-2">Odgadnij hasło</span>
          <span className="opacity-60 font-[800] text-[22px] uppercase -mt-1">Pokonaj rywali</span>
        </div>


        <div className="flex flex-col items-center justify-center flex-grow py-8">
          {/*<input*/}
          {/*  type="text"*/}
          {/*  onChange={(e) => navigateToRoom(e.target.value)}*/}
          {/*  className="w-4/5 mb-8 px-4 py-3 text-center bg-black bg-opacity-10 rounded-lg bg-transparent border-2 border-blue-300 text-white uppercase placeholder:text-blue-400 placeholder:normal-case"*/}
          {/*  placeholder="Wpisz kod pokoju"*/}
          {/*/>*/}

          <button
              className="mb-4 w-[180px] h-[35px] font-semibold bg-gradient-to-b from-[#FFD224] to-[#BC9B1B] border-b-4 border-[#B15D6F] text-white rounded-[8px] text-[14px]  p-0"
              onClick={() => navigate('/findRoom')}
          >
            Trenuj solo
          </button>

          <button
              className="mb-8 w-[180px] h-[35px] font-semibold bg-gradient-to-b from-[#FFD224] to-[#BC9B1B] border-b-4 border-[#B15D6F] text-white rounded-[8px] text-[14px]  p-0"
              onClick={() => navigate('/findRoom')}
          >
            Wylosuj przeciwników
          </button>

          <button
              onClick={() => navigate(`/createGame`)}
              className=" w-[180px] h-[35px] font-semibold bg-gradient-to-b from-[#FFD224] to-[#BC9B1B] border-b-4 border-[#B15D6F] text-white rounded-[8px] text-[14px]  p-0"
          >
            Stwórz pokój
          </button>
        </div>

        <span className="p-2 text-center text-white text-sm font-semibold">
        &copy; 4TUNA.PL 2024
      </span>
      </div>
  );
};

export default Home;
