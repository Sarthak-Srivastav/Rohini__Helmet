import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/layout/layout";
import { useAuth } from "../context/Auth";
import { Checkbox, Radio, Spin } from "antd";
import { prices } from "../components/prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";
import "../styles/filters.css";
import ImageSlider from "../components/layout/imageSlider";
import axios from "axios";

import img1 from "../image/1111.jpg";
import img2 from "../image/1112.jpg";
import img3 from "../image/1113.jpg";
import img4 from "../image/1114.jpg";
import img5 from "../image/1115.jpg";
import img6 from "../image/1116.jpg";
import img7 from "../image/1117.jpg";
import img8 from "../image/1118.jpg";

const images = [img1, img2, img3, img4, img5, img6, img7 ,img8];

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const observer = useRef(null);

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
    getAllProducts();
    // Create an Intersection Observer
    observer.current = new IntersectionObserver(
      (entries) => {
        const lastEntry = entries[0];
        if (lastEntry.isIntersecting && !loadingMore) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1 }
    );
  }, []);

  const toggleDescriptionExpansion = (productId) => {
    setExpandedDescriptions((prevExpanded) => ({
      ...prevExpanded,
      [productId]: !prevExpanded[productId],
    }));
  };

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

  const loadMore = async () => {
    try {
      setLoadingMore(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoadingMore(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoadingMore(false);
    }
  };

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
    <Layout title={"All Products"}>
      <div className="App">
        <ImageSlider images={images} interval={5000} width="100%" height="600px" />
      </div>
      <div className="container-fluid row">
        <div className="row mt-2">
          <div className="col-md-2">
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
                <h4 className="filter-heading">Filter by price</h4>
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

          <div className="col-md-10 pl-5 ">
            <span className="home-text-center" style={{ fontFamily: "trail-font" }}>
              All Products
            </span>
            <div className="d-flex flex-wrap justify-content-around">
              {products?.map((p, index) => (
                <div className={"card-1"} key={p._id}>
                  <div className="product-image-container">
                    <img
                      className="product-image"
                      src={`/api/v1/product/product-photo/${p._id}`}
                      alt="Product Image"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    />
                  </div>
                  <div className="product-details">
                    <h3 className="product-name">{p.name}</h3>
                    <p className="product-price">₹ {p.price}</p>
                    <p className="product-description">
                      <p className="topic">Description</p>
                      {expandedDescriptions[p._id]
                        ? p.description
                        : `${p.description.substring(0, 100)}...`}
                      <button
                        className="btn-link"
                        onClick={() => toggleDescriptionExpansion(p._id)}
                      >
                        {expandedDescriptions[p._id] ? "See Less" : "See More"}
                      </button>
                    </p>
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
                        toast.success("Product Added To Cart");
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                  {/* Observe the last product element */}
                  {index === products.length - 1 && (
                    <div ref={observer.current}></div>
                  )}
                </div>
              ))}
            </div>

            <div className="m-2 p-3">
              {products && products.length < total && (
                <>
                  {loadingMore ? (
                    <Spin tip="Loading..." />
                  ) : (
                    <button
                      className="btn btn-warning"
                      id="loadmore"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(page + 1);
                      }}
                    >
                      Loadmore
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
