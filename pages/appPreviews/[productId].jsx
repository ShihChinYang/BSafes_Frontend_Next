
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
  }, [])

  return (
    <div>
      <div className="bsafesStore">
        <div className={BSafesStyle.appPreview}>
          <Container>
            <Row>
              <Col sm={{ offset: 1, span: 10 }} md={{ offset: 2, span: 8 }} lg={{ offset: 4, span: 4 }}>
                <Swiper key={1} {...slideSettings} className="swiper exclusive-slider">
                  <div className="swiper-wrapper">
                    <SwiperSlide key={11} className="swiper-slide">
                      <div className={BSafesStyle.appPreviewImageWrapper}>
                        <img src="https://placehold.co/360X480" alt="" />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide key={12} className="swiper-slide">
                      <div className={BSafesStyle.appPreviewImageWrapper}>
                        <img src="https://placehold.co/360X480" alt="" />
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
          </Container>
        </div>
      </div>
    </div>
  );
};