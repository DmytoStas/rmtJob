import { useEffect, useState } from "react";

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
  const [jobItems, setJobItems] = useState([]);

  useEffect(() => {
    if (!searchText) return;

    const fetchData = async () => {
      const res = await fetch(
        `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
      );

      const data = await res.json();
      setJobItems(data.jobItems);
    };

    fetchData();
  }, [searchText]);

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

          <JobList jobItems={jobItems} />
          <PaginationControls />
        </Sidebar>
        <JobItemContent />
      </Container>

      <Footer />
    </>
  );
}

export default App;
