import { InvoiceApiResponse } from "@api/index";
import { useEffect, useRef } from "react";
import FormDrawer from "../FormDrawer";
import InvoiceDetails from "./InvoiceDetails";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSend: (invoiceId: string) => void;
    invoice: InvoiceApiResponse | null;
}

const InvoiceDrawer = ({ isOpen, onClose, onSend, invoice }: Props) => {
    const divRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!divRef.current?.contains(e.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    let title = "Invoice";

    console.log(invoice)

    return (
        <>
            {invoice && <FormDrawer title={title} isOpen={isOpen} onClose={onClose} divRef={divRef}>
                <InvoiceDetails
                    invoice={invoice}
                    onSend={() => onSend(invoice.id)}
                    onCancel={onClose}
                />
            </FormDrawer>}
        </>
    );
};

export default InvoiceDrawer;
