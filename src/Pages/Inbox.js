import React from "react";
import classes from "./Inbox.module.css";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { emailActions } from "../store/emailSlice";
const Inbox = () => {
  const dispatach = useDispatch();
  const inbox = useSelector((state) => state.email.inbox);
  const unread = inbox.reduce((curr, item) => {
    if (item.read === false) {
      return curr + 1;
    }
    return curr;
  }, 0);
  // console.log(inbox);
  const deleteMailHandler = (id) => {
    dispatach(emailActions.deleteMail(id));

    const email = localStorage.getItem("email");

    let trimmedMail = "";
    if (email) {
      for (let i of email) {
        if (i !== "@" && i !== ".") {
          trimmedMail += i;
        }
      }
    }
    fetch(
      `https://mailbox-7f19c-default-rtdb.firebaseio.com/${trimmedMail}/inbox/${id}.json`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <>
      {" "}
      <Header />
      <h3>Inbox....</h3>
      <ul>
        Total unread mails:{unread}
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
              <button
                className={classes.btn}
                onClick={deleteMailHandler.bind(null, item.id)}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default Inbox;
