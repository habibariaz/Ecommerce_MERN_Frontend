import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';
import AdminMenu from '../../components/layout/AdminMenu';
import { Link } from 'react-router-dom';

const Products = () => {
    const [product, setProduct] = useState([]);

    //get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("https://ecommerce-mern-backend-git-main-habiba-riazs-projects.vercel.app/api/v1/auth/product/get-product");
            console.log(data);
            if (data?.success && data?.product) {
                setProduct(data.product);
            }
            else {
                alert("No products found");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);
    return (
        <>
            <Header />
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>

                <div className="col-md-9">
                    <h1 className="text-center">All Products</h1>
                    <hr />
                    <div className="row">
                        {product?.map((p) => (
                            <div className="col-md-4 mb-3 text-align-center justify-content-center" key={p._id}>
                                <Link to={`/Dashboard/admin/update-product/${p.slug}`} className="product-link">
                                    <div className="card">
                                        <img
                                            src={`http://localhost:8000/api/v1/auth/product/product-photo/${p._id}`}
                                            className="card-img-top"
                                            alt={p.name}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text">{p.description}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Products

