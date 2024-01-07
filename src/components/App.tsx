import { useState } from "react";

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
import { useJobItems } from "@/lib/hooks";

function App() {
  const [searchText, setSearchText] = useState("");
  const [jobItems, isLoading] = useJobItems(searchText);

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
            <ResultCount />
            <SortingControls />
          </SidebarTop>

          <JobList jobItems={jobItems} isLoading={isLoading} />
          <PaginationControls />
        </Sidebar>
        <JobItemContent />
      </Container>

      <Footer />
    </>
  );
}

export default App;
