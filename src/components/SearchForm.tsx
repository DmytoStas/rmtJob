type SearchFormProps = {
  searchText: string;
  onSearchTextChange: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchForm({
  searchText,
  onSearchTextChange,
}: SearchFormProps) {
  return (
    <form
      className="search"
      action="#"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input
        value={searchText}
        onChange={(e) => {
          onSearchTextChange(e.target.value);
        }}
        type="text"
        spellCheck="false"
        required
        placeholder="Find remote jobs..."
      />

      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );
}
