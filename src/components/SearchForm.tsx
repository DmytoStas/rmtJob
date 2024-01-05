export default function SearchForm() {
  return (
    <form className="search" action="#">
      <input
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
