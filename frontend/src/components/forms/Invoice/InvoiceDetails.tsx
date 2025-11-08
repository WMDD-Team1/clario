import { InvoiceApiResponse } from "@/api";
import { formatCurrency } from "@utils/formatCurrency";
import { formatDate } from "@utils/formatDate";
import { useMemo } from "react";
import Detail from "../Detail";
import DetailsDrawer from "../DetailsDrawer";
import FormFooter from "../FormFooter";

interface Props {
    invoice: InvoiceApiResponse;
    onSend: () => void;
    onCancel: () => void;
}

export default function Details({ invoice, onSend, onCancel }: Props) {
    const invoiceDetails = useMemo(
        () => [
            {
                key: "name",
                label: "Invoice Name",
                value: String(invoice.invoiceNumber),
            },
            {
                key: "clientName",
                label: "Client Name",
                value: invoice.clientName ?? "-",
            },
            {
                key: "dueDate",
                label: "Due Date",
                value: formatDate(invoice.dueDate, { stringMonth: true }),
            },
            {
                key: "amount",
                label: "Amount",
                value: `$ ${formatCurrency(invoice.amount)}`,
            },
            {
                key: "deliverables",
                label: "Deliverables",
                values: invoice.deliverables?.map(deliverable => `${deliverable.name}`) ?? [''],
            },
        ], [invoice]
    )
    return (
        <>

            <DetailsDrawer>
                {invoiceDetails.map(detail => (
                    <Detail key={detail.key} detail={detail} />
                ))}
                {/* PDF */}
                <div className="flex justify-between border-b border-[var(--primitive-colors-gray-light-mode-200)] pb-5">
                    <span>Attachment</span>
                    {invoice.fileUrl && <span className="font-medium text-[var(--page-title)]">
                        <a
                            href={invoice.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Invoice.pdf
                        </a>
                    </span>}
                </div>
                {/* Taxes Breakdown */}
                <div className="flex flex-col gap-3
                bg-[var(--background-alternate)] px-5 py-7 rounded-[20px]">
                    <strong>Breakdown</strong>
                    <div className="flex justify-between">
                        <span>Amount in CAD</span>
                        {`$ ${formatCurrency(invoice.amount)}`}
                    </div>
                    <div className="flex justify-between">
                        <span>TAX</span>
                        {`$ ${formatCurrency(invoice.taxAmount)}`}
                    </div>
                    <div className="flex justify-between">
                        <span>Total Amount</span>
                        {`$ ${formatCurrency(invoice.totalAmount)}`}
                    </div>
                </div>
            </DetailsDrawer>
            <FormFooter
                onCancel={onCancel}
                onSubmit={onSend}
                submitLabel="Send to Client"
            />
        </>
    );
}
