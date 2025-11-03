import { formatCurrency } from "@utils/formatCurrency";
import { formatDate } from "@utils/formatDate";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";

interface RowData {
    [key: string]: any;
}

interface Header {
    key: string;
    value: string;
    render?: (row: RowData) => React.ReactNode;
}

interface Props {
    headers: Header[];
    data: RowData[];
    total: number;
    page: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onClickChildren?: (childId: string) => void;
}

const Table = ({
    headers,
    data,
    total,
    page,
    pageSize,
    onPageChange,
    onClickChildren,
}: Props) => {
    const totalPages = Math.ceil(total / pageSize);

    // ----- Render helpers -----
    const renderCellValue = (key: string, value: any) => {
        const lowerKey = key.toLowerCase();

        if (lowerKey.includes("date")) {
            return value ? formatDate(value, { stringMonth: true }) : "-";
        }

        if (lowerKey.includes("amount") || lowerKey.includes("price")) {
            return value ? `$ ${formatCurrency(value)}` : "-";
        }

        if (lowerKey.includes("url")) {
            return value ? (
                <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Download />
                </a>
            ) : "-";
        }

        return value ?? "-";
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            onPageChange(newPage);
        }
    };

    return (
        <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            {/* Table Section */}
            <div className="overflow-x-auto">
                <table
                    role="table"
                    className="w-full min-w-max text-left border-collapse"
                >
                    <thead
                        role="rowgroup"
                        className="bg-[var(--primitive-colors-brand-primary-51)] text-[var(--primitive-colors-gray-light-mode-700)] text-sm"
                    >
                        <tr role="row">
                            {headers.map((header) => (
                                <th
                                    key={header.key}
                                    scope="col"
                                    className="px-6 py-3 whitespace-nowrap"
                                >
                                    {header.value}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody role="rowgroup">
                        {data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={headers.length}
                                    className="text-center text-gray-500 py-6"
                                >
                                    No data available
                                </td>
                            </tr>
                        ) : (
                            data.map((row, i) => (
                                <tr
                                    key={row.id || i}
                                    onClick={() =>
                                        onClickChildren && row.id && onClickChildren(row.id)
                                    }
                                    className={`border-t border-gray-100 ${onClickChildren && 'hover:bg-[#f9fbff] transition cursor-pointer'}`}
                                >
                                    {headers.map((header) => (
                                        <td
                                            key={header.key}
                                            className={`px-6 py-4 whitespace-nowrap text-sm text-gray-600 ${header.key.toLowerCase().includes("amount") ||
                                                header.key.toLowerCase().includes("price")
                                                ? "text-right"
                                                : ""
                                                }`}
                                        >
                                            {header.render
                                                ? header.render(row)
                                                : renderCellValue(header.key, row[header.key])}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer Section */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-[var(--primitive-colors-gray-light-mode-1)]">
                {/* Total */}
                <p className="text-sm text-gray-600">
                    Total{" "}
                    <span className="font-semibold text-blue-600">
                        {total.toLocaleString()}
                    </span>
                </p>

                {/* Pagination */}
                <div className="flex items-center gap-2">
                    <button
                        className={`p-2 rounded-md border transition ${page === 1
                            ? "text-gray-300 border-gray-200 cursor-not-allowed"
                            : "text-[var(--primitive-colors-brand-primary-500-base)] border-gray-300 hover:bg-blue-50"
                            }`}
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        aria-label="Previous page"
                    >
                        <ChevronLeft size={18} />
                    </button>

                    {Array.from({ length: totalPages })
                        .slice(
                            Math.max(0, page - 2),
                            Math.min(totalPages, page + 1)
                        )
                        .map((_, i) => {
                            const displayPage = i + Math.max(1, page - 1);
                            return (
                                <button
                                    key={displayPage}
                                    onClick={() => handlePageChange(displayPage)}
                                    className={`w-8 h-8 rounded-md text-sm font-medium transition ${page === displayPage
                                        ? "bg-[var(--primitive-colors-brand-primary-500-base)] text-white"
                                        : "text-[var(--sub-text)] hover:bg-blue-50 border-1 border-[var(--sublight-2)]"
                                        }`}
                                >
                                    {displayPage}
                                </button>
                            );
                        })}

                    <button
                        className={`p-2 rounded-md border transition ${page === totalPages
                            ? "text-gray-300 border-gray-200 cursor-not-allowed"
                            : "text-blue-600 border-gray-300 hover:bg-blue-50"
                            }`}
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                        aria-label="Next page"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Table;
