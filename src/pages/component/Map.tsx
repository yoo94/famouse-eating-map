/** global kakao */
import Script from 'next/script';

// window 객체에 kakao 프로퍼티 추가 선언(TS)
declare global {
  interface Window {
    kakao: any;
  }
}

export default function Map() {
  const loadKakaoMap = () => {
      //카카오 지도 로드 함수
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      new window.kakao.maps.Map(mapContainer, mapOption);
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