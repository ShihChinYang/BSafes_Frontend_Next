import Link from 'next/link'
import React from 'react'

const StoreTopSection = () => {
    return (
        <div className="makeup-section">
            <div className="container">
                <div className="">
                    <div className="row align-items-center justify-content-center g-0 gy-4">
                        <div className="col-lg-6">
                            <div className="makeup-content">
                                <h2>Every BSafes Journal is its own app.</h2>
                            </div>
                            {false &&
                                <div className="makeup-img hover-img">
                                    <img src="/images/storeBanner_1.jpg" alt="" />
                                </div>}
                        </div>
                        {true &&
                            <div className="col-lg-6">
                                <div className="makeup-content">
                                <p>You can <strong>open multiple journal apps</strong> at once to <strong>write, doodle, draw, and add audio, video, or other files</strong>. → <em>Productivity</em></p>
                                <p>Access your thoughts from any device, anytime. Everything is <strong>end-to-end encrypted</strong> to keep your privacy fully protected. → <em>Privacy</em></p>
                                </div>
                            </div>
                        }
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

export default StoreTopSection
