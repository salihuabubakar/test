import React from "react";
import {cn} from "@/lib/utils";


interface  HeaderLabelProps {
    text: string;
    className?: string;
}

const HeaderLabel: React.FC<HeaderLabelProps> = ({ text, className}) => {

    return (
        <div className={cn("border-gradient-rounded text-center rounded-full py-2", className)}>
            {text}
        </div>
    )
}

export  default  HeaderLabel