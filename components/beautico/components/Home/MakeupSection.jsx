import Link from 'next/link'
import React from 'react'

const MakeupSection = () => {
  return (
    <div className="makeup-section">
      <div className="container">
        <div className="">
          <div className="row align-items-center justify-content-center g-0 gy-4">
            <div className="col-lg-6">
              <div className="makeup-content">
                <h2>Every BSafes Journal is its own app -- </h2>
                <p>allowing you to <strong>open multiple journal apps</strong> at once to <strong>write, doodle, draw, and add audio, video, or other files</strong>. → <em>Productivity</em></p>
                <p>Access your thoughts from any device, anytime. Everything is <strong>end-to-end encrypted</strong> to keep your privacy fully protected. → <em>Privacy</em></p>
              </div>
              {false &&
                <div className="makeup-img hover-img">
                  <img src="/images/storeBanner_1.jpg" alt="" />
                </div>}
            </div>
            <div className="col-lg-6">
              {false &&
                <div className="makeup-content">
                  <span>BROW BESTSELLERS</span>
                  <h2>BSafes is a privacy-focused, multi-app journal system for the AI age -- </h2>
                  <p>Giving you a safe, distraction-free space to write without your data being tracked, analyzed, or used. With separate journals for every part of your life, it helps you stay organized and protected in a world that often feels too connected.</p>
                  <p>You can also <strong>doodle, draw, create flowcharts, add audio and video, and attach files</strong> - making BSafes a complete and creative space for capturing thoughts in any form.</p>
                  <p>Your journals are securely synced across your devices with end-to-end encryption, so you can write anywhere knowing your privacy is fully protected.</p>
                  {false && <Link legacyBehavior href="/shop"><a className="primary-btn1 style-2 hover-btn3">*Shop All Brows*</a></Link>}
                </div>
              }
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
