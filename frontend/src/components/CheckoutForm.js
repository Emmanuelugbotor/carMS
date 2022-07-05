import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css"
// import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "../App.css"
import { useSelector, useDispatch } from "react-redux";
import URL from "../constant/url";
import { saveShippingAddress } from "../redux/actions/cartActions";
import { createOrder } from "../redux/actions/orderActions";
import { signin, register } from "../redux/actions/usersAction";
import { ORDER_CREATE_RESET } from "../redux/constants/orderConstants";
import { useFlutterwave, closePaymentModal, FlutterWaveButton } from 'flutterwave-react-v3';
import { Redirect, useHistory, Link } from "react-router-dom";
import queryString from 'query-string';

const CheckOutForm = (props) => {
  let history = useHistory();
  
  let totalPrice = 0;
  const cartItems = useSelector((state) => state.cart);
  const userSignin = useSelector((state) => state.userSignIn);
  const userRegister = useSelector((state) => state.userRegister);
  const orderCreate = useSelector((state) => state.orderCreate);

  const { userInfo, loading, error, success } = userSignin;
  const { reguserInfo, regloading, regerror, regsuccess } = userRegister;
  const { orderSuccess, orderFail, orderLoading } = orderCreate;
  
  let numOfCartItems = cartItems.cartItems.length;

  const {  order } = orderCreate;
  cartItems.cartItems.forEach((items, index) =>  (totalPrice += parseInt(items.sellingPrice) ));

// Register
  const [name, setName] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [payEmail, setPaidEmail] = useState("");
  const [payNumber, setPayNumber] = useState("");
  const [payName, setPayName] = useState("")

  // shipping
  const [ShippingAddress, setShippingAddress] = useState("");
  const [ orderSuccessState, setOrderSuccessState] = useState(false);
  const [redirectStatus, setRedirectStatus]= useState(false)
  // console.log("shipong adddress length", ShippingAddress.length)

  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(signin(email, password));
  };

  const handleRegisterHandler=(event)=>{
    event.preventDefault();
    dispatch(register(name, phone, email, password))
  }

  const BillingAddress=(e)=>{
    e.preventDefault();
    dispatch(saveShippingAddress({ShippingAddress, payName, payEmail, payNumber}))
  }

  const  placeOrderHandler= (response)=> dispatch(createOrder(response, cartItems.cartItems, cartItems.shippingAdress))

  useEffect(() => {

    if(numOfCartItems == 0 && redirectStatus == false){
      history.push("/cart");
    }
    
    if (regsuccess) {
      // console.log("props history ", props.history)
      history.push("/checkOut");
      // dispatch({ type: ORDER_CREATE_RESET });
    }
    if (success) {
      setPaidEmail(userSignin.userInfo.email)
      setPayNumber(userSignin.userInfo.number)
      setPayName(userSignin.userInfo.name)
      history.push("/checkOut");
      // dispatch({ type: ORDER_CREATE_RESET });
    }
    
    if (orderFail) {
      history.push("/checkOut");
    }
    
    if (orderSuccess) {
      setRedirectStatus(true)
      history.push("/checkOut");
    }

    // return () => {
    //   cleanup
    // }

  }, [dispatch, redirectStatus, order, orderFail, orderSuccess, userSignin, error, orderLoading, userInfo, success, props.history, ]);

  
  var ordemail, numb, ordname;
  if(!error && userSignin.userInfo){
    
    ordemail = userSignin.userInfo.email 
    numb =  userSignin.userInfo.number
    ordname =  userSignin.userInfo.name
}

// public_key: 'FLWPUBK_TEST-c2c93645ec804dcafa80ccaf15bb4acd-X',

// public_key: 'FLWPUBK-93f72abbb910f3df3c4dbc960feb93c6-X',
  const config = {
    public_key: 'FLWPUBK-93f72abbb910f3df3c4dbc960feb93c6-X',
    tx_ref: Date.now(),
    amount: totalPrice,
    currency: 'NGN',
    payment_options: 'card, ussd, bank',
    customer: {
      email: `${ payEmail ? payEmail : ordemail}`,
      phone_number: `${ payNumber ? payNumber : numb }`,
      name: `${ payName ?  payName:  ordname}`,
    },
    
    
    meta:{
      ShippingAddress: ShippingAddress
    },
    customizations: {
      title: 'OneFarmTech CheckOut',
      description: 'Payment for items in cart',
      logo: 'https://onefarmtech.com/images/logo.png',
    },
  }

  const handleFlutterPayment = useFlutterwave(config);
  
  return (
    <section className="checkout-section spad">
      <div className="container">
        <div className="row">

          {
            (( redirectStatus == true || orderSuccess) && (numOfCartItems <= 0)) ? (

              <div className="col-lg-8 col-md-8 col-sm-12">
              <h5> You have a successful order, proceed to dashboard</h5>
              <Link className="btn"  to="/dashboard" style={{backgroundColor: '#14fd1cba', color: 'white', width: '100%'}} >
                          
                  proceed to dashboard
                             
              </Link>
                          </div>
            ):(

          <div className="col-lg-8 order-2 order-lg-1">

            {
            
            loading ? <h4>loading.. </h4> :
            
            (!error && userSignin.userInfo.id  ) ? (
              <>

              {

                <form className="form">
                  {loading && <h5>laoding.....</h5>}
                  { orderLoading && <p>LOADING, PLEASE WAIT....</p> }
                  { orderFail && <p> {orderFail}  </p> }
                 
                  <div className="cf-title btn btn-lg" style={{backgroundColor: '#6c757d',
                   width: '100%', color: 'white'}}>Billing Address</div>
                  <div className="row">
                    <div className="col-md-7">
                      <p>*Billing Information</p>
                    </div>
                    {orderFail && <h5 style={{color: "red"}}>{order.orderError}</h5>}
                    <div className="col-md-5">
                      <div className="cf-radio-btns address-rb">
                        {/* <div className="cfr-item">
                          <input type="radio" name="pm" id="one" />
                          <label htmlFor="one">Use my regular address</label>
                        </div>

                        <div className="cfr-item">
                          <input type="radio" name="pm" id="two" />
                          <label htmlFor="two">Use a different address</label>
                        </div> */}

                      </div>
                    </div>
                  </div>

                  <div className="row address-inputs">
                    <div className="form group col-md-12">
                      <input style={{marginBottom: '10px'}} className="form-control"
                        type="text"
                        placeholder="Address"
                        required
                        value={ShippingAddress}
                        onChange={(e) => (setShippingAddress(e.target.value) )}
                      />
                      <input style={{marginBottom: '10px'}} className="form-control"
                        type="email"
                        placeholder="Email"
                        required
                        value={userSignin.userInfo.email ? userSignin.userInfo.email : " "}
                        onChange={(e) => setPaidEmail(e.target.value)}
                      />
                      <input className="form-control" 
                      style={{marginBottom: '10px'}}
                       type="text"
                       required
                       onChange={(e) => setPayNumber(e.target.value)}
                       value={userSignin.userInfo.phone ? userSignin.userInfo.phone : " "}
                        placeholder="Phone no" />
                        
                    </div>
                    
                    
                  </div>
                 <div>

                  {/* <div className="cf-title">Delievery Info</div>
                  <div className="row shipping-btns">
                    <div className="col-6">
                    <h4>Standard</h4>
                    </div>
                    <div className="col-6">
                    <div className="cf-radio-btns">
                        <div className="cfr-item">
                          <input type="radio" name="shipping" id="ship-1" />
                          <label htmlFor="ship-1">Free</label>
                          </div>
                          </div>
                    </div>
                    <div className="col-6">
                    <h4>Next day delievery </h4>
                    </div>
                    <div className="col-6">
                      <div className="cf-radio-btns">
                      <div className="cfr-item">
                          <input type="radio" name="shipping" id="ship-2" />
                          <label htmlFor="ship-2">$3.45</label>
                          </div>
                          </div>
                          </div>
                  </div>
                  <div className="cf-title">Payment</div>
                  <ul className="payment-list"> 
                  <li>
                  Paypal
                  <a href="#">
                  <img
                  data-cfsrc="images/paypal.png"
                  alt="fd"
                  style={{ display: "none", visibility: "hidden" }}
                  />
                  <noscript>
                  <img src="images/paypal.png" alt="fd" />
                  </noscript>
                  </a>
                  </li>
                  <li>
                  Credit / Debit card
                  <a href="dd">
                  <img
                  data-cfsrc="images/mastercart.png"
                  alt="fd"
                  style={{ display: "none", visibility: "hidden" }}
                  />
                  <noscript>
                  <img src="images/mastercart.png" alt="fd" />
                  </noscript>
                      </a>
                      </li>
                    <li>Pay when you get the package</li>
                  </ul>*/}
                  </div>

                  {
                    ShippingAddress.length > 3 ? (

                      <button className="btn"  type="button" style={{backgroundColor: '#14fd1cba', color: 'white', width: '100%'}}
                          onClick={() => {

                            handleFlutterPayment({
                              callback: (response) => {  
                                if(response.status =="successful"){
                                  console.log("REQUEST DATA CAME IN HERE : ")
                                  console.log("REACT FRONTEND RESPONDE",  response) 
                                  setRedirectStatus(true)              
                                  placeOrderHandler(response);      
                                }else{
                                  alert("Network Error,  Try again")
                                }                           
                              },

                              onClose: () => {
                                closePaymentModal();
                              },
                            });
                          }}
                          >
                            Pay Now
                            
                          </button>
                    ):(
                      
                      <button className="btn" disabled type="button" style={{backgroundColor: '#14fd1cba', color: 'white', width: '100%'}}>
                            Pay Now
                            
                          </button>
                    )
                  }
                  
                  
                </form>
                  
              }
              
              </>
            ) : (
              <>
                  <div className="cf-title btn btn-lg" style={{backgroundColor: '#6c757d', width: '100%', color: 'white'}}> Login/Register</div>

                <form className="form" onSubmit={submitHandler}>
                  {loading && <h5>laoding.....</h5>}
                  <div className="cf-title"> Login </div>

                  {error && <h5 style={{color: "red"}}>{error}</h5>}
                  <div className="row address-inputs form-group">
                    <div className="col-md-12">
                      <input
                      className='form-control'
                        type="text"
                        placeholder="Email"
                        required
                        style={{marginBottom: '15px' , height: "40px"}}
                        onChange={(e) => (setEmail(e.target.value)
                        )}
                      />
                      <input
                      className='form-control'
                        type="text"
                        placeholder="Password"
                        required
                        style={{marginBottom: '15px' , height: "40px"}}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <input
                      className='form-control'
                        type="submit"
                        className="btn btn-primary"
                        style={{ backgroundColor: "green", color: "white", width: '100%', height: "30px" }}
                        value="Login"
                      />
                    </div>
                  </div>
                </form>

                <form className="form" onSubmit={handleRegisterHandler}>
                  {loading && <h5>laoding.....</h5>}
                  {error && <h5></h5>}
                  <div className="cf-title"> Register </div>

                  {regerror && <h5 style={{color: "red"}}>{regerror}</h5>}

                  <div className="row address-inputs form-group">
                    <div className="col-md-12">
                      <input
                        type="text"
                        required
                        className='form-control'
                        placeholder="Name"
                        style={{marginBottom: '15px' , height: "40px"}}
                        onChange={(e) => (setName(e.target.value)
                        )}
                      />
                     
                     <input
                       type="text"
                       className='form-control'
                       placeholder="Phone Number"
                       required
                       style={{marginBottom: '15px' , height: "40px"}}
                       onChange={(e) => setPhoneNumber(e.target.value)}
                     />

                      <input
                        type="email"
                        className='form-control'
                        placeholder="Email"
                        required
                        style={{marginBottom: '15px' , height: "40px"}}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                     
                      <input type="text"
                       style={{marginBottom: '15px' , height: "40px"}} 
                       className='form-control'
                       required
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}

                         />

                      <input
                        type="submit"
                        className="form-control"
                        style={{ backgroundColor: "green", color: "white", width: '100%', height: "30px" }}
                        value="Register"
                      />
                    </div>
                  </div>
                </form>
           
           
              </>
            )}
          </div>


  )

          }























































































          <div className="col-lg-4 order-1 order-lg-2">
            <div className="checkout-cart">
              <h5>Your Cart</h5>

              <ul className="product-list" style={{listStyle: 'none'}}>
                {cartItems.cartItems.map((cart) => {
                  return (
                    <li>
                      <div className="pl-thumb">
                        <img
                          data-cfsrc={URL + cart.image}
                          src={URL + cart.image}
                          alt={cart.description}
                          style={{maxWidth: '100px', maxHeight: '400px'}}
                        />
                        <noscript>
                          <img src="images/fas5.jpg" alt="fd" />
                        </noscript>
                      </div>
                      <h6>{cart.name}</h6>
                      <p>#{cart.sellingPrice}</p>
                    </li>
                  );
                })}
              </ul>

              <ul className="price-list">
                <li>
                  <b> Total:</b>  <span>#{ totalPrice }</span>
                </li>
                <li>
                  <b> Shipping: </b><span>free</span>
                </li>
                <li className="total">
                  <b> Total:</b>  <span>#{ totalPrice }</span>
                </li>
              </ul>
            </div>
          </div>





        </div>
      </div>
    </section>
  );
};

export default CheckOutForm;


