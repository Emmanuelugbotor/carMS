import { createStore, combineReducers, applyMiddleware } from 'redux';
import  thunk from 'redux-thunk';
import { composeWithDevTiils, composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { cartReducer } from './reducers/cartReducers'
import { getProductReducer, getProductDetailsReducer, } from './reducers/productReducer'
import { userRegisterReducer, userSignInReducer, addStudentReducers, sectionDataReducer, userChangePassReducer, userChangeDetailsReducer,
     userChangeEmailReducer, userValidateOTP, addResultReducers, addCourseReducers, userValidateOtpPass,
     studentSignInReducer } from './reducers/usersReducer';
import { orderCreateReducer } from './reducers/orderReducers';

const reducers = combineReducers({
    cart: cartReducer,
    getProduct: getProductReducer,
    getProductDetails: getProductDetailsReducer,
    userSignIn: userSignInReducer,
    studentSignIn: studentSignInReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    userChangeEmail: userChangeEmailReducer,
    changeEmail: userValidateOTP,
    userChangePass: userChangePassReducer,
    changePass: userValidateOtpPass,
    userChangeDetails: userChangeDetailsReducer,
    sectionData: sectionDataReducer,
    student: addStudentReducers,
    course: addCourseReducers,
    results: addResultReducers,
}) 

const middleware = { thunk };

const productsFromLocalStorage = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : []
const cartFromLocalStorage = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
const userSignIn = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : []
const studentSignIn = localStorage.getItem("studentInfo") ? JSON.parse(localStorage.getItem("studentInfo")) : []
const shippingAdress = localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : []
const userChangeEmail = localStorage.getItem("changeEmail") ? JSON.parse(localStorage.getItem("changeEmail")) : {}
const userChangePass = localStorage.getItem("changePass") ? JSON.parse(localStorage.getItem("changePass")) : {}
const sectionData = localStorage.getItem("sectiondata") ? JSON.parse(localStorage.getItem("sectiondata")) : []
const student = localStorage.getItem("student") ? JSON.parse(localStorage.getItem("student")) : []
const course = localStorage.getItem("course") ? JSON.parse(localStorage.getItem("course")) : []
const results = localStorage.getItem("result") ? JSON.parse(localStorage.getItem("result")) : []


const INITIAL_CART_STATE = {

    // cart: { cartItems: cartFromLocalStorage, shippingAdress: shippingAdress },
    userSignIn: { userInfo:  userSignIn },
    // studentSignIn: { studentInfo:  studentSignIn },
    // getProduct: { products:  productsFromLocalStorage },
    // userChangeEmail: {emailChange: userChangeEmail},
    // userChangePass: {changePass: userChangePass},
    // sectionData: { secData:  sectionData },
    // student: { students:  student },
    // course: { courses:  course },
    // results: { result:  results },

}

const store = createStore(
    
    reducers, 
    INITIAL_CART_STATE,
    composeWithDevTools(applyMiddleware(thunk))
)

export default store;