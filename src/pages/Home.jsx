import React from "react";

import Helmet from "../components/Helmet/Helmet.js";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";

import heroImg from "../assets/images/hero.png";
import "../styles/hero-section.css";
import { Link } from "react-router-dom";

import Category from "../components/UI/category/Category.jsx";
import "../styles/home.css";

import featureImg01 from "../assets/images/service-01.png";
import featureImg02 from "../assets/images/service-02.png";
import featureImg03 from "../assets/images/service-03.png";

import products from "../assets/data/products.js";

import foodCategoryImg01 from "../assets/images/hamburger.png";
import foodCategoryImg02 from "../assets/images/pizza.png";
import foodCategoryImg03 from "../assets/images/bread.png";

import ProductCard from "../components/UI/product-card/ProductCard.jsx";
import { useEffect, useState } from "react";

import whyImg from "../assets/images/location.png";

import networkImg from "../assets/images/network.png";

import TestimonialSlider from "../components/UI/slider/TestimonialSlider.jsx";

const featureData = [
  {
    title: "Quick Delivery",
    imgUrl: featureImg01,
    desc: "Only 15-30 minutes delivery even during rush hour",
  },
  {
    title: "Super Dine In",
    imgUrl: featureImg02,
    desc: "We will preserve the best food for you",
  },
  {
    title: "Easy Pick Up",
    imgUrl: featureImg03,
    desc: "Enjoy delicious food",
  },
];

const Home = () => {
  const [category, setCategory] = useState("ALL");
  const [allProducts, seeAllProducts] = useState(products);

  const [hotPizza, setHotPizza] = useState([]);

  useEffect(() => {
    const filterPizza = products.filter((item) => (item.category === "Pizza"));
    const slicePizza = filterPizza.slice(0, 4);
    setHotPizza(slicePizza);
  }, []);

  useEffect(() => {
    if (category === "ALL") {
      seeAllProducts(products);
    }

    if (category === "BURGER") {
      const filterProducts = products.filter(
        (item) => item.category === "Burger"
      );
      seeAllProducts(filterProducts);
      console.log("Burger active");
    }

    if (category === "PIZZA") {
      const filterProducts = products.filter(
        (item) => item.category === "Pizza"
      );
      seeAllProducts(filterProducts);
    }

    if (category === "BREAD") {
      const filterProducts = products.filter(
        (item) => item.category === "Bread"
      );
      seeAllProducts(filterProducts);
    }
  }, [category]);

  return (
    <><Helmet title="Home">
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <h5 className="mb-3">Easy way to make an order</h5>
                <h1 className="mb-4 hero__title">
                <span>HURRY?</span> Just wait <br /> food at
                  <span> your door</span>
                </h1>
                <p>
                It looks like I'm thinking, but 95% of what my brain thinks is what to eat for lunch today.
                </p>
                <div className="hero__btns d-flex align-items-center gap-5 mt-4">
                  <button className="order__btn d-flex align-items-center justify-content-between">
                  Order now<i class="ri-arrow-right-s-line"></i>
                  </button>
                 
                  
                 
                 
                  <Link to ="/foods" >
                  <button className="all__foods-btn">See all foods</button> 
                </Link>
                 
                  
                 
                </div>
              </div>
              <div className="hero__service d-flex align-items-center gap-5 mt-5">
                <p className="d-flex align-items-center gap-2">
                  <span className="shipping__icon">
                    <i class="ri-car-line"></i>
                  </span>
                  Freeship
                </p>
                <p className="d-flex align-items-center gap-2">
                  <span className="shipping__icon">
                    <i class="ri-shield-check-line"></i>
                  </span>
                  100% Secure payment
                </p>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={heroImg} alt="hero-img" className="w-100" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Category />
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h5 className="feature__subtitle mb-4">What we serve?</h5>
              <h2 className="feature__title">Order and blink</h2>
              <h2 className="feature__title">
                We <span>will make you satisfied</span>
              </h2>
              <p className="mb-1 mt-4 feature-text">
                Fast Now your perfect choice
              </p>
              <p className="feature-text">
              We will serve you in the fastest and best way
              </p>
            </Col>
            {featureData.map((item, index) => (
              <Col lg="4" md="6" sm="6" key={index} className="mt-5">
                <div className="feature__item text-center px-5 py-3">
                  <img
                    className="w-25 mb-3"
                    src={item.imgUrl}
                    alt="feature-img" />
                  <h5 className="fw-bold mb-3">{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2>Menu</h2>
            </Col>

            <Col lg="12">
              <div className="food__category d-flex align-items-center gap-4 justify-content-center">
                <button
                  className={`all__btn {category === "ALL" ? "foodBtnActive" : ""}$`}
                  onClick={() => setCategory("ALL")}
                >
                  All
                </button>
                <button
                  onClick={() => setCategory("BURGER")}
                  className={`d-flex align-items-center gap-2 {category === "BURGER" ? "foodBtnActive" : ""}$`}
                >
                  <img src={foodCategoryImg01} alt="" />
                  Burger
                </button>
                <button
                  onClick={() => setCategory("PIZZA")}
                  className={`d-flex align-items-center gap-2 {category === "PIZZA" ? "foodBtnActive" : ""}$`}
                >
                  <img src={foodCategoryImg02} alt="" />
                  Pizza
                </button>
                <button
                  onClick={() => setCategory("BREAD")}
                  className={`d-flex align-items-center gap-2 {category === "BREAD" ? "foodBtnActive" : ""}₫`}
                >
                  <img src={foodCategoryImg03} alt="" />
                  Bread
                </button>
              </div>
            </Col>
            {allProducts.map((item) => (
              <Col lg="3" md="4" sm="6" xs='6' key={item.id} className="mt-5">
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="why__choose-us">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <img src={whyImg} alt="why-fast-now" className="w-100" />
            </Col>
            <Col lg="6" md="6">
              <div className="why__tasty-treat">
                <h2 className="tasty__treat-title mb-4">
                  Why <span>Fast Now</span>
                </h2>
                <p className="testy__treat-desc">
                Fast Now was born with the mission to meet the needs of customers for fast food. Quality dishes from selection to cooking. Hygiene and safety is a top priority for a reputable shop to be in the eyes of diners.
                </p>
                <ListGroup className="mt-4">
                  <ListGroupItem style={{backgroundColor : "#fcfcfc"}} className="border-0 ps-0 ">
                    <p className="choose__us-title d-flex align-items-center gap-2 ">
                    <i class="ri-checkbox-circle-line"></i>
                    Fresh food
                  </p>
                  <p className="choose__us-desc">
                  Food is taken fresh and used within the day
                  </p>
                </ListGroupItem>

                <ListGroupItem style={{backgroundColor : "#fcfcfc"}} className="border-0 ps-0">
                  <p className="choose__us-title d-flex align-items-center gap-2">
                    <i class="ri-checkbox-circle-line"></i>
                    Friendly enthusiastic support
                  </p>
                  <p className="choose__us-desc">
                  We are ready to answer all your questions
                  </p>
                </ListGroupItem>

                <ListGroupItem style={{backgroundColor : "#fcfcfc"}} className="border-0 ps-0">
                  <p className="choose__us-title d-flex align-items-center gap-2">
                    <i class="ri-checkbox-circle-line"></i>
                   Order everywhere
                  </p>
                  <p className="choose__us-desc">
                  The store ships with the speed of the Flash so you don't have to wait too long when ordering
                  </p>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
        </Row>
      </Container>
    </section><section className="pt-0">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2>Hot Pizza</h2>
            </Col>
            {hotPizza.map((item) => (
              <Col lg="3" md="4" key={item.id}>
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section><section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="testimonial">
                <h5 className="testimonial__subtitle mb-4">Testimonials </h5>
                <h2 className="testimonial__title mb-4">
                What our <span>customers</span> are saying
                </h2>
                <p className="testimonial__decs">
                Below are some outstanding reviews from random customers:
                </p>

                <TestimonialSlider />
              </div>
            </Col>
            <Col lg="6" md="6">
              <img src={networkImg} alt="network-img" className="w-100" />
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
    </>
  );
};

export default Home;
