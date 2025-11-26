import React, { ReactNode } from "react";
import { Button } from "../common/Button";
import { ArrowRight } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

const BtnWhite = ({children}: ButtonProps) => {
  return (
    <Button
      size="md"
      variant="outline"
      className="relative group bg-none hover:bg-transparent border-blue text-white overflow-hidden"
    >
      <span className="z-30 bg-transparent flex justify-between items-center group-hover:text-blue">
        {children}
        <ArrowRight className="w-5 h-5 ml-2 inline-block" />
      </span>
      <span className="z-20 w-full group-hover:w-0 h-full absolute right-0 bottom-0 bg-blue transition-all duration-300"></span>
    </Button>
  );
};

export default BtnWhite;
