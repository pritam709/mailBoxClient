import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const SentMailDetail = () => {
  const param = useParams();
  const sentBox = useSelector((state) => state.email.sentBox);
  const mail = sentBox.find((item) => param.mailId === item.id);
  console.log(mail);

//   useEffect(() => {
//     const sendRequest = async () => {
//       const email = localStorage.getItem("email");
      
//       let trimmedMail = "";
//       if (email) {
//         for (let i of email) {
//           if (i !== "@" && i !== ".") {
//             trimmedMail += i;
//           }
//         }
//       }
//       //  console.log(trimmedMail);
//       const response = await fetch(
//         `https://mailbox-7f19c-default-rtdb.firebaseio.com/${trimmedMail}/inbox/${param.mailId}.json`,
//         {
//           method: "PATCH",
//           body: JSON.stringify({
//             read: true,
//           }),
//         }
//       );

//       if(!response.ok){
//         console.log(response.json());
//     }
//     };

//     try {
//       sendRequest();
//     } catch (error) {
//       console.log(error);
//     }
//   }, [param.mailId]);
  return (
    <>
      To :{mail.receiver} <br></br>
      Subject:{mail.subject}
      <br />
      {mail.content}
    </>
  );
};
export default SentMailDetail;
