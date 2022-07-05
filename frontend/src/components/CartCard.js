
import { useSelector, useDispatch } from "react-redux";
import URL from "../constant/url";
import RemoveFromCart from "../utils/removeFromCart";
import AddToCard from "../utils/addToCartForCart";
import { Link } from "react-router-dom";

const CartCard = () => {
  let totalPrice = 0;
  let cartItems = useSelector((state) => state.cart);
  // console.log(cartItems)
  let numOfCartItems = cartItems.cartItems.length;
  cartItems.cartItems.forEach((items, index) =>  (totalPrice += parseInt(items.sellingPrice) ));

  let cartRemover = RemoveFromCart(useDispatch);
  let addToCart = AddToCard(useDispatch, useSelector);
  // console.log(cartItems.cartItems.length > 0)


  return (

    <section className="cart-section spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="cart-table">
              {numOfCartItems == 0 ? (
                <h6>
                  YOUR CART IS EMPTY, ( <Link to="/products">Go to market </Link> ){" "}
                </h6>
              ) : (
                <>
                  <h5>Your Cart</h5>
                  <div className="cart-table-warp">
                    <table className="table table-hover ">
                      <thead>
                        <tr>
                          <th scope="col" className="product-th">Product</th>
                          <th scope="col" className="quy-th">Change price </th>
                          {/* <th scope="col" className="total-th">Price</th> */}
                          <th scope="col" className="size-th">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.cartItems.map((product) => {
                          return (
                            <tr key={product.id}>
                              <td className="product-col">
                                <img
                                  data-cfsrc={URL + product.image}
                                  src={URL + product.image}
                                  alt={product.name}
                                  style={{maxWidth:"45px", maxHeight:"100px", float: 'left'}}
                                />
                                <div className="pc-title">
                                  <h6 style={{float: 'left', marginLeft: '2px'}}>{product.name}
                                  <br/>
                                  <b style={{float: 'left', marginLeft: '2px'}}>#{product.sellingPrice}</b>
                                  </h6>
                                </div>
                              </td>

                              <td className="quy-col">
                                <div className="quantity">
                                  <select
                                    className="pro-qty"
                                    onChange={ e =>
                                      totalPrice += addToCart(product.id, e.target.value)
                                    }
                                  > 

                                    {/* {[
                                      ...Array(product.countInStock).keys(),
                                    ].map((x) => {
                                      return (
                                        <option value={x + 1} key={x + 1}>
                                          {x + 1}
                                        </option>
                                      );
                                    })} */}

                                    <option value={product.fullbag}>{`#${product.fullbag} /Fullbag`}</option>
                                    <option value={product.halfbag}>{`#${product.halfbag} /Halfbag`}</option>
                                    <option value={product.quaterbag}>{` #${product.quaterbag} /Quaterbag`}</option>
                                  
                                  </select>
                                </div>
                              </td>

                              {/* <td className="total-col">
                                <h6 className='tot'>
                                  #
                                  {
                                  parseInt(product.price) * parseInt(product.qty)
                                    }
                                </h6>
                              </td> */}

                              <td className="size-col">
                                <a
                                  href="#"
                                  className="add-card"
                                  style={{ marginLeft: -50 }}
                                >
                                  <i
                                    className="fa fa-trash"
                                    style={{ color: "#14fd1cba", float: "right" }}
                                    onClick={() =>
                                      cartRemover(`${product.product}`)
                                    }
                                  ></i>
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="total-cost">
                    <h6>
                      Total <span><b> #{totalPrice} </b></span>
                    </h6>
                  </div>
                </>
              )}
            </div>
          </div>

         
          <div className="col-lg-4 card-right ">

          {cartItems.cartItems.length > 0 ? (
            <>
           
            <Link to="/checkOut" className="site-btn">
            <button className="btn btn-large" style={{backgroundColor: "#0f990e", color: "white", width: '100%'}}>
               Proceed to checkout</button>
            </Link>

        {/* <div className="clear-fix" style={{margin: "5px"}}></div> */}


            <br/>
            <Link to="/products" className="btn btn-large" style={{backgroundColor: "#0f990e", color: "white",  width: '100%'}}>
                         Continue shopping
            </Link>
            </>
          
            ): (
              <Link to="/products" className="site-btn sb-dark">
                <button className="btn btn-large" style={{backgroundColor: "#0f990e", color: "white"}}>  Go to market </button> 
              </Link>
            )}
           

          
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartCard;
