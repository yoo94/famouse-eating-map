import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const BATCH_SIZE = 100; // 배치 사이즈 설정

// async function seedData() {
//     const stores = data?.["DATA"] || [];
//     for (let i = 0; i < stores.length; i += BATCH_SIZE) {
//         const batch = stores.slice(i, i + BATCH_SIZE); // 배치 데이터 슬라이싱

//         const storeDataBatch = batch.map((store) => ({
//             phone: store?.tel_no,
//             address: store?.rdn_code_nm,
//             lat: store?.y_dnts,
//             lng: store?.x_cnts,
//             name: store?.upso_nm,
//             category: store?.bizcnd_code_nm,
//             storeType: store?.cob_code_nm,
//             foodCertifyName: store?.crtfc_gbn_nm,
//         }));

//         try {
//             const res = await prisma.store.createMany({
//                 data: storeDataBatch, // 배치 데이터를 한 번에 삽입
//             });
//             console.log(`Inserted ${res.count} stores`);
//         } catch (error) {
//             console.error("Error inserting batch", error);
//         }
//     }
// }

async function main() {
    // await seedData();
}

main()
    .catch((e) => {
        console.log(e);
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
    });
