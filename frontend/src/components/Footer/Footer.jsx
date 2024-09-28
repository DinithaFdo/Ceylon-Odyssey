import logo from "../../assets/clogo.png"; // Assuming you have a logo to display
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-blue-400 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-3xl font-bold mb-4">Ceylon Odyssey</h3>
            <p className="mb-4">Discover the magic of the pearl of the Indian Ocean.</p>
            <img src={logo} alt="Ceylon Odyssey Logo" className="h-12 mb-4" />
            <p className="text-sm">© {new Date().getFullYear()} Ceylon Odyssey. All Rights Reserved.</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['About Us', 'Tour Packages', 'Destinations', 'Equipment', 'Blogs', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-orange-300 transition duration-300">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {['Terms & Conditions', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-orange-300 transition duration-300">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-1 md:col-span-3">
            <h4 className="text-xl font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-6">
              {[
                { icon: <FaFacebookF />, name: 'Facebook' },
                { icon: <FaTwitter />, name: 'Twitter' },
                { icon: <FaInstagram />, name: 'Instagram' },
                { icon: <FaYoutube />, name: 'YouTube' },
                { icon: <FaLinkedin />, name: 'LinkedIn' },
              ].map(({ icon, name }) => (
                <a key={name} href="#" className="text-3xl hover:text-orange-300 transition duration-300">
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;