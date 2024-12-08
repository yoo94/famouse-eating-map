import Link from "next/link";

interface PagenationType {
    total: number;
    page: string;
}

export default function Pagenation({ total, page }: PagenationType) {
    const currentPage = parseInt(Array.isArray(page) ? page[0] : page, 10);
    const pageRange = 2;
    const startPage = Math.max(1, currentPage - pageRange);
    const endPage = Math.min(total, currentPage + pageRange);

    return (
        <div className="py-6 w-full px-10 flex justify-center gap-3 bg-white my-10 flex-wrap">
            {startPage > 1 && (
                <Link href={{ pathname: "/stores", query: { page: 1 } }}>
                    <span className="px-3 py-2 rounded border shadow-sm bg-white">
                        처음
                    </span>
                </Link>
            )}
            {currentPage > 1 && (
                <Link href={{ pathname: "/stores", query: { page: currentPage - 1 } }}>
                    <span className="px-3 py-2 rounded border shadow-sm bg-white">
                        이전
                    </span>
                </Link>
            )}
            {[...Array(endPage - startPage + 1)].map((_, i) => {
                const pageNumber = startPage + i;
                return (
                    <Link href={{ pathname: "/stores", query: { page: pageNumber } }} key={pageNumber}>
                        <span
                            className={`px-3 py-2 rounded border shadow-sm bg-white ${pageNumber === currentPage ? "text-blue-600 font-bold" : "text-gray-300"
                                }`}
                        >
                            {pageNumber}
                        </span>
                    </Link>
                );
            })}
            {currentPage < total && (
                <Link href={{ pathname: "/stores", query: { page: currentPage + 1 } }}>
                    <span className="px-3 py-2 rounded border shadow-sm bg-white">
                        다음
                    </span>
                </Link>
            )}
            {endPage < total && (
                <Link href={{ pathname: "/stores", query: { page: total } }}>
                    <span className="px-3 py-2 rounded border shadow-sm bg-white">
                        마지막
                    </span>
                </Link>
            )}
        </div>
    );
}