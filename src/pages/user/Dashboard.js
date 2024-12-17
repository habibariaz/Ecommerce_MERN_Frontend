import React from 'react'
import Header from '../../components/layout/Header'
import UserMenu from '../../components/layout/UserMenu'
import Footer from '../../components/layout/Footer'
import { useAuth } from '../../context/auth'

const Dashboard = () => {

  const [auth] = useAuth();

  return (
    <div>
      <Header />
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9" >
            <div className="card w-80 p-3">
              <hr />
              <h4 className="text-center">User Details</h4>
              <hr />
              <h5> <b>Admin Name :</b> {auth?.user?.name}</h5>
              <h5> <b>Admin Email :</b> {auth?.user?.email}</h5>
              <h5> <b>Admin Contact :</b> {auth?.user?.phone}</h5>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard