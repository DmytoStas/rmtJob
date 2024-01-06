export default function SortingControls() {
  return (
    <div className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <ul className="sorting__list">
        <li>
          <button className={`sorting__button sorting__button--relevant`}>
            Relevant
          </button>
        </li>

        <li>
          <button className={`sorting__button sorting__button--recent`}>
            Recent
          </button>
        </li>
      </ul>
    </div>
  );
}
