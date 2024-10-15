import { FaXTwitter, FaYoutube, FaFacebook } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="mt-12 text-white">
      <footer className="footer footer-center p-10 bg-teal">
        <aside>
          <img src="./assets/logo-white.png" alt="" className="w-[128px]" />
          <p className="text-accent">
          One-stop solution for your services. Order any service, anytime.
          </p>
          <div className="grid grid-flow-col my-4 gap-6">
            <a className="text-accentGold" href="https://twitter.com/"><FaXTwitter  size={30} /></a>
            <a className="text-accentGold" href="https://www.youtube.com/"><FaYoutube  size={30} /></a>
            <a className="text-accentGold" href="https://www.facebook.com/"><FaFacebook  size={30} /></a>
          </div>
          <p className="text-sm">Copyright © 2024 - All right reserved</p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;