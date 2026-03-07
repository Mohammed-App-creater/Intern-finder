import Image from "next/image";
import { ContactForm } from "@/components/pages/contact/contact-form";
import { ContactInfo } from "@/components/pages/contact/contact-info";
import Navbar from "@/components/common/navbar";
import Logo from "@/components/icons/contact_logos.png";
import Footer from "@/components/common/footer";

export default function Contact() {
  return (
    <section>
      {/* Hero */}
      <div className="bg-black h-40 sm:h-60 mb-5">
        <Navbar />
        <div className="flex justify-center items-center font-extrabold text-white text-3xl sm:text-5xl mt-10">
          <h1>Contact Us</h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-12 sm:py-16 px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
          <ContactInfo />
          <div className="w-full lg:w-auto">
            <ContactForm />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-12 sm:py-16 px-4">
        <Image
          src={"/images/Impact_Makers_Foundation_Location.png"}
          alt={"Company Location"}
          width={500}
          height={500}
          className="w-full h-64 sm:h-96 md:h-150 rounded-lg shadow-lg object-cover"
        />
      </div>
      <Image
          src={Logo}
          alt={"Company's Logo"}
          width={1500}
          height={200}
          className="w-full h-full"
        />
        <Footer />
    </section>
  );
}
