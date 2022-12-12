import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import "../styles/checkout.css";
import { toast } from "react-toastify";
import { cartActions } from "../store/shopping-cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup"
const Checkout = () => {
  const dispatch = useDispatch();
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const shippingCost = 0;
  const totalAmount = cartTotalAmount + shippingCost;
  
  const shippingInfo = [];
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues:{
      name : "",
      email : "",
      phone : "",
      country : "",
      city : "",
      des :"",
    },
   validationSchema: Yup.object({
      name: Yup.string()
      .required("Required")
      .min(4, "Must be 4 characters or more"),
    email: Yup.string()
      .required("Required")
      .matches(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please enter a valid email address"
      ),
      phone: Yup.string()
        .required("Required")
        .matches(
          /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
          "Must be a valid phone number"
        ),
      country: Yup.string()
        .required("Required")
        .min(4, "Must be 4 characters or more"),
      city: Yup.string()
      .required("Required")
      .min(4, "Must be 4 characters or more"),
      des: Yup.string()
      .required("Required")
      .min(4, "Must be 4 characters or more"),
      
    }),
    onSubmit: (values) => {
      dispatch(cartActions.clearCart())
      toast.success('Đặt hàng thành công'
      ,{
        position: toast.POSITION.BOTTOM_RIGHT,})
      shippingInfo.push(formik);
      console.log(shippingInfo);
      navigate("/home")
    },
  }

  )
    

  return (
    <>
    <Helmet title="Checkout">
      <CommonSection title="Your Cart" />
      <section>
        <Container>
          <Row>
            <Col lg="8" md="6">
              <h6 className="mt-4">Delivery address</h6>
              <form className="checkout__form" onSubmit={formik.handleSubmit} >
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    id="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                   {formik.errors.name && (
                   <p className="errorMsg"> {formik.errors.name} </p>
        )}
                </div>
               
               
                <div className="form__group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                   {formik.errors.email && (
          <p className="errorMsg"> {formik.errors.email} </p>
        )}
                </div>
               
                <div className="form__group">
                  <input
                    type="number"
                    id="phone"
                    nam="phone"
                    placeholder="Your phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                  />
                 {formik.errors.phone && (
          <p className="errorMsg"> {formik.errors.phone} </p>
        )}
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    name="city"
                    id ="city"

                    placeholder="City"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.city && (
                   <p className="errorMsg"> {formik.errors.city} </p>
        )}
                </div>
               
                <div className="form__group">
                  <input
                    type="text"
                    id ="country"
                    name ="country"
                    placeholder="Country"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.country && (
                   <p className="errorMsg"> {formik.errors.country} </p>
        )}
                </div>
               
                <div className="form__group">
                  <input
                    type="text"
                    id = "des"
                    name = "des"
                    placeholder="More information for shippers to easily find their way"
                    value={formik.values.des}
                    onChange={formik.handleChange}
                  />
                 {formik.errors.des && (
                   <p className="errorMsg"> {formik.errors.des} </p>
        )}
                </div>
                <button type="submit" className="addToCart__btn">Pay</button>
              </form>
              
            </Col>
            <Col lg="4" md="6">
              <div className="checkout__bill">
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  total: <span>{cartTotalAmount}$</span>
                </h6>
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                transport fee : Free<span>{shippingCost}$</span>
                </h6>
                <div className="checkout__total">
                  <h5 className="d-flex align-items-center justify-content-between">
                  subtotalAmount  : <span>{totalAmount}$</span>
                  </h5>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
    </>
  );
}

export default Checkout;
