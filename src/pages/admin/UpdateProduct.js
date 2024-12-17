import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';
import AdminMenu from '../../components/layout/AdminMenu';


const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");
    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    //get single product
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(
                `https://ecommerce-mern-backend-git-main-habiba-riazs-projects.vercel.app/api/v1/auth/product/get-product/${params.slug}`
            );
            setName(data.product.name);
            setId(data.product._id);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setPrice(data.product.price);
            setQuantity(data.product.quantity);
            setShipping(data.product.shipping);
            setCategory(data.product.category._id);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getSingleProduct();
    }, []);

    //get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("https://ecommerce-mern-backend-git-main-habiba-riazs-projects.vercel.app/api/v1/auth/category/get-category");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    //product function
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            photo && productData.append("photo", photo);
            productData.append("category", category);
            const { data } = await axios.put(
                `https://ecommerce-mern-backend-git-main-habiba-riazs-projects.vercel.app/api/v1/auth/product/update-product/${id}`,
                productData
            );
           if (data?.success) {
    alert(data?.message)
    alert("Something went wrong")
} else {
    alert("Product Updated Successfully")
    navigate("/Dashboard/admin/products");
}

        } catch (error) {
            console.log(error);
        }
    };

    //delete a product
    const handleDelete = async () => {
        try {
            let answer = window.confirm("Are you sure you want to delete this product?");
            if (!answer) return;

            console.log("Deleting product with ID:", id); // Debugging line to check if ID is correct
            const { data } = await axios.delete(
                `https://ecommerce-mern-backend-git-main-habiba-riazs-projects.vercel.app/api/v1/auth/product/delete-product/${id}`
            );

            if (data?.success) {
                alert("Product Deleted Successfully");
                navigate("/Dashboard/admin/products");
            } else {
                alert("Failed to delete the product.");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Something went wrong while deleting the product.");
        }
    };


    return (
        <>
            <Header />
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Update Product</h1>
                        <div className="m-1 w-75">
                            <select
                                bordered={false}
                                placeholder="select a category"
                                size="large"
                                showSearch
                                className="form-select mb-3"
                                onChange={(value) => {
                                    setCategory(value);
                                }}
                                value={category}
                            >
                                {categories?.map((c) => (
                                    <option key={c._id} value={c._id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                            <div className="mb-3">
                                <label className="btn btn-outline-secondary col-md-12">
                                    {photo ? photo.name : "Upload Photo"}
                                    <input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        hidden
                                    />
                                </label>
                            </div>
                            <div className="mb-3">
                                {photo ? (
                                    <div className="text-center">
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt="product_photo"
                                            height={"200px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <img
                                            src={`https://ecommerce-mern-backend-git-main-habiba-riazs-projects.vercel.app/api/v1/auth/product/product-photo/${id}`}
                                            alt="product_photo"
                                            height={"200px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="write a name"
                                    className="form-control"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <textarea
                                    type="text"
                                    value={description}
                                    placeholder="write a description"
                                    className="form-control"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={price}
                                    placeholder="write a Price"
                                    className="form-control"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={quantity}
                                    placeholder="write a quantity"
                                    className="form-control"
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <select
                                    bordered={false}
                                    placeholder="select Shipping "
                                    size="large"
                                    showSearch
                                    className="form-select mb-3"
                                    onChange={(value) => {
                                        setShipping(value);
                                    }}
                                    value={shipping ? "yes" : "No"}
                                >
                                    <option value="0">No</option>
                                    <option value="1">Yes</option>
                                </select>
                            </div>
                            <div className="d-flex">
                                <div className="mb-3" style={{ marginRight: "10px" }}>
                                    <button className="btn btn-primary" onClick={handleUpdate}>
                                        UPDATE PRODUCT
                                    </button>
                                </div>
                                <div className="mb-3">
                                    <button className="btn btn-danger" onClick={handleDelete}>
                                        DELETE PRODUCT
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default UpdateProduct
