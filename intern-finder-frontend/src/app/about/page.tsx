import Navbar from "@/components/common/navbar";

export default function About() {
  return (
    <section>
      {/* Hero */}
      <div className="bg-black h-60 mb-5">
        <Navbar />
        <div className="flex justify-center items-center font-extrabold text-white text-5xl mt-10">
          <h1>About Us</h1>
        </div>
      </div>
    </section>
  );
}
