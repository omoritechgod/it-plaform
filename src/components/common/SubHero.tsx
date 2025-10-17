import bread_crump from "../../assets/breadcrumbs-3.png";

type Props = {
  title: string;
  description: string;
};

const SubHero = ({ title, description }: Props) => {
  return (
    <div
      className="w-full h-[55vh] overflow-hidden"
      style={{
        backgroundImage: `url(${bread_crump})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full h-full bg-black/70 py-10 flex items-end justify-start">
        <div className="max-w-5xl w-full mx-auto text-white">
          <p className="mb-4 p-6 py-1 rounded-md w-fit bg-blue/60 transform -rotate-3">{title}</p>
          <h1 className="text-3xl md:text-4xl text-gray-300">{description}</h1>
        </div>
      </div>
    </div>
  );
};

export default SubHero;
