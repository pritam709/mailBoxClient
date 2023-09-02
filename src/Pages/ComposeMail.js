import React, { useState, useRef } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import classes from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { emailActions } from "../store/emailSlice";


const Home = () => {
 const dispatch= useDispatch();
  
  const senderMail = useSelector((state) => state.auth.email);
 
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
    let trimmedReceiverMail="";
    for(let i of receiverMail){
        if(i!=="@" && i!=="."){
          trimmedReceiverMail+=i;
        }
    }
    console.log(trimmedReceiverMail);
    const subjectEntered = subject.current.value;
    const obj = {
      sender: senderMail,
      receiver: receiverMail,
      subject: subjectEntered,
      content: contentText,
      read:false,
      id: Math.random().toString(),
    };
    console.log(obj);

    dispatch(emailActions.sentBoxFn(obj));

    // fetch(
    //   `https://mailbox-7f19c-default-rtdb.firebaseio.com/${trimmedMail}/mail.json`,
    //   {
    //     method:"POST",
    //     headers:{
    //         "content-type":"application/json"
    //     },
    //     body:JSON.stringify(obj)
    //   }
    // ).then(res=>res.json()).then(data=>{
    //     console.log(data);
    //     let trimmedSenderMail="";
    //     for(let i of senderMail){
    //         if(i!=="@" && i!=="."){
    //           trimmedSenderMail+=i;
    //         }
    //     }

    //     fetch(
    //         `https://mailbox-7f19c-default-rtdb.firebaseio.com/${trimmedSenderMail}/mail.json`,
    //         {
    //           method:"POST",
    //           headers:{
    //               "content-type":"application/json"
    //           },
    //           body:JSON.stringify(obj)
    //         }
    //       ).then(res=>res.json()).then(data=>{
    //           console.log(data);
    //           window.alert("mail sent successfully")
    //       })
    // });
  };

  
  
  

  return (
    
    <>
     <Header/>
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
