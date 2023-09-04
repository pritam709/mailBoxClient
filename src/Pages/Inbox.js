import React from "react";
import classes from "./Inbox.module.css"
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { Link } from "react-router-dom";
const Inbox = () => {
 
  const inbox = useSelector((state) => state.email.inbox);
  const unread=inbox.reduce((curr,item)=>{
    if(item.read===false){
      return curr+1;
    }
    return curr;
  },0)
  console.log(inbox);

  return (
    <>
      {" "}
      <Header />
      <h3>Inbox....</h3>
      <ul>
      Total unread  mails:{unread}
        {inbox.map((item) => {
          return (
            <li key={item.id}>
              <Link to={`/inbox/${item.id}`}>
                {" "}
                {!item.read && <span className={classes.dot}></span>}
                From: &nbsp; {item.sender} &nbsp; &nbsp; subject:{item.subject}{" "}
                &nbsp; &nbsp;
                {item.content.substring(0, 15)}....
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default Inbox;
