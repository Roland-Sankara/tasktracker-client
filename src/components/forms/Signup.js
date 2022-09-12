import { useState } from "react";
import {useFormik} from 'formik';
import {userSchema} from '../../utils/yupSchema';
import {request} from '../../api/request';
import {useNavigate} from 'react-router-dom';
import Button from "../Button.js/index";
import "./index.css";

const Signup = () => {
  const [isloading, setIsLoading] = useState(false);
  const [saveUser, setSaveUser] = useState(false);
  const navigate = useNavigate();

  const submitHandler = (values) => {
    setIsLoading(true);

    if(values.password !== values.confirmPass) return;
    console.log(values);

    const data = {
      username: values.username, 
      password: values.password
    }
    
    request('/users/signup', 'POST', data)
    .then((data)=>{
      setIsLoading(false);

      localStorage.removeItem('todo-user');
      sessionStorage.removeItem('todo-user');
      
      if(saveUser){
        localStorage.setItem('todo-user', JSON.stringify(data['data'].user));
      }else{
        sessionStorage.setItem('todo-user', JSON.stringify(data['data'].user));
      }
      navigate('/');
    })
    .catch((error)=>{
      alert(JSON.stringify(error))
    })

    
  };

  const formik = useFormik({
    initialValues: {
        username: '',
        password: '',
        confirmPass: ''
    },
    validationSchema: userSchema,
    onSubmit: submitHandler
  })

  return (
    <div className="form-container">
      <h2>Register</h2>

      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input id="username" type={"text"} name="username" value={formik.values.username} onChange={formik.handleChange}/>
          {formik.errors.username && formik.touched.username? <div className='form-error'>{formik.errors.username}</div> : null}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input id="password" type={"password"} name="password" value={formik.values.password} onChange={formik.handleChange}/>
          {formik.errors.password && formik.touched.password? <div className='form-error'>{formik.errors.password}</div> : null}
        </div>

        <div className="form-group">
          <label htmlFor="confirm">Confirm Password</label>
          <input id="confirm" type={"password"} name="confirmPass" value={formik.values.confirmPass} onChange={formik.handleChange}/>
          {(formik.values.password !== formik.values.confirmPass) && formik.touched.confirmPass?<div className='form-error'>{"Passwords don't match"}</div>: null}
        </div>

        <div className="form-submit">
          <div className="remember">
            <input id="remember" type={"checkbox"} onChange={(e)=>{setSaveUser(e.target.checked)}}/>
            <label htmlFor="remember">Remember me</label>
          </div>

          <Button text={isloading?"Loading...":"Signup"} />
        </div>
      </form>
    </div>
  );
};

export default Signup;
