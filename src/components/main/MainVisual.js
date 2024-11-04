import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const MainVisual = () => {
  useEffect(() => {
    const swiperPaginationBullets = document.querySelectorAll('.swiper-pagination-bullet .progress-bar');
    swiperPaginationBullets.forEach((el) => {
      el.classList.remove('bar-animation');
      el.classList.add('bar-animation');
    });
  }, []);

  return (
    <div className="visual-slide">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]} 
        slidesPerView={1}
        loop={true}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className}"><b class="progress-bar">0${index + 1}</b></span>`;
          },
        }}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        onSlideChange={() => {
          const e = document.querySelector('.swiper-pagination-bullet-active .progress-bar');
          if (e) {
            e.classList.remove('bar-animation');
            void e.offsetWidth;
            e.classList.add('bar-animation');
          }
        }}
      >
        <SwiperSlide>
          <div className="visual-text">
            <p>
              중대재해처벌법 <br />
              <span>시행으로 안전보건관리체계 구축. <br />이행은 필수!</span>
            </p>
          </div>
          <div className="visual-img">
            <img src="img/main_visual_04.png" alt="" className="pc" />
            <img src="https://www.lxglas.co.kr/assets/front/images/main/mo_main_visual_img_01.jpg" alt="" className="mo" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="visual-text">
            <p>
              <span>기업 스스로 안전역량을 향상하여 <br /> 재해를 예방에 기여하기 위한</span> <br />
              안전보건교육
            </p>
          </div>
          <div className="visual-img">
            <img src="img/main_visual_02.png" alt="" className="pc" />
            <img src="https://www.lxglas.co.kr/assets/front/images/main/mo_main_visual_img_02.jpg" alt="" className="mo" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="visual-text">
            <p>
              안전보건교육
              <span>
                안전역량을 향상하여 <br />
                재해를 예방 필수 교육 프로그램
              </span>
            </p>
          </div>
          <div className="visual-img">
            <img src="img/main_visual_03.png" alt="" className="pc" />
            <img src="https://www.lxglas.co.kr/assets/front/images/main/mo_main_visual_img_03.jpg" alt="" className="mo" />
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="visual-btn-inner">
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
        <div className="swiper-pagination"></div>
      </div>
    </div>
  );
};

export default MainVisual;
