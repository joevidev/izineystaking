import {
    LOAD_WEB3_SUCCESS,
    LOAD_WEB3_FAIL,
    LOAD_BLOCKCHAIN_DATA_SUCCESS,
    LOAD_BLOCKCHAIN_DATA_FAIL,
    LOAD_TETHER_FAIL,
    LOAD_TETHER_SUCCESS,
    LOAD_TETHER_BALANCE_SUCCESS,
    LOAD_TETHER_BALANCE_FAIL,
    LOAD_IZINEY_FAIL,
    LOAD_IZINEY_SUCCESS,
    LOAD_IZINEY_BALANCE_SUCCESS,
    LOAD_IZINEY_BALANCE_FAIL,
    LOAD_BANK_SUCCESS,
    LOAD_BANK_FAIL,
    LOAD_BANK_BALANCE_SUCCESS,
    LOAD_BANK_BALANCE_FAIL,
    SET_LOADING_SUCCESS,
    SET_LOADING_FAIL
} from '../actions/types'

const initialState = {
  account: null,
  web3: null,
  tether: null,
  tether_balance: null,
  iziney: null,
  iziney_balance: null,
  decentralBank: null,
  stakingBalance: null,
  loading_success: false,
};

export default function wallet(state = initialState, action) {
    const { type, payload } = action;

    switch(type){
        case LOAD_BLOCKCHAIN_DATA_SUCCESS:
            return {
                ...state,
                account: payload
            }
        case LOAD_WEB3_SUCCESS:
            return {
                ...state,
                web3: payload
            }
        case LOAD_TETHER_SUCCESS:
            return {
                ...state,
                tether: payload
            }
        case LOAD_TETHER_BALANCE_SUCCESS:
            return {
                ...state,
                tether_balance: payload
            }
        case LOAD_IZINEY_SUCCESS:
            return {
                ...state,
                iziney: payload
            }
        case LOAD_IZINEY_BALANCE_SUCCESS:
            return {
                ...state,
                iziney_balance: payload
            }
        case LOAD_BANK_SUCCESS:
            return {
                ...state,
                decentralBank: payload
            }
        case LOAD_BANK_BALANCE_SUCCESS:
            return {
                ...state,
                stakingBalance: payload
            }
        case SET_LOADING_SUCCESS:
            return {
                ...state,
                loading_success: payload
            }



        case LOAD_BLOCKCHAIN_DATA_FAIL:
            return {
                ...state,
                account: null
            }
        case LOAD_WEB3_FAIL:
            return {
                ...state,
                web3: null
            }
        case LOAD_TETHER_FAIL:
            return {
                ...state,
                tether: null
            }
        case LOAD_TETHER_BALANCE_FAIL:
            return {
                ...state,
                tether_balance: null
            }
        case LOAD_IZINEY_FAIL:
            return {
                ...state,
                iziney: null
            }
        case LOAD_IZINEY_BALANCE_FAIL:
            return {
                ...state,
                iziney_balance: null
            }
        case LOAD_BANK_FAIL:
            return {
                ...state,
                decentralBank: null
            }
        case LOAD_BANK_BALANCE_FAIL:
            return {
                ...state,
                stakingBalance: null
            }
        case SET_LOADING_FAIL:
            return {
                ...state,
                loading_success: null
            }

        default:
            return state
    }
}