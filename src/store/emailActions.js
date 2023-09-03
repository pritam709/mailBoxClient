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
              `https://mailbox-7f19c-default-rtdb.firebaseio.com/${trimmedMail}.json`,{
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
          let trimmedMail = "";
          for (let i of email) {
            if (i !== "@" && i !== ".") {
              trimmedMail += i;
            }
          }
          const response = await fetch(
            `https://mailbox-7f19c-default-rtdb.firebaseio.com/${trimmedMail}.json`
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
           window.alert(error)
       }

  }

};


