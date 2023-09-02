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
              `https://mailbocx-7f19c-default-rtdb.firebaseio.com/${trimmedMail}/sentbox.json`,{
                method:"PUT",
                body:JSON.stringify({
                    sentMmails:emailState.sentBox
                })
              }
            );
        
            if(!response.ok){
                throw new Error ('sending mails data failed')
            }
            try {
                await sendRequest();
                
            } catch (error) {
                window.alert(error)
            }
          };

    }
  
};
