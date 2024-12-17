import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/layout/AdminMenu.js'
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm.js'
import Footer from '../../components/layout/Footer.js'
import Header from '../../components/layout/Header.js'

const CreateCategory = () => {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    //handle Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("https://ecommerce-mern-backend-git-main-habiba-riazs-projects.vercel.app/api/v1/auth/category/create-category", {
                name,
            });
            if (data?.success) {
                alert(`${name} is Created`)
                getAllCategory();
            } else {
                alert("Error")

            }
        } catch (error) {
            console.log(error);
            alert("somthing went wrong in input form")
        }
    };

    //get all cat
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/api/v1/auth/category/get-category");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            alert("Something went wrong in getting catgeory")
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    //update category
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `http://localhost:8000/api/v1/auth/category/update-category/${selected._id}`,
                { name: updatedName }
            );
            if (data.success) {
                alert("Updated Successfully")

                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();
            } 
        } catch (error) {
            alert("Something wwent wrong")

        }
    };
    //delete category
    const handleDelete = async (pId) => {
        try {
            const { data } = await axios.delete(
                `http://localhost:8000/api/v1/auth/category/delete-category/${pId}`
            );
            if (data.success) {
                alert("Category is Deleted")
                getAllCategory();
            }
        } catch (error) {
            alert("Something went wrong")
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
                        <h1>Manage Category</h1>
                        <hr />
                        <div className="p-3 w-50">
                            <CategoryForm
                                handleSubmit={handleSubmit}
                                value={name}
                                setValue={setName}
                            />
                        </div>
                        <div className="w-75">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map((c) => (
                                        <>
                                            <tr>
                                                <td key={c._id}>{c.name}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-primary ms-2"
                                                        onClick={() => {
                                                            setVisible(true);
                                                            setUpdatedName(c.name);
                                                            setSelected(c);
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-danger ms-2"
                                                        onClick={() => {
                                                            handleDelete(c._id);
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* Custom Modal */}
                        {visible && (
                            <div className="modal show d-block" tabIndex="-1">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Edit Category</h5>
                                            <button
                                                type="button"
                                                className="btn-close"
                                                onClick={() => setVisible(false)}
                                            ></button>
                                        </div>
                                        <div className="modal-body">
                                            <CategoryForm
                                                value={updatedName}
                                                setValue={setUpdatedName}
                                                handleSubmit={handleUpdate}
                                            />
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={() => setVisible(false)}
                                            >
                                                Close
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={handleUpdate}
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <Footer />

            </div>
        </>


    )
}

export default CreateCategory
