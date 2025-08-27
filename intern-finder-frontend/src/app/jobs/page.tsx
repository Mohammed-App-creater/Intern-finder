import Navbar from "@/components/common/navbar";

export default function Jobs() {
  return (
    <section>
      {/* Hero */}
      <div className="bg-black h-60">
        <Navbar />
        <div className="flex justify-center items-center font-extrabold text-white text-5xl mt-10">
          <h1>Jobs</h1>
        </div>
      </div>
    </section>
  );
}
