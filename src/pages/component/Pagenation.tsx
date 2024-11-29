import Link from "next/link"

interface PagenationType {
    total: number;
    page: string;
}

export default function Pagenation({ total, page }: PagenationType) {
    const currentPage = parseInt(Array.isArray(page) ? page[0] : page, 10);
    return (
        <div className="py-6 w-full px-10 flex justify-center gap-3 bg-white my-10 flex-wrap">
            {total <= 10 ? (
                [...Array(total)].map((_, i) => (
                    <Link href={{ pathname: "/stores", query: { page: i + 1 } }} key={i}>
                        <span
                            className={`px-3 py-2 rounded border shadow-sm bg-white ${(i + 1) === currentPage ? "text-blue-600 font-bold" : "text-gray-300"
                                }`}
                        >
                            {i + 1}
                        </span>
                    </Link>
                ))
            ) : (
                <>
                    {currentPage > 1 && (
                        <Link href={{ pathname: "/stores", query: { page: currentPage - 1 } }}>
                            <span className={`px-3 py-2 rounded border shadow-sm bg-white`}>
                                이전
                            </span>
                        </Link>
                    )}
                    <Link href={{ pathname: "/stores", query: { page: currentPage } }}>
                        <span className={`px-3 py-2 rounded border shadow-sm bg-white text-blue-700`}>
                            {currentPage}
                        </span>
                    </Link>
                    {total > currentPage && (
                        <Link href={{ pathname: "/stores", query: { page: currentPage + 1 } }}>
                            <span className={`px-3 py-2 rounded border shadow-sm bg-white`}>
                                다음
                            </span>
                        </Link>
                    )}

                </>
            )}
        </div>
    )
}