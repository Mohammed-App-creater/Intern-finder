import Categories from "@/components/pages/home/categories";
import Footer from "@/components/common/footer";
import Hero from "@/components/pages/home/hero";
import RecentJobs from "@/components/pages/home/recent-jobs";
import Reports from "@/components/pages/home/reports";
import Testimonial from "@/components/pages/home/testimonial";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <div className="flex justify-center">
        <RecentJobs />
      </div>
      <Categories />
      <Reports />
      <Testimonial />
      <Footer />
    </div>
  );
}
