import { BookmarksBtn, Logo, SearchForm } from "@/components";

export default function Header() {
  return (
    <>
      <header className="header">
        <div className="header__top">
          <Logo />
          <BookmarksBtn />
        </div>

        <SearchForm />
      </header>
    </>
  );
}
