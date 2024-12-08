import { useState } from "react";

import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { StoreType } from "@/interface";
import Loader from "@/pages/component/Loader";
import Map from "@/pages/component/Map";

export default function StoreDetailPage() {
    const [map, setMap] = useState(null);
    const router = useRouter();
    const { id } = router.query;
    const fetchStore = async () => {
        const { data } = await axios.get(`/api/stores?id=${id}`);
        return data as StoreType;
    }
    const { data: store, isFetching, isError, isSuccess } = useQuery({
        queryKey: ['store', id],
        queryFn: fetchStore,
        enabled: !!id,
        refetchOnWindowFocus: false,
    });
    if (isError) {
        return (
            <div className="w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold">
                다시 시도해주세요
            </div>
        );
    }
    if (isFetching) return <Loader className="mt-[20%]" />;

    return (
        <>
            <div className="max-w-5xl mx-auto px-4 py-8 mt-[5%]">
                <div className="px-4 sm:px-0">
                    <h3 className="text-base/7 font-semibold text-gray-900">{store?.name}</h3>
                    <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">{store?.address}</p>
                </div>
                <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">카테고리</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{store?.category}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">주소</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{store?.address}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">위도</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{store?.lat}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">경도</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{store?.lng}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">연락처</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{store?.phone}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">식품인증구분</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{store?.foodCertifyName}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">업종명</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{store?.storeType}</dd>
                        </div>
                    </dl>
                </div>
            </div>
            {isSuccess && <div className="overflow-hidden w-full mb-20 max-w-5xl mx-auto max-h-[600px]">
                <Map setMap={setMap} lat={store.lat} lng={store.lng} zoom={1} />
            </div>}
        </>

    )
}