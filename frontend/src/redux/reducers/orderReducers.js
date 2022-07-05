import * as actionTypes from "../constants/orderConstants";

export const orderCreateReducer = (state = {  }, action) => {

  switch (action.type) {
    case actionTypes.ORDER_CREATE_REQUEST:
      return {
        orderLoading: true,
        orderFail: false,
        orderSuccess: false
      };

    case actionTypes.ORDER_CREATE_SUCCESS:
      return {

        orderLoading: false,
        orderSuccess: true,
        order: action.payload

      };
      
      case actionTypes.ORDER_CREATE_FAIL:
        return {
          
          orderFail: true,
          orderLoading: false,
          order: action.payload,

      };

    case actionTypes.ORDER_CREATE_RESET:
      return { }
      
    default:
      return state;
      
  }
};




