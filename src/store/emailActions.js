import { emailActions } from "./emailSlice";
export const sentEmailsData = (emailState) => {
    return async(dispatch)=>{

        const sendRequest = async() => {
            const email = localStorage.getItem("email");
            let trimmedMail = "";
            for (let i of email) {
              if (i !== "@" && i !== ".") {
                trimmedMail += i;
              }
            }
            const response = await fetch(
              `https://mailbox-7f19c-default-rtdb.firebaseio.com/sentox/${trimmedMail}.json`,{
                method:"PUT",
                body:JSON.stringify({
                    sentBox:emailState.sentBox
                })
              }
            );
        
            if(!response.ok){
                throw new Error ('sending mails data failed')
            }
            
          };

          try {
            await  sendRequest();
             
         } catch (error) {
             window.alert(error)
         }

    }
  
};

export const fetchSentBox = () => {
  return async(dispatch)=>{

      const sendRequest = async() => {
          const email = localStorage.getItem("email");
          // console.log(email);
          let trimmedMail = "";
         if(email){
          for (let i of email) {
            if (i !== "@" && i !== ".") {
              trimmedMail += i;
            }
          }
         }
        //  console.log(trimmedMail);
          const response = await fetch(
            `https://mailbox-7f19c-default-rtdb.firebaseio.com/sentox/${trimmedMail}.json`
          );
      
          if(!response.ok){
              throw new Error ('sending mails data failed')
          }

          const data = await response.json();
          return data;
        };

        try {
         const sentBoxData= await  sendRequest();
         console.log(sentBoxData);
          dispatch(emailActions.replaceSentBox({
            sentBox:sentBoxData.sentBox ||[]

          }))

           
       } catch (error) {
          console.log(error);
       }

  }

};

export const fetchinbox = () => {
  return async(dispatch)=>{

      const sendRequest = async() => {
          const email = localStorage.getItem("email");
          // console.log(email);
          let trimmedMail = "";
         if(email){
          for (let i of email) {
            if (i !== "@" && i !== ".") {
              trimmedMail += i;
            }
          }
         }
        //  console.log(trimmedMail);
          const response = await fetch(
            `https://mailbox-7f19c-default-rtdb.firebaseio.com/${trimmedMail}/inbox.json`
          );
      
          if(!response.ok){
              throw new Error ('fetching mails data failed')
          }

          // const data = await response.json();
               const resData = await response.json();
  //     console.log(resData);
      const fetchResult = [];
      for (let key in resData) {
        fetchResult.unshift({
          ...resData[key],
          id: key,
        });
      }
      
          return fetchResult;
        };

        try {
         const inboxData= await  sendRequest();
         console.log(inboxData);
          dispatch(emailActions.replaceInbox({
            inbox:inboxData
          }))

           
       } catch (error) {
          console.log(error);
       }

  }

};


