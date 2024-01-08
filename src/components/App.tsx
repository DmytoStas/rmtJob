import { useState } from "react";

import { Toaster } from "react-hot-toast";

import { useDebounce, useJobItems } from "@/lib/hooks";
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

  const totalResults = jobItems?.length || 0;
  const jobItemsSliced = jobItems?.slice(0, 7) || [];

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
            <SortingControls />
          </SidebarTop>

          <JobList jobItems={jobItemsSliced} isLoading={isLoading} />
          <PaginationControls />
        </Sidebar>
        <JobItemContent />
      </Container>

      <Footer />

      <Toaster position="top-right" />
    </>
  );
}

export default App;
