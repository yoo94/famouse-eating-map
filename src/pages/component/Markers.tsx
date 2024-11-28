import { useEffect, Dispatch, SetStateAction, useCallback } from "react";
import { StoreType } from "@/interface";

interface MarkerProps {
    map: any;
    stores: StoreType[];
    setCurrentStore: Dispatch<SetStateAction<any>>;
}

export default function Markers({ map, stores, setCurrentStore }: MarkerProps) {
    const loadKakaoMarkers = useCallback(() => {
        if (map) {
            // 마커 띄우기
            stores?.map((store) => {
                var imageSrc = store?.category ? `/images/markers/${store?.category}.png` : '/images/markers/default.png',
                    imageSize = new window.kakao.maps.Size(40, 40),  // 마커 이미지의 크기
                    imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커의 좌표의 원시값, 이미지 안에서 좌표를 설정합니다.

                var markerImage = new window.kakao.maps.MarkerImage(
                    imageSrc,
                    imageSize,
                    imageOption
                );

                // 마커가 표시될 위치입니다
                var markerPosition = new window.kakao.maps.LatLng(
                    store?.lat,
                    store?.lng
                );

                // 마커 생성합니다
                var marker = new window.kakao.maps.Marker({
                    position: markerPosition,
                    image: markerImage
                });

                // 마커가 지도 위에 표시되도록 설정합니다
                marker.setMap(map);

                // 마커에 커스텀 오버레이를 추가할 때 인포윈도우를 생성합니다
                var Content = `<div class="infowindow">${store?.name}</div>`;

                // 인포윈도우를 생성합니다
                var customOverlay = new window.kakao.maps.CustomOverlay({
                    position: markerPosition,
                    content: Content,
                    xAnchor: 0.6,
                    yAnchor: 0.91,
                });

                // 마커에 마우스 이벤트를 등록합니다
                window.kakao.maps.event.addListener(marker, 'mouseover', function () {
                    // 마커에 마우스를 올렸을 때 발생하는 customOverlay 마커 위에 표시합니다.
                    customOverlay.setMap(map);
                });

                // 마커에 마우스 이벤트를 등록합니다
                window.kakao.maps.event.addListener(marker, 'mouseout', function () {
                    // 마커에 마우스를 뗐을 때 customOverlay 제거합니다.
                    customOverlay.setMap(null);
                });

                window.kakao.maps.event.addListener(marker, 'click', function () {
                    setCurrentStore(store);
                });
            });
        }
    }, [map, stores, setCurrentStore]); // map과 storeDatas가 변경될 때마다 콜백을 재생성

    useEffect(() => {
        loadKakaoMarkers();
    }, [loadKakaoMarkers]); // loadKakaoMarkers가 변경될 때마다 useEffect 실행

    return <></>;
}
