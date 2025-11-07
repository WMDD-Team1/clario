interface Detail {
    label: string;
    value: string;
}

interface Props {
    detail: Detail;
}

// eslint-disable-next-line no-redeclare
const Detail = ({ detail }: Props) => {
    return (
        <div className="flex justify-between border-b border-[var(--primitive-colors-gray-light-mode-200)] pb-5">
            <span>{detail.label}</span>
            <span className="font-medium text-[var(--page-title)]">
                {detail.value}
            </span>
        </div>
    )
}

export default Detail