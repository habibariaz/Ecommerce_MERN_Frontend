import React from 'react'
import Layout from '../components/layout/Layout'
import contact from '../images/contactus.jpeg'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const Policy = () => {
  return (
    <>
      {/* <Layout>
        <div className="row contactus ">
          <div className="col-md-6 ">
            <img
              src={contact}
              alt="contactus"
              className='img-fluid'
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-md-4">
            <h1 className="bg-dark p-2 text-white text-center">Policy</h1>
            <p className="text-justify mt-2 p-2">
              <ol>
                <li className='mt-2'>Explains how customer data is collected, used, stored, and protected</li>
                <li className='mt-2'>Outlines the conditions under which customers can return products and receive refunds.</li>
                <li className='mt-2'> Details the shipping methods, timelines, costs, and any restrictions.</li>
              </ol>
            </p>

          </div>
        </div>
      </Layout> */}

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
                  <h1 className="bg-dark p-2 text-white text-center">Policy</h1>
                  <ol>
                    <li className='mt-2'>Explains how customer data is collected, used, stored, and protected</li>
                    <li className='mt-2'>Outlines the conditions under which customers can return products and receive refunds.</li>
                    <li className='mt-2'> Details the shipping methods, timelines, costs, and any restrictions.</li>
                  </ol>
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

export default Policy