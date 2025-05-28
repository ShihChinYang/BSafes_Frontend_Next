import { useMemo } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Swiper, SwiperSlide } from 'swiper/react';

import BSafesStyle from '../../styles/BSafes.module.css'

export default () => {

  const slideSettings = useMemo(() => {
    return {
      modules: [Navigation, Pagination],
      slidesPerView: "auto",
      spaceBetween: 30,
      slidesPerView: 1,
      pagination: { clickable: true },
      onSwiper: (swiper) => console.log(swiper),
      onSlideChange: () => console.log('slide change'),
    }
  }, [])

  return (
    <div>
      <Container>
        <br/>
        <Row>
          <Col>
            <Swiper {...slideSettings} className="swiper exclusive-slider">
              <div className="swiper-wrapper">
                <SwiperSlide className="swiper-slide">
                  <div className={BSafesStyle.appPreviewImageWrapper}>
                    <img src="/assets/img/inner-page/shop-details-tab-img1.png" alt="" />
                  </div>
                </SwiperSlide>
              </div>
              <div className="swiper-wrapper">
                <SwiperSlide className="swiper-slide">
                  <div className={BSafesStyle.appPreviewImageWrapper}>
                    <img src="/assets/img/inner-page/shop-details-tab-img2.png" alt="" />
                  </div>
                </SwiperSlide>
              </div>
              <div className="swiper-wrapper">
                <SwiperSlide className="swiper-slide">
                  <div className={BSafesStyle.appPreviewImageWrapper}>
                    <img src="/assets/img/inner-page/shop-details-tab-img3.png" alt="" />
                  </div>
                </SwiperSlide>
              </div>
              <div className="swiper-wrapper">
                <SwiperSlide className="swiper-slide">
                  <div className={BSafesStyle.appPreviewImageWrapper}>
                    <img src="/assets/img/inner-page/shop-details-tab-img4.png" alt="" />
                  </div>
                </SwiperSlide>
              </div>
            </Swiper>
          </Col>
        </Row>
      </Container>
    </div>
  );
};