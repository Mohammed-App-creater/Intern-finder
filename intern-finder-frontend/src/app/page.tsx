import Navbar from "@/components/common/navbar";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex justify-center items-center text-9xl">Home Page</div>
    </div>
  );
}
