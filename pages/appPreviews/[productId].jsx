
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Navigation, Pagination } from 'swiper/modules';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Swiper, SwiperSlide } from 'swiper/react';

import BSafesStyle from '../../styles/BSafes.module.css'

import { debugLog } from '../../lib/helper';
import { products, getDemoUrl } from '../../lib/productID';
import { setupDemo } from '../../lib/demoHelper';

export default function AppPreivews() {
  const debugOn = false;
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [demoReady, setDemoReady] = useState(false);

  const slideSettings = useMemo(() => {
    return {
      modules: [Navigation, Pagination],
      slidesPerView: "auto",
      spaceBetween: 30,
      loop: true,
      speed: 1000,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      pagination: { clickable: true },
      navigation: {
        nextEl: ".exclusive-next-btn",
        prevEl: ".exclusive-prev-btn",
      },
    }
  }, []);

  const productId = router.query.productId;
  const handleTryMe = () => {
    if (productId) {
      setupDemo();
      setDemoReady(true);
      setTimeout(() => {
        debugLog(debugOn, `ProductId: ${productId}`);
        let productLink = getDemoUrl(productId); //products[productId].demoUrl;
        if (productLink) {
          router.push(productLink)
        }
      }, 1000)
    }
  };


  useEffect(() => {
    if (demoReady) {
    }
  }, [demoReady])

  return (
    <>
      <div className="bsafesStore">
        <div className={BSafesStyle.appPreview}>
          <Container>
            <Row>
              <Col sm={{ offset: 1, span: 10 }} md={{ offset: 2, span: 8 }} lg={{ offset: 4, span: 4 }}>
                <Swiper key={1} {...slideSettings} className="swiper exclusive-slider">
                  <div className="swiper-wrapper">
                    <SwiperSlide key={11} className="swiper-slide">
                      <div className={BSafesStyle.appPreviewImageWrapper}>
                        <img src="/images/feature_OneClick.png" alt="" />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide key={12} className="swiper-slide">
                      <div className={BSafesStyle.appPreviewImageWrapper}>
                        <img src="https://placehold.co/360X480" alt="" />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide key={13} className="swiper-slide">
                      <div className={BSafesStyle.appPreviewImageWrapper}>
                        <h2>Dusty Rose</h2>
                        <p>It is beautiful, isn't it?</p>
                      </div>
                    </SwiperSlide>
                  </div>
                  <div className="slider-btn">
                    <div className={`${BSafesStyle.appPreviewPrevBtn} exclusive-prev-btn`}>
                      <i className="bi bi-chevron-left" />
                    </div>
                    <div className={`${BSafesStyle.appPreviewNextBtn} exclusive-next-btn`}>
                      <i className="bi bi-chevron-right" />
                    </div>
                  </div>
                </Swiper>
              </Col>
            </Row>
            <br />
            <Row>
              <Col xs={9}><ul>
                <li></li>
              </ul></Col>
              <Col xs={3}><Button size="sm" onClick={handleTryMe}>Try Me</Button></Col>
            </Row>
            <br />
            <Row>
              <Col xs={9}>
                <ul><li>Sync your other devices with end-to-end encryption to ensure your privacy is protected.<Button variant="link" size="sm" onClick={() => { setShow(true) }}>Learne more</Button></li></ul>
              </Col>
              <Col xs={3}>
                <Button size="sm" onClick={() => { router.push('/keySetup') }}>Go Pro</Button>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <Modal fullscreen={true} show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            defaultActiveKey="home"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="Home">
              Tab content for Home
            </Tab>
            <Tab eventKey="profile" title="Profile">
              Tab content for Profile
            </Tab>
            <Tab eventKey="contact" title="Contact">
              Tab content for Contact
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  );
};