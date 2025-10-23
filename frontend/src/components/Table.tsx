import { ChevronLeft, ChevronRight } from "lucide-react";

interface RowData {
    [key: string]: any;
}

interface Props {
    headers: { key: string; value: string }[];
    data: RowData[];
    total: number;
    page: number;
    pageSize: number;
    onPageChange: (page: number) => void;
}

const Table = ({
    headers,
    data,
    total,
    page,
    pageSize,
    onPageChange,
}: Props) => {
    const totalPages = Math.ceil(total / pageSize);

    return (
        <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            {/* Table */}
            <table className="w-full text-left border-collapse">
                <thead className="bg-[#f6f9ff] text-gray-700 text-sm font-medium">
                    <tr>
                        {headers.map((header) => (
                            <th
                                key={header.key}
                                className="px-6 py-3 whitespace-nowrap font-semibold"
                            >
                                {header.value}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.length > 0 ? (
                        data.map((row, index) => (
                            <tr
                                key={index}
                                className="border-t border-gray-100 hover:bg-[#f9fbff] transition-colors"
                            >
                                {headers.map((header) => (
                                    <td
                                        key={header.key}
                                        className="px-6 py-4 text-gray-600 text-sm whitespace-nowrap"
                                    >
                                        {row[header.key]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={headers.length}
                                className="px-6 py-8 text-center text-gray-400 text-sm"
                            >
                                No data yet
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-[#f9fbff]">
                {/* Total */}
                <p className="text-sm text-gray-600">
                    Total <span className="font-semibold text-blue-600">{total}</span>
                </p>

                {/* Pagination */}
                <div className="flex items-center gap-2">
                    <button
                        className={`p-2 rounded-md border ${page === 1
                                ? "text-gray-300 border-gray-200 cursor-not-allowed"
                                : "text-blue-600 border-gray-300 hover:bg-blue-50"
                            }`}
                        onClick={() => page > 1 && onPageChange(page - 1)}
                        disabled={page === 1}
                    >
                        <ChevronLeft size={18} />
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => onPageChange(i + 1)}
                            className={`w-8 h-8 rounded-md text-sm font-medium ${page === i + 1
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-600 hover:bg-blue-50"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        className={`p-2 rounded-md border ${page === totalPages
                                ? "text-gray-300 border-gray-200 cursor-not-allowed"
                                : "text-blue-600 border-gray-300 hover:bg-blue-50"
                            }`}
                        onClick={() => {console.log('fd');page < totalPages && onPageChange(page + 1)}}
                        disabled={page === totalPages}
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Table;
