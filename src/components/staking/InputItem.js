import { useState } from "react"

const InputItem = ({
    stakeTokens,
    unstakeTokens,
    airdropFreeForUser,

}) => {

    const [formData, setFormData] = useState({
        amount:'',
    })

    const {amount} = formData

    const onChange = (e) =>{
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = e => {
        e.preventDefault()
        stakeTokens(window.web3.utils.toWei(amount, "Ether"));
    }

    return (
      <div>
        <form onSubmit={(e) => onSubmit(e)} className="grid grid-cols-2">
          <div>
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700"
            >
              🗳 Amount Stake USDT Tokens
            </label>
            <div className="mt-1 relative flex items-center">
              <input
                onChange={(e) => onChange(e)}
                value={amount}
                type="text"
                name="amount"
                required
                placeholder="0"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
              />
              <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                <kbd className="inline-flex cursor-default items-center border border-gray-200 rounded px-2 text-sm font-sans font-medium text-gray-400">
                  <img
                    className="h-4 w-4 mx-2"
                    src="https://w7.pngwing.com/pngs/840/253/png-transparent-usdt-cryptocurrencies-icon.png"
                    alt=""
                  />{" "}
                  USDT
                </kbd>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center my-4 mx-1 px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            style={{ marginLeft: "50px" }}
          >
            💰 Deposit
          </button>
        </form>

        <div className="grid grid-cols-2">
          <button
            type="submit"
            className="inline-flex items-center justify-center my-4 mx-1 px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-700 bg-blue-100 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={(e) => {
              e.preventDefault();
              airdropFreeForUser();
            }}
          >
            💸 Airdrop Free
          </button>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              unstakeTokens();
            }}
            style={{ marginLeft: "50px" }}
            className="inline-flex items-center justify-center my-4 mx-1 px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            🤑 Withdraw
          </button>
        </div>
      </div>
    );
}

export default InputItem