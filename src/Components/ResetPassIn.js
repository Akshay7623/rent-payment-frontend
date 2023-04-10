import React, {useState,useRef,useEffect} from 'react';
import toast, {Toaster} from 'react-hot-toast';
import { useNavigate } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import Auth from './Auth';

const ResetPassIn = () => {

  const navigate = useRef(useNavigate());

  useEffect(() => {
    Auth().then((data) => {
      if (!data.auth) {
        navigate.current("/login");
      }
    });
  }, []);



  const [myvalue, setMyValue] = useState({
    password: '',
    cpassword: ''
  });

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setMyValue({ ...myvalue, [name]: value });
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (myvalue.password.trim()===''||myvalue.cpassword.trim()==='') {
        toast.error("Please enter password !");
        return;
    }
    if (myvalue.password.trim().length<6) {
      toast.error("Password length must be atleast 6 characters !");
      return;
    }
    const token = localStorage.getItem("token");
    if (myvalue.password === myvalue.cpassword) {
      const reset =  await fetch("http://localhost:5000/changepassword",
      {
        method:"post",
        body:JSON.stringify({password:myvalue.password}),
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`,
        },
      });

      const result = await reset.json();
      if (result.success) {
        toast.success("Password changed successfully !");
        setMyValue({
        password: '',
        cpassword: '' 
      });
       }else{
         toast.error("Something went wrong !");
       }
  }else{
    toast.error("Password does not matched !");
  }
}


  return (
    <>
    <div className="container">
    <Toaster />
    <Header showImg={false} title={'Reset Password'} redirect={'/account'} />
    <div className="pb-2">
        <div className="appContent1 pb-5">
          <form method="post">
            <div className="form-group floating">
              <label>Password<i className="text-danger">*</i></label>
              <input type="password" placeholder='Enter Password' className="form-control floating" name="password" value={myvalue.password} onChange={handleInput} maxLength={10} required autoComplete='off' />
            </div>
            <div className="form-group floating">
              <label>Confirm Password<i className="text-danger">*</i></label>
              <input type="password" placeholder='Confirm Password' className="form-control floating" name="cpassword" value={myvalue.cpassword} onChange={handleInput} required  autoComplete='off' />
            </div>
            <div className="d-flex justify-content-center text-center mt-1">
              <button onClick={handleSubmit} type="submit" className="btn btn-primary" style={{width: '264px',backgroundColor:"rgb(34 99 113)",border:"none"}}> Reset </button>
            </div>
          </form>
        </div>
      </div>
    <Footer cl4={'item active'}/>
    </div>
    </>
  )
}

export default ResetPassIn;