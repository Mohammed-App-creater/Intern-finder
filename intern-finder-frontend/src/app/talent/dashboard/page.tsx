import { CompanySizeFilter } from "@/components/pages/dashboard/comany-size-filter";
import { CompaniesGrid } from "@/components/pages/dashboard/companies-grid";
import { CompaniesHeader } from "@/components/pages/dashboard/companies-header";
import { IndustryFilter } from "@/components/pages/dashboard/industry-filter";
import { PopularTags } from "@/components/pages/dashboard/popular-tags";
import { Pagination } from "@/components/common/pagination";
import { SearchBar } from "@/components/pages/dashboard/search-bar";

export default function Dashboard() {
  return (
    <main className="flex-1 p-8 mb-5 mt-2">
      <h1 className="text-3xl font-bold text-dark mb-8">Browse Companies</h1>
      <SearchBar />
      <PopularTags />
      <div className="flex gap-8">
        <aside className="w-64 flex-shrink-0">
          <IndustryFilter />
          <CompanySizeFilter />
        </aside>
        <div className="flex-1">
          <CompaniesHeader />
          <CompaniesGrid />
          <Pagination />
        </div>
      </div>
    </main>
  );
}
