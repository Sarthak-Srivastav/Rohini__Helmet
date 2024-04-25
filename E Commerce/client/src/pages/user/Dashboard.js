import React from "react";
import UserMenu from "../../components/layout/UserMenu";
import { useAuth } from "../../context/Auth";
import Layout from "../../components/layout/layout";
import "../../styles/AdminStyle.css"

const Dashboard = () => {
  const [auth]=useAuth()
  return (
    <Layout title={"Dashboard"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
              <UserMenu/>
          </div>
          <div className="col-md-9">
            <div className="card-user w-75 p-3">
                <h1 id="dash-info">User Name : {auth?.user?.name}</h1>
                <h1 id="dash-info">User Email :{auth?.user?.email}</h1>
                <h1 id="dash-info">User Address{auth?.user?.address}</h1>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
