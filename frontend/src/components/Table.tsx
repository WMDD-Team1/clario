interface RowData {
    [key: string]: any;
}

interface Props {
    headers: { key: string; value: string }[];
    data: RowData[]
};

const Table = ({ headers, data }: Props) => {
    return (
        <>
            {!data || data.length === 0 ? "No data yet" : (
                <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 text-gray-600 text-sm font-medium">
                            <tr>
                                {headers.map(header => (
                                    <th key={header.key} className="px-6 py-3">
                                        {header.value}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index}
                                    className="border-t border-gray-100 hover:bg-gray-50 transition">
                                    {headers.map(header => (
                                        <td key={header.key} className="px-6 py-4">
                                            {row[header.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
};

export default Table