import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

const SentBox=()=>{
  
    // const email = useSelector((state) => state.auth.email);
    const mails= useSelector(state=>state.email.sentBox);
    console.log(mails);
  
//   let trimmedMail = "";
//   for (let i of email) {
//     if (i !== "@" && i !== ".") {
//       trimmedMail += i;
//     }
//   }
//   const [mails, setMails] = useState([]);
//   useEffect(() => {
//     const fetchMails = async () => {
//       const response = await fetch(
//         `https://mailbox-7f19c-default-rtdb.firebaseio.com/${trimmedMail}/mail.json`
//       );

//       const resData = await response.json();
//       console.log(resData);
//       const fetchResult = [];
//       for (let key in resData) {
//         fetchResult.unshift({
//           ...resData[key],
//           id: key,
//         });
//       }
//       console.log(fetchResult);
//       const sentbox= fetchResult.filter(item=>item.sender===email);
//       console.log(sentbox);
//       setMails(sentbox);
//     };
//     fetchMails();
//   }, [trimmedMail,email]);
    return<>
    <Header/>
       <h3>
        Sentbox...
       </h3>
       <ul>
        {mails.map(item=>{
            return <li key={item.id}>
            <Link to={`/sentbox/${item.id}`}>
              To: &nbsp; {item.receiver} &nbsp; &nbsp;
               subject:{item.subject}  &nbsp; &nbsp;
               {item.content.substring(0,15)}....
               </Link>
            </li>
        })}
     </ul>
    </>
}
export default SentBox;