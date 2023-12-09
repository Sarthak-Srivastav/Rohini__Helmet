import React, { useState } from "react";
// import Layout from "./../../components/layout/layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import "../../styles/AuthStyles.css";
import "../../styles/register-style.css";
import Layout2 from "../../components/layout/layout2";

const Register = () => {
  const [name, setName] = useState("");
  const [profilephoto, setProfilePhoto] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update the API endpoint to handle profile photo upload
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('phone', phone);
      formData.append('address', address);
      formData.append('profilephoto', profilephoto); // Add profile photo to FormData

      const res = await axios.put('/api/v1/auth/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout2 title="Register">
      <section
        className="body"
        style={{
          /* backgroundImage: `url(${backgroundImage})` */ backgroundColor:
            "black",
        }}
      >
        <section>
          <div className="color"></div>
          <div className="color"></div>
          <div className="color"></div>
          <div className="box">
            <div className="square" style={{ "--i": 0 }}></div>
            <div className="square" style={{ "--i": 1 }}></div>
            <div className="square" style={{ "--i": 2 }}></div>
            <div className="square" style={{ "--i": 3 }}></div>
            <div className="square" style={{ "--i": 4 }}></div>
            <div className="container-register ">
              <div className="form">
                <h2 className="title">REGISTER</h2>

                <form onSubmit={handleSubmit}>
                  <div className="inputBox">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Enter Your Name"
                      required
                      autoFocus
                      autocomplete="off"
                    />
                  </div>

                  <div className="inputBox">
                          <input
                            type="file"
                            value={profilephoto}
                            accept="image/*"
                            onChange={(e) => setProfilePhoto(e.target.files[0])}
                          />
                        </div>

                  <div className="inputBox">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Enter Your Email "
                      required
                      autocomplete="off"
                    />
                  </div>
                  <div className="inputBox">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Enter Your Password"
                      required
                      autocomplete="off"
                    />
                  </div>
                  <div className="inputBox">
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Enter Your Phone"
                      required
                      autocomplete="off"
                    />
                  </div>
                  <div className="inputBox">
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Enter Your Address"
                      required
                      autocomplete="off"
                    />
                  </div>
                  <div className="inputBox">
                    <input
                      type="text"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="What Is Your Favorite Movie ?"
                      required
                      autocomplete="off"
                    />
                  </div>

                  <div className="inputBox">
                    <input type="submit" value="Register" />
                  </div>
                  {/* <button className="inputBox-button" type="submit">
                    REGISTER
                  </button> */}
                </form>
              </div>
            </div>
          </div>
        </section>
      </section>
    </Layout2>
  );
};

export default Register;
