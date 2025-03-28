import { Link } from 'react-router-dom';
import DropdownUser from './DropdownUser';
import LogoIcon from '../../images/logo/logo-icon.svg';
import DarkModeSwitcher from './DarkModeSwitcher';
import { useEffect, useState } from 'react';

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    console.log(token)
    const fetchAllPrices = async () => {
      const response = await fetch("https://phinance-backend.onrender.com/user/balance", { method: 'GET', headers: { "Authorization": `Bearer ${token}` } })
      const data = await response.json()
      console.log(data)
      setBalance(data)
    };

    fetchAllPrices();
  }, []);



  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">

        {/* Left Side */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="lg:hidden flex items-center gap-2 sm:gap-4">
            <button
              aria-controls="sidebar"
              onClick={(e) => {
                e.stopPropagation();
                props.setSidebarOpen(!props.sidebarOpen);
              }}
              className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
            >
              <span className="relative block h-5.5 w-5.5 cursor-pointer">
                <span className="du-block absolute right-0 h-full w-full">
                  <span className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!w-full delay-300'}`} />
                  <span className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && 'delay-400 !w-full'}`} />
                  <span className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!w-full delay-500'}`} />
                </span>
                <span className="absolute right-0 h-full w-full rotate-45">
                  <span className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!h-0 !delay-[0]'}`} />
                  <span className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!h-0 !delay-200'}`} />
                </span>
              </span>
            </button>

            <Link className="block flex-shrink-0 lg:hidden" to="/">
              <img src={LogoIcon} alt="Logo" />
            </Link>
          </div>

          {/* Placeholder for spacing on larger screens */}
          <div className="hidden lg:block w-[160px]"></div>
        </div>

        {/* Center - Φ Balance Display */}
        <div className="hidden lg:flex items-center justify-center">
          <span className="px-4 py-1.5 rounded-full bg-gray-100 dark:bg-gray-700 text-black dark:text-white font-semibold text-sm shadow hover:shadow-md transition duration-200 ease-in-out">
            Φ {balance}
          </span>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <DarkModeSwitcher />
          </ul>
          <DropdownUser />
        </div>

      </div>
    </header>
  );
};

export default Header;
