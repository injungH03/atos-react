import React, { useEffect } from 'react';

const KakaoMap = ({ address }) => {
    useEffect(() => {
        const initializeMap = () => {
            const container = document.getElementById('map');
            const options = {
                center: new window.kakao.maps.LatLng(33.450701, 126.570667),
                level: 3,
            };
            const map = new window.kakao.maps.Map(container, options);

            const geocoder = new window.kakao.maps.services.Geocoder();
            geocoder.addressSearch(address, (result, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                    const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                    map.setCenter(coords);

                    new window.kakao.maps.Marker({
                        map: map,
                        position: coords,
                    });
                } else {
                    console.error('주소 검색 실패:', status);
                }
            });
        };

        const loadKakaoMap = () => {
            window.kakao.maps.load(() => {
                initializeMap();
            });
        };

        if (window.kakao && window.kakao.maps) {
            loadKakaoMap();
        } else {
            const script = document.createElement('script');
            script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_JAVASCRIPT_API_KEY}&libraries=services&autoload=false`;
            script.async = true;
            script.onload = () => {
                loadKakaoMap();
            };
            script.onerror = () => {
                console.error('Kakao Maps SDK 스크립트 로드 중 오류 발생');
            };
            document.head.appendChild(script);
        }
    }, [address]);

    return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
};



export default KakaoMap;
