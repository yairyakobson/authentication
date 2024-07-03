import { ToastContainer } from "react-toastify";
import Navigation from "./navigation";
import "react-toastify/dist/ReactToastify.css";

function Layout(props){
  return(
    <>
      <Navigation/>
      <main>{props.children}</main>
      <ToastContainer position="top-right"
      theme="colored"
      hideProgressBar={true}
      limit={1}/>
    </>
  );
}

export default Layout;
