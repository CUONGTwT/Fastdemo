import React from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import "../styles/cart-page.css";
import { cartActions } from "../store/shopping-cart/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector(state=>state.cart.totalAmount);

  return (
    <Helmet title="Cart">
      <CommonSection title="Giỏ hàng của bạn" />
      <section>
        <Container>
          <Row>
            <Col lg="12">
              {cartItems.length === 0 ? (
                <h5 className="text-center">There are no products in the cart</h5>
              ) : (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>img</th>
                      <th>Name</th>
                      <th>Prince</th>
                      <th>Amount</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <Tr item={item} key={item.id} />
                    ))}
                  </tbody>
                </table>
              )}
              <div className="mt-4">
                <h6>total: <span className="cart__subtotal">{totalAmount}$</span></h6>
                <p>Taxes and shipping charges will be charged upon payment</p>
                <div className="cart__page-btn">
                  <button className="addToCart__btn me-4">
                      <Link to='/foods'>Continue to buy</Link>
                  </button>
                  <button className="addToCart__btn">
                      <Link to='/checkout'>Checkout</Link>
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};
const Tr = (props) => {
  const { id, image01, title, price, quantity } = props.item;
  const dispatch = useDispatch()
  const deleteItem = () =>{
    dispatch(cartActions.deleteItem(id))
  }
  return (
    <tr>
      <td className="text-center cart__img-box">
        <img src={image01} alt="" />
      </td>
      <td className="text-center">{title}</td>
      <td className="text-center">{price}$</td>
      <td className="text-center">{quantity}x</td>
      <td className="text-center cart__item-del" onClick={deleteItem}>
        <i class="ri-delete-bin-line"></i>
      </td>
    </tr>
  );
};

export default Cart;
