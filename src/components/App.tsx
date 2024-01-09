import { useState } from "react";

import { Toaster } from "react-hot-toast";

import { useDebounce, useJobItems } from "@/lib/hooks";
import { RESULTS_PER_PAGE } from "@/lib/constants";
import { type PageDirection, type SortBy } from "@/lib/types";
import {
  Background,
  Container,
  Footer,
  Header,
  IconSprite,
  BookmarksBtn,
  Logo,
  SearchForm,
  HeaderTop,
  JobItemContent,
  Sidebar,
  JobList,
  PaginationControls,
  ResultCount,
  SortingControls,
  SidebarTop,
} from "@/components";

function App() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 250);
  const { jobItems, isLoading } = useJobItems(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("relevant");

  const totalResults = jobItems?.length || 0;
  const totalPages = totalResults / RESULTS_PER_PAGE;
  const jobItemsSorted = [...(jobItems || [])].sort((a, b) => {
    if (sortBy === "relevant") {
      return b.relevanceScore - a.relevanceScore;
    } else {
      return a.daysAgo - b.daysAgo;
    }
  });
  const jobItemsSortedAndSliced = jobItemsSorted.slice(
    currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );

  const handleChangePage = (direction: PageDirection) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "previos") {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleChangeSortBy = (newSortBy: SortBy) => {
    setCurrentPage(1);
    setSortBy(newSortBy);
  };

  return (
    <>
      <IconSprite />

      <Background />

      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksBtn />
        </HeaderTop>

        <SearchForm
          searchText={searchText}
          onSearchTextChange={setSearchText}
        />
      </Header>

      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultCount totalResults={totalResults} />
            <SortingControls sortBy={sortBy} onClick={handleChangeSortBy} />
          </SidebarTop>

          <JobList jobItems={jobItemsSortedAndSliced} isLoading={isLoading} />

          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onClick={handleChangePage}
          />
        </Sidebar>
        <JobItemContent />
      </Container>

      <Footer />

      <Toaster position="top-right" />
    </>
  );
}

export default App;
