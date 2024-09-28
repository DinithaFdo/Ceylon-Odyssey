

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Ceylon Odeyssey</h3>
              <p>Discover the magic of the pearl of the Indian Ocean</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['About Us', 'FAQs', 'Terms & Conditions', 'Privacy Policy'].map((item) => (
                  <li key={item}><a href="/about" className="hover:text-orange-500 transition duration-300">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                  <a key={social} href="#" className="text-2xl hover:text-orange-500 transition duration-300">
                    <i className={`fab fa-${social}`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2024 Ceylon Oddeysey. All rights reserved.</p>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
