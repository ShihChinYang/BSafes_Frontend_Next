import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from "react-bootstrap/Modal";
import Image from 'react-bootstrap/Image';

import BSafesStyle from '../styles/BSafes.module.css'

import { debugLog } from '../lib/helper'

export default function PrivacyPolicyContent({ callback }) {
    const debugOn = false;

    const handleHide = () => {
        callback();
    }

    return (
        <>
            <br />
            <Image className={BSafesStyle.featureCardNormalImage} style={{ width: "30%" }} src='/images/dataProtection_small.png'></Image>
            <img className='mx-auto d-block' src="/images/logo_small.png" />
            <Row className={BSafesStyle.descriptionRow}>
                <Col xs={12} md={{ span: 10, offset: 1 }} xl={{ span: 8, offset: 2 }}>
                    <h1 className='display-1 text-center'>Privacy Policy</h1>
                </Col>
            </Row>
            <br />
            <Row className={BSafesStyle.descriptionRow}>
                <Col xs={12} md={{ span: 10, offset: 1 }} xl={{ span: 8, offset: 2 }}>
                    <h2 className='text-center'>We respect your privacy! </h2>
                    <p>Your device encrypts all your data before sending it to the server so no one can learn your content, not even BSafes.</p>
                </Col>
            </Row>
            <br />
            <hr />
            <Row className={BSafesStyle.descriptionRow}>
                <Col xs={12} md={{ span: 10, offset: 1 }} xl={{ span: 8, offset: 2 }}>
                    <ul>
                        <li>Revision: 3.0</li>
                        <li>January 8, 2025</li>
                    </ul>
                </Col>
            </Row>
            <hr />
            <Row className={BSafesStyle.descriptionRow}>
                <Col xs={12} md={{ span: 10, offset: 1 }} xl={{ span: 8, offset: 2 }}>
                    <h2><span data-preserver-spaces="true">1 - Legal Framework</span></h2>
                    <p><b/></p>
                    <p><span data-preserver-spaces="true">BSafes service is provided by </span><span data-preserver-spaces="true">Wu-Nan Technology Inc.</span><strong><span data-preserver-spaces="true">&nbsp;(</span></strong><span data-preserver-spaces="true">&quot; </span><span data-preserver-spaces="true">Company,</span><span data-preserver-spaces="true">&quot;  &quot; </span><span data-preserver-spaces="true">we</span><strong><span data-preserver-spaces="true">,</span></strong><span data-preserver-spaces="true">&quot;  &quot; us,&quot;  and &quot; </span><span data-preserver-spaces="true">our</span><span data-preserver-spaces="true">&quot; </span><strong><span data-preserver-spaces="true">), &nbsp;</span></strong><span data-preserver-spaces="true">16192 Coastal Highway, Lewes, Delaware 19958. A company registered under the laws of the United States. BSafes utilizes end-to-end encryption to provide writing and record-keeping services to users worldwide (&quot; Services&quot; ). Your data are always encrypted, so they can never be shared or viewed by anyone but yourself and the intended recipients.</span></p>
                    <p><br/></p>
                    <h2><span data-preserver-spaces="true">2 - Data BSafes collects from you and how we use it</span></h2>
                    <p><span data-preserver-spaces="true">With end-to-end encryption, your device encrypts your writing and record content (Photos, Videos, Documents, Files) before sending it to our servers. We can not learn the content of your data.</span></p>
                    <p><br/></p>
                    <p><span data-preserver-spaces="true">To ensure a private and secure user experience when using the services, we collect as little user information as possible, limited to the following:</span></p>
                    <p><br/></p>
                    <p><span data-preserver-spaces="true">2.1 Account creation: Your device calculates a hash value from your nickname and password and then sends the hash value to our servers. We store the hash value, account ID, creation date, region, and usage information. The hash function is a one-way formula, meaning we can&#39;t derive your nickname and password from the hash value.</span></p>
                    <p><br/></p>
                    <p><span data-preserver-spaces="true">2.2 Account activity: Your device encrypts your data before sending it to our server. We store metadata like creation and modification dates and object keys. We cannot learn the content of your data.</span></p>
                    <p><br/></p>
                    <p><span data-preserver-spaces="true">2.3 IP logging: &nbsp;We may keep IP logs temporarily for diagnosis and defense against abuse and spam.</span></p>
                    <p><br/></p>
                    <p><span data-preserver-spaces="true">2.4 User support: If you contact BSafes User Support, any personal data you may share with us is kept only to research the issue and inform you about the case.</span></p>
                    <p><br/></p>
                    <p><span data-preserver-spaces="true">2.5 Payment information: We rely on Stripe (for Web App), Apple App Store (for iOS App), and Google Play (for Android App) for payment processing. We share necessary data with them. We keep whether you pay for BSafes service but do not store credit card details on our system. </span></p>
                    <p><br/></p>
                    <p><span data-preserver-spaces="true">2.6 Native applications: When you use our iOS or Android apps, we do not track any location-based information from your device.</span></p>
                    <p><br/></p>
                    <p><span data-preserver-spaces="true">{`2.7 BSafes only uses strictly necessary cookies when you need customer support & payment service. We don't track your other activities.`}<br/></span></p>
                    <p><br/></p>
                    <h2><span data-preserver-spaces="true">3 - Data Subprocessors</span></h2>
                    <p><span data-preserver-spaces="true">To deliver our services, we rely on different data subprocessors. These processors only store data within the scope of their specific purpose. Notably, since your device encrypts your data, they can not learn the content related to the general day-to-day use of your Account and Services. Our subprocessors include:</span></p>
                    <p><br/></p>
                    <p><span data-preserver-spaces="true">3.1 Amazon Web Services (AWS)</span></p><ul><li><span data-preserver-spaces="true">Purpose: Provide servers, storage, and databases.</span></li><li><span data-preserver-spaces="true">Data Processing Location: AWS&#39;s global regions.</span></li><li><span data-preserver-spaces="true">Guarantees for international transfer: Standard Contractual Clauses, Data Processing Agreement</span></li></ul>
                    <p><span data-preserver-spaces="true">3.2 Wasabi Technologies</span></p><ul><li><span data-preserver-spaces="true">Purpose: Provide storage.</span></li><li><span data-preserver-spaces="true">Data Processing Location: Wasabi&#39;s global regions.</span></li><li><span data-preserver-spaces="true">Guarantees for international transfer: Standard Contractual Clauses, Data Processing Agreement</span></li></ul>
                    <p><span data-preserver-spaces="true">3.3 Cloudflare, Inc.</span></p><ul><li><span data-preserver-spaces="true">Purpose: Provide CDN (Content Delivery Network).</span></li><li><span data-preserver-spaces="true">Data Processing Location: Cloudflair&#39;s global data center locations.</span></li><li><span data-preserver-spaces="true">Guarantees for international transfer: Standard Contractual Clauses, Data Processing Agreement</span></li></ul>
                    <p><span data-preserver-spaces="true">3.4 Stripe, Inc</span></p><ul><li><span data-preserver-spaces="true">Purpose: Provide payment processing service.</span></li><li><span data-preserver-spaces="true">Data Processing Location: United States.</span></li><li><span data-preserver-spaces="true">Guarantees for international transfer: Standard Contractual Clauses, Data Processing Agreement</span></li></ul>
                    <p><span data-preserver-spaces="true">3.5 Apple, Inc.</span></p><ul><li><span data-preserver-spaces="true">Purpose: Provide payment processing service.</span></li><li><span data-preserver-spaces="true">Data Processing Location: United States.</span></li><li><span data-preserver-spaces="true">Guarantees for international transfer: Standard Contractual Clauses, Data Processing Agreement</span></li></ul>
                    <p><span data-preserver-spaces="true">3.5 Google LLC.</span></p><ul><li><span data-preserver-spaces="true">Purpose: Provide payment processing service.</span></li><li><span data-preserver-spaces="true">Data Processing Location: United States.</span></li><li><span data-preserver-spaces="true">Guarantees for international transfer: Standard Contractual Clauses, Data Processing Agreement</span></li></ul>
                    <p><br/></p>
                    <h2><span data-preserver-spaces="true">4 - Data Disclosure</span></h2>
                    <p><span data-preserver-spaces="true">We will only disclose the limited user data we possess if we are legally obligated to do so by a valid and binding request from competent U.S. authorities. We would assess each such request to ensure they comply with U.S. law. </span></p>
                    <p><br/></p>
                    <p><span data-preserver-spaces="true">Because your device encrypts your data, we can&#39;t decrypt content and disclose decrypted copies.</span></p>
                    <p><br/></p>
                    <h2><span data-preserver-spaces="true">5 - Your Privacy Rights at</span> BSafes</h2>
                    <p><span data-preserver-spaces="true">If we suspend your Account due to a breach of terms and conditions, and you would like to exercise the rights related to your data, you can contact our support team.</span></p>
                    <p><br/></p>
                    <h2><span data-preserver-spaces="true">6 - Modifications to the Privacy Policy</span></h2>
                    <p><span data-preserver-spaces="true">Within the boundaries of applicable U.S. law, the company reserves the right to review and change this Privacy Policy at any time. Please check this policy regularly to stay informed about how we respect your privacy. As long as you use the Services, you consent to it.</span></p>
                </Col>
            </Row>
            <br/>
            <br/>
            <br/>
        </>
    )
}