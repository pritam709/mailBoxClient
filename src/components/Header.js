import classes from "./Header.module.css";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import { Link } from "react-router-dom";
const Header=()=>{
    const dispatch=useDispatch();
    const logoutHandler = () => {
        dispatch(authActions.logout());
      };
    return <>
         <div className={classes.topDiv}>
        <h3>welcome to your mail box</h3>
        <button className={classes.btn} onClick={logoutHandler}>
          Logout
        </button>
      </div>

      <hr></hr>
        <Link to="/compose"><button className={classes.btn}>Compose Mail</button></Link>
        <Link to="/inbox"><button className={classes.btn}>Inbox</button></Link>
        <Link to="/sentbox"> <button className={classes.btn}>Sentbox</button></Link>
        <hr></hr>

    </>

}
export default Header;