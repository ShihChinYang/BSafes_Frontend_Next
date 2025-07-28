import Link from 'next/link'
import React from 'react'

const MakeupSection = () => {
  return (
    <div className="makeup-section">
      <div className="container">
        <div className="makeup-top-item">
          <div className="row align-items-center justify-content-center g-0 gy-4">
            <div className="col-lg-6">
              <div className="makeup-img hover-img">
                <img src="/images/storeBanner_1.jpg" alt="" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="makeup-content">
                <span>BROW BESTSELLERS</span>
                <h2>BSafes is a privacy-focused, multi-app journal system for the AI age -- </h2>
                <p>Giving you a safe, distraction-free space to write without your data being tracked, analyzed, or used. With separate journals for every part of your life, it helps you stay organized and protected in a world that often feels too connected.</p>
                {false && <Link legacyBehavior href="/shop"><a className="primary-btn1 style-2 hover-btn3">*Shop All Brows*</a></Link>}
              </div>
            </div>
          </div>
        </div>
        <div hidden className="row align-items-center justify-content-center g-0 gy-4">
          <div className="col-lg-6 order-lg-1 order-2">
            <div className="makeup-content">
              <h2>Yes, It is End-to-End Encrypted!</h2>
              <p>Whatever your summer looks like, bring your own heat with up to 25% off Lumin Brand.Pellentesque ipsum dui, laoreet vitae ex in, pellentesque aliquam leo.</p>
              <Link legacyBehavior href="/shop"><a className="primary-btn1 style-2 hover-btn3">*Try It Now*</a></Link>
            </div>
          </div>
          <div className="col-lg-6 order-lg-2 order-1">
            <div className="makeup-img hover-img">
              <img src="/images/storeBanner_2.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default MakeupSection
