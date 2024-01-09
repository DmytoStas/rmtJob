import PaginationBtn from "./PaginationBtn";

import { type PageDirection } from "@/lib/types";

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  onClick: (direction: PageDirection) => void;
};

export default function PaginationControls({
  currentPage,
  totalPages,
  onClick,
}: PaginationControlsProps) {
  return (
    <div className="pagination">
      {currentPage > 1 && (
        <PaginationBtn
          direction="previous"
          currentPage={currentPage}
          onClick={() => onClick("previos")}
        />
      )}

      {currentPage < totalPages && (
        <PaginationBtn
          direction="next"
          currentPage={currentPage}
          onClick={() => onClick("next")}
        />
      )}
    </div>
  );
}
