import NavBar from "../components/navigation/NavBar"
import Footer from "../components/navigation/Footer"

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const connectGoerli = () => {
  toast("Connect Ethereum Testnet Goerli", {
    icon: "📢",
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
};

const Layout = (props) => {

    return (
      <>
        <NavBar />

        <ToastContainer autoClose={5000} />
        {connectGoerli()}
        {props.children}

        <Footer />
      </>
    );

}

export default Layout