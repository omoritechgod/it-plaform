import bread_crump from "../../assets/breadcrumbs-3.png";

type Props = {
  title: string;
  description: string;
};

const SubHero = ({ title, description }: Props) => {
  return (
    <div
      className="relative w-full h-[70vh] overflow-hidden rounded-b-[3rem]"
      style={{
        backgroundImage: `url(${bread_crump})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative h-full flex items-end px-4 md:px-0 pb-20">
        <div className="max-w-5xl mx-auto w-full text-white space-y-4">
          {/* Accent pill */}
          <span
            className="
          inline-block px-5 py-1.5 rounded-full
          bg-blue/70 text-white text-sm font-semibold
          backdrop-blur-sm shadow-lg
          -rotate-2
        "
          >
            {title}
          </span>

          {/* Heading */}
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight text-gray-200 max-w-3xl">
            {description}
          </h1>

          {/* Subtle divider */}
          <div className="w-16 h-[2px] bg-blue/70 mt-4 rounded-full" />
        </div>
      </div>

      {/* Soft vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" ></div>
    </div>
  );
};

export default SubHero;
