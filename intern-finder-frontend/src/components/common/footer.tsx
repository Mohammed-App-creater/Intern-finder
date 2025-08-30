import Image from "next/image";
import Logo from "@/components/icons/logo.png";

export default function Footer() {
  return (
    <footer className="bg-black py-12 px-6">
      <div className="mx-20">
        {/* Main footer content */}
        <div className="flex mb-8">
          {/* Job branding section */}
          <div className="space-y-4">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-8">
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
            <p className="text-light text-sm leading-relaxed max-w-100">
              Connecting ambitious talent with forward-thinking companies. Your
              pathway to career growth and exceptional hires.
            </p>
          </div>
          <div className="flex justify-evenly w-full">
            {/* Company section */}
            <div className="space-y-4">
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
            <div className="space-y-4">
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
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-light text-sm">
            © Copyright Intern Finder {new Date().getFullYear()}. All Rights
            reserved
          </p>
          <div className="flex gap-6">
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
