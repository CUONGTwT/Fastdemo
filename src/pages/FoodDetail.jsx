import React, { useState, useEffect } from "react";

import products from "../assets/data/products";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";

import "../styles/product-details.css";
import ProductCard from "../components/UI/product-card/ProductCard";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/shopping-cart/cartSlice";

const FoodDetail = () => {
  const [tab, setTab] = useState("desc");
  const [enteredName, setEnterName] = useState("");
  const [enteredEmail, setEnterEmail] = useState("");
  const [reviewMsg, setReviewMsg] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = products.find((product) => product.id === id);
  const { title, price, category, desc, image01 } = product;
  const [previewImg, setPreviewImg] = useState(product.image01);
  const relatedProduct = products.filter((item) => category === item.category);

  const addItem = () => {
    dispatch(
      cartActions.addItem({
        id,
        title,
        price,
        image01,
      })
    );
  };

  const submitHandle = e=>{
    e.preventDefault()
    console.log(enteredName, enteredEmail, reviewMsg);
  }

  useEffect(() => {
    setPreviewImg(product.image01);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Helmet title="Product-details">
      <CommonSection title={title} />

      <section>
        <Container>
          <Row>
            <Col md="2">
              <div className="product__images">
                <div
                  className="img__item mb-2"
                  onClick={() => setPreviewImg(product.image01)}
                >
                  <img src={product.image01} alt="" className="w-50" />
                </div>
                <div
                  className="img__item mb-2"
                  onClick={() => setPreviewImg(product.image02)}
                >
                  <img src={product.image02} alt="" className="w-50" />
                </div>
                <div
                  className="img__item mb-2"
                  onClick={() => setPreviewImg(product.image03)}
                >
                  <img src={product.image03} alt="" className="w-50" />
                </div>
              </div>
            </Col>
            <Col md="4">
              <div className="product__main-img">
                <img src={previewImg} alt="" className="w-100" />
              </div>
            </Col>
            <Col md="6">
              <div className="single__product-content">
                <h2 className="product__title mb-3">{title}</h2>
                <span className="product__price">
                  Prince: <span>{price}$</span>
                </span>
                <p className="category mb-5">
                  Category: <span>{category}</span>
                </p>

                <button onClick={addItem} className="addToCart__btn">
                  add to cart
                </button>
              </div>
            </Col>
            <Col lg="12">
              <div className="tabs d-flex align-items-center gap-3 py-2">
                <h6
                  className={`{tab === "desc" ? "tab__active" : ""}$`}
                  onClick={() => setTab("desc")}
                >
                  Description of the dish
                </h6>
                <h6
                  className={`{tab === "rev" ? "tab__active" : ""}$`}
                  onClick={() => setTab("rev")}
                >
                  Reviews from customers
                </h6>
              </div>

              {tab === "desc" ? (
                <div className="tab__content">
                  <p>{desc}</p>
                </div>
              ) : (
                <div className="tab__form mb-3">
                  <div className="review pt-5">
                    <p className="user__name mb-0">Superman</p>
                    <p className="user__email">anhdhhnn@gmail.com</p>
                    <p className="feedback__text">Ngon tuyệt</p>
                  </div>

                  <div className="review">
                    <p className="user__name mb-0">toro</p>
                    <p className="user__email">hhadxid@gmail.com</p>
                    <p className="feedback__text">đồ ăn ở đây đỉnh của chóp</p>
                  </div>

                  <div className="review">
                    <p className="user__name mb-0">banji</p>
                    <p className="user__email">bajjii011@gmail.com</p>
                    <p className="feedback__text">ngon qua nen vao cmt danh gia</p>
                  </div>

                  <form className="form" onSubmit={submitHandle}>
                    <div className="form__group">
                      <input
                        type="text"
                        placeholder="Enter your name"
                        onChange={(e) => setEnterName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form__group">
                      <input
                        type="text"
                        placeholder="Enter your email"
                        onChange={(e) => setEnterEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form__group">
                      <textarea
                        rows={5}
                        type="text"
                        placeholder="Write your review"
                        onChange={(e) => setReviewMsg(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="addToCart__btn">
                      Submit
                    </button>
                  </form>
                </div>
              )}
            </Col>
            <Col lg="12" className="mb-5 mt-4">
              <h2 className="related__Product-title">You might also like</h2>
            </Col>
            {relatedProduct.map((item) => (
              <Col lg="3" md="4" xs="6" className="mb-4" key={item.id}>
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default FoodDetail;
