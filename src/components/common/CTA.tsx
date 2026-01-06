import { ROUTES } from "../../config/constants";
import { Link } from "react-router-dom";
import BtnTransparent from "../ui/BtnTransparent";
import group_img from "../../assets/group.jpeg";

const CTA = () => {
  return (
    <section
      className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${group_img})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1d4a]/90 via-[#0b3a66]/80 to-[#0f5b8f]/70"></div>

      {/* Soft Glow */}
      <div className="absolute -inset-32 bg-blue-500/20 blur-3xl opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-6 md:px-12 text-center text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
          Launch Your Career with
          <span className="block text-blue-300">Real Experience</span>
        </h1>

        <p className="mt-6 text-base md:text-lg text-white/80 leading-relaxed">
          Join hundreds of interns who’ve transformed their skills into
          impactful careers through our guided internship program.
        </p>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <Link to={ROUTES.APPLY}>
            <BtnTransparent className="px-10 py-4 text-lg font-semibold rounded-full backdrop-blur-md bg-white/10 hover:bg-white/20 transition">
              Apply Now
            </BtnTransparent>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
