import Link from 'next/link'
import React from 'react'

const StoreFeaturesSection = () => {
  return (
    <div className="makeup-section mb-110">
      <div className="container">
        <div className="makeup-top-item">
          <div className="row align-items-center justify-content-center g-0 gy-4">
            <div className="col-lg-6">
              <div className="makeup-img hover-img">
                <img src="/assets/img/home1/makeup-img1.png" alt="" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="makeup-content">
                <h2>Stay Focused</h2>
                <p>Separate apps for different journals = total clarity</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row align-items-center justify-content-center g-0 gy-4">
          <div className="col-lg-6 order-lg-1 order-2">
            <div className="makeup-content">
              <h2>Create Freely</h2>
              <p>Write, doodle, draw, attach photos, videos & more.</p>
            </div>
          </div>
          <div className="col-lg-6 order-lg-2 order-1">
            <div className="makeup-img hover-img">
              <img src="/assets/img/home1/makeup-img2.png" alt="" />
            </div>
          </div>
        </div>
        <div className="makeup-top-item">
          <div className="row align-items-center justify-content-center g-0 gy-4">
            <div className="col-lg-6">
              <div className="makeup-img hover-img">
                <img src="/assets/img/home1/makeup-img1.png" alt="" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="makeup-content">
                <h2>Privacy by Design</h2>
                <p>End-to-end encrypted, Only you can read your thoughts.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row align-items-center justify-content-center g-0 gy-4">
          <div className="col-lg-6 order-lg-1 order-2">
            <div className="makeup-content">
              <h2>Access Anywhere</h2>
              <p>Start on one device, continue on another securely.</p>
            </div>
          </div>
          <div className="col-lg-6 order-lg-2 order-1">
            <div className="makeup-img hover-img">
              <img src="/assets/img/home1/makeup-img2.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default StoreFeaturesSection