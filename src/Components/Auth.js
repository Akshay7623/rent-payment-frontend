const Auth = async()=>{
  
let token = localStorage.getItem("token");
      let isValid = await fetch("http://localhost:5000/auth",{
        method:"post",
        headers:{
          "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`
        }
      });
      isValid = await isValid.json();
      return isValid;
};

export default Auth;