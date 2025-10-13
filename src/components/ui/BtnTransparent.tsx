import React, { ReactNode } from "react";
import { Button } from "../common/Button";
import { ArrowRight } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

const BtnTransparent = ({children}: ButtonProps) => {
  return (
    <Button
      size="md"
      variant="outline"
      className="group bg-none border-white relative text-white overflow-hidden hover:bg-transparent"
    >
      <span className="z-30 bg-transparent group-hover:text-[#0f266c]">
         {children}
        <ArrowRight className="w-5 h-5 ml-2 inline-block" />
      </span>
      <span className="z-20 w-0 group-hover:w-full h-full absolute left-0 bottom-0 bg-white transition-all duration-300"></span>
    </Button>
  );
};

export default BtnTransparent;
