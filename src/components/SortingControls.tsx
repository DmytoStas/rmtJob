import SortingBtn from "./SortingBtn";

import { type SortBy } from "@/lib/types";

type SortingControlsProps = {
  sortBy: SortBy;
  onClick: (newSortBy: SortBy) => void;
};

export default function SortingControls({
  sortBy,
  onClick,
}: SortingControlsProps) {
  return (
    <div className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <ul className="sorting__list">
        <li>
          <SortingBtn
            onClick={() => onClick("relevant")}
            isActive={sortBy === "relevant"}
          >
            Relevant
          </SortingBtn>
        </li>

        <li>
          <SortingBtn
            onClick={() => onClick("recent")}
            isActive={sortBy === "recent"}
          >
            Recent
          </SortingBtn>
        </li>
      </ul>
    </div>
  );
}
