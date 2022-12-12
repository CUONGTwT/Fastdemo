import React from "react";

import { ListGroup } from "reactstrap";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import toggleCart from "../../toggle";
import "../../../styles/shopping-cart.css";

import { useDispatch, useSelector } from "react-redux";
// import { cartUiActions } from "../../../store/shopping-cart/CartUiSlice";

const Carts = () => {
  // const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.cartItems);

  const subtotalAmount = useSelector((state) => state.cart.totalAmount);

  // const toggleCart = () => {
  //   dispatch(cartUiActions.toggle());
  // };
  return (
    <div className="cart__container">
      <div className="cart__container__bg" onClick={toggleCart}> </div>
      <ListGroup className="cart">
        <div className="cart__lose" onClick={toggleCart}>
          <span>
            <i class="ri-close-fill"></i>
          </span>
        </div>

        <div className="cart__item-list">
          {cartProducts.length === 0 ? (
            <h6 className="text-center mt-5">There are no products in the cart</h6>
          ) : (
            cartProducts.map((item, index) => (
              <CartItem item={item} key={index} />
            ))
          )}
        </div>
        <div className="cart__button d-flex align-items-center justify-content-between">
          <h6>
            total: <span>{subtotalAmount}$</span>
          </h6>
          <button>
            <Link to="/checkout">Checkout</Link>
          </button>
        </div>
      </ListGroup>

    </div>

  );
};

export default Carts;
