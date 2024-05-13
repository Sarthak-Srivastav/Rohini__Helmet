import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import { useAuth } from "../context/Auth";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { prices } from "../components/prices";
import "../styles/productCard.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";
import "../styles/filters.css";
import ImageSlider from "../components/layout/imageSlider";

// import image1 from "";
// import image2 from "../images/1112.jpg";
// import image3 from "../images/1113.jpg";
// import image4 from "../images/1114.jpg";

import img1 from "../image/1111.jpg";
import img2 from "../image/1112.jpg";
import img3 from "../image/1113.jpg";
import img4 from "../image/1114.jpg";
import img5 from "../image/1115.jpg";
import img6 from "../image/1116.jpg";

const images = [img1, img2, img3, img4, img5, img6];

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(1);

  // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //get Total Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"All Recipes"}>
      <div className="App">
        <ImageSlider
          images={images}
          interval={5000}
          width="100%"
          height="700px"
        />
      </div>
      <div className="container-fluid row">
        <div className="row mt-2">
          <div className="col-md-2">
            {/* category filter  */}
            {/* <h4 className="text-center">Filter by category</h4>
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div> */}

            {/* price filter */}
            {/* <div className="price-filter-container">
              <h4 className="filter-heading">Filter by price</h4>
              <div className="radio-group-container">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {prices?.map((p) => (
                    <div key={p._id} className="radio-item">
                      <Radio value={p.array} className="custom-radio">{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
            </div> */}

            <div className="filter-container">
              <div className="filter-section">
                <h4 className="filter-heading">Filter by category</h4>
                <div className="category-checkbox-container">
                  {categories?.map((c) => (
                    <Checkbox
                      key={c._id}
                      onChange={(e) => handleFilter(e.target.checked, c._id)}
                    >
                      {c.name}
                    </Checkbox>
                  ))}
                </div>
              </div>
            </div>
            <div className="filter-container">
              <div className="filter-section">
                <h4 className="filter-heading">Filter by Calories</h4>
                <div className="radio-group-container">
                  <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                    {prices?.map((p) => (
                      <div key={p._id} className="radio-item">
                        <Radio value={p.array} className="custom-radio">
                          {p.name}
                        </Radio>
                      </div>
                    ))}
                  </Radio.Group>
                </div>
              </div>
            </div>

            <div className="d-flex flex-column">
              <button
                className="btn btn-danger"
                onClick={() => window.location.reload()}
              >
                RESET FILTERS
              </button>
            </div>
          </div>

          {/* <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                  key={p._id}
                >
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 30)}...
                    </p>
                    <p className="card-text">₹ {p.price}</p>
                    <button className="btn btn-primary ms-2">
                      More Details
                    </button>
                    <button className="btn btn-secondary ms-2">
                      Add to cart
                    </button>
                  </div>
                </div>
              ))}

            </div> */}

          <div className="col-md-10 pl-5 ">
            <span
              className="home-text-center"
              style={{ fontFamily: "trail-font" }}
            >
              All Recipes
            </span>
            <div className="d-flex flex-wrap justify-content-around">
              {products?.map((p) => (
                <div className={"card-1"} key={p._id}>
                  <div className="product-image-container">
                    {/* <div className="shape"> */}
                    <img
                      className="product-image"
                      src={`/api/v1/product/product-photo/${p._id}`}
                      alt="Product Image"
                    />
                  </div>
                  {/* </div> */}

                  <div className="product-details">
                    <h3 className="product-name">Name: {p.name}</h3>
                    <p className="product-descpription">Origin: {p.brand}</p>
                    <p className="product-description">Calories: {p.price}</p>
                    {/* <p className="product-description">
                      <p className="topic">Description</p>
                      {p.description}</p> */}
                    <p className="product-description">Type: {p.type}</p>
                    {/* {p.description.substring(0, 30)}... */}
                  </div>
                  <div className="buttons-container">
                    <button
                      className="button"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="button"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Product Added To Favorites");
                      }}
                    >
                      Add to Fav.
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="m-2 p-3">
              {products && products.length < total && (
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading ..." : "Loadmore"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
