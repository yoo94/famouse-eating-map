/** global kakao */
import Script from 'next/script';
import { Dispatch, SetStateAction } from 'react';

// window 객체에 kakao 프로퍼티 추가 선언(TS)
declare global {
  interface Window {
    kakao: any;
  }
}
const DEFAULT_LAT = 37.497625203;
const DEFAULT_LNG = 127.03088379;

const DEFAULT_ZOOM = 3;

interface MapProps {
  setMap: Dispatch<SetStateAction<any>>
  lat?: string | null;
  lng?: string | null;
  zoom?: number;
}

export default function Map({ setMap, lat, lng, zoom }: MapProps) {
  const loadKakaoMap = () => {
    //카카오 지도 로드 함수
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new window.kakao.maps.LatLng(
          lat ?? DEFAULT_LAT,
          lng ?? DEFAULT_LNG),
        level: zoom ?? DEFAULT_ZOOM,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      setMap(map);
    });
  };

  return (
    //nextjs Script 태그로 카카오 지도 로드하기
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        onReady={loadKakaoMap}
      />
      <div id="map" className="w-full h-screen"></div>
    </>
  );
}