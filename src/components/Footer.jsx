import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";

const Footer = () => {
  const year = new Date().getFullYear();

  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    // TODO: newsletter API call করতে পারো এখানে
    e.target.reset();
    Swal.fire("Thanks for subscribing to Blood Donation updates!");
  };

  return (
    <footer className="mt-24 bg-gradient-to-br from-red-800 via-red-700 to-red-900 text-white">
      {/* Main Footer Grid */}
      <div className="w-11/12 mx-auto py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-extrabold">Blood Donation</h2>
          <p className="mt-3 text-red-100 max-w-xs leading-relaxed">
            Save lives by donating blood. Your small act can make a big difference.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h6 className="text-lg font-bold mb-4 uppercase tracking-wide">Quick Links</h6>
          <ul className="space-y-2 text-red-100">
            <li><Link to="/" className="hover:text-green-300 transition">Home</Link></li>
            <li><Link to="/blog" className="hover:text-green-300 transition">Blog</Link></li>
            <li><Link to="/AllDonationRequests" className="hover:text-green-300 transition">DonationRequests</Link></li>
            <li><Link to="/DonorSearch" className="hover:text-green-300 transition">DonorSearch</Link></li>
            
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h6 className="text-lg font-bold mb-4 uppercase tracking-wide">Contact</h6>
          <ul className="space-y-2 text-red-100">
            <li>Email: support@blooddonation.com {/* TODO: পরিবর্তন করতে পারো */}</li>
            <li>Phone: +880 1234 567890 {/* TODO: পরিবর্তন করতে পারো */}</li>
            <li>Dhaka, Bangladesh</li>
          </ul>

          {/* Social */}
          <div className="mt-4 flex gap-4 text-2xl">
            <a
              href="https://www.facebook.com/hafezmohammedalamin1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-green-300 transition"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.linkedin.com/in/md-al-amin-2aa06922a/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-green-300 transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/mdalamin2002"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-green-300 transition"
            >
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h6 className="text-lg font-bold mb-4 uppercase tracking-wide">Stay Updated</h6>
          <p className="text-red-100 mb-4">
            Get updates about blood donation drives & urgent requests.
          </p>
          <form onSubmit={handleSubscribe} className="space-y-3">
            <input
              type="email"
              name="email"
              required
              placeholder="Your email"
              className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2"
            />
            <button
              type="submit"
              className="w-full px-4 py-2 rounded-md bg-green-600 hover:bg-orange-600 transition font-semibold shadow-md"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-red-950/60 py-4 text-center text-sm ">
        © {year} Blood Donation. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
