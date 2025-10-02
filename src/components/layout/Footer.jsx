import { useEffect, useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-white text-gray-600 pt-10 pb-6 px-6 md:px-16 border-t border-gray-200">
      {/* Footer Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        {/* Site Info */}
        <div>
          <h4 className="font-medium text-gray-400 mb-3">Site Info</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/terms" className="hover:text-green-600 font-medium">
                Terms and Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-green-600 font-medium">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Stay Connected */}
        <div>
          <h4 className="font-medium text-gray-400 mb-3">Stay Connected</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/faqs" className="hover:text-green-600 font-medium">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/careers" className="hover:text-green-600 font-medium">
                Careers
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-green-600 font-medium">
                Contact Links
              </Link>
            </li>
          </ul>
        </div>

        {/* Nav Links */}
        <div>
          <h4 className="font-medium text-gray-400 mb-3">Nav Links</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-green-600 font-medium text-green-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-green-600 font-medium">
                About
              </Link>
            </li>
            {/* <li>
              <Link to="/publications" className="hover:text-green-600 font-medium">
                Platforms
              </Link>
            </li> */}
            <li>
              <Link to="/services" className="hover:text-green-600 font-medium">
                Services
              </Link>
            </li>
          </ul>
        </div>

        {/* Others */}
        <div>
          <h4 className="font-medium text-gray-400 mb-3">Others</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/ghs-report" className="hover:text-green-600 font-medium">
                General Report
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-6 border-gray-200" />

      {/* Social Icons */}
      <div className="flex space-x-5">
        <a href="#" className="text-primary hover:scale-110 transition-transform">
          <FaFacebookF size={22} />
        </a>
        <a href="#" className="text-primary hover:scale-110 transition-transform">
          <FaTwitter size={22} />
        </a>
        <a href="#" className="text-primary hover:scale-110 transition-transform">
          <FaInstagram size={22} />
        </a>
        <a href="#" className="text-primary hover:scale-110 transition-transform">
          <FaLinkedinIn size={22} />
        </a>

      
      </div>
      <p className='text-sm mt-10 text-center pb-6'>&copy; {year} Kaduna State. All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
