import { useEffect, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

export default function KakaoMap() {
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    const mapScript = document.createElement('script');
    mapScript.async = true;
    mapScript.src = document.head.appendChild(mapScript); //dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false&libraries=services,clusterer,drawing;

    mapScript.addEventListener('load', () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const mapOption = {
          center: new window.kakao.maps.LatLng(33.355701, 126.570667),
          level: 3,
        };

        const loadedMap = new window.kakao.maps.Map(mapContainer, mapOption);
        setMap(loadedMap);
      });
    });

    return () => mapScript.removeEventListener('load', () => {});
  }, []);

  const searchAddress = (address: string) => {
    if (map) {
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(address, (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: coords,
          });

          const infowindow = new window.kakao.maps.InfoWindow({
            content: <div>위치</div>,
          });

          infowindow.open(map, marker);
          map.setCenter(coords);
        }
      });
    }
  };

  useEffect(() => {
    if (map) {
      searchAddress('경기도 수원시 장안구');
    }
  }, [map]);

  return <></>;
}
