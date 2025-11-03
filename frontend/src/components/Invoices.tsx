import { fetchInvoicesByProject } from "@api/index";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";
import { useState } from "react";
import Table from "./Table";
import { INVOICE_HEADERS } from "@/constants/invoiceConstants";

interface Props {
    projectId: string;
}

const Invoices = ({ projectId }: Props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading, error } = useQuery({
        queryKey: ["invoices", "project", projectId, {
            page: currentPage
        }],
        queryFn: () => fetchInvoicesByProject({ projectId: projectId, page: currentPage })
    });

    const invoices = data?.data ?? [];
    const meta = data?.meta ?? {
        total: 10,
        page: 1,
        limit: 10,
        totalPages: 1
    };

    if (isLoading) return <Loader />

    if (error) return 'An error has occurred: ' + error.message

    return (
        <>
            {!invoices.length ? (
                <p>No invoices to show</p>
            ) : (
                <Table
                    headers={INVOICE_HEADERS}
                    data={invoices}
                    total={meta.total}
                    page={meta.page}
                    pageSize={meta.limit}
                    onPageChange={setCurrentPage} />
            )}
        </>
    )
}

export default Invoices