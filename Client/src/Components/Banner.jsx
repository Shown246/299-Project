import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div
        className="hero min-h-[460px]"
        style={{
          backgroundImage: "url(https://i.ibb.co.com/0MkGB9J/3-min.png)",
        }}
      >
        <div className="bg-opacity-40 hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="px-24 pt-40">
            <h1 className="mb-5 text-5xl font-bold text-accent">
              Your Personal Assistant
            </h1>
            <p className="mb-5 text-xl text-accent">
              One-stop solution for your services. Order any service, anytime.
            </p>
            <button className="btn bg-genoa" onClick={() => navigate("/jobPost")}>Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
