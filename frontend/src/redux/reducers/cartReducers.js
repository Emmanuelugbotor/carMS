import { act } from "react-dom/test-utils";
import * as actionTypes from "../constants/cartConstant";

export const cartReducer = (state={ cartItems: []}, action) =>{
    switch(action.type){
        case actionTypes.ADD_TO_CART:
            const item = action.payload;
            
            const existItem =  state.cartItems.find((prod)=> prod.product == item.product);
            if(existItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map((prod) => prod.product == existItem.product ? item : prod)
                }
            }else{
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
            
            case actionTypes.REMOVE_FROM_CART:
                return {
                ...state,
                cartItems: state.cartItems.filter((prod)=> prod.product != action.payload)
            }

            case actionTypes.CART_RESET:
            return {...state, cartItems: []  }

            case actionTypes.CART_SAVE_SHIPPING_ADDRESS:
                return {...state, shipppingAddress: action.payload}

            default:
                return state;
            }
        }