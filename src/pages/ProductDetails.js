import React, { useEffect, useState } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useCart } from '../context/Cart.js'

const ProductDetails = () => {

    const params = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [cart, setCart] = useCart();

    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug]);

    //getProduct
    const getProduct = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:8000/api/v1/auth/product/get-product/${params.slug}`
            );
            setProduct(data?.product);
            getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error);
        }
    };
    //get similar product
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(
                `http://localhost:8000/api/v1/auth/product/related-product/${pid}/${cid}`
            );
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Header />
            <div id="singleproduct_bg" style={{ height: "200vh" }}>
                <div className="row container pt-2">
                    <div className="col-md-6">
                        <img
                            src={`http://localhost:8000/api/v1/auth/product/product-photo/${product._id}`}
                            className="card-img-top"
                            alt={product.name}
                            height="400"
                            width={"350px"}
                        />
                    </div>
                    <div className="col-md-6 ">
                        <h1 className="text-center">Product Details</h1>
                        <h6>Name : {product.name}</h6>
                        <h6>Description : {product.description}</h6>
                        <h6>Price : {product.price}</h6>
                        <h6>Category : {product?.category?.name}</h6>
                        <button
                            className="btn btn-dark ms-1"
                            onClick={() => {
                                setCart([...cart, product]);
                                localStorage.setItem(
                                    "cart",
                                    JSON.stringify([...cart, product])
                                );
                                alert("Item Added to cart");
                            }}
                        >
                            ADD TO CART
                        </button>
                    </div>
                </div>
                <hr />
                <div className="row container">
                    <h4>Similar Products</h4>
                    {relatedProducts.length < 1 && (
                        <h4 className="text-center">No Similar Products found</h4>
                    )}
                    <div className="d-flex flex-wrap">
                        {relatedProducts?.map((p) => (
                            <div className="card m-2" style={{ width: "20rem" }}>
                                <img
                                    src={`http://localhost:8000/api/v1/auth/product/product-photo/${p?._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 30)}...</p>
                                    <p className="card-text"> $ {p.price}</p>
                                    <button
                                        className="btn btn-primary ms-1"
                                        onClick={() => navigate(`/product/${p.slug}`)}
                                    >
                                        More Details
                                    </button>
                                    <button
                                        className="btn btn-dark ms-1"
                                        onClick={() => {
                                            setCart([...cart, p]);
                                            localStorage.setItem(
                                                "cart",
                                                JSON.stringify([...cart, p])
                                            );
                                            alert("Item Added to cart");
                                        }}
                                    >
                                        ADD TO CART
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ProductDetails