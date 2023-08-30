import React from "react";
import { useEffect, useState } from "react";
import classes from "./Inbox.module.css";
import { useSelector } from "react-redux";
const Inbox = () => {
  const email = useSelector((state) => state.email);
  let trimmedMail = "";
  for (let i of email) {
    if (i !== "@" && i !== ".") {
      trimmedMail += i;
    }
  }
  const [mails, setMails] = useState([]);
  useEffect(() => {
    const fetchMails = async () => {
      const response = await fetch(
        `https://mailbox-7f19c-default-rtdb.firebaseio.com/${trimmedMail}/mail.json`
      );

      const resData = await response.json();
      console.log(resData);
      const fetchResult = [];
      for (let key in resData) {
        fetchResult.unshift({
          ...resData[key],
          id: key,
        });
      }
      console.log(fetchResult);
      const inbox= fetchResult.filter(item=>item.receiver===email);
      console.log(inbox);
      setMails(inbox);
    };
    fetchMails();
  }, [trimmedMail]);
  const logoutHandler=()=>{}
  return (
    <>
      {" "}
      <div className={classes.topDiv}>
        <h3>Inbox....</h3>
        <button className={classes.btn} onClick={logoutHandler}>
          Logout
        </button>
      </div>
      <hr></hr>
     <ul>
        {mails.map(item=>{
            return <li key={item.id}>
               {item.sender} &nbsp; &nbsp;
               {item.content.substring(0,15)}
            </li>
        })}
     </ul>
    </>
  );
};
export default Inbox;
