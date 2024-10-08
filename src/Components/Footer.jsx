import { FaXTwitter, FaYoutube, FaFacebook } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="mt-12 text-white">
      <footer className="footer footer-center p-10 bg-flamingo">
        <aside>
          <p className="text-4xl mb-4 font-bold block animate__animated animate__fadeIn duration-300">
          Travel<span className="text-teal">BD</span>
          </p>
          <p className="text-teal">
            Providing the best quality Services for your travel needs.
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