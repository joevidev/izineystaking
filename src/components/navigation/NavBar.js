import { Fragment, useState, useEffect } from 'react'
import { Popover, Transition } from '@headlessui/react'
import headerLogo from "../../images/logo192.png";
import {
  MenuIcon,
  XIcon,
} from "@heroicons/react/outline";
import { Link, NavLink } from 'react-router-dom'
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import {connect} from 'react-redux'
import {
  setLoadWeb3,
  loadBlockchainData,
} from "../../redux/actions/wallet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

  const providerOptions = {
    binancechainwallet: {
      package: true,
    },
  };

  const web3Modal = new Web3Modal({
    network: "goerli",
    cacheProvider: true,
    providerOptions,
  });

  const nWalletNotConnect = () => {
    toast.error("Wallet not connect, try again!", {
      icon: "⛔",
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
    });
  };

  const nWelcomeUser = () => {
    toast.success("Welcome to Iziney Staking", {
      icon: "💜",
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
    });
  };

function NavBar({
  account,
  setLoadWeb3,
  loadBlockchainData,
  tether,
  tether_balance,
  iziney,
  iziney_balance,
  decentralBank,
  stakingBalance,
  loading
}) {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [customerAddress, setCustomerAddress] = useState("");
  
  const checkIfWalletIsConnected = async () => {
   try {
    const instance = await web3Modal.connect();
    if (instance) {
      const provider = new ethers.providers.Web3Provider(instance);
      const accounts = await provider.listAccounts();
      const account = accounts[0];
      setIsWalletConnected(true);
      setCustomerAddress(account);
      console.log("Account Connected: ", account);
      loadBlockchainData();
      nWelcomeUser();
    } else {
      console.log("No checkIfWalletIsConnected");
      loadBlockchainData();
      nWalletNotConnect();
    }
    } catch (error) {
      console.log(error)
      console.log("No Metamask detected");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    loadBlockchainData();
    setLoadWeb3();
  }, []);

  return (
    <Popover className="relative bg-white">
      <div className="absolute inset-0  z-30 pointer-events-none" aria-hidden="true"/>
      <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-5 sm:px-6 sm:py-4 lg:px-8 md:justify-start md:space-x-10">
          <div>
            <Link to="/" className="flex">
              <span className="sr-only">Workflow</span>
              <img className="h-8 w-auto sm:h-10" src={headerLogo} />
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
            <Popover.Group as="nav" className="flex space-x-10">
              <NavLink
                to="/home"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
                activeClassName="text-base font-medium text-gray-900"
              >
                Home
              </NavLink>

              <a
                href="https://izineydao.vercel.app/"
                className="text-base font-medium text-gray-900 hover:text-gray-700"
              >
                Governance
              </a>

              <NavLink
                to="/staking"
                activeClassName="text-base font-medium text-gray-900"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                🔥 Staking
              </NavLink>

              <NavLink
                to="/documents"
                activeClassName="text-base font-medium text-gray-900"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Docs
              </NavLink>
            </Popover.Group>
            <div className="flex items-center md:ml-12">
              <span className="sm:ml-3">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={checkIfWalletIsConnected}
                >
                  {isWalletConnected
                    ? "🔒 Wallet: " +
                      customerAddress.slice(0, -38) +
                      "..." +
                      customerAddress.slice(-8, -4)
                    : "Connect Wallet 🔑"}
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5 sm:pb-8">
              <div className="flex items-center justify-between">
                <div>
                  <Link to="/" className="flex">
                  <img className="h-8 w-auto" src={headerLogo} alt="Workflow" />
                  </Link>
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="py-6 px-5">
              <div className="grid grid-cols-2 gap-4">
                <NavLink
                  to="/staking"
                  className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Staking
                </NavLink>

                <NavLink
                  to="/documents"
                  className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Docs
                </NavLink>

                <NavLink
                  to="/home"
                  className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Home
                </NavLink>
                <a
                  href="https://izineydao.vercel.app/"
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Governance
                </a>
              </div>
              <div className="flex items-center md:ml-12 mt-5">
                <span className="sm:ml-3">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={checkIfWalletIsConnected}
                  >
                    {isWalletConnected
                      ? "🔒 Wallet: " +
                        customerAddress.slice(0, -38) +
                        "..." +
                        customerAddress.slice(-8, -4)
                      : "Connect Wallet 🔑"}
                  </button>
                </span>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

const mapStateToProps = state => ({
  account: state.wallet.account,
  tether: state.wallet.tether,
  tether_balance: state.wallet.tether_balance,
  iziney: state.wallet.iziney,
  iziney_balance: state.wallet.iziney_balance,
  decentralBank: state.wallet.decentralBank,
  stakingBalance: state.wallet.stakingBalance,
  loading: state.wallet.loading,
})

export default connect(mapStateToProps, {
  setLoadWeb3,
  loadBlockchainData,
}) (NavBar)