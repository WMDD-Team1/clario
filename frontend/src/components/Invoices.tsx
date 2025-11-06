import { fetchInvoicesByProject, InvoiceApiResponse, sendInvoice, updateInvoice } from "@api/index";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "./Loader";
import { ReactNode, useState } from "react";
import Table from "./Table";
import { INVOICE_HEADERS } from "@/constants/invoiceConstants";
import { ChevronDown } from "lucide-react";
import { useLoader } from "./LoaderProvider";
import InvoiceDrawer from "./forms/Invoice/InvoiceDrawer";
import { Alert, Snackbar } from "@mui/material";

interface Props {
    projectId: string;
}

const Invoices = ({ projectId }: Props) => {
    const { setIsLoading } = useLoader();
    const [showInvoiceToast, setShowInvoiceToast] = useState(false);
    const [toastSetup, setToastSetup] = useState<{ success: boolean, message: string }>();
    const [isInvoiceDrawerOpen, setIsInvoiceDrawerOpen] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState<InvoiceApiResponse | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const queryClient = useQueryClient();
    const { data, isLoading, error } = useQuery({
        queryKey: ["invoices", "project", projectId, {
            page: currentPage
        }],
        queryFn: () => fetchInvoicesByProject({ projectId: projectId, page: currentPage })
    });

    const handleStatusChange = async (id: string, status: string) => {
        setIsLoading(true);
        await updateInvoice(id, status);
        queryClient.invalidateQueries({ queryKey: ["invoices", "project", projectId] })
        setIsLoading(false);
    }

    const invoiceHeaders = INVOICE_HEADERS.map(h => (
        h.key === "status" ? {
            ...h,
            render: (row: any): ReactNode => (
                <div className="relative inline-flex items-center">
                    <select
                        value={row.status}
                        onChange={(e) => handleStatusChange(row.id, e.target.value)}
                        className="bg-[var(--primitive-colors-brand-primary-51)] text-[var(--secondary-text)] appearance-none
                                    text-sm rounded-[20px] pl-4 pr-10 py-1 h-[40px] outline-none border-none cursor-pointer"
                    >
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                    </select>
                    <ChevronDown
                        size={14}
                        className="absolute right-3 text-[var(--secondary-text)] pointer-events-none"
                    />
                </div>
            )
        } : h
    ))

    const invoices = data?.data ?? [];
    const meta = data?.meta ?? {
        total: 10,
        page: 1,
        limit: 10,
        totalPages: 1
    };

    if (isLoading) return <Loader />

    if (error) return 'An error has occurred: ' + error.message

    const handleOpenInvoice = (invoiceId: string) => {
        setSelectedInvoice(invoices.find(invoice => invoice.id === invoiceId) ?? null)
        setIsInvoiceDrawerOpen(true);
    }

    const handleSendInvoice = async (invoiceId: string) => {
        setIsLoading(true);
        const sent = await sendInvoice(invoiceId);
        setIsLoading(false);
        if (sent) {
            setToastSetup({
                success: true,
                message: "Invoice sent",
            })
        } else {
            setToastSetup({
                success: false,
                message: "Invoice not sent",
            })
        }
        setShowInvoiceToast(true);
        setIsInvoiceDrawerOpen(false);
    }

    return (
        <>
            <InvoiceDrawer
                isOpen={isInvoiceDrawerOpen}
                onClose={() => setIsInvoiceDrawerOpen(false)}
                invoice={selectedInvoice}
                onSend={handleSendInvoice}
            />
            {!invoices.length ? (
                <p>No invoices to show</p>
            ) : (
                <Table
                    headers={invoiceHeaders}
                    data={invoices}
                    total={meta.total}
                    page={meta.page}
                    pageSize={meta.limit}
                    onClickChildren={handleOpenInvoice}
                    onPageChange={setCurrentPage} />
            )}
            <Snackbar open={showInvoiceToast} autoHideDuration={3000} onClose={() => setShowInvoiceToast(false)}>
                <Alert severity={toastSetup?.success ? "success" : "error"} sx={{ backgroundColor: `var(${toastSetup?.success ? '--primitive-colors-success-500' : '--primitive-colors-error-500'})`, color: "white" }}>
                    {toastSetup?.message}
                </Alert>
            </Snackbar>
        </>
    )
}

export default Invoices