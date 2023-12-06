import React from "react";
import { Link, NavLink } from "react-router-dom";
import { BiMailSend, BiPhoneCall } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import ScrollButton from "../forms/ScrollButton";
import {} from "antd";
import "../../styles/footer.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  };
  return (
    <div className="parent-footer">
      <div className="angry-grid">
        <div id="item-0">
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <span
              className="footer-logo"
              style={{
                color: "White",
                fontSize: "40px",
                fontFamily: "lost-treasure",
                cursor: "pointer",
              }}
            >
              Artysly
            </span>
          </NavLink>
        </div>
        <div id="item-1">
          <p className="footer-info-text">
          "Canvas Your World, Paint Your Soul"
          </p>
        </div>
        <div id="item-2">
          <div className="footer-social-link">
            <h3 id="heading-1">Follow us</h3>
            <ul className="ul-1">
              <li className="li-1">
                <Link
                  className="li-1 footer-social-link facebook"
                  to="https://www.facebook.com/HelmetMusic/"
                >
                  <FaFacebookF size={"22px"} />
                </Link>
              </li>
              <li className="li-1">
                <Link
                  className="li-1 footer-social-link instagram"
                  to="https://www.instagram.com/helmets_for_india/?hl=en"
                >
                  <FaInstagram size={"22px"} />
                </Link>
              </li>
              <li className="li-1">
                <Link
                  className="li-1 footer-social-link whatsapp"
                  to="Whatsapp"
                >
                  <FaWhatsapp size={"22px"} />
                </Link>
              </li>
            </ul>
            <ul className="ul-2">
              <li className="li-2">
                <BiMailSend /> : Artysly_paint@gmail.com
              </li>
              <li className="li-2">
                <BiPhoneCall id="phone" /> : 097714 99948
              </li>
            </ul>
          </div>
        </div>
        <div id="item-3">
          <div className="footer-menu">
            <h2 id="heading-2">USEFUL LINKS</h2>
            <ul className="ul-3">
              <li>
                <NavLink
                  to="/"
                  className="nav-link-1"
                  aria-current="page"
                  onClick={scrollToTop}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="nav-link-1"
                  aria-current="page"
                  onClick={scrollToTop}
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="nav-link-1"
                  aria-current="page"
                  onClick={scrollToTop}
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/policy"
                  className="nav-link-1"
                  aria-current="page"
                  onClick={scrollToTop}
                >
                  Policy
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div id="item-4">
        {/* <img className="footer-img" src="https://i.pinimg.com/564x/d9/67/94/d96794db6809b79e6b78abb34789f0a3.jpg"  frameborder="0" scrolling="no" alt="Paris"/> */}
        </div>
      </div>
      <div id="item-5">
        <div className="copyright">
          <span>Copyright © 2022, Artysly All Rights reserved</span>
        </div>
      </div>
      <ScrollButton />
    </div>
  );
};

export default Footer;
