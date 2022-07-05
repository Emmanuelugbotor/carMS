import axios from 'axios';
import * as actionTypes from "../constants/usersConstant"
import url from '../../constant/url';


export const addStudent = (body, userInfo) => async (dispatch) => {
  dispatch({ type: actionTypes.ADD_STUDENT_REQUEST });

  try {
    const { data } = await axios.post(
      `${url}addmanager`,
      { ...body },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({
      type: actionTypes.ADD_STUDENT_SUCCESS,
      payload: data,
    });
    localStorage.setItem("student", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: actionTypes.ADD_STUDENT_FAIL,
      payload: error?.response?.data?.error,
    });
  }
};

export const admin = (body) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${url}superadmin`, { ...body });
    dispatch({
      type: actionTypes.USER_SIGNIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.log("Error , ", error);
    dispatch({
      type: actionTypes.USER_SIGNIN_FAIL,
      payload: error?.response?.data?.error,
    });
  }
};

export const addCourses = (body, userInfo) => async (dispatch) => {
  dispatch({ type: actionTypes.ADD_COURSE_REQUEST });

  try {
    const { data } = await axios.post(
      `${url}addCars`,
      { ...body },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({
      type: actionTypes.ADD_COURSE_SUCCESS,
      payload: data,
    });
    localStorage.setItem("course", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: actionTypes.ADD_COURSE_FAIL,
      payload: error?.response?.data?.error,
    });
  }
};

export const signOut = () => (dispatch) => {

  localStorage.removeItem("userInfo");
  localStorage.removeItem("student");
  localStorage.removeItem("course");
  localStorage.removeItem("studentInfo");
  localStorage.removeItem("result");
  
  // localStorage.removeItem('cartItems')
  dispatch({ type: actionTypes.USER_SIGNOUT });
};

export const signin = (body, userInfo) => async (dispatch) => {
  dispatch({
    type: actionTypes.STUDENT_SIGNIN_REQUEST,
    payload: { body },
  });

  try {
    const { data } = await axios.post(
      `${url}addworkers`,
      { ...body },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    dispatch({
      type: actionTypes.STUDENT_SIGNIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("studentInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: actionTypes.STUDENT_SIGNIN_FAIL,
      payload: error?.response?.data?.error,
    });
  }
};
 
export const addResult = (body, userInfo) => async (dispatch) => {
  dispatch({ type: actionTypes.ADD_RESULT_REQUEST });

  try {
    const { data } = await axios.post(
      `${url}addcarrecords`,
      { ...body },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({
      type: actionTypes.ADD_RESULT_SUCCESS,
      payload: data,
    })
    localStorage.setItem("result", JSON.stringify(data));
  } catch (error) {
    // console.log("THI SIS THE REEOOR  ", error);

    dispatch({
      type: actionTypes.ADD_RESULT_FAIL,
      payload: error?.response?.data?.error,
    });
  }
};
export const removeAll = () => async (dispatch) => {
  // dispatch({ type: actionTypes.ADD_RESULT_REQUEST });

  dispatch({type: actionTypes.ADD_RESULT_SUCCESS,payload: {},});
  dispatch({ type: actionTypes.ADD_RESULT_FAIL, payload: {} });
  dispatch({ type: actionTypes.ADD_COURSE_SUCCESS, payload: {} });
  dispatch({ type: actionTypes.ADD_COURSE_FAIL, payload: {} });
  dispatch({ type: actionTypes.STUDENT_SIGNIN_SUCCESS, payload: {} });
  dispatch({ type: actionTypes.STUDENT_SIGNIN_FAIL, payload: {} });

    localStorage.removeItem("student");
    localStorage.removeItem("course");
    localStorage.removeItem("studentInfo");
    localStorage.removeItem("result");

};









































export const signOutStudent=()=> (dispatch) => {

    localStorage.removeItem('studentInfo');
    // localStorage.removeItem('cartItems')
    dispatch({type: actionTypes.STUDENT_SIGNOUT})

}

export const register = (name, phone, email, password)=> async (dispatch)=>{
    dispatch({
        type: actionTypes.USER_REGISTER_REQUEST,
        payload: {  
            name, phone, email, password
        }
    })
    
    try {      
        const { data } = await axios.post(`${url}register`, {name, phone, email, password});
        
        
        dispatch({type: actionTypes.USER_REGISTER_SUCCESS, payload: data  })
        dispatch({type: actionTypes.USER_SIGNIN_SUCCESS, payload: data  })
        localStorage.setItem("userInfo", JSON.stringify(data));
        localStorage.removeItem('cart')
        

    } catch (error) {
        
        // console.log(error.response)
        dispatch({
            type: actionTypes.USER_REGISTER_FAIL,
            payload: error?.response?.data?.error ? error?.response?.data?.error : error.message
        });
    }
}


export const changeEmail = (new_email, userInfo)=> async (dispatch)=>{

    dispatch({ type: actionTypes.USER_CHANGE_EMAIL_REQUEST   })

    try {
        const { data } = await axios.post(`${url}usersEditEmail`, {new_email}, {headers:{ 
          Authorization: `Bearer ${userInfo.token}`
      }});
        dispatch({
            type: actionTypes.USER_CHANGE_EMAIL_SUCCESS,
            payload: data
        });
        localStorage.setItem("changeEmail", JSON.stringify(data));

    } catch (error) {
        
        dispatch({
            type: actionTypes.USER_CHANGE_EMAIL_FAIL,
            payload: error?.response?.data?.error
        })
        
    }
}


export const changePassword = (new_Pass, userInfo)=> async (dispatch)=>{
    dispatch({ type: actionTypes.USER_CHANGE_PASSWORD_REQUEST   })
    try {
        const { data } = await axios.post(`${url}usersEditPass`, {new_Pass}, {headers:{ 
          Authorization: `Bearer ${userInfo.token}`
      }});
        dispatch({
            type: actionTypes.USER_CHANGE_PASSWORD_SUCCESS,
            payload: data
        });
        localStorage.setItem("changePass", JSON.stringify(data));

    } catch (error) {
        
        dispatch({
            type: actionTypes.USER_CHANGE_PASSWORD_FAIL,
            payload: error?.response?.data?.error
        })
        
    }
}

export const validateOTP = (otpCode, new_email)=> async (dispatch, getState)=>{
    dispatch({  type: actionTypes.USER_VALIDATE_OTP_REQUEST,  });

    try {
        const { userSignIn: {userInfo},} = getState();
        const { data } = await axios.post(`${url}resetEmail`, { otpCode, new_email }, {
            headers:{  Authorization: `Bearer ${userInfo.token}`  }
        });
        
        dispatch({ type: actionTypes.USER_VALIDATE_OTP_SUCCESS,  payload: data.msg  })
        dispatch({ type: actionTypes.USER_SIGNIN_SUCCESS, payload: data  })
        localStorage.removeItem("changeEmail")
        localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (error) {
        console.log(error?.response?.data?.error)
        dispatch({
            type: actionTypes.USER_VALIDATE_OTP_FAIL,
            payload: error?.response?.data?.error
        })  
    }
}

export const validatePassOTP = (otpCode, new_Pass)=> async (dispatch, getState)=>{
    dispatch({  type: actionTypes.USER_VALIDATE_PASS_OTP_REQUEST,  });

    try {
        
        const { userSignIn: {userInfo},} = getState();
        const { data } = await axios.post(`${url}resetPass`, { otpCode, new_Pass }, {
            headers:{  Authorization: `Bearer ${userInfo.token}`  }
        });
        
        dispatch({ type: actionTypes.USER_VALIDATE_PASS_OTP_SUCCESS,  payload: data.msg  });
        dispatch({ type: actionTypes.USER_SIGNIN_SUCCESS, payload: data  });

        localStorage.removeItem("changePass")
        localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (error) {
        console.log(error?.response?.data?.error)
        dispatch({
            type: actionTypes.USER_VALIDATE_PASS_OTP_FAIL,
            payload: error?.response?.data?.error
        })  
    }
}

export const changeDetails = (name, phone, address)=> async (dispatch, getState)=>{
    dispatch({  type: actionTypes.USER_CHANGE_DETAILS_REQUEST,  });

    try {
        
        const { userSignIn: {userInfo},} = getState();
        const { data } = await axios.post(`${url}changedetails`, { name, phone, address }, {
            headers:{  Authorization: `Bearer ${userInfo.token}`  }
        });
        
        dispatch({ type: actionTypes.USER_CHANGE_DETAILS_SUCCESS,  payload: data.msg  });
        dispatch({ type: actionTypes.USER_SIGNIN_SUCCESS, payload: data  });

        // localStorage.removeItem("changePass")
        localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (error) {
        console.log(error?.response?.data?.error)
        dispatch({
            type: actionTypes.USER_CHANGE_DETAILS_FAIL,
            payload: error?.response?.data?.error
        })  
    }
}

export const sectiondata = (sectionid, userInfo)=> async (dispatch)=>{

    dispatch({ type: actionTypes.SECTION_DATA_REQUEST   })

    try {
        const { data } = await axios.post(`${url}sectionData`, {sectionid}, {headers:{ 
          Authorization: `Bearer ${userInfo.token}`
      }});
        dispatch({
            type: actionTypes.SECTION_DATA_SUCCESS,
            payload: data
        });
        localStorage.setItem("sectiondata", JSON.stringify(data));

    } catch (error) {
        
        dispatch({
            type: actionTypes.SECTION_DATA_FAIL,
            payload: error?.response?.data?.error
        })
        
    }
}

export const addContent = (body, userInfo)=> async (dispatch)=>{

    dispatch({ type: actionTypes.ADD_STUDENT_REQUEST   })

    try {
        const { data } = await axios.post(`${url}addStudentToSection`, {...body}, {headers:{ 
          Authorization: `Bearer ${userInfo.token}`
      }});
        dispatch({
            type: actionTypes.ADD_STUDENT_SUCCESS,
            payload: data
        });
        localStorage.setItem("student", JSON.stringify(data));

    } catch (error) {
        
        dispatch({
            type: actionTypes.ADD_STUDENT_FAIL,
            payload: error?.response?.data?.error
        })
        
    }
}

export const deleteStudent = (body, userInfo)=> async (dispatch)=>{

    dispatch({ type: actionTypes.ADD_STUDENT_REQUEST   })

    try {
        const { data } = await axios.post(`${url}deleteStudentFromSection`, {...body}, {headers:{ 
          Authorization: `Bearer ${userInfo.token}`
      }});
        dispatch({
            type: actionTypes.ADD_STUDENT_SUCCESS,
            payload: data
        });
        localStorage.setItem("student", JSON.stringify(data));

    } catch (error) {
        console.log(error)
        dispatch({
            type: actionTypes.ADD_STUDENT_FAIL,
            payload: error?.response?.data?.error
        })
    }
}

