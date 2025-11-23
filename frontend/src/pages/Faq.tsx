import { clarioFAQs } from "@components/FAQ/clarioFAQs";
import { FaqUnit } from "@components/FAQ/FaqUnit";

export const Faq = ()=>{
    return (<>
    <h2 className="text-[var(--page-subtitle)]">Support & FAQ</h2>
    <div>
        {Object.keys(clarioFAQs).map((key)=><>
        <FaqUnit
        title={key.charAt(0).toUpperCase()+key.slice(1)}
        data={clarioFAQs[key as keyof typeof clarioFAQs]}
        />
        </>)}
    </div>
    </>)
}