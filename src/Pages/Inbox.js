import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
const Inbox = () => {
  const email = useSelector((state) => state.auth.email);
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
  }, [trimmedMail,email]);
  
  return (
    <>
      {" "}
      <Header/>
      <h3>Inbox....</h3>
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
