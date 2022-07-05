import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css"
// import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { useSelector, useDispatch } from "react-redux";
import { signin, register } from "../redux/actions/usersAction";

import { Redirect, useHistory, Link } from "react-router-dom";
import './login.css'


const LoginComp = (props) => {
  let history = useHistory()

  const userSignin = useSelector((state) => state.userSignIn);
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error, success } = userSignin;
  const { reguserInfo, regloading, regerror, regsuccess } = userRegister;

  const [name, setName] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const dispatch = useDispatch();
  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(signin(email, password));
  };

  const handleRegisterHandler=(event)=>{
    event.preventDefault();
    
    dispatch(register(name, phone, email, password))
  }

  useEffect(() => {
        if(userInfo && userInfo.id > 0){
            history.push("/dashboard")
        }
    if (regsuccess) {
        history.push("/dashboard");
      
    }
    if (success) {
      
      props.location.push("/dashboard");
      
    }
       
    // return () => {
    //   //  cleanup
    // }

  }, [dispatch, userSignin, error, userInfo, success, props.history, ]);

  
  return (
      <>


<section id="registration">
        <div className="registration-container">
            <div className="registration-left">
                <h1>Welcome Back!</h1>
                <h1 className="mobile_view">Welcome</h1>
                <h3>To keep connected or get the best from us, please login with your personal details. </h3>
                <h3  className="mobile_view">quickly fill the form below to get started and welcome again to onefarmtech.</h3>
                <Link to="/login" >LOGIN</Link>
            </div>
           
            <div className="registration-right">
                <div className="registration-container-text">
                    <h1>Create Account</h1>
                    <form onSubmit={handleRegisterHandler}>
                        {loading && <h5>laoding.....</h5>}
                        {regerror && <h5 style={{color: "red"}}>{regerror}</h5>}


                    <div className="form-group">
                        <label htmlFor="name">
                            <i className="fa fa-user" aria-hidden="true"></i>Name 
                        </label>
                        <input 
                            type="text"
                            required
                            className='form-control'
                            onChange={(e) => (setName(e.target.value)
                         )}
                         
                         />
                    </div>

                    <div className="form-group">
                        <label htmlFor="Email">
                            <i className="fa fa-envelope" aria-hidden="true"></i>Phone
                        </label>
                        <input 
                        
                            type="text"
                            className='form-control'
                            required
                            onChange={(e) => setPhoneNumber(e.target.value)}
                         />

                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="Email">
                            <i className="fa fa-envelope" aria-hidden="true"></i>Email
                        </label>
                        <input 
                        
                            type="email"
                            className='form-control'
                            required
                            onChange={(e) => setEmail(e.target.value)}
                         />

                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                            <i className="fa fa-key" aria-hidden="true"></i>
                            password
                        </label>
                        <input 
                            className='form-control'
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        
                        />
                    </div>

                    <input type="submit" value="SIGN UP" />
                    <h4 className="display_none">already registered? sign in by clicking on the link 
                    <Link to="/login">Login</Link></h4>
                    </form>
                </div>
            </div>
           

        </div>
    </section>





    {/* <section className="checkout-section spad" style={{marginTop: "100px"}}>
      <div className="container">
        <div className="row">

          <div className="col-lg-6 col-md-6 col-xl-6 col-sm-12 order-2 order-lg-1"> 
          
            
                  <div className="cf-title btn btn-lg" style={{backgroundColor: '#6c757d', width: '100%', color: 'white'}}> Login</div>

                <form className="form" onSubmit={submitHandler}>
                  {loading && <h5>laoding.....</h5>}
                  <div className="cf-title" style={{height: "30px"}}>  </div>

                  {error && <h5 style={{color: "red"}}>{error}</h5>}
                  <div className="row address-inputs form-group">
                    <div className="col-md-12">

                      <input
                      className='form-control'
                        type="text"
                        placeholder="Email"
                        required
                        style={{marginBottom: '15px'}}
                        onChange={(e) => (setEmail(e.target.value)
                        )}
                      />

                      <input
                      className='form-control'
                        type="text"
                        placeholder="Password"
                        required
                        style={{marginBottom: '15px'}}
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      <input
                      className='form-control'
                        type="submit"
                        className="btn btn-primary"
                        style={{ backgroundColor: "green", color: "white", width: '100%' }}
                        value="Login"
                      />

                    </div>

                  </div>
                </form>

           
            
          </div>
         



          <div className="col-lg-6 col-md-6 col-xl-6 col-sm-12 "> 
          
            
                  <div className="cf-title btn btn-lg" style={{backgroundColor: '#6c757d', width: '100%', color: 'white'}}> Register</div>

            
            
                <form className="form" onSubmit={handleRegisterHandler}>
                  {loading && <h5>laoding.....</h5>}
                  {error && <h5></h5>}
                  <div className="cf-title" style={{height: "30px"}}> 
                   </div>

                  {regerror && <h5 style={{color: "red"}}>{regerror}</h5>}

                  <div className="row address-inputs form-group">
                    <div className="col-md-12">
                      <input
                        type="text"
                        required
                        className='form-control'
                        placeholder="Name"
                        style={{marginBottom: '15px'}}
                        onChange={(e) => (setName(e.target.value))}
                      />
                     
                     <input
                       type="text"
                       className='form-control'
                       placeholder="Phone Number"
                       required
                       style={{marginBottom: '15px'}}
                       onChange={(e) => setPhoneNumber(e.target.value)}
                     />

                      <input
                        type="email"
                        className='form-control'
                        placeholder="Email"
                        required
                        style={{marginBottom: '15px'}}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                     
                      <input type="text"
                       style={{marginBottom: '15px'}} 
                       className='form-control'
                        placeholder="Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}

                         />

                      <input
                        type="submit"
                        className="form-control"
                        style={{ backgroundColor: "green", color: "white", width: '100%' }}
                        value="Register"
                      />
                    </div>
                  </div>
                </form>
           
           
            
          </div>




        </div>
      </div>
    </section>


    <div className="clear-fix" style={{margin: "50px"}}></div>    
        <div className="clear-fix" style={{margin: "50px"}}></div>  
        <div className="clear-fix" style={{margin: "50px"}}></div> */}

</>
  )
};

export default LoginComp;


