import React, { useEffect } from 'react';

const MainAnimation = () => {
  useEffect(() => {
    const paths = document.querySelectorAll('.item-line1, .item-line2, .item-line3, .item-line4');
    const circles = document.querySelectorAll('.item-circle1, .item-circle2');

    function animatePaths() {
      paths.forEach((e, t) => {
        setTimeout(() => {
          e.style.transition = 'stroke-dashoffset 1s ease-in-out';
          e.style.strokeDashoffset = '0';
        }, 200 * t);
      });
    }

    function hidePaths() {
      paths.forEach((e) => {
        e.style.transition = 'none';
        e.style.strokeDashoffset = e.getTotalLength();
      });
    }

    function animateCircle() {
      circles.forEach((e, t) => {
        setTimeout(() => {
          e.style.transition = 'opacity 1.5s ease-in-out';
          e.style.opacity = '1';
        }, 400 * t);
      });
    }

    function hideCircle() {
      circles.forEach((e) => {
        e.style.transition = 'none';
        e.style.opacity = '0';
      });
    }

    // 초기 설정
    paths.forEach((e) => {
      e.style.strokeDasharray = e.getTotalLength();
      e.style.strokeDashoffset = e.getTotalLength();
    });
    circles.forEach((e) => {
      e.style.opacity = '0';
    });

    // 애니메이션 실행
    animatePaths();
    animateCircle();

    // 필요에 따라 이벤트 핸들러를 추가합니다.

    return () => {
      // 컴포넌트 언마운트 시 정리 작업
    };
  }, []);

  return (
    <div>
      {/* 애니메이션 대상 요소들 */}
    </div>
  );
};

export default MainAnimation;
