import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/User";
import CreateProduct from "./pages/admin/CreateProduct";
import CreateCategory from "./pages/admin/CreateCategory";
import Orders from './pages/user/Orders';
import Profile from "./pages/user/Profile";
import Products from "./pages/admin/Products";
import UpdateProduct from "./pages/admin/UpdateProduct";
import Search from "./pages/Search";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" 
          element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
        </Route>

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders/>}/>
          <Route path="user/profile" element={<Profile/>}/>
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
