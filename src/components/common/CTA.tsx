import React from "react";
import { ROUTES } from "../../config/constants";
import { Link } from "react-router-dom";
import BtnTransparent from "../ui/BtnTransparent";
import group_img from "../../assets/group.jpeg";

const CTA = () => {
  return (
    <section
      className="w-full min-h-64 flex relative items-center justify-center"
      style={{
        backgroundImage: `url(${group_img})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full h-full absolute left-0 bottom-0 bg-gradient-to-r from-[#0f266c85] via-[#0077C0] to-[#c7eeff75]"></div>
      <div className="max-w-4xl p-24 sm:px-8 w-full md:w-[80%] gap-2 text-white flex items-center leading-9 justify-center flex-col text-center z-30">
        <h1 className="text-5xl">Launch Your Career with Real Experience.</h1>
        <p className="text-lg">
          Join hundreds of interns who’ve transformed their skills into
          impactful careers through <br></br> our guided program.
        </p>
        <Link className="mt-4" to={ROUTES.APPLY}>
          <BtnTransparent>Apply Now</BtnTransparent>
        </Link>
      </div>
    </section>
  );
};

export default CTA;
