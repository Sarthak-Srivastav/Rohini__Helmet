import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/Auth";
import UserMenu from "./../../components/layout/UserMenu";
import Layout from "../../components/layout/layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import ProfilePhoto from '../../components/ProfilePhoto'; 
import "../../styles/register-style.css";

const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();
//state
const [name, setName] = useState("");
const [profilephoto, setProfilePhoto] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [phone, setPhone] = useState("");
const [address, setAddress] = useState("");


  //get user data
  useEffect(() => {
    const { email, name, address, phone } = auth?.user;
    setName(name);
    setAddress(address);
    setEmail(email);
    setPhone(phone);
  }, [auth?.user]);

  //form function
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

      const { data } = await axios.put('/api/v1/auth/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (data?.error) {
        toast.error("data?.error");
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-8 m-5 ">
            <section
              className="body"
              style={
                {
                  // backgroundColor: "black",
                }
              }
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
                      <h2 className="title">USER PROFILE</h2>

                      <form onSubmit={handleSubmit}>
                        <div className="inputBox">
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Enter Your Name"
                            autoFocus
                            autoComplete="off"
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
                            autoComplete="off"
                            disabled
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
                            autoComplete="off"
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
                            autoComplete="off"
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
                            autoComplete="off"
                          />
                        </div>

                        <div className="inputBox">
                          <input type="submit" value="UPDATE" />
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
