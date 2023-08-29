import React, { useState, useRef } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import classes from "./Home.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";

const Home = () => {
  const dispatch = useDispatch();
  const senderMail = useSelector((state) => state.email);
  let trimmedSenderMail="";
  for(let i of senderMail){
      if(i!=="@" && i!=="."){
        trimmedSenderMail+=i;
      }
  }
  const sendTo = useRef();
  const subject = useRef();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const handleChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const contentState = editorState.getCurrentContent();
    // const contentRaw = convertToRaw(contentState);
    const contentText = contentState.getPlainText();

    const receiverMail = sendTo.current.value;
    let trimmedMail="";
    for(let i of receiverMail){
        if(i!=="@" && i!=="."){
            trimmedMail+=i;
        }
    }
    console.log(trimmedMail);
    const subjectEntered = subject.current.value;
    const obj = {
      sender: senderMail,
      receiver: receiverMail,
      subject: subjectEntered,
      content: contentText,
    };
    console.log(obj);
    fetch(
      `https://mailbox-7f19c-default-rtdb.firebaseio.com/${trimmedMail}/mail.json`,
      {
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(obj)
      }
    ).then(res=>res.json()).then(data=>{
        console.log(data);

        fetch(
            `https://mailbox-7f19c-default-rtdb.firebaseio.com/${trimmedSenderMail}/mail.json`,
            {
              method:"POST",
              headers:{
                  "content-type":"application/json"
              },
              body:JSON.stringify(obj)
            }
          ).then(res=>res.json()).then(data=>{
              console.log(data);
          })
    });
  };

  
  
  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <>
      <div className={classes.topDiv}>
        <h3>welcome to your mail box</h3>
        <button className={classes.btn} onClick={logoutHandler}>
          Logout
        </button>
      </div>

      <hr></hr>
      <div className={classes.editor}>
        <form onSubmit={formSubmitHandler}>
          <input
            className={classes.input}
            type="mail"
            placeholder="To"
            ref={sendTo}
          />
          <hr></hr>
          <input
            className={classes.input}
            type="text"
            ref={subject}
            placeholder="Subject"
          />
          <hr></hr>

          <Editor
            editorState={editorState}
            onEditorStateChange={handleChange}
          />
          <div className={classes["btn-container"]}>
            {" "}
            <button type="submit" className={classes.btn}>
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Home;
