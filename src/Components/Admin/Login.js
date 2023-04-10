import React,{useEffect,useState,useRef} from 'react'
import toast,{Toaster} from 'react-hot-toast';
import { useNavigate } from 'react-router';
import AdminAuth from './AdminAuth';


const AdminLogin = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useRef(useNavigate());
    const customInputStyle = {
        width: "100%",
        padding: "12px 20px",
        marginTop: "0.4em",
        marginBottom: "1.25em",
        display: "inline-block",
        border: "1px solid #ccc",
        borderRadius: "1em",
        boxSizing: "border-box"
    }

    const customSubmitStyle = {
        width: "45%",
        backgroundColor: "rgb(35 35 67)",
        color: "white",
        padding:" 0.8em 0.5em",
        margin: "1.5em 0",
        border: "none",
        borderRadius: "1em",
        cursor: "pointer",
    }

    const customFormStyle = {
        position: "absolute",
        margin: "auto",
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
        width: "18em",
        height: "22em",
        borderRadius: "1em",
        backgroundColor: "#1b203d",
        color: "white",
        padding: "1.5em"
    }


    const halndleSubmit = (e)=>{
        e.preventDefault();
        if (username.trim()===""|| password.trim()==="") {
            toast.error("Please enter valid details !");
            return;
        }

        fetch("http://localhost:5000/admin/login",{
            method:"post",
            body:JSON.stringify({username:username,password:password}),
            headers:{
                "Content-Type":"application/json"
            }}).then((data)=>{return data.json()}).then((finalData)=>{
                if (finalData.message==="VALID") {
                    localStorage.setItem("adminToken",finalData.token);
                    navigate.current('/admin/dashboard');
                }else{
                    toast.error("Invalid details entered !");
                }
            })
        }

useEffect(() => {
    AdminAuth().then((data)=>{
        if (data.message==="VALID") {
          navigate.current('/admin/dashboard');
        }
      })
}, [])



  return (
    <>
    <Toaster/>
    <form style={customFormStyle} method="post">
  <label style={{bottom:0}} htmlFor="userEmail" >Email</label>
  <input style={customInputStyle} type="email" name="email" value={username} onChange={(e)=>{setUserName(e.target.value.toLocaleLowerCase())}} placeholder="email@gmail.com"/>
  <label style={{bottom:0}} htmlFor="userPassword">Password</label>
  <input style={customInputStyle} type="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password"/>
  <button style={customSubmitStyle} onClick={halndleSubmit}>
     Login
    </button>
  
</form>
    
    </>
  )
}

export default AdminLogin