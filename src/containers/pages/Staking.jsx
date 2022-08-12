import StakingController from "../../components/staking/StakingController"
import Layout from "../../hocs/Layout"
import { connect } from "react-redux"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Staking = ({
    account,
    tether,
    tether_balance,
    iziney,
    iziney_balance,
    decentralBank,
    stakingBalance,
    loading_success,
}) => {

    const nSuccessDeposit = () => {
      toast.success("Success Deposit!", {
        icon: "✅",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
      });
    };
    const nErrorDeposit = () => {
      toast.success("Failed deposit!, try again", {
        icon: "⛔",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
      });
    };
    const nSuccessWithdraw = () => {
      toast.success("Success Withdraw!", {
        icon: "✅",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
      });
    };

    const nSuccessAirdrop = () => {
      toast.success("Success Airdrop!", {
        icon: "🥳",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
      });
    };
    const nErrorWithdraw = () => {
      toast.success("Failed withdrawal!, try again", {
        icon: "⛔",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
      });
    };

    const nErrorAirdrop = () => {
      toast.success("Failed Airdrop!, try again", {
        icon: "😣",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
      });
    };

    const stakeTokens = (amount) => {
        //set loading true
        //funcion de aprove
        try {
            tether.methods.approve(decentralBank._address, amount).send({from: account }).on('transactionHash', (hash) => {
            // depositTokens
            decentralBank.methods.depositTokens(amount).send({from: account}).on('transactionHash', (hash) => {
                //set loading false
                nSuccessDeposit();
            })
        })
        } catch (error) {
            nErrorDeposit();  
            console.log(error)
        }
        
    }

    const unstakeTokens = () => {
        //set loading true
        try {
            decentralBank.methods.unstakeTokens().send({from: account}).on('transactionHash', (hash) => {
            //set loading false
            nSuccessWithdraw();
        })
        } catch (error) {
            nErrorWithdraw();
            console.log(error)
        }
        
    }

    const airdropFreeForUser = () => {
        //set loading true
        try {
            decentralBank.methods.airdropTokens(account, "10000000000000000000").send({from: account}).on('transactionHash', (hash) => {
            //set loading false
            nSuccessAirdrop();
        })
        } catch (error) {
            nErrorAirdrop();
            console.log(error)
            
        }
        
    }

    return(
        <Layout>
            <StakingController
                loading_success={loading_success}
                tetherBalance={tether_balance}
                izineyBalance={iziney_balance}
                stakingBalance={stakingBalance}
                decentralBank={decentralBank}
                stakeTokens={stakeTokens}
                unstakeTokens={unstakeTokens}
                airdropFreeForUser={airdropFreeForUser}
            />
        </Layout>
    )
}

const mapStateToProps = state => ({
    account: state.wallet.account,
    tether: state.wallet.tether,
    tether_balance: state.wallet.tether_balance,
    iziney: state.wallet.iziney,
    iziney_balance: state.wallet.iziney_balance,
    decentralBank: state.wallet.decentralBank,
    stakingBalance: state.wallet.stakingBalance,
    loading_success: state.wallet.loading_success,
    airdropFreeForUser: state.wallet.airdropFreeForUser
  })
  
  export default connect(mapStateToProps, {}) (Staking)