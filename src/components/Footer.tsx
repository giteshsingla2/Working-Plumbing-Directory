import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-900 text-secondary-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">PlumbFind CA</h3>
            <p className="text-sm">
              Connecting you with trusted plumbing professionals across California. Available 24/7 for all your plumbing needs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Services */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Popular Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/24-hour-plumber" className="text-sm hover:text-white transition-colors">
                  24 Hour Plumber
                </Link>
              </li>
              <li>
                <Link href="/clogged-drain-repair" className="text-sm hover:text-white transition-colors">
                  Clogged Drain Repair
                </Link>
              </li>
              <li>
                <Link href="/toilet-repair" className="text-sm hover:text-white transition-colors">
                  Toilet Repair
                </Link>
              </li>
              <li>
                <Link href="/faucet-installation" className="text-sm hover:text-white transition-colors">
                  Faucet Installation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-sm">
                <strong>Phone:</strong>{' '}
                <a href="tel:831-232-3402" className="hover:text-white transition-colors">
                831-232-3402
                </a>
              </li>
              <li className="text-sm">
                <strong>Email:</strong>{' '}
                <a href="mailto:info@plumbfind.ca" className="hover:text-white transition-colors">
                  info@plumbfind.ca
                </a>
              </li>
              <li className="text-sm">
                <strong>Hours:</strong> 24/7 Emergency Plumbing Service
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-secondary-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              &copy; {currentYear} PlumbFind CA. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/terms" className="text-sm hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-sm hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/sitemap" className="text-sm hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
