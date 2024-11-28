import * as stores from "@/data/store_data.json"
import { useState } from "react";
import Map from "@/pages/component/Map"
import Markers from "@/pages/component/Markers"
import StoreBox from "@/pages/component/StoreBox";
import { StoreType } from "@/interface";

export default function Home({ stores }: { stores: StoreType[] }) {
  const [map, setMap] = useState(null);
  const [currentStore, setCurrentStore] = useState(null);
  console.log(currentStore);
  return (
    <>
      <Map setMap={setMap} />
      <Markers stores={stores} map={map} setCurrentStore={setCurrentStore} />
      <StoreBox store={currentStore} setStore={setCurrentStore} />
    </>
  );
}

export async function getStaticProps() {
  const stores = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`).then((res) => res.json())
  return {
    props: { stores },
    revalidate: 60 * 60
  }
}