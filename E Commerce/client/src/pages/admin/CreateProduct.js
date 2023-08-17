import React,{useState, useEffect} from 'react'
import Layout from '../../components/layout/layout';
import AdminMenu from '../../components/layout/AdminMenu';
import toast from "react-hot-toast";
import axios from "axios";
import {Select} from 'antd'
const {Option} = Select

const CreateProduct = () => {
    const [categories, setCategories] = useState([])
    const [name,setName] = useState("")
    const [description,setDescription] = useState("")
    const [price,setPrice] = useState("")
    const [photo,setPhoto] = useState("")
    const [category,setCategory] = useState("")
    const [quantity,setQuantity] = useState("")
    const [shipping,setShipping] = useState("")

    // get all categories
    const getAllCategory = async () => {
        try {
          const { data } = await axios.get("/api/v1/category/get-category");
          if (data?.success) {
            setCategories(data?.category);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong in getting category");
        }
      };

      useEffect(() => {
        getAllCategory();
      }, []);

    return (
        <Layout title={"Dashboard - Create Product"}>
            <div className="conatiner-fluid m-3 p3">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu/>
                </div>
                <div className="col-md-9">
                    <h1>Create Product</h1>
                    <div className="m-1 w-75">
                      <Select bordered={false}
                      placeholder="Select a category"
                        size="large"
                        showSearch
                        className="form-select mb-3" onChange={(value) =>{setCategory(value)}} >
                        {categories?.map(c => (
                          <option key={c._id} value={c.name}>{c.name}</option>
                        ))}
                        </Select>
                        <div className="mb-3">
                          <label className="btn btn-outline-secondary col-md-12">
                              {photo ? photo.name : "Upload Photo"}
                            <input type="file" name="photo" accept="image/*" onChange={(e) => setPhoto(e.target.files[0]) } hidden />
                          </label>
                        </div>
                        <div className="mb-3">
                          {photo && (
                            <div className="text-center">
                              <img 
                              src={URL.createObjectURL(photo)} 
                              alt="Product-Photo" height={'200px'} 
                              className="img img-responsive" 
                              />
                            </div>
                          )}
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </Layout>
    );
};

export default CreateProduct;