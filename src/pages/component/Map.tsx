/** global kakao */
import Script from 'next/script';
import * as stores from '@/data/store_data.json';

// window 객체에 kakao 프로퍼티 추가 선언(TS)
declare global {
  interface Window {
    kakao: any;
  }
}
const DEFAULT_LAT = 37.497625203;
const DEFAULT_LNG = 127.03088379;

export default function Map() {
  const loadKakaoMap = () => {
      //카카오 지도 로드 함수
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new window.kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG),
        level: 3,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      // 마커띄우기
      stores?.["DATA"]?.map((store)=>{
        var imageSrc = store?.bizcnd_code_nm ? `/images/markers/${store?.bizcnd_code_nm}.png` : '/images/markers/default.png',
        imageSize = new window.kakao.maps.Size(40, 40),  // 마커 이미지의 크기
        imageOption = {offset: new window.kakao.maps.Point(27, 69)}; // 마커의 좌표의 원시값, 이미지 안에서 좌표를 설정합니다.

        var markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption
        )
        // 마커가 표시될 위치입니다
        var markerPosition = new window.kakao.maps.LatLng(
            store?.y_dnts,
            store?.x_cnts
        );

        // 마커 생성합니다
        var marker = new window.kakao.maps.Marker({
            position: markerPosition,
            image: markerImage
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
      })
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