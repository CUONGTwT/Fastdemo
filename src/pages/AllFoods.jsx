import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";

import { Container, Row, Col } from "reactstrap";
import products from "../assets/data/products";
import ProductCard from "../components/UI/product-card/ProductCard";

import "../styles/all-foods.css";
import "../styles/pagination.css";
import ReactPaginate from "react-paginate";

const AllFoods = () => {
  const [searchItem, setSearchItem] = useState("");
  //const [productData, setProductData] = useState(products);

  const [pageNumber, setPageNumber] = useState(0);
  const searchedProduct = products.filter((item) => {
    if (searchItem.value === "") return item;
    if (item.title.toLowerCase().includes(searchItem.toLowerCase()))
      return item;
  })
  const productPerPage = 12;
  const visitedPage = pageNumber * productPerPage;
  const displayPage = searchedProduct.slice(visitedPage, visitedPage + productPerPage);

  const pageCount = Math.ceil(searchedProduct.length / productPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

 

  return (
    <>
    <Helmet title="AllFoods">
      <CommonSection title="Allfoods" />

      <section>
        <Container>
          <Row>
            <Col lg="12" md="12" sm="12" xs='12'>
              <div className="search__widget d-flex align-items-center justify-content-between mb-4">
                <input style = {{width: "-webkit-fill-available" , background : "#fcfcfc"}}
                  type="text"
                  placeholder="Search"
                  value={searchItem}
                  onChange={(e) => setSearchItem(e.target.value)}
                />
                <span>
                  <i class="ri-search-line"></i>
                </span>
              </div>
            </Col>
            

            {displayPage.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mb-4">
                <ProductCard item={item} />
              </Col>
            ))}

            <div>
              <ReactPaginate
                pageCount={pageCount}
                onPageChange={changePage}
                previousLabel="Prev"
                nextLabel="Next"
                containerClassName="paginationBtns"
              />
            </div>
          </Row>
        </Container>
      </section>
    </Helmet>
    </>
  );
};

export default AllFoods;
