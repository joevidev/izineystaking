import {
  LOAD_WEB3_SUCCESS,
  LOAD_WEB3_FAIL,
  LOAD_BLOCKCHAIN_DATA_SUCCESS,
  LOAD_BLOCKCHAIN_DATA_FAIL,
  LOAD_TETHER_SUCCESS,
  LOAD_TETHER_FAIL,
  LOAD_TETHER_BALANCE_SUCCESS,
  LOAD_TETHER_BALANCE_FAIL,
  LOAD_IZINEY_SUCCESS,
  LOAD_IZINEY_FAIL,
  LOAD_IZINEY_BALANCE_SUCCESS,
  LOAD_IZINEY_BALANCE_FAIL,
  LOAD_BANK_SUCCESS,
  LOAD_BANK_FAIL,
  LOAD_BANK_BALANCE_SUCCESS,
  LOAD_BANK_BALANCE_FAIL,
  SET_LOADING_SUCCESS,
  SET_LOADING_FAIL,
} from "./types";
import Web3 from "web3";

import Tether from "../../truffle_abis/Tether.json";
import IZIN from "../../truffle_abis/IZIN.json";
import DecentralBank from "../../truffle_abis/DecentralBank.json";

export const setLoadWeb3 = () => async (dispatch) => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    dispatch({
      type: LOAD_WEB3_SUCCESS,
    });
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
    dispatch({
      type: LOAD_WEB3_SUCCESS,
    });
  } else {
    dispatch({
      type: LOAD_WEB3_FAIL,
    });
  }
};

export const loadBlockchainData = () => async (dispatch) => {
  if (window.web3) {
    //let accounts = await signer.getAddress();
    const web3 = window.web3 = new Web3(window.web3.currentProvider);
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    dispatch({
      type: LOAD_BLOCKCHAIN_DATA_SUCCESS,
      payload: accounts[0],
    });

    // load Tether
    const tetherData = Tether.networks[networkId];
    if (tetherData) {
      const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
      dispatch({
        type: LOAD_TETHER_SUCCESS,
        payload: tether,
      });
      let tetherBalance = await tether.methods.balanceOf(accounts[0]).call();
      if (tetherBalance) {
        dispatch({
          type: LOAD_TETHER_BALANCE_SUCCESS,
          payload: tetherBalance.toString(),
        });
      } else {
        dispatch({
          type: LOAD_TETHER_BALANCE_FAIL,
        });
      }
    } else {
      dispatch({
        type: LOAD_TETHER_FAIL,
      });
    }

    // load iziney
    const izineyData = IZIN.networks[networkId];
    if (izineyData) {
      const izin = new web3.eth.Contract(IZIN.abi, izineyData.address);
      dispatch({
        type: LOAD_IZINEY_SUCCESS,
        payload: izin,
      });
      let izineyBalance = await izin.methods.balanceOf(accounts[0]).call();
      if (izineyBalance) {
        dispatch({
          type: LOAD_IZINEY_BALANCE_SUCCESS,
          payload: izineyBalance.toString(),
        });
      } else {
        dispatch({
          type: LOAD_IZINEY_BALANCE_FAIL,
        });
      }
    } else {
      dispatch({
        type: LOAD_IZINEY_FAIL,
      });
    }

    // load bank
    const decentralBankData = DecentralBank.networks[networkId];
    if (decentralBankData) {
      const decentralBank = new web3.eth.Contract(
        DecentralBank.abi,
        decentralBankData.address
      );
      dispatch({
        type: LOAD_BANK_SUCCESS,
        payload: decentralBank,
      });
      let stakingBalance = await decentralBank.methods
        .stakingBalance(accounts[0])
        .call();
      if (stakingBalance) {
        dispatch({
          type: LOAD_BANK_BALANCE_SUCCESS,
          payload: stakingBalance.toString(),
        });
      } else {
        dispatch({
          type: LOAD_BANK_BALANCE_FAIL,
        });
      }
    } else {
      dispatch({
        type: LOAD_BANK_FAIL,
      });
    }

    dispatch({
      type: SET_LOADING_SUCCESS,
      payload: true,
    });
  } else {
    dispatch({
      type: LOAD_BLOCKCHAIN_DATA_FAIL,
    });
    dispatch({
      type: SET_LOADING_FAIL,
      payload: false,
    });
  }
};
