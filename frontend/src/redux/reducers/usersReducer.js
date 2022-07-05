import * as actionTypes from "../constants/usersConstant";

export const studentSignInReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.STUDENT_SIGNIN_REQUEST:
      return {
        loading: true,
      };

    case actionTypes.STUDENT_SIGNIN_SUCCESS:
      return {
        loading: false,
        studentInfo: action.payload,
      };

    case actionTypes.STUDENT_SIGNIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.STUDENT_SIGNOUT:
      return {};

    default:
      return state;
  }
};

export const userSignInReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.USER_SIGNIN_REQUEST:
      return {
        loading: true,
      };

    case actionTypes.USER_SIGNIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };

    case actionTypes.USER_SIGNIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case actionTypes.USER_SIGNOUT:
      return {};

    default:
      return state;
  }
};

export const sectionDataReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SECTION_DATA_REQUEST:
      return {
        secLoading: true,
      };

    case actionTypes.SECTION_DATA_SUCCESS:
      return {
        secLoading: false,
        secData: action.payload,
      };

    case actionTypes.SECTION_DATA_FAIL:
      return {
        secLoading: false,
        secErr: action.payload,
      }

    default:
      return state;
  }
};

export const addStudentReducers = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ADD_STUDENT_REQUEST:
      return {
        loadStudent: true,
      };

    case actionTypes.ADD_STUDENT_SUCCESS:
      return {
        loadStudent: false,
        students: action.payload,
      };

    case actionTypes.ADD_STUDENT_FAIL:
      return {
        loadStudent: false,
        studentErr: action.payload,
      }

    default:
      return state;
  }
};

export const addCourseReducers = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ADD_COURSE_REQUEST:
      return {
        loadCourse: true,
      };

    case actionTypes.ADD_COURSE_SUCCESS:
      return {
        loadCourse: false,
        courses: action.payload,
      };

    case actionTypes.ADD_COURSE_FAIL:
      return {
        loadCourse: false,
        courseErr: action.payload,
      }

    default:
      return state;
  }
};

export const addResultReducers = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ADD_RESULT_REQUEST:
      return {
        loadRes: true,
      };

    case actionTypes.ADD_RESULT_SUCCESS:
      return {
        loadRes: false,
        result: action.payload,
      };

    case actionTypes.ADD_RESULT_FAIL:
      return {
        loadRes: false,
        resErr: action.payload,
      }

    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.USER_REGISTER_REQUEST:
      return {
        regloading: true,
        regsuccess: false,
      };

    case actionTypes.USER_REGISTER_SUCCESS:
      return {
        regloading: false,
        regsuccess: true,
        reguserInfo: action.payload,
      };

    case actionTypes.USER_REGISTER_FAIL:
      return {
        regloading: false,
        regsuccess: false,
        regerror: action.payload,
      };

    default:
      return state;
  }
};

export const userChangeEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.USER_CHANGE_EMAIL_REQUEST:
      return {
        loading: true,
      };

    case actionTypes.USER_CHANGE_EMAIL_SUCCESS:
      return {
        loading: false,
        changeEmailInfo: action.payload,
      };

    case actionTypes.USER_CHANGE_EMAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const userChangePassReducer = (state = {}, action) => {

  switch (action.type) {

    case actionTypes.USER_CHANGE_PASSWORD_REQUEST:

      return {
        loadingPass: true,
      };

    case actionTypes.USER_CHANGE_PASSWORD_SUCCESS:
      return {
        loadingPass: false,
        passInfo: action.payload,
      };

    case actionTypes.USER_CHANGE_PASSWORD_FAIL:
      return {
        loadingPass: false,
        errorPass: action.payload,
      };

    default:
      return state;
  }
};

export const userValidateOTP = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.USER_VALIDATE_OTP_REQUEST:
      return {
        otpLoading: true,
      };

    case actionTypes.USER_VALIDATE_OTP_SUCCESS:
      return {
        otpLoading: false,
        otpSuccess: action.payload,
      };

    case actionTypes.USER_VALIDATE_OTP_FAIL:
      return {
        otpLoading: false,
        otpError: action.payload,
      };

    default:
      return state;
  }
};


export const userValidateOtpPass = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.USER_VALIDATE_PASS_OTP_REQUEST:
      return {
        passOtpLoading: true,
      };

    case actionTypes.USER_VALIDATE_PASS_OTP_SUCCESS:
      return {
        passOtpLoading: false,
        passOtpSuccess: action.payload,
      };

    case actionTypes.USER_VALIDATE_PASS_OTP_FAIL:
      return {
        passOtpLoading: false,
        passOtpError: action.payload,
      };

    default:
      return state;
  }
};


export const userChangeDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.USER_CHANGE_DETAILS_REQUEST:

      return {
        loadingDetails: true,
      };

    case actionTypes.USER_CHANGE_DETAILS_SUCCESS:
      return {
        loadingDetails: false,
        detailsInfo: action.payload,
      };

    case actionTypes.USER_CHANGE_DETAILS_FAIL:
      return {
        loadingDetails: false,
        errorDetails: action.payload,
      };

    default:
      return state;
  }
};