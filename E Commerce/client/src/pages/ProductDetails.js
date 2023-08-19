import { Layout } from 'antd'
import React ,{useState,useEffect }from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom'

const ProductDetails = () => {
    const params = useParams()
    const [product,setProduct] = useState({})
    const [relatedProducts,setRelatedProducts]=useState([])


    //initial product details
    useEffect(()=>{
      if (params?.slug)
      getProduct()
    },[params?.slug])
    //get product
    const getProduct=async()=>{
        try{
            const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product)   
            getSimilarProduct(data?.product._id,data?.product.category._id)
        } catch(error)
        {
            console.log(error)
        }
    }

    //get similar product
    const getSimilarProduct = async(pid,cid)=>{
      try{
        const {data}=await axios.get(`/api/v1/product/related-product/${pid}/${cid}`)
        setRelatedProducts(data?.products)
      } catch(error){
        console.log(error)
      }
    }
  return (
    <Layout>
      <div className='row container mt-2'>
      <div className='col-md-6'>
        <img
        src={`/api/v1/product/product-photo/${product._id}`}
        className='card-img-top'
        alt={product.name}
        height="300"
        width={"350px"}
        />
      </div>
      <div className='col-md-6 text-center'>
        <h1 className='text-center'>Product Details</h1>
        <h6>Name : {product.name}</h6>
        <h6>Description : {product.description}</h6>
        <h6>Price : {product.price}</h6>
        {/* <h6>Category : {product.category.name}</h6> */}
        <button className="btn btn-secondary ms-2">
                    Add to cart
                  </button>
      </div>
      </div>
      <div className='row'>
        <h1>Similar Products</h1>
        {JSON.stringify(relatedProducts,null,4)}
      </div>
    </Layout>
  )
}

export default ProductDetails