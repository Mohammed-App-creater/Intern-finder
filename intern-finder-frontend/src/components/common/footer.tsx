import Image from "next/image";
import Logo from "@/components/icons/logo.png";

export default function Footer() {
  return (
    <footer className="bg-black py-8 sm:py-10 md:py-12 px-4 sm:px-6">
      <div className="mx-4 sm:mx-8 md:mx-12 lg:mx-20">
        {/* Main footer content */}
        <div className="flex flex-col lg:flex-row mb-6 sm:mb-8 gap-6 sm:gap-8">
          {/* Job branding section */}
          <div className="space-y-3 sm:space-y-4 lg:flex-1">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-4 sm:mb-6 md:mb-8">
              <Image
                src={Logo}
                alt="Company Logo"
                width={30}
                height={30}
                priority
              />
              <span className="text-xl font-bold text-white">
                Intern Finder
              </span>
            </div>
            <p className="text-light text-sm leading-relaxed max-w-full lg:max-w-100">
              Connecting ambitious talent with forward-thinking companies. Your
              pathway to career growth and exceptional hires.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-between w-full lg:flex-1 gap-6 sm:gap-8">
            {/* Company section */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-lg font-semibold text-white">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-light text-sm hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-light text-sm hover:text-white transition-colors"
                  >
                    Our Team
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-light text-sm hover:text-white transition-colors"
                  >
                    Partners
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-light text-sm hover:text-white transition-colors"
                  >
                    For Candidates
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-light text-sm hover:text-white transition-colors"
                  >
                    For Employers
                  </a>
                </li>
              </ul>
            </div>

            {/* Job Categories section */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-lg font-semibold text-white">
                Job Categories
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-light text-sm hover:text-white transition-colors"
                  >
                    Web Development
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-light text-sm hover:text-white transition-colors"
                  >
                    Digital Marketing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-light text-sm hover:text-white transition-colors"
                  >
                    Project Management
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-light text-sm hover:text-white transition-colors"
                  >
                    Cyber Security
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-light text-sm hover:text-white transition-colors"
                  >
                    Content Creation
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="pt-4 sm:pt-5 md:pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 border-t border-gray-700">
          <p className="text-light text-sm text-center sm:text-left">
            © Copyright Intern Finder {new Date().getFullYear()}. All Rights
            reserved
          </p>
          <div className="flex gap-4 sm:gap-6">
            <a
              href="#"
              className="text-light text-sm hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-light text-sm hover:text-white transition-colors"
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
