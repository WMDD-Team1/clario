import React from "react"
interface SuccessProps {
    children?:React.ReactNode;
    title?:string;
    p1?:string;
    p2?:string

}

const Success = ({children,title,p1,p2}:SuccessProps)=>{
    return(
        <div className="flex flex-col h-full justify-center">
            <div className="flex flex-col flex-nowrap items-center gap-[1rem] p-[3rem]">
              {children}
              <p className="text-2xl text-center">{title}</p>
              <p className="text-center">{p1}</p>
              <p className="text-center">{p2}</p>
            </div>
          </div>
    )
};export default Success;

