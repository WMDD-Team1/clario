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
import SelectionFilter from "./SelectionFilter";

interface Props {
    projectId: string;
}

const INVOICE_STATUS_OPTIONS = [
    { id: 'Paid', label: 'Paid' },
    { id: 'Pending', label: 'Pending' },
];

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
                <SelectionFilter
                    className="max-w-[150px]"
                    customBg="bg-[var(--background-alternate)]"
                    value={INVOICE_STATUS_OPTIONS.find(option => option.id === row.status) || INVOICE_STATUS_OPTIONS[0]}
                    options={INVOICE_STATUS_OPTIONS}
                    onChange={(newStatus) => handleStatusChange(row.id, newStatus.id)}
                />
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