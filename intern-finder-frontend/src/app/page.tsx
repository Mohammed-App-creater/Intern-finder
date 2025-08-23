import Hero from "@/components/pages/home/hero";
import RecentJobs from "@/components/pages/home/recent-jobs";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <div className="flex justify-center">
        <RecentJobs />
      </div>
    </div>
  );
}
