interface Detail {
    label: string;
    value?: string;
    values?: string[]
}

interface Props {
    detail: Detail;
}

const Detail = ({ detail }: Props) => {
    return (
        <div className="flex justify-between border-b border-[var(--primitive-colors-gray-light-mode-200)] pb-5">
            <span>{detail.label}</span>
            <span className="font-medium text-[var(--page-title)]">
                {!detail.values?.length ? detail.value: detail.values.map(v => <p>{v}</p>)}
            </span>
        </div>
    )
}

export default Detail