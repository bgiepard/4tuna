import { useNavigate } from 'react-router-dom';

import CircleLogo from '../assets/circleLogo.png';
import TunaLogo from '../assets/tunaLogo.svg';
import Coins from '../assets/coints.svg';

const Home = () => {
  const navigate = useNavigate();

  // const navigateToRoom = (room) => {
  //   if (room.length === 3) {
  //     const roomName = room.toUpperCase();
  //     navigate(`/lobby/${roomName}`);
  //   }
  // };

  return (
    <div className="flex flex-col justify-between w-full max-w-[650px] overflow-hidden h-full mx-auto relative ">
      {/*className="flex flex-col w-full max-w-[320px] max-h-[650px] overflow-hidden h-full mx-auto bg-[#EC7C94]  -translate-y-12 ">*/}
      {/*<img src={Coins} alt="" className="top-1/2 left-0 right-0 absolute  mx-auto" />*/}

      <div className="flex flex-col items-center text-white relative z-10 mt-4 -mb-6">
        <span className="font-[800] text-[28px] uppercase">Zakręć kołem</span>
        <span className="opacity-80 font-[800] text-[24px] uppercase -mt-2">Odgadnij hasło</span>
        <span className="opacity-60 font-[800] text-[22px] uppercase -mt-1">Pokonaj rywali</span>
      </div>

      <div className="shrink-0 flex items-center justify-center w-[220px] h-[220px] rounded-full mx-auto bg-[#EDAAB8] border-[28px] border-[#F19BAC] ring-[28px] ring-[#EF90A4] -mb-6">
        <img src={CircleLogo} alt="" className="scale-125  mt-6" />
        <img src={TunaLogo} alt="" className="mt-4 absolute " />
      </div>

      <div className="flex flex-col items-center justify-center flex-grow py-2 relative z-10">
        <span className="mb-1 text-[14px] text-pink-100">Ćwicz odgadywanie haseł</span>
        <button
          className="mb-4 px-4 min-w-[180px] h-[45px] font-semibold bg-gradient-to-b from-[#A15EE7] to-[#844CBC] shadow-md text-white rounded-[8px] text-[14px]  p-0"
          onClick={() => navigate('/soloGame')}
        >
          Trenuj solo
        </button>

        <span className="mb-1 text-[14px] text-pink-100">Pokonaj rywali online</span>
        <button
          className="mb-8 px-4 min-w-[180px] h-[45px] font-semibold bg-gradient-to-b from-[#A15EE7] to-[#844CBC] shadow-md text-white rounded-[8px] text-[14px]  p-0"
          onClick={() => navigate('/findRoom')}
        >
          Wylosuj przeciwników
        </button>

        <span className="mb-1 text-[14px] text-pink-100">Załóż pokój i zaproś znajomych</span>
        <button
          onClick={() => navigate(`/createGame`)}
          className=" px-4 min-w-[180px] h-[45px] font-semibold bg-gradient-to-b from-[#FFD224] to-[#BC9B1B] shadow-md text-white rounded-[8px] text-[14px]  p-0"
        >
          Graj z przyjaciółmi
        </button>
      </div>

      <span className="p-2 text-center text-white text-sm font-semibold">&copy; 4TUNA.PL 2024</span>
    </div>
  );
};

export default Home;
