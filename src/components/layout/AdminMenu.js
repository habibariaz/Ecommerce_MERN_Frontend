import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <>
            <div className="text-center">
                <div className="list-group">
                    <h4>Admin Panel</h4>
                    <NavLink
                        to="/Dashboard/admin/create-category"
                        className="list-group-item list-group-item-action"
                    >
                        Create Category
                    </NavLink>
                    <NavLink
                        to="/Dashboard/admin/create-product"
                        className="list-group-item list-group-item-action"
                    >
                        Create Product
                    </NavLink>
                    <NavLink
                        to="/Dashboard/admin/products"
                        className="list-group-item list-group-item-action"
                    >
                        Products
                    </NavLink>
                    {/* <NavLink
                        to="/Dashboard/admin/users"
                        className="list-group-item list-group-item-action"
                    >
                        Users
                    </NavLink> */}
                </div>
            </div>

        </>
    )
}

export default AdminMenu