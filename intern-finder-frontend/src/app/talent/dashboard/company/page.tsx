import { CompanySizeFilter } from "@/components/pages/dashboard/company-search/comany-size-filter";
import { CompaniesGrid } from "@/components/pages/dashboard/company-search/companies-grid";
import { CompaniesHeader } from "@/components/pages/dashboard/company-search/companies-header";
import { IndustryFilter } from "@/components/pages/dashboard/company-search/industry-filter";
import { PopularTags } from "@/components/pages/dashboard/company-search/popular-tags";
import { Pagination } from "@/components/common/pagination";
import { SearchBar } from "@/components/pages/dashboard/company-search/search-bar";

export default function Dashboard() {
  return (
    <main className="flex-1 p-8 mb-5 mt-2">
      <h1 className="text-3xl font-bold text-dark mb-8 font-['Clash_Display']">Browse Companies</h1>
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
