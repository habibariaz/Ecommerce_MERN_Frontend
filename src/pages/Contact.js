import React from 'react'
import Layout from '../components/layout/Layout'
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import contact from '../images/contactus.jpeg'
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const Contact = () => {
  return (
    <>
      <div>
        <Header />
        <div className="container-fluid" style={{ marginTop: "50px", marginBottom: "62px" }}>
          <div class="row">
            <div class="col-sm-6 mb-3 mb-sm-0">
              <div class="card">
                <div class="card-body">
                  <img
                    src={contact}
                    alt="contactus"
                    className='img-fluid'
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="card">
                <div class="card-body">
                  <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
                  <p className="text-justify mt-2">
                    any query and info about prodduct feel free to call anytime we 24X7
                    vaialible
                  </p>
                  <p className="mt-3">
                    <BiMailSend /> : www.help@ecommerceapp.com
                  </p>
                  <p className="mt-3">
                    <BiPhoneCall /> : 012-3456789
                  </p>
                  <p className="mt-3">
                    <BiSupport /> : 1800-0000-0000 (toll free)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

    </>
  )
}

export default Contact